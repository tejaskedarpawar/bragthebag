import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.js';

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────
// Mount routes for both '/api/payment/cashfree' (local dev & full path)
// and '/payment/cashfree' (in case Vercel rewrites strip the /api prefix)
app.use('/api/payment/cashfree', paymentRoutes);
app.use('/payment/cashfree', paymentRoutes);

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.CASHFREE_ENVIRONMENT || 'sandbox',
    appIdConfigured: Boolean(process.env.CASHFREE_APP_ID),
    secretKeyConfigured: Boolean(process.env.CASHFREE_SECRET_KEY),
    timestamp: new Date().toISOString(),
  });
});

export default app;
