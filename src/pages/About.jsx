import { MapPin, Users, Scissors, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#EDE8DC] to-[#F5F5DC] py-24 px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blush mb-3">Our Story</p>
        <h1 className="font-serif text-5xl md:text-6xl text-charcoal max-w-3xl mx-auto leading-tight mb-6">
          Born in Nagpur.<br /><span className="italic text-forest">Made for the World.</span>
        </h1>
        <p className="text-charcoal/60 max-w-xl mx-auto text-lg leading-relaxed">
          BragTheBag started as a small workshop in the lanes of Nagpur, where a love for craft met the ambition of luxury.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="prose prose-lg mx-auto text-charcoal/80 leading-relaxed space-y-6 font-sans">
          <p>
            It was 2022 when our founder, <strong>Arpit Benjamin </strong>, looked at the sea of mass-produced handbags flooding the market and asked a simple question: <em>"Why can't luxury be personal?"</em>
          </p>
          <p>
            Growing up in Nagpur — a city known for its oranges, its warmth, and its deep-rooted artisan culture — Aarav had watched his grandmother weave intricate patterns into everyday cloth. He saw skill being undervalued and a craft slowly fading into the background of factory floors.
          </p>
          <p>
            BragTheBag was born at that intersection. A brand that would bring together the exceptional hand-stitching techniques of local artisans, the premium leathers sourced from certified tanneries, and a direct-to-customer model that allowed each bag to be a <strong>one-of-one</strong> — built for the person who carries it.
          </p>
          <p>
            Today, we ship handcrafted bags to every corner of India. Our team of 14 artisans collectively hold over 100 years of combined craftsmanship experience. No two bags that leave our studio are exactly alike — and we wouldn't have it any other way.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-forest text-cream py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-cream/50 mb-2">What We Stand For</p>
            <h2 className="font-serif text-4xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Scissors size={28} />, title: 'Pure Craft', desc: 'Every stitch is placed by a human hand. No machines, no shortcuts.' },
              { icon: <Heart size={28} />, title: 'Made with Love', desc: 'Our artisans pour their expertise and heart into each piece.' },
              { icon: <MapPin size={28} />, title: 'Rooted in Nagpur', desc: 'We are proud to support local artisans and keep craft alive in Maharashtra.' },
              { icon: <Award size={28} />, title: 'Premium Only', desc: 'We source only the finest full-grain leathers, silks, and threads.' },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-cream/10 flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-serif text-xl mb-2">{v.title}</h3>
                <p className="text-cream/60 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-[#EDE8DC]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Orders Delivered', value: '2,400+' },
            { label: 'Cities Across India', value: '120+' },
            { label: 'Master Artisans', value: '14' },
            { label: 'Years of Craft', value: '3+' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-5xl text-forest font-bold mb-2">{s.value}</p>
              <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
