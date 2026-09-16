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
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <div className="flex items-baseline justify-between">
          <label htmlFor={htmlFor} className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold">
            {label}
          </label>
          {hint && <span className="text-xs text-slate-500">{hint}</span>}
        </div>
      ) : null}
      {children}
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
}
