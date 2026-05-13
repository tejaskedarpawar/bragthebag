import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <p className="font-serif text-3xl text-cream lowercase tracking-tighter mb-3">
            bragthebag<span className="text-blush">.</span>
          </p>
          <p className="text-sm leading-relaxed text-cream/60 mb-5">
            Premium, handcrafted bags born in Nagpur. Each piece carries a story — make it yours.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-cream transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-cream mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/collections', label: 'Collections' },
              { to: '/trending', label: 'Trending' },
              { to: '/brag-your-own', label: 'Brag Your Own' },
              { to: '/about', label: 'About Us' },
              { to: '/contact', label: 'Bulk Orders' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-cream transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-cream mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-cream/50" />
              Nagpur, Maharashtra, India
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-cream/50" />
              +91 9021245712
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-cream/50" />
              hello@bragthebag.in
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-cream mb-4">Policies</h4>
          <ul className="space-y-2 text-sm">
            {['Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((p) => (
              <li key={p}>
                <a href="#" className="hover:text-cream transition-colors">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} BragTheBag. All rights reserved. | Made with ♥ in Nagpur
      </div>
    </footer>
  );
}
