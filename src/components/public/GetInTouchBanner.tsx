'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import { DoodleFlourish } from './DoodleFlourish';

export function GetInTouchBanner() {
  return (
    <footer
      id="contact"
      className="pt-4 sm:pt-10 pb-20 sm:pb-24 lg:pb-28 bg-[#FAF7F2] scroll-mt-20 relative overflow-hidden"
    >
      {/* Seamless Botanical Parchment Texture */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Double-Bezel Outer Gold-Rimmed Shell */}
        <div className="p-1.5 sm:p-2 rounded-[1.75rem] sm:rounded-[2.25rem] bg-gradient-to-b from-[#BA8E4E]/45 via-[#EFE8D8]/85 to-[#BA8E4E]/35 ring-1 ring-[#BA8E4E]/45 shadow-[0_28px_70px_-12px_rgba(38,3,9,0.34)]">
          <div className="relative rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2.25rem-0.5rem)] overflow-hidden bg-[#260309] border border-[#F3D08A]/40 p-5 sm:p-12 lg:p-16 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] text-white">
            {/* Top glowing gold hairline */}
            <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F3D08A]/80 to-transparent pointer-events-none" />

            {/* Bespoke Oxblood Linen & Champagne-Gold Botanical Engraving Canvas */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-85 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/textures/rootwills_luxury_footer_canvas.jpg')" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_55%_at_50%_50%,rgba(18,2,6,0.52)_0%,rgba(18,2,6,0.15)_65%,transparent_100%)] pointer-events-none" />
            
            {/* Background Greek Engraving Watermark */}
            <div className="absolute inset-y-0 left-0 w-1/3 opacity-15 pointer-events-none mix-blend-screen overflow-hidden">
              <Image
                src="/images/commercial/greek_harvest_engraving.jpg"
                alt="Greek Engraving Motif"
                fill
                sizes="400px"
                className="object-cover object-left"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
              
              {/* Monospace Eyebrow Capsule */}
              <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#180205]/85 border border-[#F3D08A]/50 mb-2.5 sm:mb-4 shadow-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3D08A] animate-pulse" />
                <span className="font-mono text-[9.5px] sm:text-[11px] uppercase tracking-[0.2em] text-[#F3D08A] font-bold">
                  06 // DIRECT WHOLESALE DESK
                </span>
              </div>

              <div className="relative inline-block">
                <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-serif font-bold text-white mb-1 sm:mb-1.5 tracking-[-0.025em] leading-[1.08] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] [text-wrap:balance]">
                  Partner With <span className="text-[#F3D08A] italic font-normal">Rootwills</span>
                </h2>
                <div className="flex justify-center">
                  <DoodleFlourish 
                    variant="underline-loop" 
                    color="#F3D08A" 
                    strokeWidth={3} 
                    className="w-36 sm:w-56 -mt-1 mb-2.5 sm:mb-4 text-[#F3D08A]" 
                    delay={200}
                  />
                </div>
              </div>

              <p className="text-xs sm:text-[14.5px] text-white/95 font-sans leading-[1.6] sm:leading-[1.68] mb-5 sm:mb-9 max-w-[56ch] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] font-normal">
                Speak directly with our wholesale specialists to arrange tasting samples, bespoke seasonal rate sheets, or pre-dawn delivery schedules tailored to your kitchen.
              </p>

              {/* Contact Icons Row with Double-Bezel Frosted Medallions and Tactile Response */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-7 text-xs sm:text-sm text-white font-sans">
                <a
                  href="tel:+441616412803"
                  className="group flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Phone className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3D08A]/80 leading-none mb-0.5">Landline</span>
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide tabular-nums">+44 16164 12803</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/447984709478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <MessageCircle className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3D08A]/80 leading-none mb-0.5">WhatsApp</span>
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide tabular-nums">+44 7984 709478</span>
                  </div>
                </a>

                <a
                  href="mailto:sales@rootwills.co.uk"
                  className="group flex items-center gap-2.5 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95"
                >
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                    <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                      <Mail className="w-3.5 h-3.5 stroke-[1.8]" />
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3D08A]/80 leading-none mb-0.5">Email</span>
                    <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide">sales@rootwills.co.uk</span>
                  </div>
                </a>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <Link
                    href="/wholesale-produce-supplier-manchester"
                    className="flex items-center gap-2 text-white/95 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95 group"
                    title="Rootwills Manchester Headquarters Hub"
                  >
                    <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                      <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                        <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3D08A]/80 leading-none mb-0.5">Headquarters Hub</span>
                      <span className="text-xs group-hover:underline">7d Yates St, Middleton, Manchester M24 4GA</span>
                    </div>
                  </Link>

                  <Link
                    href="/wholesale-produce-supplier-birmingham"
                    className="flex items-center gap-2 text-white/95 hover:text-[#F3D08A] transition-colors apple-tactile active:scale-95 group"
                    title="Rootwills Birmingham Wholesale Distribution Corridor"
                  >
                    <div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#F3D08A]/50 via-white/15 to-transparent shadow-[0_2px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-200">
                      <div className="w-8 h-8 rounded-full bg-[#180205]/85 backdrop-blur-md ring-1 ring-[#F3D08A]/40 flex items-center justify-center text-[#F3D08A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                        <MapPin className="w-3.5 h-3.5 stroke-[1.8]" />
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#F3D08A]/80 leading-none mb-0.5">Midlands Corridor</span>
                      <span className="text-xs group-hover:underline">Birmingham Pre-Dawn Distribution Trunk</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* ─── MASTER SITUATION DIRECTORY & SEO MESH ─── */}
              <div className="w-full mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[#F3D08A]/25 text-left">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                  {/* Col 1: Regional Hubs */}
                  <div>
                    <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#F3D08A] font-bold mb-3">
                      Distribution Corridors
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80 font-sans">
                      <li>
                        <Link href="/wholesale-produce-supplier-birmingham" className="hover:text-[#F3D08A] transition-colors">
                          Birmingham Foodservice Hub
                        </Link>
                      </li>
                      <li>
                        <Link href="/wholesale-produce-supplier-manchester" className="hover:text-[#F3D08A] transition-colors">
                          Manchester HQ &amp; Central Depot
                        </Link>
                      </li>
                      <li>
                        <Link href="/services" className="hover:text-[#F3D08A] transition-colors">
                          Midlands Pre-Dawn Delivery
                        </Link>
                      </li>
                      <li>
                        <Link href="/services" className="hover:text-[#F3D08A] transition-colors">
                          Multi-Temperature Cold Chain
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: Product Divisions */}
                  <div>
                    <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#F3D08A] font-bold mb-3">
                      Product Divisions
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80 font-sans">
                      <li>
                        <Link href="/products/fresh-produce" className="hover:text-[#F3D08A] transition-colors">
                          Fresh Farm Produce &amp; Salads
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/meat-poultry" className="hover:text-[#F3D08A] transition-colors">
                          Prime British Butchery &amp; Poultry
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/chilled-dairy" className="hover:text-[#F3D08A] transition-colors">
                          Chilled Dairy, Cheese &amp; Eggs
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/bakery-breakfast" className="hover:text-[#F3D08A] transition-colors">
                          Artisan Bakery &amp; Morning Goods
                        </Link>
                      </li>
                      <li>
                        <Link href="/products" className="hover:text-[#F3D08A] transition-colors">
                          5,400+ SKU Trade Larder
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: Hospitality Solutions */}
                  <div>
                    <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#F3D08A] font-bold mb-3">
                      Hospitality Solutions
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80 font-sans">
                      <li>
                        <Link href="/services/restaurant-food-supply" className="hover:text-[#F3D08A] transition-colors">
                          Restaurant Food Supply &amp; Keyhole
                        </Link>
                      </li>
                      <li>
                        <Link href="/services/hotel-banqueting-supply" className="hover:text-[#F3D08A] transition-colors">
                          Hotel &amp; Banqueting Foodservice
                        </Link>
                      </li>
                      <li>
                        <Link href="/services" className="hover:text-[#F3D08A] transition-colors">
                          Commercial Catering Wholesaler
                        </Link>
                      </li>
                      <li>
                        <Link href="/approach" className="hover:text-[#F3D08A] transition-colors">
                          Pre-Dawn Dispatch Model
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 4: Corporate Governance */}
                  <div>
                    <h4 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#F3D08A] font-bold mb-3">
                      Corporate Trust
                    </h4>
                    <p className="text-[11px] text-white/70 font-sans leading-relaxed mb-2">
                      Rootwills Ltd · Registered in England &amp; Wales (No. 17398744).
                    </p>
                    <p className="text-[11px] text-white/70 font-sans leading-relaxed mb-3">
                      7d Yates Street, Middleton, Manchester, M24 4GA.
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/60">
                      <Link href="/privacy" className="hover:text-[#F3D08A] transition-colors underline">Privacy</Link>
                      <Link href="/terms" className="hover:text-[#F3D08A] transition-colors underline">Trade Terms</Link>
                      <Link href="/contact" className="hover:text-[#F3D08A] transition-colors underline">Trade Desk</Link>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 font-sans">
                  <span>© {new Date().getFullYear()} Rootwills Ltd. All rights reserved. Commercial Foodservice &amp; Wholesale Purveyor.</span>
                  <span className="font-mono text-[10px] text-[#F3D08A]/80 mt-1 sm:mt-0">Dual-Temperature Cold Chain · Pre-Dawn Multi-Drop</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
