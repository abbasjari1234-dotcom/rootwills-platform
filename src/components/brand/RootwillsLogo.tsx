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
              <stop offset="35%" stopColor="#E4C767" />
              <stop offset="70%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#F5E498" />
            </linearGradient>
            <linearGradient id="emeraldInner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          {/* Outer Geometric Luxury Shield */}
          <polygon
            points="50,6 88,22 94,64 68,94 32,94 6,64 12,22"
            stroke="url(#goldLuxury)"
            strokeWidth="3.5"
            fill="none"
            opacity="0.95"
          />

          {/* Inner Emerald Accent Shield */}
          <polygon
            points="50,14 80,26 86,60 64,86 36,86 14,60 20,26"
            stroke="url(#emeraldInner)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />

          {/* Original 'R' Stem & Loop */}
          <path
            d="M 30 32 L 30 72 M 30 32 L 48 32 C 58 32 58 48 48 48 L 30 48"
            stroke="url(#goldLuxury)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Original 'R' Leg Cleanly Joined into 'W' (Single Continuous Flow, Zero Overlap) */}
          <path
            d="M 44 48 L 54 72 L 66 52 L 78 72 L 86 48"
            stroke="url(#goldLuxury)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center Diamond Sparkle */}
          <polygon
            points="50,22 53,26 50,30 47,26"
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
