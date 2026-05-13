import { useState } from 'react';
import { CheckCircle2, Send, Package } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', description: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (form.phone.length < 10) errs.phone = 'Enter a valid 10-digit phone number';
    if (!form.email.includes('@')) errs.email = 'Enter a valid email address';
    if (form.description.trim().length < 20) errs.description = 'Please describe your requirement in detail (min 20 chars)';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="max-w-xl mx-auto px-4 py-32 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="font-serif text-4xl text-charcoal mb-4">We Got Your Inquiry!</h1>
        <p className="text-charcoal/60 mb-4">
          Thanks, <strong>{form.name}</strong>! Our bulk orders team will reach out to you at <strong>{form.email}</strong> within 24 hours.
        </p>
        <p className="text-charcoal/40 text-sm">We typically handle bulk orders for corporations, weddings, and gifting campaigns.</p>
      </main>
    );
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#EDE8DC] to-cream py-20 px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blush mb-3">Corporate & Gifting</p>
        <h1 className="font-serif text-5xl text-charcoal mb-4">Bulk Orders & Custom Campaigns</h1>
        <p className="text-charcoal/60 max-w-lg mx-auto">
          Planning a corporate gift, wedding favour, or brand merchandise? We handle orders of any scale with full customization.
        </p>
      </section>

      {/* Why Bulk */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Package size={24} />, title: 'Minimum Order: 10 Pieces', desc: 'We accept bulk orders starting from 10 units with dedicated account management.' },
          { icon: <CheckCircle2 size={24} />, title: 'Full Customization', desc: 'Your logo, your colors, your message — embossed, printed, or stitched.' },
          { icon: <Send size={24} />, title: 'PAN India Delivery', desc: 'We deliver anywhere in India. Overseas shipping available on request.' },
        ].map((f) => (
          <div key={f.title} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm flex gap-4">
            <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0 text-forest">
              {f.icon}
            </div>
            <div>
              <h3 className="font-semibold text-charcoal mb-1">{f.title}</h3>
              <p className="text-sm text-charcoal/60">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <div className="bg-white rounded-2xl shadow-xl border border-black/5 p-8">
          <h2 className="font-serif text-3xl text-charcoal mb-8">Send Your Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={lbl}>Full Name</label>
                <input value={form.name} onChange={(e) => update('name', e.target.value)} className={inp(errors.name)} placeholder="Riya Sharma" />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={lbl}>Phone Number</label>
                <input type="tel" maxLength={10} value={form.phone} onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))} className={inp(errors.phone)} placeholder="98765 43210" />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label className={lbl}>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inp(errors.email)} placeholder="riya@company.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className={lbl}>Describe Your Requirement</label>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                className={`${inp(errors.description)} resize-none`}
                placeholder="E.g., 50 custom tote bags with our company logo for a corporate event on Aug 15. Budget: ₹1,500/bag. Colors: Navy Blue and Gold."
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-forest text-cream font-semibold py-4 rounded-full hover:bg-charcoal transition-colors text-sm tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <Send size={16} /> Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

const lbl = 'block text-xs font-semibold tracking-wider uppercase text-charcoal/60 mb-1.5';
const inp = (err = '') =>
  `w-full border ${err ? 'border-red-400' : 'border-black/15'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest transition-colors bg-[#FAFAF5]`;
