import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Phone } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 2999 ? 0 : 149;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  });
  const [otpState, setOtpState] = useState('idle'); // idle | loading | verified
  const [otpValue, setOtpValue] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

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
    setTimeout(() => setOtpState('sent'), 1500);
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

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="font-serif text-4xl text-charcoal mb-4">Order Placed!</h1>
        <p className="text-charcoal/60 mb-8">
          Thank you, {form.firstName}! Your handcrafted bag is now in the queue. We'll send updates to <strong>{form.email}</strong>.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors"
        >
          Back to Home
        </button>
      </main>
    );
  }

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
                <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inp(errors.firstName)} placeholder="Riya" />
              </Field>
              <Field label="Last Name" error={errors.lastName}>
                <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inp(errors.lastName)} placeholder="Sharma" />
              </Field>
              <Field label="Email" error={errors.email} className="sm:col-span-2">
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inp(errors.email)} placeholder="riya@example.com" />
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
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpState === 'verified'}
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
                <div className="mt-3 flex gap-2 items-center">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                    className={`${inp()} flex-1`}
                    placeholder={otpState === 'loading' ? 'Sending OTP…' : 'Enter 6-digit OTP'}
                    disabled={otpState === 'loading'}
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={otpValue.length < 4 || otpState === 'verifying'}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase bg-blush text-white hover:bg-blush/90 disabled:opacity-50 transition-all flex items-center gap-1.5"
                  >
                    {otpState === 'verifying' ? <Loader2 size={14} className="animate-spin" /> : <Phone size={14} />}
                    Verify
                  </button>
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
                <input value={form.address} onChange={(e) => update('address', e.target.value)} className={inp(errors.address)} placeholder="123, Gandhi Nagar" />
              </Field>
              <Field label="City" error={errors.city}>
                <input value={form.city} onChange={(e) => update('city', e.target.value)} className={inp(errors.city)} placeholder="Nagpur" />
              </Field>
              <Field label="State" error={errors.state}>
                <input value={form.state} onChange={(e) => update('state', e.target.value)} className={inp(errors.state)} placeholder="Maharashtra" />
              </Field>
              <Field label="Pincode" error={errors.pincode}>
                <input type="tel" maxLength={6} value={form.pincode} onChange={(e) => update('pincode', e.target.value.replace(/\D/g, ''))} className={inp(errors.pincode)} placeholder="440001" />
              </Field>
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-forest text-cream font-semibold py-4 rounded-full hover:bg-charcoal transition-colors text-sm tracking-widest uppercase"
          >
            Place Order — ₹{total.toLocaleString('en-IN')}
          </button>
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
  return `w-full border ${error ? 'border-red-400' : 'border-black/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors bg-[#FAFAF5]`;
}
