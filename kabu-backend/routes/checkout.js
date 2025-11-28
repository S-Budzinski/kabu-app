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
    const { items, customer, successUrl, cancelUrl } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    if (!customer || !customer.email) {
      return res.status(400).json({ error: 'Customer email required' });
    }

    // 1. Save pending order to database
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

    // 2. Prepare items for Stripe (Fixing the image URL issue)
    const line_items = items.map(it => {
      // Send image to Stripe ONLY if it is a real URL (starts with http). 
      // Local paths like "/src/assets/..." cause errors, so we send an empty array instead.
      const images = (it.image && it.image.startsWith('http')) ? [it.image] : [];

      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: it.name,
            images: images, 
          },
          unit_amount: toCents(it.price),
        },
        quantity: it.quantity,
      };
    });

    // 3. Create Stripe Session (Fixing the payment_method_options error)
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
      // REMOVED: payment_method_options for p24 which caused the crash
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    // 4. Update order with session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    console.log('[create-checkout-session] created session:', session.id);
    return res.json({ url: session.url, sessionId: session.id, orderId: order.id });

  } catch (err) {
    console.error('[create-checkout-session] ERROR:', err);
    const stripeMsg = err?.raw?.message || err.message;
    return res.status(500).json({ error: 'Failed to create checkout session', details: stripeMsg });
  }
});

module.exports = router;