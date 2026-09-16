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
        <p className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">Step 2 of 4</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tell Us About Your Establishment
        </h2>
        <p className="text-sm text-slate-600">
          This helps our commercial sales desk structure your wholesale contract terms.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Trading / Business Name *"
          htmlFor="organizationName"
          error={errors.organizationName?.message}
          className="sm:col-span-2"
        >
          <input
            id="organizationName"
            {...register('organizationName')}
            autoComplete="organization"
            aria-label="Trading or Business Name"
            placeholder="e.g. The Grand Kitchen / Heritage Bistro Ltd"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-sans"
          />
        </FormField>

        <FormField label="Companies House Number" htmlFor="companyRegNumber" error={errors.companyRegNumber?.message} hint="Optional">
          <input 
            id="companyRegNumber"
            {...register('companyRegNumber')} 
            aria-label="Companies House Registration Number"
            placeholder="e.g. 08492019" 
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-mono uppercase" 
          />
        </FormField>

        <FormField label="Estimated Weekly Food Spend (£) *" htmlFor="estimatedWeeklySpend" error={errors.estimatedWeeklySpend?.message}>
          <input
            id="estimatedWeeklySpend"
            type="number"
            step="100"
            min="250"
            {...register('estimatedWeeklySpend')}
            aria-label="Estimated Weekly Food Spend in Pounds"
            placeholder="2500"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-mono"
          />
        </FormField>

        <FormField label="Weekly Covers" htmlFor="weeklyCovers" error={errors.weeklyCovers?.message} hint="Optional &bull; Hospitality">
          <input 
            id="weeklyCovers"
            type="number" 
            {...register('weeklyCovers')} 
            aria-label="Weekly Covers"
            placeholder="e.g. 800" 
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-mono" 
          />
        </FormField>

        <div className="sm:col-span-2 pt-1">
          <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors">
            <input 
              type="checkbox" 
              {...register('multiLocation')} 
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
            />
            <span className="font-medium">Yes, we operate and order across multiple kitchen venues</span>
          </label>
        </div>

        {multiLocation && (
          <FormField label="Number of Kitchen Sites" htmlFor="siteCount" error={errors.siteCount?.message} className="sm:col-span-2 animate-fade-in">
            <input 
              id="siteCount"
              type="number" 
              min={1} 
              max={50}
              {...register('siteCount')} 
              aria-label="Number of Kitchen Sites"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-mono" 
            />
          </FormField>
        )}
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
          <span>Continue to Logistics</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
