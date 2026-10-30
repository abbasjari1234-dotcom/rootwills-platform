'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DoodleFlourish } from './DoodleFlourish';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectorItem {
  number: string;
  title: string;
  category: string;
  meta: string;
  image: string;
  alt: string;
}

const SECTORS: SectorItem[] = [
  {
    number: '01',
    title: 'Restaurants & Bistros',
    category: 'Food Services Supply',
    meta: 'Class 1 Daily Drop • Pre-Dawn 05:30 AM • Split-Case Flexibility',
    image: '/images/commercial/10_restaurant.jpg',
    alt: 'Restaurant kitchen pass with fresh farm produce',
  },
  {
    number: '02',
    title: 'Hotels & Hospitality Groups',
    category: 'Consolidated Volume',
    meta: 'Multi-Outlet Drops • Breakfast & Banquets • Centralized EOM+30',
    image: '/images/commercial/11_hotels.jpg',
    alt: 'Luxury hotel culinary setup and fresh ingredients',
  },
  {
    number: '03',
    title: 'Commercial Caterers & Events',
    category: 'Cold-Chain Logistics',
    meta: 'Pallet-Scale Volume • Pre-Prepped Root Veg • 72h Stock Lock',
    image: '/images/commercial/13_caterers.jpg',
    alt: 'Commercial catering event preparations',
  },
  {
    number: '04',
    title: 'Farm Shops & Artisan Delis',
    category: 'British Heritage Provenance',
    meta: 'Heirloom Varietals • Wooden Harvest Crates • 100% British Farm Assured',
    image: '/images/commercial/british_apples_crates.jpg',
    alt: 'British orchard apples in rustic wooden crates',
  },
  {
    number: '05',
    title: 'Dayboat Seafood & Coastal Landings',
    category: 'Daily Fresh Catch',
    meta: 'Brixham & Peterhead Landings • Iced Transport • Direct Chef Grading',
    image: '/images/commercial/dayboat_turbot_ice.jpg',
    alt: 'Fresh dayboat catch iced on market crates',
  },
  {
    number: '06',
    title: 'Artisan Dairy & Regional Cheeses',
    category: 'Artisan Dairy Lines',
    meta: 'Farm Fresh Milk • Cotswolds & Somerset • Monitored Cold-Chain',
    image: '/images/commercial/artisan_dairy_eggs.jpg',
    alt: 'Artisan farmhouse cheeses and free-range dairy crates',
  },
];

// Mathematical curve calculations directly extracted from Anubi spatial reel
const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val));

function smoothstep(min: number, max: number, val: number) {
  const t = clamp((val - min) / (max - min));
  return t * t * (3 - 2 * t);
}

interface LayoutMetrics {
  width: number;
  height: number;
  isMobile: boolean;
  frameWidth: number;
  frameHeight: number;
  worldWidth: number;
  worldHeight: number;
  unit: number;
  perspective: number;
}

function computeLayoutMetrics(width: number, height: number): LayoutMetrics {
  const isMobile = width < 780;
  const aspectRatio = 16 / 9;
  const fov = 40;
  const cameraZ = 6;

  const frameHeight = Math.min(0.54 * height, (width * (isMobile ? 0.9 : 0.72)) / aspectRatio);
  const frameWidth = frameHeight * aspectRatio;
  const worldHeight = 2 * Math.tan((fov * Math.PI) / 360) * cameraZ;
  const worldWidth = (worldHeight * width) / height;
  const unit = worldHeight / height;

  return {
    width,
    height,
    isMobile,
    frameHeight,
    frameWidth,
    worldWidth,
    worldHeight,
    unit,
    perspective: cameraZ / unit,
  };
}

function getCardSpatialTransform(diff: number, layout: LayoutMetrics) {
  const { worldWidth: r, worldHeight: a } = layout;
  const n = Math.max(0, diff);  // incoming cards (waiting on the right)
  const s = Math.max(0, -diff); // outgoing cards (sliding to the left)

  return {
    x: diff >= 0 ? Math.sin(1.1 * n) * r * 0.74 : -0.814 * r * s * (1 + 0.12 * s),
    y: diff >= 0 ? Math.sin(0.95 * n) * a * 0.2 : -0.2 * a * Math.sin(0.95 * s) * (1 + 0.3 * s),
    z: diff >= 0 ? -(3 * n) : 3 * s - s * s * 0.3,
    rotateY: diff >= 0 ? -0.55 * Math.sin(Math.min(n, 1.5)) : s * (0.55 + 0.17 * s),
    rotateZ: diff >= 0 ? -0.16 * Math.sin(1.2 * n) : s * (0.192 + 0.048 * s),
    opacity: diff >= 0 ? 1 - smoothstep(1.9, 3, n) : 1 - smoothstep(0.66, 1.05, s),
    caption: 1 - smoothstep(0.08, 0.45, Math.abs(diff)),
  };
}

