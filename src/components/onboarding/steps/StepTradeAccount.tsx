'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTradeAccountSchema, type StepTradeAccountValues } from '@/types/onboarding';
import { useOnboardingStore } from '@/store/onboarding-store';
import { FormField } from '@/components/onboarding/FormField';
import { submitOnboardingApplication } from '@/actions/onboarding';
import { onboardingApplicationSchema } from '@/types/onboarding';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Sparkles, CheckCircle2, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const CREDIT_TIERS = [
  { 
    value: 'standard', 
    label: 'Standard Trade', 
    limitChip: '£2,500 Limit',
    terms: '30 Days Net',
    description: 'Instant automated provisioning for most commercial kitchens',
    color: 'border-zinc-700 hover:border-champagne/40'
  },
  { 
    value: 'premium', 
    label: 'Premium Trade', 
    limitChip: '£10,000 Limit',
    terms: '30 Days EOM',
    description: 'Higher volume accounts & priority early morning 06:00 AM delivery slot',
    color: 'border-zinc-700 hover:border-champagne/40'
  },
  { 
    value: 'concierge', 
    label: 'Corporate Concierge', 
    limitChip: '£25,000+ Limit',
    terms: 'Custom Terms',
    description: 'Dedicated Senior Account Manager, bespoke rate card & multi-site consolidated billing',
    color: 'border-zinc-700 hover:border-champagne/40'
  },
] as const;

export function StepTradeAccount() {
  const store = useOnboardingStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StepTradeAccountValues>({
    resolver: zodResolver(stepTradeAccountSchema) as any,
    defaultValues: {
      contactName: store.account.contactName ?? '',
      contactEmail: store.account.contactEmail ?? '',
      contactPhone: store.account.contactPhone ?? '',
      password: store.account.password ?? '',
      creditTierRequested: store.account.creditTierRequested ?? 'standard',
      agreedToTerms: store.account.agreedToTerms as true,
    },
  });

  const selectedTier = watch('creditTierRequested');

  async function onSubmit(values: StepTradeAccountValues) {
    store.setAccount(values);
    store.setSubmitting(true);
    store.setSubmitError(null);

    const payload = onboardingApplicationSchema.parse({
      ...store.industry,
      ...store.details,
      ...store.logistics,
      ...values,
    });

    const result = await submitOnboardingApplication(payload);
    store.setSubmitting(false);

    if (!result.ok) {
      store.setSubmitError(result.error);
      return;
    }

    router.push(
      result.status === 'auto_approved'
        ? '/onboarding/welcome'
        : '/onboarding/concierge-review'
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-1">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-champagne font-bold">Step 4 of 4</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
          Configure Your Trade Credit Account
        </h2>
        <p className="text-xs text-cream/60">
          Set up verified ordering credentials and request your assigned credit facility.
        </p>
      </div>

      {/* Primary Contact Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
        <FormField label="Primary Contact Name *" error={errors.contactName?.message}>
          <input
            {...register('contactName')}
            placeholder="e.g. Executive Chef Marco Rossi"
            className="onboarding-input"
          />
        </FormField>

        <FormField label="Work Email Address *" error={errors.contactEmail?.message}>
          <input
            type="email"
            {...register('contactEmail')}
            placeholder="marco.chef@sancarlo.co.uk"
            className="onboarding-input"
          />
        </FormField>

        <FormField label="Mobile / Kitchen Direct Line *" error={errors.contactPhone?.message}>
          <input
            type="tel"
            {...register('contactPhone')}
            placeholder="07700 900123"
            className="onboarding-input"
          />
        </FormField>

        <FormField label="Create Account Password *" error={errors.password?.message}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Minimum 8 characters"
              className="onboarding-input pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>
      </div>

      {/* Credit Tier Selector */}
      <fieldset className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <legend className="text-xs uppercase font-mono tracking-wider text-cream/70 font-bold">
            Select Trade Credit Facility
          </legend>
          <span className="text-[10px] font-mono text-champagne">30-Day Invoicing Terms</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CREDIT_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.value;

            return (
              <label
                key={tier.value}
                className={`flex cursor-pointer flex-col sm:flex-row justify-between items-start sm:items-center gap-3 rounded-2xl border p-4 transition-all ${
                  isSelected
                    ? 'border-champagne bg-champagne/10 shadow-gold-glow'
                    : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={tier.value}
                    {...register('creditTierRequested')}
                    className="w-4 h-4 accent-champagne cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-cream">{tier.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isSelected ? 'bg-champagne text-obsidian-950' : 'bg-zinc-800 text-champagne'
                      }`}>
                        {tier.limitChip}
                      </span>
                    </div>
                    <p className="text-[11px] text-cream/60 mt-0.5 leading-relaxed">{tier.description}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-cream/50 sm:text-right shrink-0">
                  {tier.terms}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Terms and Conditions */}
      <FormField label="" error={errors.agreedToTerms?.message} className="pt-2">
        <label className="flex items-start gap-3 text-xs text-cream/80 cursor-pointer p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
          <input
            type="checkbox"
            {...register('agreedToTerms')}
            className="mt-0.5 h-4 w-4 rounded accent-champagne cursor-pointer shrink-0"
          />
          <span className="leading-relaxed">
            I confirm I am an authorized representative of the business and agree to Rootwills Ltd's{' '}
            <strong className="text-champagne">Trade Terms of Supply</strong>, early morning delivery access protocols, and credit facility assessment.
          </span>
        </label>
      </FormField>

      {store.submitError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
          {store.submitError}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={store.goBack}
          className="onboarding-btn-ghost text-xs"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          disabled={store.submitting}
          className="onboarding-btn-primary text-xs shadow-gold-glow flex-1 sm:flex-initial"
        >
          {store.submitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
              <span>Provisioning Trade Account…</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Submit & Open Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
}
