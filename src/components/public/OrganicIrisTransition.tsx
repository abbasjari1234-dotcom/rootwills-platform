'use client';

import React, { useEffect, useRef, useState, useId } from 'react';
import gsap from 'gsap';

interface OrganicIrisTransitionProps {
  /** The primary background cover color (default: #141414) */
  inkColor?: string;
  /** The organic rim accent color (default: #BA8E4E warm Rootwills gold / #646464) */
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
    let maxScale = 2.8;

    // Dynamic scale calculation based on viewport aspect ratio
    const computeScale = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const maxDim = Math.max(w, h);
      // Ensures the organic shape (with radius ~390px in 1000px box) expands past every screen corner
      maxScale = 1.18 * Math.hypot((500 * w) / maxDim / 330, (500 * h) / maxDim / 270);
      updatePaths();
    };

    // Update path transforms on every animation frame
    const updatePaths = () => {
      const open = animState.open;
      // Slight organic twist from -16deg up to 0deg as aperture widens
      const rot = -16 * (1 - open);
      // Slight aspect squash that settles into proportion
      const aspectSquash = 0.86 + 0.14 * open;

      cutPaths.forEach((path, idx) => {
        // Index 0 is "edge" (scale 0.978), Index 1 is "ink" (scale 1.0)
        // This slight scale offset creates the signature thin accent rim
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

    const triggerReveal = () => {
      setPhase('revealing');

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase('idle');
          window.removeEventListener('resize', computeScale);
        },
      });

      tl.to(animState, {
        open: 1,
        duration: 0.76,
        ease: 'sine.inOut',
        onUpdate: updatePaths,
      }, 0.08);
    };

    // Give a brief cinematic pause (150ms) on boot/refresh for the dark curtain effect,
    // then reveal as fonts/DOM ready
    const timer = window.setTimeout(() => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(triggerReveal, triggerReveal);
      } else {
        triggerReveal();
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', computeScale);
    };
  }, []);

  // When animation finishes, completely hide overlay to avoid pointer interception or GPU cost
  if (phase === 'idle') {
    return null;
  }

  return (
    <div
      ref={containerRef}
      data-phase={phase}
      aria-hidden="true"
      className="fixed inset-0 z-[9999999] overflow-hidden pointer-events-auto select-none touch-none"
      style={{
        backgroundColor: inkColor,
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
          {/* Edge Mask (Accent Rim) */}
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

          {/* Ink Mask (Main Dark Body) */}
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

        {/* Outer Accent Rim Layer (Revealed when edge cut is slightly smaller than ink cut) */}
        <rect
          x="-500"
          y="-500"
          width="1000"
          height="1000"
          fill={accentColor}
          mask={`url(#${maskId}-edge)`}
        />

        {/* Primary Dark Liquid Ink Layer */}
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
