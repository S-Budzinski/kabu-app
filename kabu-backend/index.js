// index.js (defensive start)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 4242;
const HOST = process.env.HOST || '0.0.0.0';

// minimal dependencies for now
app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());

// Rate limiter (light)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// CORS - be permissive for debugging (change to strict origin later)
const clientUrl = process.env.CLIENT_URL || '*';
app.use(cors({
  origin: clientUrl === '*' ? true : clientUrl,
  methods: ['GET','POST','OPTIONS'],
  credentials: true,
}));

// Keep webhook route usage as earlier if you have it, but ensure it doesn't break startup
// If you have ./routes/webhook which requires raw body, mount it before express.json() - keep as in original app

// JSON parser
app.use(express.json());

// Your routes - for now mount safely if exist, but guard with try/catch
try {
  const checkoutRoutes = require('./routes/checkout');
  const productsRoutes = require('./routes/products');
  const webhookRoutes = require('./routes/webhook');
  if (webhookRoutes) app.use('/api/webhook', webhookRoutes); // if webhook exists
  if (productsRoutes) app.use('/api/products', productsRoutes);
  if (checkoutRoutes) app.use('/api', checkoutRoutes);
} catch (err) {
  console.warn('⚠️ Some route failed to require():', err.message);
}

// Health endpoints (always available)
app.get('/', (req,res) => res.send('Kabu Backend is running (root)!'));
app.get('/api/health', (req,res) => res.json({
  status: 'ok',
  time: new Date().toISOString(),
  port: PORT,
  envClientUrl: clientUrl
}));

// Start server FIRST (so Railway can connect), then attempt DB connect asynchronously
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server listening on ${HOST}:${PORT}`);
  console.log(`   CORS origin allowed: ${clientUrl}`);
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
});

// === Prisma / DB connect (non-blocking, with retries) ===
let prisma;
const tryPrismaConnect = async (retries = 6, delayMs = 2000) => {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL not set - skipping DB connect attempts.');
    return;
  }
  try {
    // require here to avoid crashing when prisma binary missing
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
    await prisma.$connect();
    console.log('🟢 Prisma connected to DB');
  } catch (err) {
    console.error(`Prisma connect failed (${retries} retries left):`, err.message || err);
    if (retries > 0) {
      setTimeout(() => tryPrismaConnect(retries - 1, delayMs), delayMs);
    } else {
      console.error('❌ Prisma could not connect after retries. Server remains up for health checks.');
    }
  }
};
tryPrismaConnect();

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`⚠️ Received ${signal} - shutting down`);
  try {
    if (prisma) {
      await prisma.$disconnect();
      console.log('Prisma disconnected');
    }
  } catch(e) {
    console.warn('Error disconnecting prisma', e.message || e);
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
