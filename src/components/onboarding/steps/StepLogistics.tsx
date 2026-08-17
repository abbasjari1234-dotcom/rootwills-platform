'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Loader2, ArrowRight } from 'lucide-react';
import { stepLogisticsSchema, type StepLogisticsValues } from '@/types/onboarding';
import { useOnboardingStore } from '@/store/onboarding-store';
import { FormField } from '@/components/onboarding/FormField';

export function StepLogistics() {
  const { logistics, setLogistics, goNext, goBack } = useOnboardingStore();
  const [depotPreview, setDepotPreview] = useState<string | null>(
    logistics.postcode ? 'Birmingham Central Fulfilment Hub (Digbeth)' : null
  );
  const [checking, setChecking] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepLogisticsValues>({
    resolver: zodResolver(stepLogisticsSchema),
    defaultValues: { 
      postcode: logistics.postcode ?? '', 
      deliveryNotes: logistics.deliveryNotes ?? '' 
    },
  });

  const postcode = watch('postcode');

  function handlePostcodeBlur() {
    if (!postcode || postcode.length < 3) return;
    setChecking(true);
    setTimeout(() => {
      const upper = postcode.toUpperCase();
      let name = 'Birmingham Central Hub (Digbeth HQ)';
      if (upper.startsWith('CV')) name = 'Coventry & Warwickshire Hub';
      else if (upper.startsWith('LE') || upper.startsWith('NG')) name = 'East Midlands Hub (Leicester)';
      else if (upper.startsWith('W') || upper.startsWith('EC') || upper.startsWith('SW')) name = 'Greater London Gateway';
      
      setDepotPreview(name);
      setChecking(false);
    }, 300);
  }

  function onSubmit(values: StepLogisticsValues) {
    setLogistics(values);
    goNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne font-bold">Step 3 of 4</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
          Delivery & Kitchen Logistics
        </h2>
        <p className="text-xs text-cream/60">
          We route your deliveries to the nearest regional depot and schedule your morning driver window.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <FormField label="Primary Delivery Postcode *" error={errors.postcode?.message}>
          <input
            {...register('postcode')}
            onBlur={handlePostcodeBlur}
            placeholder="e.g. B2 5BN"
            className="onboarding-input font-mono uppercase font-bold"
          />
        </FormField>

        {/* Depot Routing Preview Badge */}
        <div className="min-h-[36px] flex items-center gap-2 text-xs font-mono">
          {checking ? (
            <div className="flex items-center gap-2 text-champagne">
              <Loader2 className="h-4 w-4 animate-spin text-champagne" />
              <span>Locating nearest regional cold-chain depot…</span>
            </div>
          ) : depotPreview ? (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs w-full">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Assigned Depot: <strong className="text-cream">{depotPreview}</strong> (06:00 - 08:30 AM SLA)</span>
            </div>
          ) : (
            <span className="text-[11px] text-cream/40">Enter postcode to verify assigned fulfilment hub</span>
          )}
        </div>

        <FormField label="Driver & Kitchen Access Notes" hint="Optional">
          <textarea
            {...register('deliveryNotes')}
            rows={3}
            placeholder="e.g. Rear service entrance on Needlers Alley. Keyholder early morning cold room drop."
            className="onboarding-input resize-none"
          />
        </FormField>
      </div>

      <div className="pt-4 flex items-center justify-between gap-4">
        <button type="button" onClick={goBack} className="onboarding-btn-ghost text-xs">
          &larr; Back
        </button>
        <button type="submit" className="onboarding-btn-primary text-xs shadow-gold-glow flex items-center gap-2">
          <span>Continue to Credit Terms</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
