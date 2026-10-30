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
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('idle');
      return;
    }

    // Strictly ensure entrance animation only runs once per mount
    if (hasTriggeredRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    const cutPaths = Array.from(
      container.querySelectorAll<SVGPathElement>('[data-iris-cut]')
    );
    if (cutPaths.length === 0) return;

    const animState = { open: 0 };
    let maxScale = 4.2;

    const computeScale = () => {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      // In preserveAspectRatio="xMidYMid slice", 1000 viewBox units fit the minimum screen dimension
      const cornerDistance = 500 * (Math.hypot(w, h) / Math.min(w, h));
      // Radius of the path is ~270 viewBox units with squash. Scale must exceed corner distance with clean margin
      maxScale = Math.max(3.6, (cornerDistance / 260) * 1.15);
      updatePaths();
    };

    const updatePaths = () => {
      const open = animState.open;
      const rot = -16 * (1 - open);
      const aspectSquash = 0.86 + 0.14 * open;

      cutPaths.forEach((path, idx) => {
        const layerMultiplier = idx === 0 ? 0.978 : 1.0;
        const currentScale = maxScale * open * layerMultiplier;

        path.setAttribute(
          'transform',
          `rotate(${rot.toFixed(2)}) scale(${(currentScale * aspectSquash).toFixed(4)} ${currentScale.toFixed(4)})`
        );
      });
    };

    computeScale();
    window.addEventListener('resize', computeScale, { passive: true });

    let tween: gsap.core.Tween | null = null;

    const triggerReveal = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setPhase('revealing');

      tween = gsap.to(animState, {
        open: 1,
        duration: 0.65,
        ease: 'power2.inOut',
        onUpdate: updatePaths,
        onComplete: () => {
          setPhase('idle');
          window.removeEventListener('resize', computeScale);
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
    };

    // Fast, immediate kickoff (35ms) on client mount - eliminates sluggish font loading wait
    const timer = window.setTimeout(triggerReveal, 35);

    return () => {
      window.clearTimeout(timer);
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
          {/* Edge Mask (Accent Rim): Sized to 2400x2400 for 4x lighter GPU rasterization */}
          <mask
            id={`${maskId}-edge`}
            maskUnits="userSpaceOnUse"
            x="-1200"
            y="-1200"
            width="2400"
            height="2400"
            style={{ maskType: 'luminance' }}
          >
            <rect x="-1200" y="-1200" width="2400" height="2400" fill="white" />
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
            x="-1200"
            y="-1200"
            width="2400"
            height="2400"
            style={{ maskType: 'luminance' }}
          >
            <rect x="-1200" y="-1200" width="2400" height="2400" fill="white" />
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
          x="-1200"
          y="-1200"
          width="2400"
          height="2400"
          fill={accentColor}
          mask={`url(#${maskId}-edge)`}
        />

        {/* Primary Dark Liquid Ink Curtain */}
        <rect
          x="-1200"
          y="-1200"
          width="2400"
          height="2400"
          fill={inkColor}
          mask={`url(#${maskId}-ink)`}
        />
      </svg>
    </div>
  );
}
