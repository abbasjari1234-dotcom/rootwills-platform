import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FormField({ label, htmlFor, hint, error, className, children }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label ? (
        <div className="flex items-baseline justify-between">
          <label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.14em] text-cream/80 font-bold">{label}</label>
          {hint && <span className="text-[11px] font-light text-cream/70">{hint}</span>}
        </div>
      ) : null}
      {children}
      {error && <p className="text-xs font-light text-rose-300">{error}</p>}
    </div>
  );
}
