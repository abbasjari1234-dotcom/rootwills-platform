'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check, type LucideIcon } from 'lucide-react';

interface SectorCardProps {
  label: string;
  description: string;
  tag?: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
}

export function SectorCard({ label, description, tag, icon: Icon, selected, onSelect }: SectorCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative flex flex-col justify-between items-start gap-4 overflow-hidden rounded-xl border p-5 text-left w-full min-h-[175px]',
        'backdrop-blur-md transition-all duration-300 shadow-sm',
        selected
          ? 'border-champagne bg-gradient-to-b from-champagne/15 via-obsidian-900 to-obsidian-950 shadow-gold-glow ring-1 ring-champagne/50'
          : 'border-white/10 bg-obsidian-900/60 hover:border-champagne/40 hover:bg-obsidian-800/80'
      )}
    >
      {/* Ambient glow that appears on hover/selection — glassmorphism accent */}
      <div
        className={cn(
          'pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500',
          selected ? 'opacity-40 bg-champagne' : 'opacity-0 group-hover:opacity-20 bg-champagne'
        )}
      />

      <div className="w-full flex items-center justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300',
            selected 
              ? 'border-champagne bg-champagne/20 text-champagne shadow-gold-glow' 
              : 'border-white/15 bg-obsidian-800 text-cream/70 group-hover:border-champagne/40 group-hover:text-champagne'
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>

        {tag && (
          <span 
            className={cn(
              'px-2 py-0.5 text-[10px] font-mono font-medium rounded-full uppercase tracking-wider transition-colors',
              selected
                ? 'bg-champagne/25 text-champagne border border-champagne/40'
                : 'bg-white/5 text-cream/40 border border-white/5 group-hover:text-cream/70 group-hover:border-white/15'
            )}
          >
            {tag}
          </span>
        )}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between gap-2">
          <h3 className={cn(
            'font-display text-base font-semibold tracking-tight transition-colors',
            selected ? 'text-champagne' : 'text-cream group-hover:text-champagne-soft'
          )}>
            {label}
          </h3>
          {selected && (
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-champagne text-obsidian-950">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
          )}
        </div>
        <p className="mt-1 text-xs font-light leading-relaxed text-cream/60 line-clamp-2">{description}</p>
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

