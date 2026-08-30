import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, ShoppingBag, Info } from 'lucide-react';
import { BASE_BAGS, THREAD_COLORS, PATTERNS } from '../data/mockData';
import { useCartStore } from '../store/useCartStore';

const MONOGRAM_PRICE = 499;

export default function BragYourOwn() {
  const [params] = useSearchParams();
  const defaultBase = params.get('base');

  const [base, setBase] = useState(
    BASE_BAGS.find((b) => b.name === defaultBase) || BASE_BAGS[0]
  );
  const [threadColor, setThreadColor] = useState(THREAD_COLORS[0]);
  const [pattern, setPattern] = useState(PATTERNS[0]);
  const [customText, setCustomText] = useState('');
  const [addedMsg, setAddedMsg] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const total =
    base.basePrice +
    threadColor.price +
    pattern.price +
    (customText.trim() ? MONOGRAM_PRICE : 0);

  function handleAddToCart() {
    addItem({
      id: `custom-${Date.now()}`,
      name: `Custom ${base.name}`,
      quantity: 1,
      price: total,
      customization: {
        base: base.name,
        threadColor: threadColor.name,
        pattern: pattern.name,
        text: customText.trim(),
      },
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blush mb-2">The Studio</p>
        <h1 className="font-serif text-5xl text-charcoal mb-4">Brag Your Own</h1>
        <p className="text-charcoal/50 max-w-md mx-auto">
          Design your dream bag from scratch. Every choice is yours — every stitch crafted by our artisans in Nagpur.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10 items-start">
        {/* Left: Options — 3/5 */}
        <div className="lg:col-span-3 space-y-10">

          {/* Step 1: Base */}
          <fieldset>
            <legend className="text-xs font-bold tracking-[0.25em] uppercase text-forest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-cream text-xs flex items-center justify-center">1</span>
              Select Base
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BASE_BAGS.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBase(b)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    base.name === b.name
                      ? 'border-forest bg-forest/5 shadow-md'
                      : 'border-black/10 bg-white hover:border-forest/40'
                  }`}
                >
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <div className="font-serif text-base text-charcoal">{b.name}</div>
                  <div className="text-sm text-charcoal/50">from ₹{b.basePrice.toLocaleString('en-IN')}</div>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Step 2: Thread Color */}
          <fieldset>
            <legend className="text-xs font-bold tracking-[0.25em] uppercase text-forest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-cream text-xs flex items-center justify-center">2</span>
              Thread Color
              {threadColor.price > 0 && (
                <span className="ml-auto text-xs font-normal text-blush normal-case tracking-normal">
                  +₹{threadColor.price}
                </span>
              )}
            </legend>
            <div className="flex flex-wrap gap-3">
              {THREAD_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setThreadColor(c)}
                  title={c.name}
                  className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 flex items-center justify-center ${
                    threadColor.name === c.name ? 'border-forest scale-110 shadow-lg' : 'border-transparent shadow-sm'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {threadColor.name === c.name && (
                    <Check
                      size={14}
                      className={c.hex === '#F5F5DC' || c.hex === '#FFFFF0' ? 'text-charcoal' : 'text-white'}
                    />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-charcoal/40 mt-2">Selected: {threadColor.name}</p>
          </fieldset>

          {/* Step 3: Pattern */}
          <fieldset>
            <legend className="text-xs font-bold tracking-[0.25em] uppercase text-forest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-cream text-xs flex items-center justify-center">3</span>
              Artwork / Pattern
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PATTERNS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setPattern(p)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    pattern.name === p.name
                      ? 'border-forest bg-forest/5 shadow-md'
                      : 'border-black/10 bg-white hover:border-forest/40'
                  }`}
                >
                  <div className="text-xl mb-1">{p.icon}</div>
                  <div className="font-medium text-sm text-charcoal">{p.name}</div>
                  <div className="text-xs text-charcoal/50">
                    {p.price === 0 ? 'Included' : `+₹${p.price}`}
                  </div>
                </button>
              ))}
            </div>
          </fieldset>

          {/* Step 4: Text / Emoji */}
          <fieldset>
            <legend className="text-xs font-bold tracking-[0.25em] uppercase text-forest mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-cream text-xs flex items-center justify-center">4</span>
              Add Monogram / Text
            </legend>
            <input
              type="text"
              maxLength={16}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder='E.g., "M.S." or a favourite emoji ❤️'
              className="w-full border-b-2 border-black/20 bg-transparent py-3 text-xl font-serif text-charcoal focus:outline-none focus:border-forest transition-colors placeholder:text-charcoal/30"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-charcoal/40 flex items-center gap-1">
                <Info size={11} /> Adds ₹{MONOGRAM_PRICE} monogramming fee
              </p>
              <p className="text-xs text-charcoal/40">{customText.length}/16</p>
            </div>
          </fieldset>
        </div>

        {/* Right: Live Summary — 2/5 */}
        <div className="lg:col-span-2 sticky top-24">
          <div className="bg-white rounded-2xl border border-black/10 shadow-xl overflow-hidden">
            {/* Preview visual */}
            <div
              className="h-56 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: threadColor.hex }}
            >
              {pattern.name !== 'None' && (
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 pointer-events-none">
                  {pattern.icon}
                </div>
              )}
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-2">{base.icon}</div>
                <p className={`font-serif text-xl font-bold ${threadColor.hex === '#F5F5DC' || threadColor.hex === '#FFFFF0' ? 'text-charcoal' : 'text-white'}`}>
                  {base.name}
                </p>
                {customText && (
                  <p className={`font-serif italic mt-1 text-lg ${threadColor.hex === '#F5F5DC' || threadColor.hex === '#FFFFF0' ? 'text-charcoal/70' : 'text-white/80'}`}>
                    "{customText}"
                  </p>
                )}
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-6">
              <h3 className="font-serif text-xl text-charcoal mb-4">Your Configuration</h3>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex justify-between">
                  <span className="text-charcoal/60">Base — {base.name}</span>
                  <span className="font-medium">₹{base.basePrice.toLocaleString('en-IN')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-charcoal/60">Thread — {threadColor.name}</span>
                  <span className="font-medium">{threadColor.price > 0 ? `+₹${threadColor.price}` : 'Included'}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-charcoal/60">Pattern — {pattern.name}</span>
                  <span className="font-medium">{pattern.price > 0 ? `+₹${pattern.price}` : 'Included'}</span>
                </li>
                {customText.trim() && (
                  <li className="flex justify-between">
                    <span className="text-charcoal/60">Monogram "{customText}"</span>
                    <span className="font-medium">+₹{MONOGRAM_PRICE}</span>
                  </li>
                )}
              </ul>

              <div className="border-t border-black/10 pt-4 mb-6 flex justify-between items-center">
                <span className="font-semibold text-charcoal">Total</span>
                <span className="font-serif text-3xl text-forest">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all ${
                  addedMsg
                    ? 'bg-green-600 text-white'
                    : 'bg-forest text-cream hover:bg-charcoal'
                }`}
              >
                {addedMsg ? (
                  <>
                    <Check size={16} /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Cart
                  </>
                )}
              </button>
              <p className="text-center text-xs text-charcoal/40 mt-3">
                Crafted to order · Ships in 7–10 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
