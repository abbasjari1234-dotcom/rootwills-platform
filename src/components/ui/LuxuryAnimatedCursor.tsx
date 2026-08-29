'use client';

import React, { useEffect, useRef, useState } from 'react';

export function LuxuryAnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<'default' | 'pointer' | 'button' | 'view' | 'drag'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // 1. Disable on touch devices or reduced motion
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasTouch) return;

    setMounted(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let hasMoved = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringX = mouseX;
        ringY = mouseY;
      }

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      // Check interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'button, a, input, select, textarea, [role="button"], [data-cursor], .cursor-pointer'
        ) as HTMLElement | null;

        if (interactive) {
          const customCursor = interactive.getAttribute('data-cursor');
          const customText = interactive.getAttribute('data-cursor-text');

          if (customCursor === 'view' || customText === 'VIEW') {
            setVariant('view');
            setCursorText(customText || 'VIEW');
          } else if (customCursor === 'drag') {
            setVariant('drag');
            setCursorText(customText || 'DRAG');
          } else if (interactive.tagName === 'BUTTON' || interactive.getAttribute('role') === 'button') {
            setVariant('button');
            setCursorText('');
          } else {
            setVariant('pointer');
            setCursorText('');
          }
        } else {
          setVariant('default');
          setCursorText('');
        }
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible = true;
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    // Smooth 120 FPS Animation Loop
    const loop = () => {
      // Direct tracking dot
      if (dotRef.current && hasMoved) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Trailing spring-lerp ring
      if (ringRef.current && hasMoved) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!mounted) return null;

  // Compute ring style classes depending on state
  let ringClasses = 'w-8 h-8 border border-champagne/60 bg-champagne/5 shadow-[0_0_15px_rgba(228,199,103,0.2)]';
  if (variant === 'button') {
    ringClasses = 'w-12 h-12 border-2 border-champagne bg-champagne/15 shadow-[0_0_25px_rgba(228,199,103,0.45)]';
  } else if (variant === 'pointer') {
    ringClasses = 'w-11 h-11 border border-champagne bg-emerald-500/10 shadow-[0_0_20px_rgba(228,199,103,0.3)]';
  } else if (variant === 'view' || variant === 'drag') {
    ringClasses = 'w-16 h-16 border-2 border-champagne bg-[#021710]/95 shadow-[0_0_35px_rgba(228,199,103,0.5),inset_0_0_15px_rgba(16,185,129,0.3)]';
  }

  const isView = variant === 'view' || variant === 'drag';

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* 1. Precision Center Point (0ms Instant Track) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-champagne-soft shadow-[0_0_10px_rgba(228,199,103,1)] transition-opacity duration-200 pointer-events-none will-change-transform ${
          isView ? 'w-0 h-0 opacity-0' : isClicked ? 'w-1 h-1 scale-75' : 'w-1.5 h-1.5'
        }`}
        style={{ opacity: 0 }}
      />

      {/* 2. Trailing Smooth Spring Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center text-center select-none will-change-transform transition-all duration-200 ease-out ${ringClasses} ${
          isClicked ? 'scale-90' : 'scale-100'
        }`}
        style={{ opacity: 0 }}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[10px] font-mono font-bold tracking-widest text-champagne uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] animate-fade-in"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
