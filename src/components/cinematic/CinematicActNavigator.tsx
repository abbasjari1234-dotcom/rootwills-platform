'use client';

import React, { useEffect, useState } from 'react';

interface ActNavPoint {
  id: string;
  actNumber: string;
  title: string;
  shortLabel: string;
}

const ACTS: ActNavPoint[] = [
  { id: 'act-origin', actNumber: '01', title: 'Digbeth Origin', shortLabel: 'Origin' },
  { id: 'act-harvest', actNumber: '02', title: 'Single-Estate Provenance', shortLabel: 'Provenance' },
  { id: 'act-coldchain', actNumber: '03', title: 'Cold-Chain Depot Hub', shortLabel: 'Logistics' },
  { id: 'act-kitchen', actNumber: '04', title: 'Pass Divisions', shortLabel: 'Culinary' },
  { id: 'act-trust', actNumber: '05', title: 'Verified SLA & Credentials', shortLabel: 'Trust' },
  { id: 'act-cta', actNumber: '06', title: 'Executive Trade Gateway', shortLabel: 'Trade' },
];

export function CinematicActNavigator() {
  const [activeActId, setActiveActId] = useState<string>('act-origin');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection ratio
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by greatest intersectionRatio
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveActId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    ACTS.forEach((act) => {
      const el = document.getElementById(act.id);
      if (el) observer.observe(el);
    });

    // Handle visibility when scrolled into lower non-cinematic sections
    const handleScroll = () => {
      const ctaEl = document.getElementById('act-cta');
      if (ctaEl) {
        const ctaRect = ctaEl.getBoundingClientRect();
        // Hide if we've scrolled well past the CTA
        if (ctaRect.bottom < -200) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAct = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cinematic Act Navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 select-none pointer-events-none transition-opacity duration-500"
    >
      <div className="p-2 rounded-2xl bg-obsidian-950/75 backdrop-blur-xl border border-champagne/20 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex flex-col items-end gap-2.5 pointer-events-auto">
        {ACTS.map((act) => {
          const isActive = activeActId === act.id;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => scrollToAct(act.id)}
              aria-label={`Jump to Act ${act.actNumber}: ${act.title}`}
              className="group flex items-center gap-2.5 py-1 px-1.5 rounded-lg transition-all"
            >
              {/* Tooltip badge that expands on hover or when active */}
              <span
                className={`font-mono text-[10px] tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 text-champagne font-bold translate-x-0'
                    : 'opacity-0 group-hover:opacity-100 text-cream/70 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                <span className="text-emerald-400 font-semibold mr-1">{act.actNumber}</span>
                <span>{act.shortLabel}</span>
              </span>

              {/* Indicator Pip */}
              <div
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'w-4 h-4 bg-champagne/20 border border-champagne shadow-[0_0_12px_rgba(228,199,103,0.8)]'
                    : 'w-2.5 h-2.5 bg-obsidian-850 border border-champagne/30 group-hover:border-champagne group-hover:scale-125'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
