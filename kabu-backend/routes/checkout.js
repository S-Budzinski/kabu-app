// backend/routes/checkout.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function toCents(amount) {
  return Math.round(Number(amount) * 100);
}

router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('[create-checkout-session] body:', JSON.stringify(req.body, null, 2));
    const { items, customer, successUrl, cancelUrl, coupon } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    if (!customer || !customer.email) {
      return res.status(400).json({ error: 'Customer email required' });
    }

    // Create pending order record
    const totalAmount = Math.round(items.reduce((s, it) => s + it.price * it.quantity, 0) * 100);
    const order = await prisma.order.create({
      data: {
        email: customer.email,
        phone: customer.phone || '',
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        address: customer.address || '',
        city: customer.city || '',
        postalCode: customer.postalCode || '',
        totalAmount,
        status: 'pending',
      },
    });

    // Build Stripe line items
    const line_items = items.map(it => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: it.name,
          images: it.image ? [it.image] : [],
        },
        unit_amount: toCents(it.price),
      },
      quantity: it.quantity,
    }));

    // Very explicit: include PLN preference for p24 and locale=pl so Polish methods appear
    const sessionParams = {
      payment_method_types: ['card', 'p24', 'blik'],
      mode: 'payment',
      line_items,
      customer_email: customer.email,
      metadata: {
        orderId: order.id.toString(),
      },
      success_url: successUrl || (process.env.CLIENT_URL + '/checkout-success?session_id={CHECKOUT_SESSION_ID}'),
      cancel_url: cancelUrl || (process.env.CLIENT_URL + '/cart'),
      locale: 'pl',
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      payment_method_options: {
        p24: {
          // Stripe expects lower-case currency code
          preferred_currency: 'pln'
        }
      }
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    // Save session id into order
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    console.log('[create-checkout-session] created session:', session.id);
    // return session url (Stripe API vX+ supports session.url)
    return res.json({ url: session.url, sessionId: session.id, orderId: order.id });
  } catch (err) {
    // Log full error for debugging
    console.error('[create-checkout-session] ERROR:', err);
    // If stripe error, include stripe message
    const stripeMsg = err?.raw?.message || err.message;
    return res.status(500).json({ error: 'Failed to create checkout session', details: stripeMsg });
  }
});

module.exports = router;