export function WhoWeSupplySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;

    let layout = computeLayoutMetrics(viewport.clientWidth, viewport.clientHeight);

    const updateLayout = () => {
      layout = computeLayoutMetrics(viewport.clientWidth, viewport.clientHeight);
      viewport.style.setProperty('--reel-width', `${layout.frameWidth}px`);
      viewport.style.setProperty('--reel-height', `${layout.frameHeight}px`);
      if (worldRef.current) {
        worldRef.current.style.perspective = `${layout.perspective}px`;
      }
    };

    updateLayout();

    const renderReel = (rawPos: number) => {
      const pos = clamp(rawPos, 0, SECTORS.length - 1);
      const activeIdx = Math.round(pos);
      setCurrentIndex(activeIdx);

      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const diff = idx - pos;
        const tr = getCardSpatialTransform(diff, layout);
        const captionEl = captionRefs.current[idx];

        cardEl.style.transform = `translate(-50%, -50%) translate3d(${tr.x / layout.unit}px, ${-tr.y / layout.unit}px, ${tr.z / layout.unit}px) rotateY(${tr.rotateY}rad) rotateZ(${-tr.rotateZ}rad)`;
        cardEl.style.opacity = tr.opacity.toFixed(4);
        cardEl.style.visibility = tr.opacity < 0.005 ? 'hidden' : 'visible';
        cardEl.style.pointerEvents = Math.abs(diff) < 0.4 ? 'auto' : 'none';

        if (captionEl) {
          captionEl.style.opacity = tr.caption.toFixed(4);
          captionEl.style.visibility = tr.caption < 0.01 ? 'hidden' : 'visible';
        }
      });
    };

    renderReel(0);

    const pinDistance = viewport.clientHeight * (SECTORS.length - 1) * (layout.isMobile ? 0.95 : 1.15);

    const st = ScrollTrigger.create({
      id: 'home-spatial-reel',
      trigger: section,
      pin: viewport,
      start: 'top top',
      end: () => `+=${pinDistance}`,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const raw = self.progress * (SECTORS.length - 1);
        renderReel(raw);
      },
      onRefresh: () => {
        updateLayout();
      },
    });

    const handleResize = () => {
      updateLayout();
      st.refresh();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="sectors" className="relative w-full bg-[#FAF7F2] text-[#131313] border-b border-[#E8DEC8]/60">
      {/* ─── PINNED VIEWPORT CANVAS (100svh) ─── */}
      <div
        ref={viewportRef}
        className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 select-none"
      >
        
        {/* ─── 1. TOP HEADER ROW ─── */}
        <div className="flex items-center justify-between z-20 pointer-events-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <h2 className="font-serif text-[clamp(32px,5.5vw,72px)] font-bold tracking-tight text-[#131313] leading-none">
              In Evidenza
            </h2>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#BA8E4E] font-semibold">
              03 // WHO WE SUPPLY
            </span>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm text-[#706C65] hover:text-[#131313] transition-colors cursor-pointer"
          >
            <span>All Commercial Sectors</span>
            <span className="text-sm sm:text-base group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200">
              ↘
            </span>
          </Link>
        </div>

        {/* ─── 2. HAND-DRAWN VIOLET DOODLE STAR (Matching Anubi reference) ─── */}
        <div className="absolute left-[6%] sm:left-[10%] top-[40%] -translate-y-1/2 pointer-events-none z-10 opacity-75 hidden sm:block">
          <DoodleFlourish variant="sketch-star" color="#8060f5" className="w-28 h-28 sm:w-40 sm:h-40" strokeWidth={3} />
        </div>

        {/* ─── 3. 3D SPATIAL CURVED WORLD ─── */}
        <div
          ref={worldRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {SECTORS.map((sector, index) => (
            <div
              key={sector.number}
              ref={(el) => { cardRefs.current[index] = el; }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{
                width: 'var(--reel-width, 700px)',
                height: 'var(--reel-height, 394px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Card Media Preview Container */}
              <Link
                href="/contact"
                className="block w-full h-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-stone-200 group cursor-pointer pointer-events-auto"
              >
                <Image
                  src={sector.image}
                  alt={sector.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 72vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </Link>

              {/* Caption Below Card (Only visible when card is centered in focus) */}
              <div
                ref={(el) => { captionRefs.current[index] = el; }}
                className="absolute top-full left-0 right-0 pt-4 sm:pt-5 flex items-start justify-between gap-4 pointer-events-auto"
              >
                <div className="max-w-xl">
                  <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-[#131313] tracking-tight leading-snug">
                    {sector.title}
                  </h3>
                  <p className="font-mono text-[10px] sm:text-xs text-[#706C65] tracking-wider mt-1 sm:mt-1.5 leading-relaxed">
                    <span className="text-[#BA8E4E] font-semibold">{sector.category}</span>
                    <span className="mx-2 text-stone-300">|</span>
                    <span>{sector.meta}</span>
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm flex items-center justify-center text-base sm:text-xl text-[#131313] hover:bg-[#131313] hover:text-[#FAF7F2] transition-colors shrink-0 cursor-pointer shadow-xs"
                  aria-label={`Inquire about ${sector.title}`}
                >
                  ↗
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 4. BOTTOM CONTROLS & READOUT (01 ── 06 Progress & Scroll Hint) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center z-20 pointer-events-none mt-auto">
          {/* Left: 01 ────── 06 Progress Counter */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 font-mono text-xs sm:text-sm">
            <span className="font-bold text-[#131313] text-xl sm:text-2xl tabular-nums leading-none">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-14 sm:w-24 h-[2px] bg-black/15 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-[#131313] transition-all duration-200 ease-out"
                style={{ width: `${((currentIndex) / (SECTORS.length - 1)) * 100}%` }}
              />
            </div>
            <span className="text-[#8C827A] text-xs">
              {String(SECTORS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Center: Scroll Hint with Down Arrow */}
          <div className="hidden sm:flex items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] text-[#706C65] tracking-wider uppercase">
            <span>Scorri per vedere i settori</span>
            <span className="animate-bounce">↓</span>
          </div>

          {/* Right: Provenance Tag */}
          <div className="flex justify-end font-mono text-[10px] sm:text-[11px] text-[#8C827A] tracking-wider">
            <span>100% British Cold-Chain</span>
          </div>
        </div>

      </div>
    </section>
  );
}
