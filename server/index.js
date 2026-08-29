import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/payment.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────
app.use('/api/payment/cashfree', paymentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.CASHFREE_ENVIRONMENT || 'sandbox',
    timestamp: new Date().toISOString(),
  });
});

// ─── Start ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 BragTheBag API Server running on http://localhost:${PORT}`);
  console.log(`  📦 Cashfree Environment: ${process.env.CASHFREE_ENVIRONMENT || 'sandbox'}`);
  console.log(`  🔑 App ID configured: ${process.env.CASHFREE_APP_ID ? 'Yes' : '⚠️  No — set CASHFREE_APP_ID in .env'}`);
  console.log(`  🔒 Secret Key configured: ${process.env.CASHFREE_SECRET_KEY ? 'Yes' : '⚠️  No — set CASHFREE_SECRET_KEY in .env'}\n`);
});
