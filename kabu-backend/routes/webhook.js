const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // <--- DODANO

// Konfiguracja mailera (taka sama jak w checkout.js)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false }
});

// Stripe wymaga raw body do walidacji podpisu
router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Webhook received:', event.type);

  try {
    // PŁATNOŚĆ ZAKOŃCZONA SUKCESEM
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const orderId = parseInt(metadata.orderId || '0');

      if (orderId) {
        // 1. Zmień status zamówienia w bazie na 'paid'
        const updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'paid',
            paymentIntentId: session.payment_intent || null
          },
          include: { items: true } // Pobierzemy produkty żeby wpisać je do maila (opcjonalne)
        });

        console.log(`Order #${orderId} marked as paid.`);

        // 2. Wyślij maila "Płatność przyjęta"
        const mailOptions = {
          from: `"KabuStore" <${process.env.EMAIL_USER}>`,
          to: session.customer_details?.email || updatedOrder.email,
          subject: `Płatność przyjęta - Zamówienie #${orderId}`,
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h1 style="color: #16a34a;">Płatność potwierdzona! ✅</h1>
              <p>Dziękujemy, otrzymaliśmy Twoją wpłatę za zamówienie <strong>#${orderId}</strong>.</p>
              <p>Status zamówienia został zmieniony na: <strong>OPŁACONE</strong>.</p>
              <p>Przystępujemy do pakowania Twojej przesyłki.</p>
              <hr style="border: 1px solid #eee; margin: 20px 0;">
              <p>W razie pytań prosimy o kontakt.</p>
              <p><em>Zespół Kabu</em></p>
            </div>
          `
        };

        transporter.sendMail(mailOptions).then(() => {
          console.log(`Payment confirmation email sent to ${mailOptions.to}`);
        }).catch(err => console.error('Email error:', err));
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(500).send();
  }
});

module.exports = router;