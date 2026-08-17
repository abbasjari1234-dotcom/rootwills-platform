'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SectorCardProps {
  label: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}

export function SectorCard({ label, description, icon: Icon, selected, onSelect }: SectorCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative flex flex-col items-start gap-4 overflow-hidden rounded-lg border p-6 text-left',
        'backdrop-blur-md transition-colors duration-300',
        selected
          ? 'border-champagne/70 bg-champagne/10'
          : 'border-white/10 bg-obsidian-800/40 hover:border-champagne/40 hover:bg-obsidian-800/60'
      )}
    >
      {/* Ambient glow that appears on hover/selection — glassmorphism accent */}
      <div
        className={cn(
          'pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500',
          selected ? 'opacity-40 bg-champagne' : 'opacity-0 group-hover:opacity-20 bg-champagne'
        )}
      />

      <div
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300',
          selected ? 'border-champagne bg-champagne/15 text-champagne' : 'border-white/15 text-cream/60'
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>

      <div>
        <h3 className="font-display text-lg font-medium tracking-tight text-cream">{label}</h3>
        <p className="mt-1 text-sm font-light leading-relaxed text-cream/50">{description}</p>
      </div>

      {selected && (
        <motion.div
          layoutId="sector-selected-indicator"
          className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-champagne/0 via-champagne to-champagne/0"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
