import { useState } from 'react';
import { PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';

const CATEGORIES = ['All', 'tote', 'office', 'pouch', 'crossbody', 'wallet', 'satchel'];

export default function Collections() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blush mb-2">Explore</p>
        <h1 className="font-serif text-5xl text-charcoal mb-4">Our Collections</h1>
        <p className="text-charcoal/50 max-w-md mx-auto">
          Each piece is handcrafted to order. Browse our catalog and make it yours.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all ${
              active === cat
                ? 'bg-forest text-cream shadow-md'
                : 'bg-white text-charcoal border border-black/10 hover:border-forest hover:text-forest'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-charcoal/40 font-serif text-2xl">
          No products in this category yet.
        </div>
      )}
    </main>
  );
}
