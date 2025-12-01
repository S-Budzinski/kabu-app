require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit');
const compression = require('compression');// Warto dodać dla bezpieczeństwa (npm install helmet)
const checkoutRoutes = require('./routes/checkout');
const productsRoutes = require('./routes/products');
const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 4242;

// 1. Bezpieczeństwo (Helmet ukrywa nagłówki Expressa)
// Jeśli nie masz helmet, zainstaluj go: npm install helmet
app.set('trust proxy', 1);
app.use(helmet()); 
app.use(compression());
// 4. Rate Limiting (Ochrona przed DDoS/Brute Force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minut
  max: 100, // Limit 100 zapytań z jednego IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);
// 2. CORS - Skonfiguruj pod produkcję
// Na produkcji CLIENT_URL powinien być dokładnym adresem Twojej domeny (np. https://twojsklep.pl)
const clientUrl = process.env.CLIENT_URL; // np. 'https://twoja-domena.pl'
if (!clientUrl) {
  console.warn("⚠️ OSTRZEŻENIE: Brak CLIENT_URL w .env! CORS może nie działać poprawnie.");
}

app.use(cors({
  origin: clientUrl,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// 3. WAŻNE: Webhook Stripe musi być PRZED express.json()
// Stripe wymaga surowego body do weryfikacji podpisu. Jeśli parser JSON zadziała wcześniej, weryfikacja się nie uda.
app.use('/api/webhook', webhookRoutes);

// 4. Parser JSON dla reszty aplikacji
// Używamy go dopiero tutaj, żeby nie zepsuć webhooka powyżej
app.use(express.json());

// 5. Trasy API
app.use('/api/products', productsRoutes);
app.use('/api', checkoutRoutes);

// Health check (przydatne dla load balancerów / monitoringu)
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
  console.log(`   CORS origin allowed: ${clientUrl}`);
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});