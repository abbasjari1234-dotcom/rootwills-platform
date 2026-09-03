'use client';

import { useEffect, RefObject } from 'react';
import { gsap } from './gsap-core';

/**
 * Clean lifecycle hook for GSAP animations with automatic context reversion.
 * Prevents memory leaks, duplicate triggers, and ghost animations in React 18.
 */
export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  animationCreator: (context: gsap.Context) => void,
  deps: any[] = []
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!scopeRef.current) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let ctx: gsap.Context | null = null;

    // Run animation inside a frame to ensure all DOM refs and children are fully rendered
    const animFrame = requestAnimationFrame(() => {
      if (!scopeRef.current) return;
      try {
        ctx = gsap.context(() => {
          animationCreator(ctx!);
        }, scopeRef);
      } catch (err) {
        console.warn('GSAP Context Init Warning:', err);
      }
    });

    return () => {
      cancelAnimationFrame(animFrame);
      if (ctx) {
        ctx.revert();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
