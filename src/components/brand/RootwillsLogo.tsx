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

          {/* SEAMLESS JOINED 'RW' LIGATURE (Single Unbroken Mark, Zero Overlap) */}
          {/* R Main Spine */}
          <path
            d="M 26 28 L 26 72"
            stroke="url(#goldLuxury)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M 21 28 L 31 28" stroke="url(#goldLuxury)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 21 72 L 31 72" stroke="url(#goldLuxury)" strokeWidth="2.5" strokeLinecap="round" />

          {/* R Upper Loop */}
          <path
            d="M 26 28 L 45 28 C 55 28 55 48 45 48 L 26 48"
            stroke="url(#goldLuxury)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* THE SEAMLESS JOIN: The leg of R flows continuously into the W */}
          <path
            d="M 41 48 L 51 72 L 63 46 L 75 72 L 85 44"
            stroke="url(#goldLuxury)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

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
