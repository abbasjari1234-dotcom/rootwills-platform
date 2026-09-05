'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TiltOptions {
  maxRotation?: number;
  perspective?: number;
  scale?: number;
  duration?: number;
  ease?: string;
}

export function use3dTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  
  const {
    maxRotation = 15,
    perspective = 1000,
    scale = 1.05,
    duration = 0.5,
    ease = 'power2.out'
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Only apply on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    gsap.set(el, { transformPerspective: perspective });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate cursor distance from center as a value from -1 to 1
      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);
      
      // The further the mouse is from the center, the more it rotates
      // Invert Y axis for natural tilt feel (mouse up = tilt up)
      gsap.to(el, {
        rotateY: mouseX * maxRotation,
        rotateX: -mouseY * maxRotation,
        scale: scale,
        duration,
        ease,
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      // Reset position when mouse leaves
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        overwrite: 'auto'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotation, perspective, scale, duration, ease]);

  return ref;
}
