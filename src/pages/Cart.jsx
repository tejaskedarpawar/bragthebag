import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const subtotal = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal > 2999 ? 0 : 149;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-32 text-center">
        <ShoppingBag size={56} className="mx-auto text-charcoal/20 mb-6" strokeWidth={1} />
        <h1 className="font-serif text-4xl text-charcoal mb-4">Your cart is empty</h1>
        <p className="text-charcoal/50 mb-8">Looks like you haven't added anything yet. Let's fix that.</p>
        <Link
          to="/collections"
          className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors inline-flex items-center gap-2"
        >
          Browse Collections <ArrowRight size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl text-charcoal mb-12">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.cartId}
              className="bg-white rounded-2xl p-5 flex gap-5 items-start border border-black/5 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg text-charcoal">{item.name}</h3>
                {item.customization && (
                  <div className="mt-1 text-xs text-charcoal/50 space-y-0.5">
                    <p>Thread: {item.customization.threadColor}</p>
                    <p>Pattern: {item.customization.pattern}</p>
                    {item.customization.text && <p>Monogram: "{item.customization.text}"</p>}
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 border border-black/10 rounded-full px-1">
                    <button
                      onClick={() => updateQuantity(item.cartId, (item.quantity || 1) - 1)}
                      className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest text-lg"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, (item.quantity || 1) + 1)}
                      className="w-7 h-7 flex items-center justify-center text-charcoal hover:text-forest text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-xl text-forest">
                      ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-charcoal/30 hover:text-blush transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-black/10 shadow-xl p-6">
          <h2 className="font-serif text-2xl text-charcoal mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-charcoal/60">Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Shipping</span>
              <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-charcoal/40">Free shipping on orders above ₹2,999</p>
            )}
          </div>
          <div className="border-t border-black/10 pt-4 mb-6 flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-serif text-3xl text-forest">₹{total.toLocaleString('en-IN')}</span>
          </div>
          <Link
            to="/checkout"
            className="w-full bg-forest text-cream font-semibold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-charcoal transition-colors"
          >
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          <Link
            to="/collections"
            className="w-full mt-3 text-center text-sm text-charcoal/50 hover:text-forest transition-colors block py-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
