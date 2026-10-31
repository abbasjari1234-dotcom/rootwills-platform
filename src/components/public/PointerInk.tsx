'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PointerInkProps {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
  className?: string;
}

const INK_COLORS = ['#2878f0', '#8060f5', '#ff7415', '#e7bd00'];
const PATH_COUNT = 36;

export function PointerInk({ containerRef, enabled = true, className = '' }: PointerInkProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg || !enabled) return;

    // Only enable on devices with a fine pointer (mouse / trackpad)
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const paths = Array.from(svg.querySelectorAll('path'));
    if (!paths.length) return;

    let lastPoint: { x: number; y: number } | null = null;
    let midPoint: { x: number; y: number } | null = null;
    let containerRect: DOMRect | null = null;
    let lastTime = 0;
    let pathIndex = 0;
    let colorIndex = 0;

    const reset = () => {
      lastPoint = null;
      midPoint = null;
      containerRect = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch / pen emulation or hovering interactive controls
      if (e.pointerType !== 'mouse') return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, input, [role="button"]')) {
        reset();
        return;
      }

      const now = e.timeStamp;
      // Throttle to ~40fps for optimal curve rendering without micro-jitter
      if (now - lastTime < 24) return;

      if (!containerRect) {
        containerRect = container.getBoundingClientRect();
      }

      const currentPoint = {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
      };

      const dist = lastPoint ? Math.hypot(currentPoint.x - lastPoint.x, currentPoint.y - lastPoint.y) : 0;

      // Start a fresh doodle stroke if cursor leaped or paused (>140ms or >90px)
      if (!lastPoint || !midPoint || now - lastTime > 140 || dist > 90) {
        lastPoint = currentPoint;
        midPoint = currentPoint;
        colorIndex = (colorIndex + 1) % INK_COLORS.length;
        lastTime = now;
        return;
      }

      // Ignore microscopic mouse jitters
      if (dist < 4) return;

      const newMid = {
        x: (lastPoint.x + currentPoint.x) / 2,
        y: (lastPoint.y + currentPoint.y) / 2,
      };

      const path = paths[pathIndex % paths.length];
      pathIndex = (pathIndex + 1) % paths.length;

      gsap.killTweensOf(path);

      // Smooth Quadratic Bezier curve from previous midpoint through lastPoint to new midpoint
      path.setAttribute(
        'd',
        `M ${midPoint.x.toFixed(1)} ${midPoint.y.toFixed(1)} Q ${lastPoint.x.toFixed(1)} ${lastPoint.y.toFixed(1)} ${newMid.x.toFixed(1)} ${newMid.y.toFixed(1)}`
      );
      path.setAttribute('stroke', INK_COLORS[colorIndex]);
      path.setAttribute('stroke-width', String(Math.min(5, Math.max(2.2, 1.9 + 0.045 * dist))));

      // Organic ink fadeout
      gsap.fromTo(
        path,
        { opacity: 0.65 },
        {
          opacity: 0,
          duration: 0.72,
          ease: 'power2.in',
          overwrite: true,
        }
      );

      lastPoint = currentPoint;
      midPoint = newMid;
      lastTime = now;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', reset);
    window.addEventListener('resize', reset);
    window.addEventListener('scroll', reset, { passive: true });

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', reset);
      window.removeEventListener('resize', reset);
      window.removeEventListener('scroll', reset);
      gsap.killTweensOf(paths);
      paths.forEach((p) => {
        p.style.opacity = '0';
      });
    };
  }, [containerRef, enabled]);

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      data-pointer-ink="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      {Array.from({ length: PATH_COUNT }).map((_, i) => (
        <path key={i} opacity="0" />
      ))}
    </svg>
  );
}
