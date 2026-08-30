import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;

// ─── Start Local Development Server ──────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 BragTheBag API Server running on http://localhost:${PORT}`);
  console.log(`  📦 Cashfree Environment: ${process.env.CASHFREE_ENVIRONMENT || 'sandbox'}`);
  console.log(`  🔑 App ID configured: ${process.env.CASHFREE_APP_ID ? 'Yes' : '⚠️  No — set CASHFREE_APP_ID in .env'}`);
  console.log(`  🔒 Secret Key configured: ${process.env.CASHFREE_SECRET_KEY ? 'Yes' : '⚠️  No — set CASHFREE_SECRET_KEY in .env'}\n`);
});
