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
  const [phase, setPhase] = useState<'boot' | 'loading' | 'revealing' | 'idle'>('boot');
  const containerRef = useRef<HTMLDivElement>(null);
  const rawId = useId();
  const maskId = rawId.replace(/:/g, '');

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('idle');
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Grab both path cuts: [edge, ink]
    const cutPaths = Array.from(
      container.querySelectorAll<SVGPathElement>('[data-iris-cut]')
    );
    if (cutPaths.length === 0) return;

    const animState = { open: 0 };
    let maxScale = 4.5;

    // Accurate scale calculation ensuring the organic aperture expands completely off every corner of any screen
    const computeScale = () => {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      // In preserveAspectRatio="xMidYMid slice", the 1000-unit viewBox fits the minimum screen dimension
      const cornerDistance = 500 * (Math.hypot(w, h) / Math.min(w, h));
      // Path minimum radius is ~270 viewBox units with squash. Scale must exceed corner distance with clean margin
      maxScale = Math.max(3.8, (cornerDistance / 260) * 1.18);
      updatePaths();
    };

    // Update path transforms on every animation frame
    const updatePaths = () => {
      const open = animState.open;
      // Slight organic twist from -16deg up to 0deg as aperture widens
      const rot = -16 * (1 - open);
      // Subtle aspect squash that settles into proportion
      const aspectSquash = 0.86 + 0.14 * open;

      cutPaths.forEach((path, idx) => {
        // Index 0 is "edge" (scale 0.978), Index 1 is "ink" (scale 1.0)
        // This scale difference produces the signature organic accent rim
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

    // Begin entrance reveal
    setPhase('loading');

    let isDisposed = false;

    const triggerReveal = () => {
      if (isDisposed) return;
      setPhase('revealing');

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase('idle');
          window.removeEventListener('resize', computeScale);
        },
      });

      tl.to(
        animState,
        {
          open: 1,
          duration: 0.82,
          ease: 'power2.inOut',
          onUpdate: updatePaths,
        },
        0.05
      );
    };

    // Brief cinematic initial pause (120ms) then reveal
    const startTimer = window.setTimeout(() => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(triggerReveal, triggerReveal);
      } else {
        triggerReveal();
      }
    }, 120);

    // Fail-safe timeout to prevent overlay from ever staying stuck
    const fallbackTimer = window.setTimeout(() => {
      triggerReveal();
    }, 1500);

    return () => {
      isDisposed = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('resize', computeScale);
    };
  }, []);

  // When animation finishes, unmount overlay so pointer events and GPU resources are fully freed
  if (phase === 'idle') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-phase={phase}
      aria-hidden="true"
      className="fixed inset-0 z-[9999999] overflow-hidden pointer-events-none select-none touch-none"
      style={{
        backgroundColor: 'transparent',
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
          {/* Edge Mask (Accent Rim): Black path cuts hole; white background keeps rect opaque */}
          <mask
            id={`${maskId}-edge`}
            maskUnits="userSpaceOnUse"
            x="-2500"
            y="-2500"
            width="5000"
            height="5000"
            style={{ maskType: 'luminance' }}
          >
            <rect x="-2500" y="-2500" width="5000" height="5000" fill="white" />
            <path
              data-iris-cut="edge"
              d="M-390-65 C-390-250-140-360 55-302 C244-246 366-156 380 38 C394 226 132 356-67 305 C-262 255-386 146-390-65Z"
              fill="black"
              transform="scale(0)"
            />
          </mask>

          {/* Ink Mask (Main Dark Curtain): Black path cuts hole slightly larger than edge */}
          <mask
            id={`${maskId}-ink`}
            maskUnits="userSpaceOnUse"
            x="-2500"
            y="-2500"
            width="5000"
            height="5000"
            style={{ maskType: 'luminance' }}
          >
            <rect x="-2500" y="-2500" width="5000" height="5000" fill="white" />
            <path
              data-iris-cut="ink"
              d="M-390-65 C-390-250-140-360 55-302 C244-246 366-156 380 38 C394 226 132 356-67 305 C-262 255-386 146-390-65Z"
              fill="black"
              transform="scale(0)"
            />
          </mask>
        </defs>

        {/* Outer Accent Rim Layer (Revealed in the scale delta between edge cut and ink cut) */}
        <rect
          x="-2500"
          y="-2500"
          width="5000"
          height="5000"
          fill={accentColor}
          mask={`url(#${maskId}-edge)`}
        />

        {/* Primary Dark Liquid Ink Curtain (Cut out by ink mask to reveal the live page underneath) */}
        <rect
          x="-2500"
          y="-2500"
          width="5000"
          height="5000"
          fill={inkColor}
          mask={`url(#${maskId}-ink)`}
        />
      </svg>
    </div>
  );
}
