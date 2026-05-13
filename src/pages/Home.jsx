import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useBannerStore } from '../store/useBannerStore';
import { PRODUCTS, DELIVERED_GALLERY } from '../data/mockData';
import ProductCard from '../components/ui/ProductCard';

export default function Home() {
  const bannerText = useBannerStore((s) => s.bannerText);
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#EDE8DC] to-[#F5F5DC] overflow-hidden min-h-[90vh] flex flex-col">
        {/* Decorative Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/20 blur-3xl pointer-events-none" />

        {/* Content Grid */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left Text */}
          <div className="z-10 animate-fade-in-up text-center lg:text-left">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-forest mb-4">
              Handcrafted. Luxurious. Yours.
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight mb-6">
              From <span className="text-forest/80">"carrying"</span><br />
              a bag<br />
              <span className="italic text-blush">To wearing art.</span>
            </h1>
            <p className="text-charcoal/60 text-lg max-w-md mx-auto lg:mx-0 mb-10">
              Every BragTheBag piece is handcrafted to order in Nagpur with premium materials and artisan care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/collections"
                className="bg-forest text-cream font-semibold px-8 py-4 rounded-full hover:bg-charcoal transition-colors inline-flex items-center gap-2 justify-center"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/brag-your-own"
                className="border-2 border-forest text-forest font-semibold px-8 py-4 rounded-full hover:bg-forest hover:text-cream transition-colors inline-flex items-center gap-2 justify-center"
              >
                Brag Your Own ✦
              </Link>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="relative hidden lg:flex items-center justify-center h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80"
              alt="Hero Bag"
              className="absolute w-72 h-80 object-cover rounded-2xl shadow-2xl top-4 left-4 rotate-[-3deg]"
            />
            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"
              alt="Office Bag"
              className="absolute w-64 h-72 object-cover rounded-2xl shadow-xl bottom-4 right-4 rotate-[4deg]"
            />
            <div className="absolute w-20 h-20 rounded-full bg-forest/10 border border-forest/20 bottom-16 left-16 animate-spin-slow flex items-center justify-center text-xs font-semibold text-forest tracking-widest uppercase text-center leading-tight">
              Made<br/>in<br/>Ngp
            </div>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="bg-forest text-cream py-4 overflow-hidden border-t border-forest/50">
          <div className="animate-marquee whitespace-nowrap">
            {[bannerText, bannerText].join(' ✦ ').split('').length > 0 &&
              [bannerText, bannerText, bannerText, bannerText].map((t, i) => (
                <span key={i} className="text-sm font-medium tracking-widest uppercase mx-8">
                  {t} &nbsp; ✦ &nbsp;
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blush mb-2">Handpicked For You</p>
            <h2 className="font-serif text-4xl text-charcoal">Featured Collection</h2>
          </div>
          <Link to="/collections" className="text-sm font-semibold text-forest hover:underline inline-flex items-center gap-1 shrink-0">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Brag Your Own CTA Strip */}
      <section className="bg-forest text-cream py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-3">The Core Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-5">Design Your Dream Bag</h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-8">
            Select the base, thread colors, patterns, and add your personal monogram. Watch your creation come to life in our live studio.
          </p>
          <Link
            to="/brag-your-own"
            className="bg-cream text-forest font-semibold px-10 py-4 rounded-full hover:bg-white transition-colors inline-flex items-center gap-2"
          >
            Open Customization Studio <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Delivered Orders Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blush mb-2">Real Orders, Real Smiles</p>
          <h2 className="font-serif text-4xl text-charcoal">Delivered with Love</h2>
          <p className="text-charcoal/50 mt-3 max-w-lg mx-auto">
            Every bag tells a story. Here are some that have already found their forever homes.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DELIVERED_GALLERY.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl aspect-square">
              <img
                src={item.image}
                alt={item.product}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="font-serif text-white text-lg">{item.product}</p>
                <p className="text-white/70 text-xs mt-1">{item.client}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Strip */}
      <section className="bg-[#EDE8DC] py-20 px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-forest mb-3">What Our Clients Say</p>
        <blockquote className="font-serif text-3xl md:text-4xl text-charcoal max-w-3xl mx-auto leading-tight mb-6 italic">
          "I've never received so many compliments on a bag. The craftsmanship is absolutely unreal."
        </blockquote>
        <p className="text-charcoal/50 text-sm">— Meera T., Mumbai</p>
      </section>
    </main>
  );
}
