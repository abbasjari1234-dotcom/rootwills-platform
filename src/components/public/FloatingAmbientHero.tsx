'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Pause, Play } from 'lucide-react';

import { PointerInk } from './PointerInk';

interface AnubiCardItem {
  id: string;
  title: string;
  category: string;
  src: string;
  tilt: number; // in degrees
}

// 12 Curated Cards placed at strategic phase offsets around the ellipse
// Pure documentary-grade commercial foodservice imagery showing what Rootwills actually does
const CARDS: AnubiCardItem[] = [
  {
    id: 'fleet',
    title: 'Pre-Dawn Refrigerated Fleet',
    category: '05:30 AM Restaurant Drops',
    src: '/images/commercial/van_dawn_delivery.jpg',
    tilt: -5,
  },
  {
    id: 'chef-inspect',
    title: 'Morning Kitchen Pass Inspection',
    category: 'Heritage Roots & Romanesco',
    src: '/images/commercial/chef_inspect_produce.jpg',
    tilt: 3,
  },
  {
    id: 'dairy',
    title: 'Somerset Clothbound Dairy',
    category: 'Artisan Cheddar, Butter & Farm Eggs',
    src: '/images/commercial/artisan_dairy_eggs.jpg',
    tilt: -2,
  },
  {
    id: 'brassicas',
    title: 'Evesham Field Brassicas',
    category: 'Packhouse Cavolo Nero & Savoy',
    src: '/images/commercial/british_brassicas_crates.jpg',
    tilt: 4,
  },
  {
    id: 'seafood',
    title: 'Cornish Day-Boat Turbot',
    category: 'Newlyn Coastal Catch on Ice',
    src: '/images/commercial/dayboat_turbot_ice.jpg',
    tilt: -3,
  },
  {
    id: 'butchery',
    title: 'Himalayan Salt Dry-Aging',
    category: '35-Day Aged Hereford Prime Rib',
    src: '/images/commercial/dry_aged_beef_room.jpg',
    tilt: 2,
  },
  {
    id: 'depot',
    title: 'Cold-Chain Depot Logistics',
    category: 'Midlands Wholesale Distribution Hub',
    src: '/images/commercial/cold_depot_logistics.jpg',
    tilt: -4,
  },
  {
    id: 'mushrooms',
    title: 'Hand-Picked Wild Fungi',
    category: 'Chanterelles, Morels & King Oysters',
    src: '/images/commercial/wild_mushrooms_chef.jpg',
    tilt: 3,
  },
  {
    id: 'citrus',
    title: 'Specialist Leafy Citrus',
    category: 'Amalfi Lemons & Tarocco Oranges',
    src: '/images/commercial/amalfi_citrus_crate.jpg',
    tilt: -2,
  },
  {
    id: 'apples',
    title: 'Kent Orchards Harvest',
    category: 'Cox & Discovery Wholesale Crates',
    src: '/images/commercial/british_apples_crates.jpg',
    tilt: 5,
  },
  {
    id: 'pantry',
    title: 'Bulk Dry Stores & Larder',
    category: 'Stoneground Flours, Olive Oils & Rice',
    src: '/images/commercial/dry_pantry_wholesale.jpg',
    tilt: -3,
  },
  {
    id: 'microgreens',
    title: 'Living Culinary Microgreens',
    category: 'Chef-Harvested Pea Tendrils & Sorrel',
    src: '/images/commercial/living_microgreens_chef.jpg',
    tilt: 2,
  },
];

// Configuration calibrated to anubi.io
const CONFIG = {
  orbit: {
    duration: 160,          // 160 seconds for a full orbit (Calm, stately, luxury drift)
    radiusX: 0.39,          // Desktop horizontal radius multiplier
    radiusY: 0.35,          // Desktop vertical radius multiplier
    angle: -7,              // Orbit plane tilt angle (-7 degrees ≈ -0.122785 rad)
    hoverSpeed: 0,          // Smooth complete pause on card hover
    parallax: 44,           // Mouse parallax displacement factor
    startPhase: 0.05,       // Starting angle phase
    clusterStrength: 0.42,  // Clustering factor for natural organic variation
    clusterAngle: 235,      // Degrees where cards gracefully cluster
  },
  depth: {
    scaleMin: 0.54,         // Receding cards shrink to 54%
    scaleMax: 1.20,         // Approaching cards grow to 120%
    focalAngle: 55,         // Focal angle (55 deg) where cards reach peak foreground scale
  },
};

