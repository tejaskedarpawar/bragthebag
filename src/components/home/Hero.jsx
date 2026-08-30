import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative bg-cream overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-[#F2E8DF] z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-24">
          
          {/* Left Side: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 flex justify-center md:justify-start mb-12 md:mb-0 relative"
          >
            <div className="relative">
              {/* Decorative Blur */}
              <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full z-0" />
              <img 
                src="/images/hero-bag.png" 
                alt="BragTheBag Signature Collection" 
                className="w-full max-w-md lg:max-w-lg object-contain relative z-10 shadow-2xl rounded-sm"
              />
            </div>
          </motion.div>

          {/* Right Side: Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left pl-0 md:pl-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal leading-tight mb-4">
              From "borrowing" <br/> her bags <br/>
              <span className="text-forest italic text-5xl md:text-6xl lg:text-7xl font-bold">To gifting her one.</span>
            </h1>
            
            <p className="mt-4 text-charcoal-500 font-sans text-lg md:text-xl max-w-md mb-8">
              Handcrafted, minimal luxury from the heart of Nagpur.
            </p>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#C13A6B] hover:bg-[#A32A55] text-white font-serif text-xl tracking-wide py-4 px-10 rounded-sm shadow-lg transition-colors"
            >
              Gifts For Mom
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
