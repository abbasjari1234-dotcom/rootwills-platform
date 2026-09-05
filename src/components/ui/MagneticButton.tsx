'use client';

import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: React.ElementType;
  href?: string;
}

export function MagneticButton({ 
  children, 
  strength = 30, 
  className = '', 
  as: Component = 'button',
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Move element towards mouse
    const moveX = ((clientX - centerX) / width) * strength;
    const moveY = ((clientY - centerY) / height) * strength;
    
    controls.start({
      x: moveX,
      y: moveY,
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    controls.start({
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
    });
  };

  return (
    <div 
      ref={ref}
      className={`magnetic relative inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div animate={controls} className="w-full h-full">
        <Component {...(props as any)} className={`w-full h-full ${(props as any).className || ''}`}>
          {children}
        </Component>
      </motion.div>
    </div>
  );
}
