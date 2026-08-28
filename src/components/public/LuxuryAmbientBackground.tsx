'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function LuxuryAmbientBackground() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* 1. Top Fixed Champagne Gold Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-champagne to-champagne-soft z-[100] origin-left shadow-[0_0_12px_rgba(228,199,103,0.8)]"
        style={{ scaleX }}
      />

      {/* 2. Luxury Geometric Orchard Trellis Pattern Layer */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40 [transform:translateZ(0)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(228, 199, 103, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(228, 199, 103, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 48px 48px',
          willChange: 'transform',
        }}
      />

      {/* 3. High-Performance Hardware-Accelerated Ambient Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden [transform:translateZ(0)]">
        <div 
          className="absolute top-[15%] left-[8%] w-[450px] h-[450px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[45%] right-[5%] w-[550px] h-[550px] rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(228, 199, 103, 0.1) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-[75%] left-[12%] w-[500px] h-[500px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)' }}
        />
      </div>
    </>
  );
}
