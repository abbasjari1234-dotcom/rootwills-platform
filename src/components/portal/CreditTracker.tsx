interface CreditTrackerProps {
  creditLimit: number;
  creditUsed: number;
  tier: string;
}

export function CreditTracker({ creditLimit, creditUsed, tier }: CreditTrackerProps) {
  const available = Math.max(creditLimit - creditUsed, 0);
  const usedPercent = creditLimit > 0 ? Math.min((creditUsed / creditLimit) * 100, 100) : 0;

  return (
    <div className="rounded-lg border border-white/10 bg-obsidian-800/40 p-6">
      <div className="flex items-baseline justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-champagne">Trade credit · {tier}</p>
        <span className="text-xs font-light text-cream/40">
          £{creditUsed.toFixed(2)} of £{creditLimit.toFixed(2)}
        </span>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-champagne transition-all duration-700"
          style={{ width: `${usedPercent}%` }}
        />
      </div>

      <p className="mt-4 font-display text-2xl font-light text-cream">£{available.toFixed(2)}</p>
      <p className="text-xs font-light text-cream/40">available to spend</p>
    </div>
  );
}
