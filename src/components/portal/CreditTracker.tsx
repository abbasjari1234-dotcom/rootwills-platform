interface CreditTrackerProps {
  creditLimit: number;
  creditUsed: number;
  tier: string;
}

export function CreditTracker({ creditLimit, creditUsed, tier }: CreditTrackerProps) {
  const available = Math.max(creditLimit - creditUsed, 0);
  const usedPercent = creditLimit > 0 ? Math.min((creditUsed / creditLimit) * 100, 100) : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-bold">
          Trade Credit &bull; {tier}
        </p>
        <span className="text-xs font-mono text-slate-500">
          £{creditUsed.toFixed(2)} of £{creditLimit.toFixed(2)}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            usedPercent > 85 ? 'bg-rose-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${usedPercent}%` }}
        />
      </div>

      <div>
        <p className="font-sans text-2xl font-bold text-slate-900">£{available.toFixed(2)}</p>
        <p className="text-xs text-slate-500">available purchasing power</p>
      </div>
    </div>
  );
}
