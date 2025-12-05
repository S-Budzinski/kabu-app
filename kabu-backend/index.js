console.log("1. [START] Uruchamianie index.js...");

try {
  require('dotenv').config();
  console.log("2. Dotenv załadowany");
} catch (e) {
  console.error("BŁĄD Dotenv:", e);
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression'); // upewnij się, że masz to w package.json!
const rateLimit = require('express-rate-limit');

console.log("3. Biblioteki zewnętrzne załadowane");

const app = express();
// Usuń process.env.PORT || 4242 -> pozwólmy Railway decydować, albo logujmy to
const PORT = process.env.PORT || 4242;
const HOST = '0.0.0.0';

console.log(`4. Konfiguracja: PORT=${PORT}, HOST=${HOST}`);

// --- BEZPIECZNE ŁADOWANIE TRAS (To tu pewnie jest błąd) ---
let checkoutRoutes, productsRoutes, webhookRoutes;

try {
  console.log("5. Próba ładowania routes/checkout...");
  checkoutRoutes = require('./routes/checkout');
  console.log("   -> routes/checkout OK");
} catch (err) {
  console.error("❌ BŁĄD ładowania routes/checkout:", err.message);
}

try {
  console.log("6. Próba ładowania routes/products...");
  productsRoutes = require('./routes/products');
  console.log("   -> routes/products OK");
} catch (err) {
  console.error("❌ BŁĄD ładowania routes/products:", err.message);
}

try {
  console.log("7. Próba ładowania routes/webhook...");
  webhookRoutes = require('./routes/webhook');
  console.log("   -> routes/webhook OK");
} catch (err) {
  console.error("❌ BŁĄD ładowania routes/webhook:", err.message);
}

// --- MIDDLEWARE ---
app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());

const clientUrl = process.env.CLIENT_URL || '*';
app.use(cors({
  origin: clientUrl,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));

// --- TRASY ---
// Webhook
if (webhookRoutes) {
  app.use('/api/webhook', webhookRoutes);
} else {
  console.warn("⚠️ Webhook routes nie zostały załadowane (pomijam)");
}

app.use(express.json());

if (productsRoutes) app.use('/api/products', productsRoutes);
if (checkoutRoutes) app.use('/api', checkoutRoutes);

// --- HEALTH CHECK ---
app.get('/', (req, res) => {
  console.log("Otrzymano zapytanie GET /");
  res.send('Kabu Backend is running (DEBUG MODE)!');
});

// --- START SERWERA ---
console.log("8. Próba uruchomienia app.listen...");

const server = app.listen(PORT, HOST, () => {
  console.log("=========================================");
  console.log(`✅ SUKCES: Server listening on ${HOST}:${PORT}`);
  console.log(`   Client URL: ${clientUrl}`);
  console.log("=========================================");
});

// Obsługa błędów startu
server.on('error', (e) => {
  console.error("❌ BŁĄD SERWERA (server.on error):", e);
});

// Łapanie nieobsłużonych wyjątków, żeby serwer nie milczał
process.on('uncaughtException', (err) => {
  console.error('❌ CRITICAL ERROR (uncaughtException):', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ CRITICAL ERROR (unhandledRejection):', reason);
});
