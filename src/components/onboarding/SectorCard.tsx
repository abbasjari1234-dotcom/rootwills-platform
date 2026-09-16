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
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cn(
        'group relative flex flex-col justify-between items-start gap-4 overflow-hidden rounded-2xl border p-5 text-left w-full min-h-[175px] transition-all duration-200',
        selected
          ? 'border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-600/20'
          : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/70 shadow-sm'
      )}
    >
      <div className="w-full flex items-center justify-between">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-200',
            selected 
              ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm' 
              : 'border-slate-200 bg-white text-slate-600 group-hover:text-slate-900 group-hover:border-slate-300'
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>

        {tag && (
          <span 
            className={cn(
              'px-2.5 py-1 text-[10px] font-mono font-bold rounded-full uppercase tracking-wider transition-colors',
              selected
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-slate-200/60 text-slate-600 border border-slate-200 group-hover:bg-slate-200'
            )}
          >
            {tag}
          </span>
        )}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between gap-2">
          <h3 className={cn(
            'text-base font-bold tracking-tight transition-colors',
            selected ? 'text-slate-900' : 'text-slate-900 group-hover:text-emerald-800'
          )}>
            {label}
          </h3>
          {selected && (
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-600 line-clamp-2">{description}</p>
      </div>

      {selected && (
        <motion.div
          layoutId="sector-selected-indicator"
          className="absolute bottom-0 left-0 h-[3px] w-full bg-emerald-600"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
}
