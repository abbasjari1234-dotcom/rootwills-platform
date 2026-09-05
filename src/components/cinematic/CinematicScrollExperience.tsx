'use client';

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap-core';
import { ActOriginHero } from './ActOriginHero';
import { ActHarvestProvenance } from './ActHarvestProvenance';
import { ActColdChainDepot } from './ActColdChainDepot';
import { ActKitchenProduct } from './ActKitchenProduct';
import { ActTrustCredentials } from './ActTrustCredentials';
import { ActFinalCTA } from './ActFinalCTA';

export function CinematicScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Small delay to ensure all children are rendered
    const initTimer = requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        // ================================================================
        //  ACT I — ORIGIN HERO
        //  Camera push-in: BG scales up, content drifts away, scene fades
        // ================================================================
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.act-origin',
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        heroTl
          // Background push-in (camera moves forward into scene)
          .to('.act-origin-bg', {
            scale: 1.3,
            y: -60,
            duration: 1,
            ease: 'none',
          })
          // Scroll indicator fades immediately
          .to(
            '.act-origin-scroll',
            {
              opacity: 0,
              y: -20,
              duration: 0.15,
            },
            0
          )
          // Content drifts upward and fades
          .to(
            '.act-origin-content',
            {
              y: -100,
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in',
            },
            0.25
          )
          // Scene exit fade to black
          .to(
            '.act-origin-exit',
            {
              opacity: 1,
              duration: 0.25,
            },
            0.75
          );

        // ================================================================
        //  ACT II — HARVEST PROVENANCE
        //  Header rises in, cards emerge from below with 3D rotation stagger
        // ================================================================
        gsap.from('.act-harvest-header', {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.act-harvest',
            start: 'top 80%',
            end: 'top 35%',
            scrub: 1,
          },
        });

        // Staggered card reveals with 3D rotation
        const harvestCards = containerRef.current?.querySelectorAll(
          '[class*="act-harvest-card-"]'
        );
        if (harvestCards) {
          harvestCards.forEach((card, i) => {
            gsap.from(card, {
              y: 100 + i * 15,
              opacity: 0,
              rotateX: 12,
              rotateY: i % 2 === 0 ? -6 : 6,
              scale: 0.88,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.act-harvest-cards',
                start: `top ${82 - i * 5}%`,
                end: `top ${42 - i * 5}%`,
                scrub: 1,
              },
            });
          });
        }

        // Featured image — parallax zoom-in
        gsap.from('.act-harvest-featured-img', {
          y: 50,
          scale: 0.9,
          rotateX: 4,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.act-harvest-featured',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        });

        // Background subtle parallax
        gsap.to('.act-harvest-bg', {
          y: -60,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.act-harvest',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ================================================================
        //  ACT III — COLD-CHAIN DEPOT
        //  Header enters, stats slide up sequentially, fleet parallax,
        //  corridor rows slide in from right
        // ================================================================
        gsap.from('.act-coldchain-header', {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.act-coldchain',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        });

        // Stats stagger up with scale
        const coldchainStats = containerRef.current?.querySelectorAll(
          '[class*="act-coldchain-stat-"]'
        );
        if (coldchainStats) {
          coldchainStats.forEach((stat, i) => {
            gsap.from(stat, {
              y: 60,
              opacity: 0,
              scale: 0.85,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.act-coldchain-stats',
                start: `top ${80 - i * 4}%`,
                end: `top ${48 - i * 4}%`,
                scrub: 1,
              },
            });
          });
        }

        // Fleet image — scale and rise with depth
        gsap.from('.act-coldchain-fleet', {
          y: 70,
          scale: 0.88,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.act-coldchain-fleet',
            start: 'top 88%',
            end: 'top 42%',
            scrub: 1,
          },
        });

        // Corridor rows slide in from right with stagger
        const corridors = containerRef.current?.querySelectorAll(
          '[class*="act-coldchain-corridor-"]'
        );
        if (corridors) {
          corridors.forEach((row, i) => {
            gsap.from(row, {
              x: 70,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.act-coldchain-corridors',
                start: `top ${82 - i * 5}%`,
                end: `top ${48 - i * 5}%`,
                scrub: 1,
              },
            });
          });
        }

        // Scanning line ambient animation
        gsap.to('.act-coldchain-scanline', {
          y: '100vh',
          repeat: -1,
          duration: 4,
          ease: 'none',
        });

        // Background parallax
        gsap.to('.act-coldchain-bg', {
          y: -50,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.act-coldchain',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ================================================================
        //  ACT IV — KITCHEN PRODUCT
        //  Header enters, cards fan out from center with 3D perspective
        // ================================================================
        gsap.from('.act-kitchen-header', {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.act-kitchen',
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        });

        // Product cards fan out with 3D rotation
        const kitchenCards = containerRef.current?.querySelectorAll(
          '[class*="act-kitchen-card-"]'
        );
        if (kitchenCards) {
          const rotateValues = [-8, 5, -5, 8];
          const xOffsets = [-40, 30, -30, 40];
          kitchenCards.forEach((card, i) => {
            gsap.from(card, {
              y: 100,
              x: xOffsets[i] || 0,
              opacity: 0,
              rotateY: rotateValues[i] || 0,
              rotateX: 8,
              scale: 0.82,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.act-kitchen-cards',
                start: `top ${84 - i * 4}%`,
                end: `top ${40 - i * 4}%`,
                scrub: 1,
              },
            });
          });
        }

        // Kitchen CTA fade in
        gsap.from('.act-kitchen-cta', {
          y: 30,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.act-kitchen-cta',
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1,
          },
        });

        // Background parallax
        gsap.to('.act-kitchen-bg', {
          y: -40,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.act-kitchen',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ================================================================
        //  ACT V — TRUST CREDENTIALS
        //  Badges materialize with 3D coin-flip rotation
        // ================================================================
        gsap.from('.act-trust-header', {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.act-trust',
            start: 'top 80%',
            end: 'top 45%',
            scrub: 1,
          },
        });

        // Badge reveals with 3D rotation stagger
        const trustBadges = containerRef.current?.querySelectorAll(
          '[class*="act-trust-badge-"]'
        );
        if (trustBadges) {
          trustBadges.forEach((badge, i) => {
            gsap.from(badge, {
              y: 70,
              opacity: 0,
              rotateY: (i % 2 === 0 ? 1 : -1) * 12,
              scale: 0.85,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.act-trust-badges',
                start: `top ${84 - i * 4}%`,
                end: `top ${46 - i * 4}%`,
                scrub: 1,
              },
            });
          });
        }

        // ================================================================
        //  ACT VI — FINAL CTA
        //  Elements rise with dramatic sequential timing
        // ================================================================
        gsap.from('.act-cta-ornament', {
          scaleY: 0,
          opacity: 0,
          transformOrigin: 'top center',
          duration: 1,
          scrollTrigger: {
            trigger: '.act-cta',
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
        });

        gsap.from('.act-cta-title', {
          y: 70,
          opacity: 0,
          scale: 0.92,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.act-cta',
            start: 'top 75%',
            end: 'top 38%',
            scrub: 1,
          },
        });

        gsap.from('.act-cta-subtitle', {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.act-cta',
            start: 'top 65%',
            end: 'top 32%',
            scrub: 1,
          },
        });

        gsap.from('.act-cta-buttons', {
          y: 35,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.act-cta',
            start: 'top 55%',
            end: 'top 28%',
            scrub: 1,
          },
        });

        gsap.from('.act-cta-stats', {
          y: 30,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.act-cta',
            start: 'top 45%',
            end: 'top 22%',
            scrub: 1,
          },
        });

        // ================================================================
        //  GLOBAL: Mouse-reactive parallax on hero
        //  Gives the hero a living, breathing quality
        // ================================================================
        const handleMouseMove = (e: MouseEvent) => {
          const heroEl = containerRef.current?.querySelector('.act-origin');
          if (!heroEl) return;
          const rect = heroEl.getBoundingClientRect();
          // Only apply when hero is visible
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;

          const centerX = (e.clientX / window.innerWidth - 0.5) * 2;
          const centerY = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to('.act-origin-bg', {
            x: centerX * -12,
            y: centerY * -8,
            duration: 1.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Store cleanup function
        (ctx as any)._mouseCleanup = () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, containerRef.current);

      // Store context for cleanup
      (containerRef as any)._gsapCtx = ctx;
    });

    return () => {
      cancelAnimationFrame(initTimer);
      const ctx = (containerRef as any)?._gsapCtx;
      if (ctx) {
        if ((ctx as any)._mouseCleanup) (ctx as any)._mouseCleanup();
        ctx.revert();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="cinematic-experience relative">
      {/* Global dot-grid texture overlay */}
      <div className="fixed inset-0 dot-grid-texture opacity-20 pointer-events-none z-[1]" />

      <ActOriginHero />

      {/* ─── Divider I→II ─── */}
      <div className="relative z-10 py-8">
        <div className="section-divider" />
      </div>

      <ActHarvestProvenance />

      {/* ─── Divider II→III ─── */}
      <div className="relative z-10 py-8">
        <div className="section-divider" />
      </div>

      <ActColdChainDepot />

      {/* ─── Divider III→IV ─── */}
      <div className="relative z-10 py-8">
        <div className="section-divider" />
      </div>

      <ActKitchenProduct />

      {/* ─── Divider IV→V ─── */}
      <div className="relative z-10 py-8">
        <div className="section-divider" />
      </div>

      <ActTrustCredentials />

      {/* ─── Divider V→VI ─── */}
      <div className="relative z-10 py-8">
        <div className="section-divider" />
      </div>

      <ActFinalCTA />
    </div>
  );
}
