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
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const logoGraphic = (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      {/* Pure Luxury Monogram Crest (Interlocking R & W in Pure Champagne Gold on Deep Emerald Shield) */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-br from-emerald-900 via-obsidian-950 to-emerald-950 border border-champagne/40 p-1.5 shadow-[0_0_20px_rgba(228,199,103,0.25)] group-hover:shadow-[0_0_30px_rgba(228,199,103,0.5)] group-hover:border-champagne transition-all duration-500 shrink-0 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7D6" />
              <stop offset="35%" stopColor="#E4C767" />
              <stop offset="70%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#F5E498" />
            </linearGradient>
            <linearGradient id="emeraldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          {/* Outer Geometric Luxury Octagonal Shield Frame */}
          <polygon
            points="50,4 88,20 96,62 70,94 30,94 4,62 12,20"
            stroke="url(#goldMetallic)"
            strokeWidth="3.5"
            fill="none"
            opacity="0.9"
          />

          {/* Inner Accent Line */}
          <polygon
            points="50,11 81,24 88,59 66,87 34,87 12,59 19,24"
            stroke="url(#emeraldTrim)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />

          {/* Sleek Interlocking 'R' and 'W' (Pure Gold, Clean Vector) */}
          {/* 'R' Stem & Loop */}
          <path
            d="M 32 30 L 32 74 M 32 30 L 52 30 C 62 30 62 48 52 48 L 32 48 M 48 48 L 62 74"
            stroke="url(#goldMetallic)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interlocking 'W' Base */}
          <path
            d="M 44 48 L 54 74 L 66 54 L 78 74 L 86 48"
            stroke="url(#goldMetallic)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* Center Diamond Sparkle */}
          <polygon
            points="50,22 53,26 50,30 47,26"
            fill="url(#goldMetallic)"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-display ${textSizes[size]} font-bold tracking-wider text-cream group-hover:text-champagne transition-colors leading-none`}
            >
              ROOTWILLS
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-champagne/90 font-bold mt-1">
            Wholesale &bull; Foodservice
          </span>
        </div>
      )}
    </div>
  );

  if (!href) return logoGraphic;

  return (
    <Link href={href} className="inline-block focus:outline-none">
      {logoGraphic}
    </Link>
  );
}
