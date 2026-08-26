'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareEffect?: boolean;
  depth?: number;
}

export function ThreeDTiltCard({
  children,
  className = '',
  maxTilt = 12,
  glareEffect = true,
  depth = 20,
}: ThreeDTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end organic physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPos = (e.clientX - rect.left) / width - 0.5;
    const yPos = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative [perspective:1200px] transition-all duration-300 ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
          translateZ: isHovered ? depth : 0,
        }}
        transition={{ duration: 0.2 }}
        className="relative h-full w-full rounded-2xl"
      >
        {children}

        {/* Dynamic Specular 3D Glare */}
        {glareEffect && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(228, 199, 103, 0.15) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 70%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 rounded-2xl z-20 mix-blend-overlay"
          />
        )}
      </motion.div>
    </div>
  );
}
