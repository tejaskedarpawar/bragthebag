import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const badgeColor = {
    Bestseller: 'bg-forest text-cream',
    New: 'bg-blush text-white',
    Trending: 'bg-gold text-white',
    Premium: 'bg-charcoal text-cream',
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${badgeColor[product.badge] || 'bg-charcoal text-cream'}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-xl text-charcoal mb-1">{product.name}</h3>
        <p className="text-sm text-charcoal/60 mb-3 flex-1">{product.tagline}</p>

        {/* Color Dots */}
        <div className="flex items-center gap-1.5 mb-4">
          {product.colors.map((c) => (
            <span
              key={c}
              className="w-4 h-4 rounded-full border border-black/10 inline-block"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl text-forest font-semibold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <Link
            to={`/brag-your-own?base=${encodeURIComponent(product.name)}`}
            className="bg-forest text-cream text-xs font-semibold tracking-widest uppercase px-4 py-2.5 rounded-full hover:bg-charcoal transition-colors"
          >
            Customize & Buy
          </Link>
        </div>
      </div>
    </div>
  );
}
