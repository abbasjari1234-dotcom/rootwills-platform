import React from 'react';
import Image from 'next/image';

export function MidBannerSection() {
  return (
    <>
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-[#0C1210] border-t border-b border-[#BA8E4E]/25">
        {/* Full-Width Panoramic Background: The Kitchen Pass */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/commercial/rootwills_restaurant_pass_panoramic.jpg"
            alt="Supporting the Food Industry Across the UK"
            fill
            unoptimized
            sizes="100vw"
            className="object-cover filter brightness-[0.42] contrast-105 saturate-[0.85]"
          />
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1210] via-black/55 to-[#0C1210]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1210]/90 via-transparent to-[#0C1210]/90" />
        </div>

        {/* Top Architectural Diamond Accent */}
        <div className="relative z-10 flex items-center justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 border border-[#BA8E4E]/40 rounded-full bg-[#0F1714]/90 text-[9px] text-[#D4A86A] font-serif tracking-widest shadow-md">
            <span className="text-[8px] text-[#BA8E4E]">◆</span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-serif text-[#D4A86A] font-semibold">
              PURVEYOR BENCHMARK
            </span>
            <span className="text-[8px] text-[#BA8E4E]">◆</span>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#D4A86A] text-[11px] sm:text-xs font-serif tracking-[0.28em] uppercase font-semibold">
              — THE ROOTWILLS STANDARD —
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-serif font-bold text-white tracking-tight leading-[1.16] mb-4 sm:mb-5">
            Supporting the Food Industry<br />
            Across the <span className="text-[#D4A86A]">UK</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-[15px] text-[#EDE4D8]/90 font-sans leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
            From independent Michelin-caliber dining rooms to high-volume hospitality groups, our dawn supply chain powers Britain’s most demanding kitchens with uncompromising freshness and pedigree.
          </p>

          {/* ─── Architectural Credential Ribbon (Replaces AI Slop Glass Boxes) ─── */}
          <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-10 p-1 rounded-2xl bg-white/[0.04] ring-1 ring-[#BA8E4E]/35 backdrop-blur-md shadow-2xl">
            <div className="rounded-[calc(1rem-0.125rem)] bg-[#0E1613]/90 px-4 py-5 sm:px-6 sm:py-6 border border-white/[0.08]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-4 md:gap-0 md:divide-x divide-[#BA8E4E]/25">
                
                {/* Stat 1: Fulfillment */}
                <div className="px-2 sm:px-4 text-center flex flex-col justify-center pb-1 md:pb-0">
                  <span className="block font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#D4A86A] leading-none mb-1.5">
                    99.4%
                  </span>
                  <span className="block text-xs sm:text-[13px] font-serif font-semibold text-white tracking-wide">
                    Order Fulfillment
                  </span>
                  <span className="block text-[10px] text-[#EDE4D8]/65 font-sans mt-0.5">
                    Direct Grower Lineage
                  </span>
                </div>

                {/* Stat 2: Cold-Chain */}
                <div className="px-2 sm:px-4 text-center flex flex-col justify-center pb-1 md:pb-0">
                  <span className="block font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#D4A86A] leading-none mb-1.5">
                    &lt; 4°C
                  </span>
                  <span className="block text-xs sm:text-[13px] font-serif font-semibold text-white tracking-wide">
                    Cold-Chain Verified
                  </span>
                  <span className="block text-[10px] text-[#EDE4D8]/65 font-sans mt-0.5">
                    Monitored Farm to Kitchen
                  </span>
                </div>

                {/* Stat 3: Dawn Drops */}
                <div className="px-2 sm:px-4 text-center flex flex-col justify-center pt-4 md:pt-0 border-t border-[#BA8E4E]/25 md:border-t-0">
                  <span className="block font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#D4A86A] leading-none mb-1.5">
                    6 Days
                  </span>
                  <span className="block text-xs sm:text-[13px] font-serif font-semibold text-white tracking-wide">
                    Dawn Delivery
                  </span>
                  <span className="block text-[10px] text-[#EDE4D8]/65 font-sans mt-0.5">
                    4:00 AM London Drops
                  </span>
                </div>

                {/* Stat 4: SALSA */}
                <div className="px-2 sm:px-4 text-center flex flex-col justify-center pt-4 md:pt-0 border-t border-[#BA8E4E]/25 md:border-t-0">
                  <span className="block font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#D4A86A] leading-none mb-1.5">
                    100%
                  </span>
                  <span className="block text-xs sm:text-[13px] font-serif font-semibold text-white tracking-wide">
                    SALSA Assured
                  </span>
                  <span className="block text-[10px] text-[#EDE4D8]/65 font-sans mt-0.5">
                    Full Batch Traceability
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
