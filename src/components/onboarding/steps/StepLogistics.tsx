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
        <p className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">Step 3 of 4</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Delivery &amp; Kitchen Logistics
        </h2>
        <p className="text-sm text-slate-600">
          We route your deliveries to the nearest regional depot and schedule your morning driver window.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <FormField label="Primary Delivery Postcode *" htmlFor="postcode" error={errors.postcode?.message}>
          <input
            id="postcode"
            {...register('postcode')}
            autoComplete="postal-code"
            aria-label="Primary Delivery Postcode"
            onBlur={handlePostcodeBlur}
            placeholder="e.g. B2 5BN"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-mono uppercase font-bold"
          />
        </FormField>

        {/* Depot Routing Preview Badge */}
        <div className="min-h-[36px] flex items-center gap-2 text-xs font-mono">
          {checking ? (
            <div className="flex items-center gap-2 text-emerald-700">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
              <span>Locating nearest regional cold-chain depot...</span>
            </div>
          ) : depotPreview ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs w-full">
              <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Assigned Depot: <strong className="text-slate-900">{depotPreview}</strong> (05:30 - 08:00 AM SLA)</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">Enter postcode to verify assigned fulfilment hub</span>
          )}
        </div>

        <FormField label="Driver &amp; Kitchen Access Notes" htmlFor="deliveryNotes" hint="Optional">
          <textarea
            id="deliveryNotes"
            aria-label="Driver and Kitchen Access Notes"
            {...register('deliveryNotes')}
            rows={3}
            placeholder="e.g. Rear service entrance on Needlers Alley. Keyholder early morning walk-in drop."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all resize-none font-sans"
          />
        </FormField>
      </div>

      <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-100">
        <button 
          type="button" 
          onClick={goBack} 
          className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs font-mono transition-colors"
        >
          &larr; Back
        </button>
        <button 
          type="submit" 
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
        >
          <span>Continue to Credit Terms</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
