import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ label, hint, error, className, children }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between">
        <label className="text-xs uppercase tracking-[0.14em] text-cream/60">{label}</label>
        {hint && <span className="text-[11px] font-light text-cream/30">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs font-light text-rose-300/90">{error}</p>}
    </div>
  );
}
