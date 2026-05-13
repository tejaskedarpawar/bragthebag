import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, PenTool, Image as ImageIcon, Type, Check } from 'lucide-react';

const ProductCustomizer = () => {
  const [activeTab, setActiveTab] = useState('base');
  const [selections, setSelections] = useState({
    base: 'Handbag',
    color: 'Forest Green',
    pattern: 'None',
    text: '',
  });

  const bases = ['Handbag', 'Office Bag', 'Tote', 'Pouch'];
  const colors = [
    { name: 'Forest Green', hex: '#1A3626' },
    { name: 'Cream', hex: '#F5F5DC' },
    { name: 'Charcoal', hex: '#2D2D2D' },
    { name: 'Blush Pink', hex: '#E8A365' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-charcoal mb-4">Brag Your Own</h2>
        <p className="text-charcoal-500 max-w-2xl mx-auto">
          Personalize your luxury. Choose your base, pick your colors, and add a custom touch to make it uniquely yours.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Preview Area */}
        <div className="w-full lg:w-1/2 bg-cream-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px] border border-cream-200 relative overflow-hidden">
          <motion.div 
            key={selections.base + selections.color}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-64 rounded-xl shadow-xl flex items-center justify-center text-cream-50 font-serif text-2xl"
            style={{ backgroundColor: colors.find(c => c.name === selections.color)?.hex || '#1A3626' }}
          >
            {selections.base}
            {selections.text && (
              <div className="absolute bottom-8 font-serif italic text-lg opacity-80">
                "{selections.text}"
              </div>
            )}
          </motion.div>
          <div className="mt-8 text-center text-sm font-medium text-charcoal-500 uppercase tracking-widest">
            Live Preview
          </div>
        </div>

        {/* Customization Options */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-cream-200 mb-8">
            <button 
              onClick={() => setActiveTab('base')}
              className={`pb-4 px-4 text-sm font-semibold tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'base' ? 'border-forest text-forest' : 'border-transparent text-charcoal-400 hover:text-charcoal'}`}
            >
              <PenTool size={16} /> Base
            </button>
            <button 
              onClick={() => setActiveTab('color')}
              className={`pb-4 px-4 text-sm font-semibold tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'color' ? 'border-forest text-forest' : 'border-transparent text-charcoal-400 hover:text-charcoal'}`}
            >
              <Palette size={16} /> Color
            </button>
            <button 
              onClick={() => setActiveTab('text')}
              className={`pb-4 px-4 text-sm font-semibold tracking-wider flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'text' ? 'border-forest text-forest' : 'border-transparent text-charcoal-400 hover:text-charcoal'}`}
            >
              <Type size={16} /> Add Text
            </button>
          </div>

          {/* Options Content */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {activeTab === 'base' && (
                <motion.div 
                  key="base"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {bases.map((base) => (
                    <button 
                      key={base}
                      onClick={() => setSelections({...selections, base})}
                      className={`p-6 border rounded-lg text-center transition-all ${selections.base === base ? 'border-forest bg-forest/5 shadow-md' : 'border-cream-200 hover:border-forest/50'}`}
                    >
                      <span className="font-serif text-lg">{base}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === 'color' && (
                <motion.div 
                  key="color"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap gap-4"
                >
                  {colors.map((color) => (
                    <button 
                      key={color.name}
                      onClick={() => setSelections({...selections, color: color.name})}
                      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-110 ${selections.color === color.name ? 'ring-2 ring-offset-2 ring-forest' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selections.color === color.name && <Check size={24} className={color.hex === '#F5F5DC' ? 'text-forest' : 'text-cream'} />}
                    </button>
                  ))}
                </motion.div>
              )}

              {activeTab === 'text' && (
                <motion.div 
                  key="text"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <label className="block text-sm font-medium text-charcoal mb-2">Engrave Text (Max 12 chars)</label>
                  <input 
                    type="text" 
                    maxLength={12}
                    value={selections.text}
                    onChange={(e) => setSelections({...selections, text: e.target.value})}
                    className="w-full border-b-2 border-cream-200 bg-transparent py-2 text-xl font-serif focus:outline-none focus:border-forest transition-colors"
                    placeholder="E.g., M.S."
                  />
                  <p className="text-xs text-charcoal-400 mt-2">+₹499 Monogramming fee</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-12 pt-8 border-t border-cream-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-charcoal-500 uppercase tracking-widest mb-1">Total</p>
              <p className="text-3xl font-serif text-forest">₹{selections.base === 'Handbag' ? 3499 : 2499}</p>
            </div>
            <button className="bg-forest hover:bg-forest-600 text-cream px-8 py-4 font-semibold tracking-wider transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCustomizer;
