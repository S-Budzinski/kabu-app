const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');

// Stripe requires the raw body to validate signature
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
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const orderId = parseInt(metadata.orderId || '0');

      // Mark order as paid
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'paid',
          paymentIntentId: session.payment_intent || null
        }
      });
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      // Optionally update related order by searching metadata or session
      console.log('PaymentIntent succeeded', paymentIntent.id);
    }

    // Respond 200 to Stripe
    res.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(500).send();
  }
});

module.exports = router;
