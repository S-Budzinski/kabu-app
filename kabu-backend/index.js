require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 4242;
const HOST = '0.0.0.0';

// 1. Diagnostyka Startowa (Logujemy co mamy)
console.log('--- START SERWERA ---');
console.log(`PORT: ${PORT}`);
console.log(`HOST: ${HOST}`);
console.log(`DATABASE_URL obecny?: ${!!process.env.DATABASE_URL}`);
console.log(`STRIPE_SECRET_KEY obecny?: ${!!process.env.STRIPE_SECRET_KEY}`);

// 2. Middleware (Bezpieczeństwo)
app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Bezpieczne ładowanie tras (Try-Catch)
// Dzięki temu, jeśli brakuje kluczy, serwer nie wybuchnie, tylko wypisze błąd.
const loadRoute = (path) => {
  try {
    return require(path);
  } catch (err) {
    console.error(`❌ BŁĄD ładowania trasy ${path}:`, err.message);
    return null; // Zwracamy null, żeby aplikacja szła dalej
  }
};

const webhookRoutes = loadRoute('./routes/webhook');
const productsRoutes = loadRoute('./routes/products');
const checkoutRoutes = loadRoute('./routes/checkout');

// 4. Podpinanie tras (Tylko jeśli się załadowały)
if (webhookRoutes) app.use('/api/webhook', webhookRoutes);
app.use(express.json()); // Parser JSON po webhooku!
if (productsRoutes) app.use('/api/products', productsRoutes);
if (checkoutRoutes) app.use('/api', checkoutRoutes);

// 5. Endpointy Diagnostyczne
app.get('/', (req, res) => res.send('Kabu Backend działa!'));
app.get('/api/health', (req, res) => {
  // Sprawdzamy stan tras w odpowiedzi
  res.json({
    status: 'ok',
    checks: {
      stripe_key: !!process.env.STRIPE_SECRET_KEY,
      database_url: !!process.env.DATABASE_URL,
      routes_loaded: {
        checkout: !!checkoutRoutes,
        webhook: !!webhookRoutes,
        products: !!productsRoutes
      }
    }
  });
});

// 6. Start Serwera
app.listen(PORT, HOST, () => {
  console.log(`✅ Server listening on http://${HOST}:${PORT}`);
});