// Depth formula: (1 + cos(angle - focalAngle)) / 2
function getDepth(angle: number, focalAngle = CONFIG.depth.focalAngle) {
  return (1 + Math.cos(angle - (focalAngle * Math.PI) / 180)) / 2;
}

// Scale formula: scaleMin + depth^1.15 * (scaleMax - scaleMin)
function getScale(depth: number, scaleMin = CONFIG.depth.scaleMin, scaleMax = CONFIG.depth.scaleMax) {
  return scaleMin + Math.pow(depth, 1.15) * (scaleMax - scaleMin);
}

// Clustering formula: creates organic rhythm around the perimeter
function getClusteredAngle(
  phaseProgress: number,
  clusterStrength = CONFIG.orbit.clusterStrength,
  clusterAngle = CONFIG.orbit.clusterAngle,
  isMobile = false
) {
  const n = phaseProgress * Math.PI * 2;
  const strength = Math.max(0, Math.min(0.8, clusterStrength)) * (isMobile ? 0.72 : 1);
  return n - strength * Math.sin(n - (clusterAngle * Math.PI) / 180);
}

const WORDMARK_LETTERS = ['R', 'O', 'O', 'T', 'W', 'I', 'L', 'L', 'S'];

export function FloatingAmbientHero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const mouseParallaxRef = useRef({ x: 0, y: 0 });
  const activeHoverCountRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // References for central identity layers & tactile effects
  const identityRef = useRef<HTMLDivElement>(null);
  const backSketchRef = useRef<SVGSVGElement>(null);
  const frontSketchRef = useRef<SVGSVGElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  // Decorative doodle accent refs for continuous micro-motion
  const violetStarRef = useRef<SVGGElement>(null);
  const violetStarSmallRef = useRef<SVGGElement>(null);
  const orangeCurlRef = useRef<SVGGElement>(null);

  // Periodic tactile risograph paper ripple on the wordmark
  useEffect(() => {
    const triggerRipple = () => {
      if (!displacementRef.current) return;
      gsap.timeline()
        .to(displacementRef.current, { attr: { scale: 3.2 }, duration: 0.2, ease: 'power2.out' })
        .to(displacementRef.current, { attr: { scale: 0 }, duration: 0.55, ease: 'power3.out' });
    };

    const timer = setInterval(triggerRipple, 7500);
    return () => clearInterval(timer);
  }, []);

  // Initial marker stroke draw-in and ambient doodle rotation/float
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Draw in marker paths on mount
    const markerPaths = [
      ...Array.from(backSketchRef.current?.querySelectorAll('[data-marker-path]') || []),
      ...Array.from(frontSketchRef.current?.querySelectorAll('[data-marker-path]') || []),
    ];

    markerPaths.forEach((pathNode, idx) => {
      const p = pathNode as SVGPathElement;
      const len = p.getTotalLength?.() || 400;
      gsap.set(p, { strokeDasharray: len + 1, strokeDashoffset: len + 1 });
      gsap.to(p, {
        strokeDashoffset: 0,
        duration: 1.25,
        ease: 'power2.inOut',
        delay: 0.25 + idx * 0.04,
      });
    });

    // Violet star gentle ambient float & rotation
    const starTween = violetStarRef.current
      ? gsap.to(violetStarRef.current, {
          rotation: 22,
          y: -3,
          svgOrigin: '534 119',
          duration: 4.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      : null;

    // Small star rhythmic twinkle
    const starSmallTween = violetStarSmallRef.current
      ? gsap.to(violetStarSmallRef.current, {
          rotation: -22,
          svgOrigin: '300 448',
          duration: 1.8,
          delay: 2.2,
          repeatDelay: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      : null;

    // Orange curl organic drift
    const curlTween = orangeCurlRef.current
      ? gsap.to(orangeCurlRef.current, {
          x: 7,
          y: -10,
          rotation: -2.5,
          svgOrigin: '853 308',
          duration: 5.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      : null;

    return () => {
      starTween?.kill();
      starSmallTween?.kill();
      curlTween?.kill();
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Orbit state tracking continuous phase (0 -> 1 = one full revolution)
    const orbit = { phase: CONFIG.orbit.startPhase };

    // Cached layout geometry (updated only on resize / ResizeObserver to prevent layout thrashing!)
    let layout = {
      width: stage.clientWidth,
      height: stage.clientHeight,
      isMobile: stage.clientWidth < 780,
      radiusX: stage.clientWidth * 0.39,
      radiusY: stage.clientHeight * 0.35,
      tilt: Math.tan((CONFIG.orbit.angle * Math.PI) / 180),
      frontBoost: stage.clientWidth < 780 ? 0 : 0.24,
      parallaxScale: stage.clientWidth < 780 ? 1 : 200 / 280,
    };

    const updateLayout = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const isMobile = w < 780;
      const frontBoost = isMobile ? 0 : 0.24;

      // Card width based on viewport
      const cardWidth = isMobile ? Math.min(180, w * 0.38) : Math.min(220, w * 0.16);
      const halfCard = (cardWidth * (1.2 + frontBoost)) / 2;
      const tilt = isMobile ? -0.06 : Math.tan((CONFIG.orbit.angle * Math.PI) / 180);
      const radiusX = isMobile ? w * 0.52 : Math.min(w * CONFIG.orbit.radiusX, w / 2 - halfCard - 28);
      const maxVertical = Math.max(40, h / 2 - halfCard / 1.6 - 16);
      const clearanceY = Math.sqrt(Math.max(1600, Math.pow(maxVertical, 2) - Math.pow(radiusX * tilt, 2)));
      const radiusY = Math.max(40, Math.min(h * (isMobile ? 0.33 : CONFIG.orbit.radiusY), clearanceY));

      layout = {
        width: w,
        height: h,
        isMobile,
        radiusX: Math.max(40, radiusX),
        radiusY,
        tilt,
        frontBoost,
        parallaxScale: isMobile ? 1 : cardWidth / 280,
      };

      renderOrbit();
      setIsMounted(true);
    };

    // Render loop: purely reads from cached layout and applies direct GPU transforms
    const renderOrbit = () => {
      const { width, height, radiusX, radiusY, tilt, frontBoost, isMobile } = layout;
      const cardCount = CARDS.length;
      const mouse = mouseParallaxRef.current;

      cardNodesRef.current.forEach((node, i) => {
        if (!node) return;
        const card = CARDS[i];

        // Mobile optimization: hide cards beyond index 9 for clean breathing room
        if (isMobile && i >= 10) {
          node.style.display = 'none';
          return;
        } else {
          node.style.display = 'block';
        }

        // Exact clustered orbit angle
        const angle = getClusteredAngle(orbit.phase + i / cardCount, CONFIG.orbit.clusterStrength, CONFIG.orbit.clusterAngle, isMobile);
        const depth = getDepth(angle, CONFIG.depth.focalAngle);

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        // Position on 3D plane
        const m = cosA * radiusX;
        const p = sinA * radiusY;

        // Front boost scale: dramatically enhances 3D depth as cards swing into foreground
        const scale = getScale(depth, CONFIG.depth.scaleMin, CONFIG.depth.scaleMax) + frontBoost * Math.pow(depth, 3);
        const inspectScale = Math.max(1.085, 1.06 / scale);

        // Parallax depth multiplier
        const parallaxDepthMultiplier = 1.2 * depth - 0.25;
        const posX = width / 2 + m + mouse.x * parallaxDepthMultiplier;
        const posY = height / 2 + p + m * tilt + mouse.y * parallaxDepthMultiplier;

        // 3D rotations matching anubi.io
        const rotX = -3 * sinA;
        const rotY = 6 * cosA;
        const rotZ = card.tilt + 1.8 * sinA;

        // Write directly to style.transform for zero-layout-thrashing hardware compositing
        node.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(4)}) rotate(${rotZ.toFixed(2)}deg) perspective(1100px) rotateX(${rotX.toFixed(3)}deg) rotateY(${rotY.toFixed(3)}deg)`;
        node.style.zIndex = String(10 + Math.round(10 * depth));

        // Update CSS variables only when depth value changes to avoid style invalidations
        const depthStr = depth.toFixed(2);
        if (node.dataset.depth !== depthStr) {
          node.style.setProperty('--card-depth', depthStr);
          node.style.setProperty('--inspect-scale', inspectScale.toFixed(3));
          node.dataset.depth = depthStr;
        }
      });

      // Spatial depth displacement on central identity layers
      if (identityRef.current) {
        identityRef.current.style.transform = `translate(-50%, -50%) translate3d(${-0.16 * mouse.x}px, ${-0.16 * mouse.y}px, 0)`;
      }
      if (backSketchRef.current) {
        backSketchRef.current.style.transform = `translate3d(${0.25 * mouse.x}px, ${0.25 * mouse.y}px, 0)`;
      }
      if (frontSketchRef.current) {
        frontSketchRef.current.style.transform = `translate3d(${0.35 * mouse.x}px, ${0.35 * mouse.y}px, 0)`;
      }
    };

    // Stately, serene GSAP orbit loop (160 seconds per full revolution)
    const tween = gsap.to(orbit, {
      phase: orbit.phase + 1,
      duration: CONFIG.orbit.duration,
      ease: 'none',
      repeat: -1,
      onUpdate: renderOrbit,
    });

    tweenRef.current = tween;

    // Pointer parallax handler (tracks mouse position relative to center)
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || activeHoverCountRef.current > 0) return;
      const rect = stage.getBoundingClientRect();
      const s = CONFIG.orbit.parallax * layout.parallaxScale;
      const targetX = ((e.clientX - rect.left) / rect.width - 0.5) * s;
      const targetY = ((e.clientY - rect.top) / rect.height - 0.5) * s * 0.65;

      gsap.to(mouseParallaxRef.current, {
        x: targetX,
        y: targetY,
        duration: 1.2,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: renderOrbit,
      });
    };

    const handlePointerLeave = () => {
      gsap.to(mouseParallaxRef.current, {
        x: 0,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: renderOrbit,
      });
    };

    // ResizeObserver tracks stage size changes smoothly without polling
    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    resizeObserver.observe(stage);
    stage.addEventListener('pointermove', handlePointerMove, { passive: true });
    stage.addEventListener('pointerleave', handlePointerLeave);

    updateLayout();

    return () => {
      tween.kill();
      resizeObserver.disconnect();
      stage.removeEventListener('pointermove', handlePointerMove);
      stage.removeEventListener('pointerleave', handlePointerLeave);
      gsap.killTweensOf(mouseParallaxRef.current);
    };
  }, []);

  // Card Hover Handlers: completely pause the orbit so user can effortlessly read/click cards
  const handleCardEnter = useCallback((index: number) => {
    activeHoverCountRef.current += 1;
    if (tweenRef.current && !isPaused) {
      gsap.to(tweenRef.current, {
        timeScale: CONFIG.orbit.hoverSpeed,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: true,
      });
    }
  }, [isPaused]);

  const handleCardLeave = useCallback((index: number) => {
    activeHoverCountRef.current = Math.max(0, activeHoverCountRef.current - 1);
    if (activeHoverCountRef.current === 0 && tweenRef.current && !isPaused) {
      gsap.to(tweenRef.current, {
        timeScale: 1,
        duration: 0.85,
        ease: 'power3.out',
        overwrite: true,
      });
    }

    const cardInner = cardInnersRef.current[index];
    if (cardInner) {
      cardInner.style.setProperty('--tilt-x', '0deg');
      cardInner.style.setProperty('--tilt-y', '0deg');
      cardInner.style.setProperty('--image-x', '0px');
      cardInner.style.setProperty('--image-y', '0px');
      cardInner.style.setProperty('--light-x', '0%');
    }
  }, [isPaused]);

  // Card 3D Surface Tilt on Mouse Move
  const handleCardPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>, index: number) => {
    if (e.pointerType !== 'mouse') return;
    const cardInner = cardInnersRef.current[index];
    if (!cardInner) return;

    const rect = cardInner.getBoundingClientRect();
    const px = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    const py = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));

    cardInner.style.setProperty('--tilt-x', `${(-7 * py).toFixed(3)}deg`);
    cardInner.style.setProperty('--tilt-y', `${(9 * px).toFixed(3)}deg`);
    cardInner.style.setProperty('--image-x', `${(-3 * px).toFixed(2)}px`);
    cardInner.style.setProperty('--image-y', `${(-3 * py).toFixed(2)}px`);
    cardInner.style.setProperty('--light-x', `${(12 * px).toFixed(2)}%`);
  }, []);

  const togglePause = () => {
    if (!tweenRef.current) return;
    if (isPaused) {
      tweenRef.current.play();
      setIsPaused(false);
    } else {
      tweenRef.current.pause();
      setIsPaused(true);
    }
  };

  return (
    <section 
      id="home"
      ref={heroSectionRef}
      className="relative min-h-[580px] xs:min-h-[640px] sm:min-h-[760px] h-[100svh] max-h-[940px] w-full flex items-center justify-center overflow-hidden bg-[#FCFCFA] select-none text-[#131313] touch-pan-y"
    >
      {/* ─── DYNAMIC CURSOR DOODLE TRAIL (Anubi pointerInk) ─── */}
      <PointerInk containerRef={heroSectionRef} enabled={!isPaused} />

      {/* ─── ANUBI-STYLE ORBITAL STAGE CONTAINER ─── */}
      <div 
        ref={stageRef}
        className="absolute inset-0 top-[56px] sm:top-[70px] bottom-[30px] sm:bottom-[40px] pointer-events-none flex items-center justify-center touch-pan-y"
        style={{
          perspective: '1100px',
          transformStyle: 'preserve-3d',
        }}
      >
        {CARDS.map((card, index) => {
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardNodesRef.current[index] = el;
              }}
              data-tilt={card.tilt}
              className="absolute left-0 top-0 pointer-events-auto cursor-pointer will-change-transform aspect-[1.6] w-[140px] sm:w-[170px] md:w-[195px] lg:w-[215px]"
              onPointerEnter={() => handleCardEnter(index)}
              onPointerLeave={() => handleCardLeave(index)}
              onPointerMove={(e) => handleCardPointerMove(e, index)}
              style={{
                position: 'absolute',
                opacity: isMounted ? 1 : 0,
                transition: 'opacity 0.4s ease-out',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer Card Media Surface with 3D Tilt and Specular Response */}
              <div
                ref={(el) => {
                  cardInnersRef.current[index] = el;
                }}
                className="relative w-full h-full group [transform:perspective(850px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] hover:[transform:perspective(850px)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))_translateY(-8px)_scale(var(--inspect-scale,1.1))] transition-[transform,box-shadow] duration-300 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Photo Layer with Shadow Layering */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#E8E8E4] border border-black/[0.06] shadow-[0_4px_16px_rgba(26,26,24,0.08),0_calc(9px+var(--card-depth,0.5)*15px)_calc(18px+var(--card-depth,0.5)*20px)_-12px_rgba(26,26,24,0.18)] group-hover:shadow-[0_12px_32px_rgba(26,26,24,0.14),0_28px_40px_-16px_rgba(26,26,24,0.28)] transition-shadow duration-300">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    unoptimized
                    priority={index < 4}
                    sizes="(max-width: 779px) 180px, (max-width: 1200px) 280px, 360px"
                    className="object-cover transition-transform duration-500 ease-out [translate:var(--image-x,0px)_var(--image-y,0px)] group-hover:scale-[1.07]"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  />

                  {/* Specular Light Glide across the surface */}
                  <div 
                    className="absolute -inset-[50%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 [transform:translateX(var(--light-x,0%))]"
                    style={{
                      background: 'linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.35) 49%, transparent 65%)',
                    }}
                  />
                </div>

                {/* Reveal Caption on Hover */}
                <div className="absolute left-0 right-0 top-full pt-1.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none flex items-center justify-between text-left">
                  <div className="truncate bg-[#FCFCFA]/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-stone-200/80">
                    <p className="text-[11px] font-bold text-[#131313] leading-tight truncate">
                      {card.title}
                    </p>
                    <p className="text-[9px] text-[#62625C] font-mono leading-tight truncate">
                      {card.category}
                    </p>
                  </div>
                  <span className="text-[12px] font-bold text-[#BA8E4E] ml-1 shrink-0">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── CENTRAL IDENTITY LOCKUP (Exact Anubi proportions & multiplane layers) ─── */}
      <div 
        ref={identityRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center w-[min(94vw,960px)] aspect-[1000/550] text-center z-15 will-change-transform"
      >
        {/* SKETCH LAYER: BACK (Passing behind the typography) */}
        <svg
          ref={backSketchRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-visible will-change-transform"
          viewBox="0 0 1000 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="sketch-grain-back" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.27" numOctaves="2" seed="14" result="grain" />
              <feDisplacementMap in="SourceGraphic" in2="grain" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Blue Loop - Weaving in from left */}
          <g filter="url(#sketch-grain-back)">
            <path
              data-marker-path
              d="M 229 398 C 171 469 89 437 105 327 C 121 218 209 84 271 78 C 321 76 322 144 276 200"
              stroke="#2878f0"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Yellow Sweep - Flowing underneath */}
          <g filter="url(#sketch-grain-back)">
            <path
              data-marker-path
              d="M -105 434 C 56 408 224 373 405 359"
              stroke="#ffda25"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              data-marker-path
              d="M -85 448 C -21 430 37 416 78 403"
              stroke="#ffda25"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Violet Star - Ambient floating rotation */}
          <g ref={violetStarRef} filter="url(#sketch-grain-back)" stroke="#8060f5" strokeWidth="17" strokeLinecap="butt" strokeLinejoin="round">
            <path data-marker-path d="M 543 73 L 532 160" />
            <path data-marker-path d="M 496 96 L 569 147" />
            <path data-marker-path d="M 490 137 L 579 107" />
            <path data-marker-path d="M 512 159 L 555 81" />
          </g>

          {/* Orange Curl - Playful doodle flourish */}
          <g ref={orangeCurlRef} filter="url(#sketch-grain-back)" stroke="#ff7415" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
            <path
              data-marker-path
              d="M 660 415 C 689 435 746 421 767 393 C 792 361 779 333 758 346 C 736 360 766 397 804 379 C 845 360 885 315 896 283 C 909 248 886 230 872 250 C 856 272 898 300 937 247 C 973 199 994 153 986 108"
            />
          </g>

          {/* Violet Star Small - Rhythmic twinkle */}
          <g ref={violetStarSmallRef} filter="url(#sketch-grain-back)" stroke="#8060f5" strokeWidth="12" strokeLinecap="butt" strokeLinejoin="round">
            <path data-marker-path d="M 305 417 L 293 477" />
            <path data-marker-path d="M 273 429 L 324 462" />
            <path data-marker-path d="M 269 460 L 331 437" />
            <path data-marker-path d="M 280 473 L 317 420" />
          </g>
        </svg>

        {/* SVG Filter for Tactile Organic Risograph Jitter Ripple */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="wordmark-distortion" x="-5%" y="-10%" width="110%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="8" result="noise" />
              <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* THE MASSIVE CENTRAL LOGO WORDMARK & CONTENT (Z-Index 2 - Locked to Epilogue) */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full text-center z-2 pointer-events-auto">
          <h1 
            ref={wordmarkRef}
            style={{
              filter: 'url(#wordmark-distortion)',
            }}
            className="font-epilogue font-black text-[34px] xs:text-[46px] sm:text-[78px] md:text-[110px] lg:text-[148px] tracking-[-0.045em] text-[#131313] leading-[0.86] select-none whitespace-nowrap transition-all duration-300 drop-shadow-[0_8px_30px_rgba(19,19,19,0.08)] cursor-default"
          >
            {WORDMARK_LETTERS.map((char, idx) => (
              <span
                key={idx}
                className="inline-block transition-all duration-200 ease-out hover:-translate-y-3 sm:hover:-translate-y-4 hover:scale-105 hover:text-[#BA8E4E] hover:rotate-[-2deg] active:scale-95 will-change-transform cursor-pointer"
                style={{
                  transitionDelay: `${idx * 12}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Anubi-style Quiet Subtitle Caption */}
          <p className="mt-2.5 sm:mt-3 text-[11.5px] xs:text-xs sm:text-sm md:text-base text-[#4D4D49] font-sans font-medium tracking-tight text-balance max-w-[300px] xs:max-w-md mx-auto leading-snug sm:leading-normal">
            Commercial food services, hand-graded British farm produce &amp; artisan wholesale.
          </p>

          {/* Minimalist Tactile Action Buttons */}
          <div className="mt-3.5 sm:mt-5 flex items-center justify-center gap-2.5 sm:gap-3">
            <a
              href="/#services"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FCFCFA] text-xs sm:text-sm font-sans font-semibold tracking-wide transition-all duration-200 active:scale-[0.96] touch-manipulation shadow-[0_4px_16px_rgba(19,19,19,0.2)]"
            >
              <span>What We Do</span>
              <span className="text-stone-400 group-hover:text-white transition-colors">↗</span>
            </a>

            <a
              href="/contact"
              className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white hover:bg-stone-50 text-[#131313] text-xs sm:text-sm font-sans font-semibold tracking-wide border border-stone-300 transition-all duration-200 active:scale-[0.96] touch-manipulation shadow-sm"
            >
              <span>Open Account</span>
            </a>
          </div>
        </div>

        {/* SKETCH LAYER: FRONT (Passing in front of the typography) */}
        <svg
          ref={frontSketchRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-3 overflow-visible will-change-transform"
          viewBox="0 0 1000 550"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="sketch-grain-front" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.27" numOctaves="2" seed="14" result="grain" />
              <feDisplacementMap in="SourceGraphic" in2="grain" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Blue Overprint passing in front of typography */}
          <g filter="url(#sketch-grain-front)">
            <path
              data-marker-path
              d="M 105 327 C 110 288 126 240 153 191"
              stroke="#2878f0"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Yellow Underline passing in front of the right letters */}
          <g filter="url(#sketch-grain-front)">
            <path
              data-marker-path
              d="M 807 366 C 879 374 974 371 1042 362"
              stroke="#ffda25"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* Floating Bottom Control Dock with 3D Orbit Controls */}
      <div className="absolute bottom-5 right-6 z-50 hidden sm:flex items-center">
        {/* Orbit Pause / Play Toggle */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-stone-200/90 text-stone-600 text-[11px] font-mono shadow-sm">
          <button
            onClick={togglePause}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors focus:outline-none"
          >
            {isPaused ? <Play className="w-3 h-3 text-[#BA8E4E]" /> : <Pause className="w-3 h-3 text-[#BA8E4E]" />}
            <span>{isPaused ? 'Resume' : '3D Orbit (160s)'}</span>
          </button>
        </div>
      </div>

    </section>
  );
}

