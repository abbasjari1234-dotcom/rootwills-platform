import React from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, HeartHandshake, MapPin, ArrowRight, Award } from 'lucide-react';

export const metadata = {
  title: 'About Rootwills Ltd | British Foodservice Wholesaler',
  description: 'Learn about Rootwills Ltd — our history, direct British grower sourcing, Midlands wholesale depot heritage, and technology-driven vision for UK foodservice.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
          <Building2 className="w-3.5 h-3.5" />
          <span>Our Story & Sourcing Philosophy</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          Championing British Farm Provenance with Next-Gen Technology
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          Founded with a simple mission: connect the UK’s finest growers, butchers, and dairies directly with hospitality kitchens, eliminating unnecessary middle layers and logistical delays.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-sm text-cream/80 leading-relaxed">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            Rooted in Wholesale Market Excellence
          </h2>
          <p>
            Rootwills operates from the heart of Birmingham's historic wholesale trading quarter in Digbeth. Every morning at 2:00 AM, our senior buyers inspect and hand-select seasonal produce harvested from Evesham, Worcestershire, Lincolnshire, and premier continental markets.
          </p>
          <p>
            By combining this deep produce pedigree with custom-engineered digital software, we give chefs transparent contract pricing, 1-click reordering, and live delivery status tracking that legacy wholesalers simply cannot match.
          </p>
          <div className="pt-2 flex gap-4">
            <Link
              href="/onboarding"
              className="px-6 py-3 rounded-xl font-bold text-obsidian-950 bg-champagne text-xs shadow-gold-glow hover:brightness-110"
            >
              Open a Trade Account &rarr;
            </Link>
          </div>
        </div>

        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-cream/15 bg-obsidian-900">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&auto=format&fit=crop&q=80"
            alt="Wholesale market fresh produce"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
