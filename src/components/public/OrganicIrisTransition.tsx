'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import gsap from 'gsap';

interface OrganicIrisTransitionProps {
  /** The primary background cover color (default: #131313 obsidian) */
  inkColor?: string;
  /** The organic rim accent color (default: #BA8E4E warm Rootwills gold) */
  accentColor?: string;
}

export function OrganicIrisTransition({
  inkColor = '#131313',
  accentColor = '#BA8E4E',
}: OrganicIrisTransitionProps) {
  const [phase, setPhase] = useState<'boot' | 'revealing' | 'idle'>('boot');
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const rawId = useId();
  const maskId = rawId.replace(/:/g, '');

  useEffect(() => {
    // Exact Anubi behavior: bypass on mobile, touch screens, and reduced motion for instant performance
    const isMobileOrReduced = window.matchMedia(
      '(max-width: 779px), (pointer: coarse), (prefers-reduced-motion: reduce)'
    ).matches;
    if (isMobileOrReduced) {
      setPhase('idle');
      return;
    }

    if (hasTriggeredRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const cutPaths = Array.from(
      container.querySelectorAll<SVGPathElement>('[data-iris-cut]')
    );
    if (cutPaths.length === 0) return;

    const animState = { open: 0 };
    let maxScale = 2.45;

    // Exact Anubi scale equation calibrated for 1000x1000 slice viewBox
    const computeScale = () => {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      const maxDim = Math.max(w, h);
      maxScale = 1.28 * Math.hypot((500 * w) / maxDim / 330, (500 * h) / maxDim / 270);
      updatePaths();
    };

    // Exact Anubi path transform with organic rotation (-16deg to 0deg) and aspect squash
    const updatePaths = () => {
      const open = animState.open;
      const rot = -16 * (1 - open);
      const aspectSquash = 0.86 + 0.14 * open;

      cutPaths.forEach((path, idx) => {
        const layerMultiplier = idx === 0 ? 0.978 : 1.0;
        const currentScale = maxScale * open * layerMultiplier;

        path.setAttribute(
          'transform',
          `rotate(${rot.toFixed(3)}) scale(${(currentScale * aspectSquash).toFixed(5)} ${currentScale.toFixed(5)})`
        );
      });
    };

    computeScale();
    window.addEventListener('resize', computeScale, { passive: true });

    let tween: gsap.core.Timeline | null = null;

    const triggerReveal = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setPhase('revealing');

      // Exact Anubi GSAP parameters: duration 0.68s, sine.inOut ease, 0.08s timeline delay
      tween = gsap.timeline({
        onComplete: () => {
          setPhase('idle');
          window.removeEventListener('resize', computeScale);
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
            containerRef.current.style.visibility = 'hidden';
          }
        },
      });

      tween.to(
        animState,
        {
          open: 1,
          duration: 0.68,
          ease: 'sine.inOut',
          onUpdate: updatePaths,
        },
        0.08
      );
    };

    // Double requestAnimationFrame (exact Anubi technique) to prime compositor before GSAP starts
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        triggerReveal();
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.removeEventListener('resize', computeScale);
      tween?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-phase={phase}
      aria-hidden="true"
      className="fixed inset-0 z-[9999999] overflow-hidden pointer-events-none select-none touch-none [contain:strict] [isolation:isolate]"
      style={{
        backgroundColor: 'transparent',
        display: phase === 'idle' ? 'none' : 'block',
        visibility: phase === 'idle' ? 'hidden' : 'visible',
      }}
    >
      <svg
        className="w-full h-full block"
        data-organic-iris="page"
        viewBox="-500 -500 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          {/* Edge Mask (Accent Rim): Native 1000x1000 for ultra-fast GPU rasterization */}
          <mask
            id={`${maskId}-edge`}
            maskUnits="userSpaceOnUse"
            x="-500"
            y="-500"
            width="1000"
            height="1000"
            style={{ maskType: 'luminance' }}
          >
            <rect x="-500" y="-500" width="1000" height="1000" fill="white" />
            <path
              data-iris-cut="edge"
              d="M-390-65 C-390-250-140-360 55-302 C244-246 366-156 380 38 C394 226 132 356-67 305 C-262 255-386 146-390-65Z"
              fill="black"
              transform="scale(0)"
            />
          </mask>

          {/* Ink Mask (Main Dark Curtain) */}
          <mask
            id={`${maskId}-ink`}
            maskUnits="userSpaceOnUse"
            x="-500"
            y="-500"
            width="1000"
            height="1000"
            style={{ maskType: 'luminance' }}
          >
            <rect x="-500" y="-500" width="1000" height="1000" fill="white" />
            <path
              data-iris-cut="ink"
              d="M-390-65 C-390-250-140-360 55-302 C244-246 366-156 380 38 C394 226 132 356-67 305 C-262 255-386 146-390-65Z"
              fill="black"
              transform="scale(0)"
            />
          </mask>
        </defs>

        {/* Outer Accent Rim Layer */}
        <rect
          x="-500"
          y="-500"
          width="1000"
          height="1000"
          fill={accentColor}
          mask={`url(#${maskId}-edge)`}
        />

        {/* Primary Dark Liquid Ink Curtain */}
        <rect
          x="-500"
          y="-500"
          width="1000"
          height="1000"
          fill={inkColor}
          mask={`url(#${maskId}-ink)`}
        />
      </svg>
    </div>
  );
}
