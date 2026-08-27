'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepBusinessDetailsSchema, type StepBusinessDetailsValues } from '@/types/onboarding';
import { useOnboardingStore } from '@/store/onboarding-store';
import { FormField } from '@/components/onboarding/FormField';
import { Building2, ArrowRight } from 'lucide-react';

export function StepBusinessDetails() {
  const { details, setDetails, goNext, goBack } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepBusinessDetailsValues>({
    resolver: zodResolver(stepBusinessDetailsSchema) as any,
    defaultValues: {
      organizationName: details.organizationName ?? '',
      companyRegNumber: details.companyRegNumber ?? '',
      weeklyCovers: details.weeklyCovers,
      estimatedWeeklySpend: details.estimatedWeeklySpend ?? 2500,
      multiLocation: details.multiLocation ?? false,
      siteCount: details.siteCount ?? 1,
    },
  });

  const multiLocation = watch('multiLocation');

  function onSubmit(values: StepBusinessDetailsValues) {
    setDetails(values);
    goNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne font-bold">Step 2 of 4</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
          Tell Us About Your Establishment
        </h2>
        <p className="text-xs text-cream/60">
          This helps our commercial sales desk structure your wholesale contract terms.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Trading / Business Name *"
          error={errors.organizationName?.message}
          className="sm:col-span-2"
        >
          <input
            {...register('organizationName')}
            placeholder="e.g. The Grand Kitchen / Heritage Bistro Ltd"
            className="onboarding-input"
          />
        </FormField>

        <FormField label="Companies House Number" error={errors.companyRegNumber?.message} hint="Optional">
          <input 
            {...register('companyRegNumber')} 
            placeholder="e.g. 08492019" 
            className="onboarding-input font-mono uppercase" 
          />
        </FormField>

        <FormField label="Estimated Weekly Food Spend (£) *" error={errors.estimatedWeeklySpend?.message}>
          <input
            type="number"
            step="100"
            min="250"
            {...register('estimatedWeeklySpend')}
            placeholder="2500"
            className="onboarding-input font-mono"
          />
        </FormField>

        <FormField label="Weekly Covers" error={errors.weeklyCovers?.message} hint="Optional &bull; Hospitality">
          <input 
            type="number" 
            {...register('weeklyCovers')} 
            placeholder="e.g. 800" 
            className="onboarding-input font-mono" 
          />
        </FormField>

        <div className="sm:col-span-2 pt-2">
          <label className="flex items-center gap-3 text-xs text-cream/80 cursor-pointer p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
            <input 
              type="checkbox" 
              {...register('multiLocation')} 
              className="h-4 w-4 rounded accent-champagne cursor-pointer" 
            />
            <span>Yes, we operate and order across multiple kitchen venues</span>
          </label>
        </div>

        {multiLocation && (
          <FormField label="Number of Kitchen Sites" error={errors.siteCount?.message} className="sm:col-span-2 animate-fade-in">
            <input 
              type="number" 
              min={1} 
              max={50}
              {...register('siteCount')} 
              className="onboarding-input font-mono" 
            />
          </FormField>
        )}
      </div>

      <div className="pt-4 flex items-center justify-between gap-4">
        <button type="button" onClick={goBack} className="onboarding-btn-ghost text-xs">
          &larr; Back
        </button>
        <button type="submit" className="onboarding-btn-primary text-xs shadow-gold-glow flex items-center gap-2">
          <span>Continue to Logistics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
