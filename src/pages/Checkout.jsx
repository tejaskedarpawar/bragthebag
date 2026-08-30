import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, Phone, XCircle, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const subtotal = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 2999 ? 0 : 149;
  const total = subtotal + shipping;

  const [form, setForm] = useState(() => {
    try {
      const savedForm = sessionStorage.getItem('btb_checkout_form');
      if (savedForm) return JSON.parse(savedForm);
    } catch {
      // ignore JSON parse errors
    }
    return {
      firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
    };
  });
  const [otpState, setOtpState] = useState('idle'); // idle | loading | sent | verifying | verified
  const [otpValue, setOtpValue] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errors, setErrors] = useState({});

  // Payment states
  const [paymentState, setPaymentState] = useState('idle');
  // idle | creating | processing | verifying | success | failed | cancelled | pending
  const [paymentError, setPaymentError] = useState('');
  const [orderResult, setOrderResult] = useState(null);

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function sendOtp() {
    if (!form.phone || form.phone.length < 10) {
      setErrors((e) => ({ ...e, phone: 'Enter a valid 10-digit phone number' }));
      return;
    }
    setShowOtpInput(true);
    setOtpState('loading');
    setTimeout(() => {
      setOtpState('sent');
      setOtpValue('123456');
    }, 1500);
  }

  function verifyOtp() {
    setOtpState('verifying');
    setTimeout(() => setOtpState('verified'), 2000);
  }

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.phone.length < 10) e.phone = 'Enter valid phone';
    if (otpState !== 'verified') e.otp = 'Please verify your phone number';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (form.pincode.length < 6) e.pincode = 'Enter valid pincode';
    return e;
  }

  // ─── Verify payment on return from Cashfree ───────────────────────
  useEffect(() => {
    const returnOrderId = searchParams.get('order_id');
    if (returnOrderId && paymentState === 'idle') {
      verifyPayment(returnOrderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function verifyPayment(orderId) {
    setPaymentState('verifying');
    try {
      const res = await fetch('/api/payment/cashfree/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPaymentState('failed');
        setPaymentError(data.error || 'Payment verification failed');
        return;
      }

      setOrderResult({
        orderId,
        amount: data.order_amount,
        status: data.status,
        cf_order_id: data.cf_order_id,
      });

      switch (data.status) {
        case 'PAID':
          setPaymentState('success');
          clearCart();
          break;
        case 'CANCELLED':
          setPaymentState('cancelled');
          break;
        case 'PENDING':
          setPaymentState('pending');
          break;
        default:
          setPaymentState('failed');
          setPaymentError('Payment was not completed');
      }
    } catch (err) {
      console.error('Verify error:', err);
      setPaymentState('failed');
      setPaymentError('Unable to verify payment. Please contact support.');
    }
  }

  // ─── Handle Pay Now ───────────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    if (paymentState === 'creating' || paymentState === 'processing' || paymentState === 'verifying') {
      return; // Prevent duplicate order creation on rapid clicks
    }
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setPaymentState('creating');
    setPaymentError('');

    try {
      // Step 1: Create order on backend
      const createRes = await fetch('/api/payment/cashfree/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity || 1,
            customization: i.customization || null,
          })),
          customer: {
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            phone: form.phone,
          },
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        setPaymentState('failed');
        setPaymentError(createData.error || 'Failed to create payment order');
        return;
      }

      // Step 2: Save form data to sessionStorage so we can display it after redirect
      sessionStorage.setItem('btb_checkout_form', JSON.stringify(form));
      sessionStorage.setItem('btb_checkout_order_id', createData.order_id);

      // Step 3: Initialize Cashfree SDK and redirect to hosted checkout
      setPaymentState('processing');

      if (typeof window.Cashfree !== 'function' && typeof window.Cashfree !== 'object') {
        setPaymentState('failed');
        setPaymentError('Cashfree SDK is not available. Please check your internet connection or disable ad-blockers and reload the page.');
        return;
      }

      const cashfreeMode = import.meta.env.VITE_CASHFREE_MODE || 'sandbox';
      const cashfree = window.Cashfree({ mode: cashfreeMode });

      if (!cashfree || typeof cashfree.checkout !== 'function') {
        setPaymentState('failed');
        setPaymentError('Failed to initialize Cashfree checkout. Please try again.');
        return;
      }

      // Using '_self' redirect mode — Cashfree redirects to their hosted page,
      // then back to our return_url with order_id. This is more reliable than
      // '_modal' which can fail in sandbox due to iframe restrictions.
      cashfree.checkout({
        paymentSessionId: createData.payment_session_id,
        redirectTarget: '_self',
      });

      // The page will redirect — code below this won't execute

    } catch (err) {
      console.error('Payment error:', err);
      setPaymentState('failed');
      setPaymentError(err.message || 'An unexpected error occurred. Please try again.');
    }
  }

  // ─── Payment Result Screens ───────────────────────────────────────

  // SUCCESS
  if (paymentState === 'success') {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h1 className="font-serif text-4xl text-charcoal mb-4">Payment Successful!</h1>
        <p className="text-charcoal/60 mb-6">
          Thank you, {form.firstName || 'Customer'}! Your handcrafted bag is now in the queue.
        </p>
        {orderResult && (
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 text-left mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/60">Order ID</span>
              <span className="font-mono font-medium text-charcoal">{orderResult.orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/60">Amount Paid</span>
              <span className="font-serif font-semibold text-forest">₹{orderResult.amount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal/60">Payment Status</span>
              <span className="inline-flex items-center gap-1 text-green-700 font-semibold">
                <ShieldCheck size={14} /> Verified & Paid
              </span>
            </div>
            {form.email && (
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/60">Confirmation sent to</span>
                <span className="font-medium text-charcoal">{form.email}</span>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => navigate('/')}
          className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors"
        >
          Back to Home
        </button>
      </main>
    );
  }

  // FAILED
  if (paymentState === 'failed') {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={48} className="text-red-500" />
        </div>
        <h1 className="font-serif text-4xl text-charcoal mb-4">Payment Failed</h1>
        <p className="text-charcoal/60 mb-8">
          {paymentError || 'Payment failed. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setPaymentState('idle'); setPaymentError(''); }}
            className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="border border-charcoal/20 text-charcoal font-semibold px-8 py-4 rounded-full hover:bg-charcoal/5 transition-colors"
          >
            Back to Cart
          </button>
        </div>
      </main>
    );
  }

  // CANCELLED
  if (paymentState === 'cancelled') {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="bg-amber-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={48} className="text-amber-500" />
        </div>
        <h1 className="font-serif text-4xl text-charcoal mb-4">Payment Cancelled</h1>
        <p className="text-charcoal/60 mb-8">
          Payment was cancelled. Your cart items are still saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => { setPaymentState('idle'); setPaymentError(''); }}
            className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="border border-charcoal/20 text-charcoal font-semibold px-8 py-4 rounded-full hover:bg-charcoal/5 transition-colors"
          >
            Back to Cart
          </button>
        </div>
      </main>
    );
  }

  // PENDING
  if (paymentState === 'pending') {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={48} className="text-blue-500" />
        </div>
        <h1 className="font-serif text-4xl text-charcoal mb-4">Payment Pending</h1>
        <p className="text-charcoal/60 mb-4">
          Payment is pending. We are verifying your payment.
        </p>
        {orderResult && (
          <p className="text-sm text-charcoal/40 mb-8 font-mono">Order ID: {orderResult.orderId}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => orderResult && verifyPayment(orderResult.orderId)}
            className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors inline-flex items-center gap-2"
          >
            <Loader2 size={16} className={paymentState === 'verifying' ? 'animate-spin' : ''} />
            Check Status
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-charcoal/20 text-charcoal font-semibold px-8 py-4 rounded-full hover:bg-charcoal/5 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  // VERIFYING (spinner screen while checking with Cashfree)
  if (paymentState === 'verifying') {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <Loader2 size={48} className="mx-auto text-forest mb-6 animate-spin" />
        <h1 className="font-serif text-3xl text-charcoal mb-4">Verifying Payment…</h1>
        <p className="text-charcoal/60">Please wait while we confirm your payment with Cashfree.</p>
      </main>
    );
  }

  // ─── Main Checkout Form ───────────────────────────────────────────
  const isPaymentInProgress = paymentState === 'creating' || paymentState === 'processing';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl text-charcoal mb-12">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">

          {/* Contact */}
          <section className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <h2 className="font-serif text-xl text-charcoal mb-5">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" error={errors.firstName}>
                <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inp(errors.firstName)} placeholder="Riya" disabled={isPaymentInProgress} />
              </Field>
              <Field label="Last Name" error={errors.lastName}>
                <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inp(errors.lastName)} placeholder="Sharma" disabled={isPaymentInProgress} />
              </Field>
              <Field label="Email" error={errors.email} className="sm:col-span-2">
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inp(errors.email)} placeholder="riya@example.com" disabled={isPaymentInProgress} />
              </Field>
            </div>

            {/* Phone + OTP */}
            <div className="mt-4">
              <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal/60 mb-1.5">
                Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                  className={`${inp(errors.phone)} flex-1`}
                  placeholder="98765 43210"
                  disabled={isPaymentInProgress}
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpState === 'verified' || isPaymentInProgress}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                    otpState === 'verified'
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-forest text-cream hover:bg-charcoal'
                  }`}
                >
                  {otpState === 'verified' ? '✓ Verified' : 'Send OTP'}
                </button>
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}

              {/* OTP Input */}
              {showOtpInput && otpState !== 'verified' && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      className={`${inp()} flex-1`}
                      placeholder={otpState === 'loading' ? 'Sending OTP…' : 'Enter 6-digit OTP (e.g. 123456)'}
                      disabled={otpState === 'loading' || isPaymentInProgress}
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={otpValue.length < 4 || otpState === 'verifying' || isPaymentInProgress}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase bg-blush text-white hover:bg-blush/90 disabled:opacity-50 transition-all flex items-center gap-1.5"
                    >
                      {otpState === 'verifying' ? <Loader2 size={14} className="animate-spin" /> : <Phone size={14} />}
                      Verify
                    </button>
                  </div>
                  {otpState === 'sent' && (
                    <div className="flex items-center justify-between bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-2 rounded-xl">
                      <span>📲 <strong>Demo Mode:</strong> Your OTP is <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold text-amber-900">123456</code> (or any 4-6 digit code)</span>
                      <button
                        type="button"
                        onClick={() => setOtpValue('123456')}
                        className="text-forest font-semibold hover:underline ml-2 underline"
                      >
                        Auto-fill
                      </button>
                    </div>
                  )}
                </div>
              )}
              {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
            </div>
          </section>

          {/* Shipping Address */}
          <section className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
            <h2 className="font-serif text-xl text-charcoal mb-5">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Street Address" error={errors.address} className="sm:col-span-2">
                <input value={form.address} onChange={(e) => update('address', e.target.value)} className={inp(errors.address)} placeholder="123, Gandhi Nagar" disabled={isPaymentInProgress} />
              </Field>
              <Field label="City" error={errors.city}>
                <input value={form.city} onChange={(e) => update('city', e.target.value)} className={inp(errors.city)} placeholder="Nagpur" disabled={isPaymentInProgress} />
              </Field>
              <Field label="State" error={errors.state}>
                <input value={form.state} onChange={(e) => update('state', e.target.value)} className={inp(errors.state)} placeholder="Maharashtra" disabled={isPaymentInProgress} />
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input type="tel" maxLength={6} value={form.pincode} onChange={(e) => update('pincode', e.target.value.replace(/\D/g, ''))} className={inp(errors.pincode)} placeholder="440001" disabled={isPaymentInProgress} />
              </Field>
            </div>
          </section>

          {/* Payment Error Banner */}
          {paymentError && paymentState === 'idle' && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <XCircle size={16} />
              {paymentError}
            </div>
          )}

          {/* Pay Now Button */}
          <button
            type="submit"
            disabled={isPaymentInProgress || items.length === 0}
            className="w-full bg-forest text-cream font-semibold py-4 rounded-full hover:bg-charcoal transition-colors text-sm tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPaymentInProgress ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {paymentState === 'creating' ? 'Creating Order…' : 'Processing Payment…'}
              </>
            ) : (
              `Pay Now — ₹${total.toLocaleString('en-IN')}`
            )}
          </button>

          {/* Sandbox notice */}
          <p className="text-center text-xs text-charcoal/40 -mt-4">
            🔒 Payments are processed securely via Cashfree (Sandbox/Test Mode)
          </p>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-xl p-6">
          <h2 className="font-serif text-2xl text-charcoal mb-5">Order Summary</h2>
          <div className="space-y-3 mb-5 max-h-56 overflow-y-auto scrollbar-hide">
            {items.map((item) => (
              <div key={item.cartId} className="flex gap-3 items-start">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-sm text-charcoal truncate">{item.name}</p>
                  <p className="text-xs text-charcoal/50">Qty: {item.quantity || 1}</p>
                  <p className="text-sm font-serif text-forest">₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-black/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-charcoal/60">Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between"><span className="text-charcoal/60">Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span></div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t border-black/10">
              <span>Total</span>
              <span className="font-serif text-2xl text-forest">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, error, className = '', children }) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal/60 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function inp(error = '') {
  return `w-full border ${error ? 'border-red-400' : 'border-black/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors bg-[#FAFAF5] disabled:opacity-60 disabled:cursor-not-allowed`;
}
