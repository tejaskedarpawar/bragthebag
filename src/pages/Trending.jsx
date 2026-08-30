import { PRODUCTS, TRENDING_IDS } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';
import { TrendingUp } from 'lucide-react';

const trending = PRODUCTS.filter((p) => TRENDING_IDS.includes(p.id));
const others = PRODUCTS.filter((p) => !TRENDING_IDS.includes(p.id));

export default function Trending() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-blush mb-2">
          <TrendingUp size={14} /> What's Hot Right Now
        </span>
        <h1 className="font-serif text-5xl text-charcoal mt-2 mb-4">Trending Bags</h1>
        <p className="text-charcoal/50 max-w-md mx-auto">
          Our most loved pieces, ordered again and again by customers across India.
        </p>
      </div>

      {/* Hero Trending Grid — top picks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {trending.map((p) => (
          <div key={p.id} className="relative">
            <div className="absolute -top-3 left-4 z-10 bg-blush text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
              🔥 Top Pick
            </div>
            <ProductCard product={{ ...p, badge: p.badge || 'Bestseller' }} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex-1 h-px bg-charcoal/10" />
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-charcoal/40">Also Loved By Our Customers</p>
        <div className="flex-1 h-px bg-charcoal/10" />
      </div>

      {/* Rest of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {others.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
