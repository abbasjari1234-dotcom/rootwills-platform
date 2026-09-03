'use client';

import { useLayoutEffect, useEffect, RefObject } from 'react';
import { gsap } from './gsap-core';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Clean lifecycle hook for GSAP animations with automatic context reversion.
 * Prevents memory leaks, duplicate triggers, and ghost animations in React 18 StrictMode.
 */
export function useGsapContext(
  scopeRef: RefObject<HTMLElement | null>,
  animationCreator: (context: gsap.Context) => void,
  deps: any[] = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!scopeRef.current) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      animationCreator(ctx);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, deps);
}
