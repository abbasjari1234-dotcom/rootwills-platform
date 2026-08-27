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
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.15), transparent 45%),
            radial-gradient(circle at 85% 60%, rgba(228, 199, 103, 0.12), transparent 40%),
            radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.12), transparent 40%),
            linear-gradient(to right, rgba(228, 199, 103, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(228, 199, 103, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* 3. Floating Dew Particles / Light Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />
        <div className="absolute top-[45%] right-[5%] w-96 h-96 rounded-full bg-champagne/8 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[75%] left-[12%] w-80 h-80 rounded-full bg-emerald-400/10 blur-[110px] animate-pulse" style={{ animationDuration: '8s' }} />
      </div>
    </>
  );
}
