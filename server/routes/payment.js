import { Router } from 'express';
import crypto from 'crypto';
import { calculateItemPrice } from '../data/products.js';

const router = Router();

// In-memory order store (no database in this project)
// Maps our order_id -> { cf_order_id, amount, customer, items, status }
const orders = new Map();

// ─── Helpers ──────────────────────────────────────────────────────────
function getCashfreeBaseUrl() {
  const env = process.env.CASHFREE_ENVIRONMENT || 'sandbox';
  return env === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';
}

function getCashfreeHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-api-version': '2025-01-01',
    'x-client-id': process.env.CASHFREE_APP_ID,
    'x-client-secret': process.env.CASHFREE_SECRET_KEY,
  };
}

function generateOrderId() {
  const ts = Date.now().toString(36);
  const rand = crypto.randomBytes(4).toString('hex');
  return `BTB-${ts}-${rand}`;
}

// ─── POST /api/payment/cashfree/create-order ──────────────────────────
router.post('/create-order', async (req, res) => {
  try {
    const { items, customer } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }
    if (!customer || !customer.phone || !customer.email || !customer.name) {
      return res.status(400).json({ error: 'Customer details (name, email, phone) are required' });
    }

    // Server-side amount calculation — NEVER trust the frontend amount
    let subtotal = 0;
    let totalQuantity = 0;
    const validatedItems = [];

    for (const item of items) {
      const unitPrice = calculateItemPrice(item);
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      const lineTotal = unitPrice * qty;

      subtotal += lineTotal;
      totalQuantity += qty;

      validatedItems.push({
        id: item.id || 'custom',
        name: item.name || 'Custom Bag',
        unitPrice,
        quantity: qty,
        lineTotal,
        customization: item.customization || null,
      });
    }

    // Ensure subtotal is valid and greater than 0
    if (subtotal <= 0) {
      return res.status(400).json({
        error: 'Invalid order amount: calculated subtotal must be greater than ₹0',
      });
    }

    const discount = 0; // No discount coupons currently configured
    const shipping = subtotal > 2999 ? 0 : 149; // Free shipping over ₹2,999, else ₹149
    const tax = 0; // Taxes are inclusive in the product prices
    const finalOrderTotal = subtotal - discount + shipping + tax;
    const cashfreeOrderAmount = Number(finalOrderTotal.toFixed(2));

    // Structured development logging as requested
    console.log('\n========================================');
    console.log('   🧾 BRAGTHEBAG CHECKOUT VALIDATION   ');
    console.log('========================================');
    console.log('Cart items:        ', JSON.stringify(validatedItems, null, 2));
    console.log('Total Quantity:    ', totalQuantity);
    console.log('Subtotal:          ', `₹${subtotal}`);
    console.log('Discount:          ', `₹${discount}`);
    console.log('Shipping:          ', `₹${shipping}`);
    console.log('Tax:               ', `₹${tax}`);
    console.log('Final order total: ', `₹${finalOrderTotal}`);
    console.log('Cashfree order_amount: ', cashfreeOrderAmount);
    console.log('========================================\n');

    const orderId = generateOrderId();
    const returnUrl = `${
      req.headers.origin ||
      req.headers.referer?.replace(/\/checkout.*$/, '') ||
      'http://localhost:5174'
    }/checkout?order_id=${orderId}`;

    // Create order on Cashfree Sandbox
    const cfPayload = {
      order_id: orderId,
      order_amount: cashfreeOrderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: String(customer.name).trim(),
        customer_email: String(customer.email).trim(),
        customer_phone: String(customer.phone).replace(/\D/g, '').slice(-10),
      },
      order_meta: {
        return_url: returnUrl,
      },
    };

    const cfResponse = await fetch(`${getCashfreeBaseUrl()}/orders`, {
      method: 'POST',
      headers: getCashfreeHeaders(),
      body: JSON.stringify(cfPayload),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error('Cashfree create order error:', cfData);
      return res.status(cfResponse.status).json({
        error: cfData.message || 'Failed to create payment order with Cashfree',
        details: cfData,
      });
    }

    // Store order locally
    orders.set(orderId, {
      cf_order_id: cfData.cf_order_id,
      order_id: orderId,
      amount: cashfreeOrderAmount,
      subtotal,
      shipping,
      discount,
      tax,
      customer,
      items: validatedItems,
      status: 'PENDING',
      created_at: new Date().toISOString(),
    });

    // Return ONLY the safe details — never the secret key
    return res.json({
      payment_session_id: cfData.payment_session_id,
      order_id: orderId,
      cf_order_id: cfData.cf_order_id,
      order_amount: cashfreeOrderAmount,
    });
  } catch (err) {
    console.error('Create order error:', err);
    return res.status(500).json({ error: 'Internal server error while creating order' });
  }
});

