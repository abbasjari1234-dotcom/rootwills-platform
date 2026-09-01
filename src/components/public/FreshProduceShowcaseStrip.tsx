'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Award, ShieldCheck, Clock, ArrowRight, Sparkles, Sun, Droplets, CheckCircle2 } from 'lucide-react';

const PRODUCE_HIGHLIGHTS = [
  {
    title: 'Class 1 Heritage & Pink Lady® Apples',
    spec: '14.8° Brix Natural Sugar & Crisp Turgor',
    desc: 'Direct from Kent growers and sunny European orchards. High cell crispness, effervescent acidity, and hand-selected uniform sizing for fine dining menus.',
    image: '/images/branded/rootwills_apples_card.jpg',
    badge: '100% Class 1 Extra',
    color: '#FF4D6D',
  },
  {
    title: 'Living Hydroponic Microgreens & Herbs',
    spec: 'Delivered with Nutrient Roots Attached',
    desc: 'Red vein sorrel, pea shoots, edible violas, and living basil delivered in clean nutrient pads. Zero soil grit, 10-day shelf life, and vibrant color.',
    image: '/images/branded/rootwills_microgreens_card.jpg',
    badge: 'Harvested to Order',
    color: '#10B981',
  },
  {
    title: 'Farmhouse Dairy & Free-Range Eggs',
    spec: 'Cultured Butter & Lion-Code Farm Eggs',
    desc: 'French pastry butter sheets (84% butterfat), unpasteurised West Country cheddar, double cream, and fresh daily farm eggs graded for commercial bakeries.',
    image: '/images/branded/rootwills_dairy_card.jpg',
    badge: 'Continuous +2°C Hold',
    color: '#FFC837',
  },
];

export function FreshProduceShowcaseStrip() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-obsidian-950 via-emerald-950/40 to-obsidian-950 border-y border-emerald-900/60 overflow-hidden relative z-10">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Motion Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase backdrop-blur-md shadow-lg">
            <Leaf className="w-4 h-4 text-champagne" />
            <span>Farm Provenance & Culinary Excellence</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-cream uppercase leading-[1.05]">
            Fresh Produce &bull; <span className="gold-gradient-text">Orchard Selected</span>
          </h2>

          <p className="text-sm sm:text-base text-cream/80 font-sans leading-relaxed">
            Sourced directly from British growers and European single-estate orchards. Delivered before sunrise to the Midlands’ finest restaurants, hotels, and caterers.
          </p>
        </motion.div>

        {/* 3 Sensory Branded Produce Cards with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCE_HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-emerald-900/40 to-obsidian-950 border border-champagne/30 shadow-2xl overflow-hidden group hover:border-champagne hover:shadow-[0_20px_50px_rgba(228,199,103,0.25)] transition-all duration-500"
            >
              <div className="rounded-[22px] bg-obsidian-900/95 p-5 sm:p-6 space-y-4 flex flex-col justify-between h-full">
                
                <div className="space-y-4">
                  {/* Branded Photo Frame */}
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-obsidian-950">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-obsidian-950/85 backdrop-blur-md border border-champagne/40 text-champagne text-[11px] font-mono font-bold shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
                      {item.spec}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-cream mt-1 group-hover:text-champagne transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-cream/70 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-950/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-cream/50">06:00 AM Delivery SLA</span>
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-champagne hover:underline group/btn"
                  >
                    <span>Request Spec</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Operational Guarantee Strip with Hover Physics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4"
        >
          {[
            { val: '11:00 PM', label: 'Evening Order Cut-off', color: 'text-champagne' },
            { val: '06:00 AM', label: 'Kitchen Delivery SLA', color: 'text-emerald-400' },
            { val: '100%', label: 'Zero Substitutions', color: 'text-champagne' },
            { val: '£30,000', label: '30-Day Trade Credit', color: 'text-emerald-400' },
          ].map((stat, sIdx) => (
            <motion.div 
              key={sIdx}
              whileHover={{ y: -5, scale: 1.03 }}
              className="p-4 rounded-2xl bg-obsidian-900/80 border border-emerald-900/60 hover:border-champagne/40 text-center font-mono transition-all shadow-md cursor-default backdrop-blur-md"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.val}</div>
              <div className="text-[10px] text-zinc-400 uppercase mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
