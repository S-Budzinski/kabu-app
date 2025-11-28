require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const checkoutRoutes = require('./routes/checkout');
const productsRoutes = require('./routes/products');
const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 4242;

// Use JSON parser for API routes
app.use(cors({
  origin: process.env.CLIENT_URL || '*'
}));
app.use(express.json());

// Routes
app.use('/api/products', productsRoutes);
app.use('/api', checkoutRoutes);

// Stripe webhook needs raw body; route mounted separately
app.use('/api/webhook', webhookRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});