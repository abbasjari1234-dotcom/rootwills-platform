'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RootwillsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'full' | 'icon' | 'compact';
  href?: string;
  theme?: 'dark' | 'light';
}

export function RootwillsLogo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'full',
  href = '/',
  theme = 'dark',
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
      {/* Official Circular Seal Logo with Crisp Transparency */}
      <div
        className={`relative ${iconSizes[size]} rounded-full overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105`}
      >
        <Image
          src="/images/branded/rootwills_logo_seal.png"
          alt="Rootwills"
          fill
          sizes="96px"
          className="object-contain"
          priority
        />
      </div>

      {/* Brand Wordmark & Subtitle */}
      {showText && variant !== 'icon' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-black tracking-[0.18em] uppercase ${textSizes[size]} ${
                theme === 'light'
                  ? 'text-slate-900 group-hover:text-emerald-700 transition-colors'
                  : 'bg-gradient-to-r from-cream via-champagne-soft to-champagne bg-clip-text text-transparent group-hover:from-champagne group-hover:to-white transition-all'
              }`}
            >
              ROOTWILLS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-[9.5px] uppercase tracking-[0.28em] font-bold ${
                theme === 'light' ? 'text-emerald-700' : 'text-champagne/90'
              }`}
            >
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
