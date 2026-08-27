'use client';

import React from 'react';
import Link from 'next/link';

interface RootwillsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'full' | 'icon' | 'compact';
  href?: string;
}

export function RootwillsLogo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'full',
  href = '/',
}: RootwillsLogoProps) {
  const iconSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const logoGraphic = (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Refined Pure Gold British Heraldic Monogram Crest */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-br from-emerald-950 via-obsidian-950 to-emerald-900 border border-champagne/60 p-1.5 shadow-[0_0_25px_rgba(228,199,103,0.35)] group-hover:shadow-[0_0_35px_rgba(228,199,103,0.6)] group-hover:border-champagne transition-all duration-500 shrink-0 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldLuxury" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="25%" stopColor="#F3DC82" />
              <stop offset="60%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#E4C767" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE899" />
              <stop offset="100%" stopColor="#A88214" />
            </linearGradient>
            <linearGradient id="emeraldShield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#053326" />
              <stop offset="100%" stopColor="#02140E" />
            </linearGradient>
          </defs>

          {/* Outer Geometric Luxury Shield */}
          <polygon
            points="50,6 88,22 94,64 68,94 32,94 6,64 12,22"
            fill="url(#emeraldShield)"
            stroke="url(#goldLuxury)"
            strokeWidth="2.8"
            opacity="0.95"
          />

          {/* Inner Emerald Accent Ring */}
          <polygon
            points="50,13 81,25 86,59 64,86 36,86 14,59 19,25"
            stroke="#10B981"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.55"
          />

          {/* Monogram: 'W' (Intertwined Base Layer) */}
          <path
            d="M 44 42 L 54 74 L 65 48 L 76 74 L 86 42"
            stroke="url(#goldAccent)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Monogram: 'R' (Foreground Heraldic Layer with Optical Depth Cut) */}
          {/* R Main Spine & Serifs */}
          <path
            d="M 28 26 L 28 74"
            stroke="url(#goldLuxury)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path d="M 23 26 L 33 26" stroke="url(#goldLuxury)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 23 74 L 33 74" stroke="url(#goldLuxury)" strokeWidth="2.5" strokeLinecap="round" />

          {/* R Upper Loop */}
          <path
            d="M 28 26 L 46 26 C 56 26 56 46 46 46 L 28 46"
            stroke="url(#goldLuxury)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Clean Optical Clearance Mask for Intertwine */}
          <path
            d="M 42 46 Q 48 58 60 74"
            stroke="#053326"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* R Graceful Sweep Leg */}
          <path
            d="M 42 46 Q 48 58 60 74"
            stroke="url(#goldLuxury)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M 55 74 L 64 74" stroke="url(#goldLuxury)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Royal Diamond Finial at Crest Apex */}
          <polygon
            points="50,17 53,22 50,26 47,22"
            fill="url(#goldLuxury)"
          />
        </svg>
      </div>

      {/* Brand Wordmark & Subtitle */}
      {showText && variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-black tracking-[0.18em] uppercase ${textSizes[size]} bg-gradient-to-r from-cream via-champagne-soft to-champagne bg-clip-text text-transparent group-hover:from-champagne group-hover:to-white transition-all`}
            >
              ROOTWILLS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-champagne/90 font-bold">
              Fresh Food &bull; Wholesale
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        {logoGraphic}
      </Link>
    );
  }

  return logoGraphic;
}
