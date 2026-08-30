import { Search, Store, User, Heart, ShoppingBag } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div className="bg-forest text-cream-50 text-xs font-medium py-2 text-center tracking-wide">
        Shipping PAN India | 2-Day Express Delivery Now Live
      </div>

      {/* Main Navigation */}
      <div className="border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Bags</a>
              <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Backpacks</a>
              <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Travel</a>
              <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Wallets</a>
              <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Men</a>
            </nav>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
              <a href="/" className="font-serif text-4xl font-bold text-forest lowercase tracking-tighter">
                bragthebag<span className="text-[#E8A365]">.</span>
              </a>
            </div>

            {/* Right Navigation & Icons */}
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex space-x-6 mr-4">
                <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Trending</a>
                <a href="#" className="text-xs font-semibold text-charcoal hover:text-forest tracking-widest uppercase">Collections</a>
              </div>
              <div className="flex items-center space-x-4 text-charcoal">
                <button className="hover:text-forest transition-colors"><Search size={20} strokeWidth={1.5} /></button>
                <button className="hover:text-forest transition-colors"><Store size={20} strokeWidth={1.5} /></button>
                <button className="hover:text-forest transition-colors"><User size={20} strokeWidth={1.5} /></button>
                <button className="hover:text-forest transition-colors"><Heart size={20} strokeWidth={1.5} /></button>
                <button className="hover:text-forest transition-colors"><ShoppingBag size={20} strokeWidth={1.5} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