// ─── POST /api/payment/cashfree/verify ────────────────────────────────
router.post('/verify', async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      return res.status(400).json({ error: 'order_id is required' });
    }

    // Query Cashfree for the authoritative order status
    const cfResponse = await fetch(`${getCashfreeBaseUrl()}/orders/${order_id}`, {
      method: 'GET',
      headers: getCashfreeHeaders(),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error('Cashfree verify error:', cfData);
      return res.status(cfResponse.status).json({
        error: cfData.message || 'Failed to verify payment with Cashfree',
      });
    }

    // Map Cashfree order_status to our internal status
    // Cashfree statuses: ACTIVE, PAID, EXPIRED, CANCELLED, VOID
    let paymentStatus;
    switch (cfData.order_status) {
      case 'PAID':
        paymentStatus = 'PAID';
        break;
      case 'ACTIVE':
        paymentStatus = 'PENDING';
        break;
      case 'EXPIRED':
      case 'CANCELLED':
      case 'VOID':
        paymentStatus = cfData.order_status === 'CANCELLED' ? 'CANCELLED' : 'FAILED';
        break;
      default:
        paymentStatus = 'PENDING';
    }

    // Update local order store
    const localOrder = orders.get(order_id);
    if (localOrder) {
      localOrder.status = paymentStatus;
      localOrder.cf_order_status = cfData.order_status;
      localOrder.payment_verified_at = new Date().toISOString();
    }

    return res.json({
      order_id,
      status: paymentStatus,
      order_amount: cfData.order_amount,
      cf_order_id: cfData.cf_order_id,
      payment_method: cfData.payment_method || null,
    });
  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: 'Internal server error while verifying payment' });
  }
});

// ─── POST /api/payment/cashfree/webhook ───────────────────────────────
// Cashfree sends webhook notifications for payment events.
// In local development, webhooks cannot be received without a tunnel like ngrok.
// When deployed, configure the webhook URL in Cashfree Dashboard:
//   https://yourdomain.com/api/payment/cashfree/webhook
//
// IMPORTANT: Always verify the webhook signature before trusting the data.
router.post('/webhook', (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    const rawBody = JSON.stringify(req.body);

    if (!signature || !timestamp) {
      console.warn('Webhook received without signature headers');
      return res.status(401).json({ error: 'Missing signature headers' });
    }

    // Verify webhook signature
    // Cashfree signs: timestamp + rawBody with your secret key
    const expectedSignature = crypto
      .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
      .update(timestamp + rawBody)
      .digest('base64');

    if (signature !== expectedSignature) {
      console.warn('Webhook signature verification failed');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Process the verified webhook
    const { data } = req.body;
    if (data && data.order && data.order.order_id) {
      const orderId = data.order.order_id;
      const localOrder = orders.get(orderId);
      if (localOrder) {
        const cfStatus = data.order.order_status;
        localOrder.status =
          cfStatus === 'PAID' ? 'PAID' : cfStatus === 'CANCELLED' ? 'CANCELLED' : 'FAILED';
        localOrder.webhook_received_at = new Date().toISOString();
        console.log(`Webhook: Order ${orderId} status updated to ${localOrder.status}`);
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
