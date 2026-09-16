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
  },
  { 
    value: 'premium', 
    label: 'Premium Trade', 
    limitChip: '£10,000 Limit',
    terms: '30 Days EOM',
    description: 'Higher volume accounts & priority early morning 06:00 AM delivery slot',
  },
  { 
    value: 'concierge', 
    label: 'Corporate Concierge', 
    limitChip: '£25,000+ Limit',
    terms: 'Custom Terms',
    description: 'Dedicated Senior Account Manager, bespoke rate card & multi-site consolidated billing',
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
        <p className="font-mono text-xs uppercase tracking-wider text-emerald-700 font-bold">Step 4 of 4</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Configure Your Trade Credit Account
        </h2>
        <p className="text-sm text-slate-600">
          Set up verified ordering credentials and request your assigned credit facility.
        </p>
      </div>

      {/* Primary Contact Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
        <FormField label="Primary Contact Name *" htmlFor="contactName" error={errors.contactName?.message}>
          <input
            id="contactName"
            {...register('contactName')}
            autoComplete="name"
            aria-label="Primary Contact Name"
            placeholder="e.g. Head Chef / General Manager"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-sans"
          />
        </FormField>

        <FormField label="Work Email Address *" htmlFor="contactEmail" error={errors.contactEmail?.message}>
          <input
            id="contactEmail"
            type="email"
            {...register('contactEmail')}
            autoComplete="email"
            aria-label="Work Email Address"
            placeholder="orders@yourbusiness.co.uk"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-sans"
          />
        </FormField>

        <FormField label="Mobile / Kitchen Direct Line *" htmlFor="contactPhone" error={errors.contactPhone?.message}>
          <input
            id="contactPhone"
            type="tel"
            {...register('contactPhone')}
            autoComplete="tel"
            aria-label="Mobile or Kitchen Direct Line"
            placeholder="07700 900123"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-sans"
          />
        </FormField>

        <FormField label="Create Account Password *" htmlFor="accountPassword" error={errors.password?.message}>
          <div className="relative">
            <input
              id="accountPassword"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              autoComplete="new-password"
              aria-label="Create Account Password"
              placeholder="Minimum 8 characters"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white placeholder:text-slate-400 transition-all font-sans"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password in cleartext"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 flex items-center justify-center"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </FormField>
      </div>

      {/* Credit Tier Selector */}
      <fieldset className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <legend className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
            Select Trade Credit Facility
          </legend>
          <span className="text-xs font-mono text-emerald-700 font-bold">30-Day Invoicing Terms</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CREDIT_TIERS.map((tier) => {
            const isSelected = selectedTier === tier.value;

            return (
              <label
                key={tier.value}
                className={`flex cursor-pointer flex-col sm:flex-row justify-between items-start sm:items-center gap-3 rounded-2xl border p-4 transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-600/20'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={tier.value}
                    {...register('creditTierRequested')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900">{tier.label}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {tier.limitChip}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{tier.description}</p>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-500 sm:text-right shrink-0 font-medium">
                  {tier.terms}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Terms and Conditions */}
      <FormField label="" error={errors.agreedToTerms?.message} className="pt-2">
        <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 transition-colors">
          <input
            type="checkbox"
            {...register('agreedToTerms')}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
          />
          <span className="leading-relaxed">
            I confirm I am an authorized representative of the business and agree to Rootwills Ltd&apos;s{' '}
            <strong className="text-emerald-700 font-bold">Trade Terms of Supply</strong>, early morning delivery access protocols, and credit facility assessment.
          </span>
        </label>
      </FormField>

      {store.submitError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
          {store.submitError}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-100">
        <button
          type="button"
          onClick={store.goBack}
          className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs font-mono transition-colors"
        >
          &larr; Back
        </button>

        <button
          type="submit"
          disabled={store.submitting}
          aria-label="Submit application and open trade account"
          className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {store.submitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
              <span>Provisioning Trade Account...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Submit &amp; Open Trade Account</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
