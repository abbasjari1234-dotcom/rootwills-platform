'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorVariant = 'default' | 'pointer' | 'button' | 'view' | 'drag' | 'text';

export function LuxuryAnimatedCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth elastic physics for the trailing gold ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Detect touch screens or reduced motion
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    // 2. Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Detect hover target attributes or tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveParent = target.closest(
        'button, a, input, select, textarea, [role="button"], [data-cursor], .cursor-pointer'
      ) as HTMLElement | null;

      if (interactiveParent) {
        const customCursor = interactiveParent.getAttribute('data-cursor');
        const customText = interactiveParent.getAttribute('data-cursor-text');

        if (customCursor === 'view' || customText === 'VIEW') {
          setVariant('view');
          setCursorText(customText || 'VIEW');
        } else if (customCursor === 'drag') {
          setVariant('drag');
          setCursorText(customText || 'DRAG');
        } else if (interactiveParent.tagName === 'BUTTON' || interactiveParent.getAttribute('role') === 'button') {
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
    };

    // 3. Mouse Down & Up (Click reaction)
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // 4. Window Visibility
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  // Variant size & styling definitions
  const getRingVariants = () => {
    switch (variant) {
      case 'button':
        return {
          width: 52,
          height: 52,
          x: '-50%',
          y: '-50%',
          borderColor: 'rgba(228, 199, 103, 0.95)',
          backgroundColor: 'rgba(228, 199, 103, 0.12)',
          boxShadow: '0 0 25px rgba(228, 199, 103, 0.35)',
        };
      case 'pointer':
        return {
          width: 44,
          height: 44,
          x: '-50%',
          y: '-50%',
          borderColor: 'rgba(228, 199, 103, 0.85)',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          boxShadow: '0 0 20px rgba(228, 199, 103, 0.25)',
        };
      case 'view':
      case 'drag':
        return {
          width: 72,
          height: 72,
          x: '-50%',
          y: '-50%',
          borderColor: 'rgba(228, 199, 103, 0.95)',
          backgroundColor: 'rgba(2, 23, 16, 0.85)',
          boxShadow: '0 0 35px rgba(228, 199, 103, 0.4), inset 0 0 15px rgba(16, 185, 129, 0.3)',
        };
      default:
        return {
          width: 32,
          height: 32,
          x: '-50%',
          y: '-50%',
          borderColor: 'rgba(228, 199, 103, 0.55)',
          backgroundColor: 'rgba(228, 199, 103, 0.03)',
          boxShadow: '0 0 12px rgba(228, 199, 103, 0.15)',
        };
    }
  };

  const isExpanded = variant === 'view' || variant === 'drag';

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Precision Center Point (0ms direct tracking) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-champagne-soft shadow-[0_0_8px_rgba(228,199,103,0.9)] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isClicked ? 0.6 : isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* 2. Trailing Champagne Gold Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-champagne/60 backdrop-blur-[1px] pointer-events-none flex items-center justify-center text-center font-mono font-bold select-none"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          ...getRingVariants(),
          scale: isClicked ? 0.85 : 1,
        }}
        transition={{
          width: { duration: 0.22, ease: 'easeOut' },
          height: { duration: 0.22, ease: 'easeOut' },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
          scale: { duration: 0.12 },
        }}
      >
        {/* Context Label ("VIEW", "DRAG") */}
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] uppercase tracking-widest text-champagne font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
