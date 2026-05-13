import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((t, i) => t + (i.quantity || 1), 0));

  const links = [
    { to: '/', label: 'Home' },
    { to: '/collections', label: 'Collections' },
    { to: '/trending', label: 'Trending' },
    { to: '/brag-your-own', label: 'Brag Your Own' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  const navCls = ({ isActive }) =>
    `text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-200 ${
      isActive ? 'text-forest border-b border-forest pb-0.5' : 'text-charcoal hover:text-forest'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-black/10 shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-forest text-cream text-[11px] font-medium tracking-widest py-2 text-center uppercase">
        Shipping PAN India &nbsp;|&nbsp; Crafted in Nagpur
      </div>

      {/* Main Nav — 3-column grid: left-links | logo | right-links+icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">

        {/* Col 1 — Left Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 justify-start">
          {links.slice(0, 3).map((l) => (
            <NavLink key={l.to} to={l.to} className={navCls} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        {/* Mobile: empty placeholder to keep grid shape */}
        <div className="lg:hidden" />

        {/* Col 2 — Logo (always centered) */}
        <Link
          to="/"
          className="font-serif text-2xl lg:text-3xl font-bold text-forest lowercase tracking-tighter whitespace-nowrap text-center"
        >
          bragthebag<span className="text-blush">.</span>
        </Link>

        {/* Col 3 — Right Links + Icons */}
        <div className="flex items-center justify-end gap-6 xl:gap-8">
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.slice(3).map((l) => (
              <NavLink key={l.to} to={l.to} className={navCls}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">

            <Link to="/cart" className="relative text-charcoal hover:text-forest transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blush text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden text-charcoal hover:text-forest"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-black/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={navCls}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}

        </div>
      )}
    </header>
  );
}
