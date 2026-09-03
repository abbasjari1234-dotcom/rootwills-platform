'use client';

import React, { useEffect } from 'react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Only enable on desktop pointer-fine viewports
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    let isCancelled = false;
    let lenisInstance: any = null;
    let tickerCb: any = null;

    Promise.all([
      import('lenis'),
      import('@/lib/animations/gsap-core'),
    ]).then(([LenisModule, GsapCore]) => {
      if (isCancelled) return;

      try {
        const LenisConstructor = LenisModule.default || LenisModule;
        const { gsap, ScrollTrigger } = GsapCore;

        lenisInstance = new LenisConstructor({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
        });

        lenisInstance.on('scroll', ScrollTrigger.update);

        tickerCb = (time: number) => {
          if (lenisInstance) {
            lenisInstance.raf(time * 1000);
          }
        };

        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        console.warn('Lenis smooth scrolling bypassed:', err);
      }
    }).catch(() => {
      // Fallback to native smooth scrolling
    });

    return () => {
      isCancelled = true;
      if (tickerCb) {
        import('@/lib/animations/gsap-core').then(({ gsap }) => {
          gsap.ticker.remove(tickerCb);
        }).catch(() => {});
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
