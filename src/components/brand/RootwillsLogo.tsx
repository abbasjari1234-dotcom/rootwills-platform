'use client';

import React from 'react';
import Link from 'next/link';

interface RootwillsLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withLink?: boolean;
}

export function RootwillsLogo({
  className = '',
  variant = 'full',
  size = 'md',
  withLink = true,
}: RootwillsLogoProps) {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base', subtext: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 38, text: 'text-xl', subtext: 'text-[9px]', gap: 'gap-2.5' },
    lg: { icon: 48, text: 'text-2xl', subtext: 'text-[10px]', gap: 'gap-3' },
    xl: { icon: 60, text: 'text-3xl', subtext: 'text-xs', gap: 'gap-3.5' },
  };

  const { icon: iconSize, text: textSize, subtext: subtextSize, gap } = sizeMap[size];

  const LogoIcon = (
    <div 
      className="relative flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300"
      style={{ width: iconSize, height: iconSize }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(228,199,103,0.3)]"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id="rwGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="35%" stopColor="#E4C767" />
            <stop offset="70%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8C6E12" />
          </linearGradient>

          {/* Royal Emerald Accent Gradient */}
          <linearGradient id="rwEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          {/* Deep Obsidian Background Gradient */}
          <linearGradient id="rwBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F241A" />
            <stop offset="100%" stopColor="#050B08" />
          </linearGradient>

          {/* Subtle Inner Shadow Filter */}
          <filter id="rwGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#E4C767" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Shield / Hexagonal Crest Container */}
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill="url(#rwBgGrad)"
          stroke="url(#rwGoldGrad)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Inner Subtle Hex Border */}
        <polygon
          points="50,11 85,29 85,71 50,89 15,71 15,29"
          fill="none"
          stroke="url(#rwEmeraldGrad)"
          strokeWidth="1.5"
          opacity="0.6"
          strokeLinejoin="round"
        />

        {/* Organic Crown Leaf Crest at Top */}
        <path
          d="M50 18 C54 23 58 25 62 26 C58 29 54 30 50 34 C46 30 42 29 38 26 C42 25 46 23 50 18 Z"
          fill="url(#rwEmeraldGrad)"
        />
        <circle cx="50" cy="20" r="2" fill="url(#rwGoldGrad)" />

        {/* Interlocking 'R' & 'W' Geometric Monogram */}
        {/* Letter 'R' (Left to Center) */}
        <path
          d="M32 35 L32 75 M32 35 L48 35 C56 35 56 49 48 49 L32 49 M45 49 L55 75"
          stroke="url(#rwGoldGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#rwGlow)"
        />

        {/* Letter 'W' (Center to Right interlocking) */}
        <path
          d="M50 45 L58 75 L67 52 L76 75 L84 45"
          stroke="url(#rwGoldGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Small Emerald Center Sprout Dot */}
        <circle cx="67" cy="48" r="2.5" fill="url(#rwEmeraldGrad)" />
      </svg>
    </div>
  );

  const LogoText = (
    <div className="flex flex-col text-left">
      <div className={`font-display font-bold tracking-[0.08em] text-cream leading-none ${textSize} flex items-center gap-1.5`}>
        <span className="gold-gradient-text">ROOTWILLS</span>
      </div>
      <div className={`font-mono uppercase tracking-[0.28em] text-emerald-400 font-semibold mt-1 ${subtextSize} flex items-center gap-1.5`}>
        <span>Wholesale &bull; Foodservice</span>
      </div>
    </div>
  );

  const content = (
    <div className={`inline-flex items-center ${gap} ${className} group select-none`}>
      {LogoIcon}
      {variant !== 'icon' && LogoText}
    </div>
  );

  if (!withLink) {
    return content;
  }

  return (
    <Link href="/" className="hover:opacity-95 transition-opacity">
      {content}
    </Link>
  );
}
