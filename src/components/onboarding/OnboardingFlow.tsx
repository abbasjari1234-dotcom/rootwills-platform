'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnboardingStore } from '@/store/onboarding-store';
import { StepIndustry } from '@/components/onboarding/steps/StepIndustry';
import { StepBusinessDetails } from '@/components/onboarding/steps/StepBusinessDetails';
import { StepLogistics } from '@/components/onboarding/steps/StepLogistics';
import { StepTradeAccount } from '@/components/onboarding/steps/StepTradeAccount';
import { STEP_ORDER } from '@/store/onboarding-store';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  CreditCard, 
  Clock, 
  Truck, 
  Phone, 
  CheckCircle2, 
  Building2,
  ShoppingBag
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

const STEP_COMPONENTS = {
  industry: StepIndustry,
  details: StepBusinessDetails,
  logistics: StepLogistics,
  account: StepTradeAccount,
} as const;

const STEP_LABELS = [
  '1. Hospitality Sector',
  '2. Business Details',
  '3. Kitchen Logistics & SLA',
  '4. Credit Facility Setup',
];

const slideVariants = {
  enter: (direction: 1 | -1) => ({ x: direction * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: 1 | -1) => ({ x: direction * -40, opacity: 0 }),
};

interface OnboardingFlowProps {
  isStandalone?: boolean;
}

export function OnboardingFlow({ isStandalone = true }: OnboardingFlowProps) {
  return (
    <Suspense fallback={<div className="py-16 text-center text-slate-500 font-mono text-xs">Loading trade application...</div>}>
      <OnboardingFlowContent isStandalone={isStandalone} />
    </Suspense>
  );
}

function OnboardingFlowContent({ isStandalone = true }: OnboardingFlowProps) {
  const searchParams = useSearchParams();
  const isCheckoutIntent = searchParams?.get('checkout') === 'true';
  const checkoutTotal = searchParams?.get('total');
  const checkoutItems = searchParams?.get('items');

  const { currentStep, direction } = useOnboardingStore();
  const StepComponent = STEP_COMPONENTS[currentStep];
  const stepIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className={`${isStandalone ? 'min-h-screen py-10 sm:py-16' : 'py-8 sm:py-12'} px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center items-center`}>
      {/* Top Brand & Back navigation (Only when standalone without site header) */}
      {isStandalone && (
        <div className="w-full max-w-3xl flex justify-between items-center mb-6 px-2">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-mono transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>

          <div className="flex items-center gap-3">
            <RootwillsLogo size="sm" variant="full" />
          </div>
        </div>
      )}

      {/* Primary Page Heading */}
      <div className="w-full max-w-3xl text-center mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Commercial Trade Facility Application</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Open a Wholesale Trade Account
        </h1>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Instant B2B trade onboarding for UK restaurants, boutique hotels, and luxury catering kitchens.
        </p>
      </div>

      {/* Executive Credit Facility Highlights Banner */}
      <div className="w-full max-w-3xl mb-6 grid grid-cols-3 gap-3 text-center text-xs font-mono">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-slate-900 font-extrabold block text-sm sm:text-lg">Up to £50,000</span>
          <span className="text-xs text-slate-500 font-medium">Instant 30-Day Credit</span>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
          <span className="text-emerald-800 font-extrabold block text-sm sm:text-lg">06:00 AM Drop</span>
          <span className="text-xs text-emerald-700 font-medium">Guaranteed Kitchen SLA</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <span className="text-slate-900 font-extrabold block text-sm sm:text-lg">11:00 PM Cut-off</span>
          <span className="text-xs text-slate-500 font-medium">Order Night Prior</span>
        </div>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative">
        
        {/* Pending Order Retention Banner */}
        {isCheckoutIntent && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3.5 text-xs text-slate-800 font-sans animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-slate-900 text-xs">Wholesale Basket Attached ({checkoutItems || 'Active'} Lines &bull; £{checkoutTotal || '0.00'})</div>
              <div className="text-[11px] text-emerald-800 font-mono mt-0.5">
                Complete your trade facility application below. Your produce order will be dispatched upon credit verification.
              </div>
            </div>
          </div>
        )}
        
        {/* Step Progress indicator */}
        <div className="mb-8 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-mono text-slate-500">
            <span className="text-emerald-700 font-bold">{STEP_LABELS[stepIndex]}</span>
            <span>Step {stepIndex + 1} of 4</span>
          </div>

          <div className="flex items-center gap-2">
            {STEP_ORDER.map((step, i) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  i <= stepIndex ? 'bg-emerald-600 shadow-sm' : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Step Form Body */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>

        {/* Security Reassurance & Concierge Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit Encrypted B2B Credit Facility</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Direct phone desk:</span>
            <a 
              href="tel:01217908800" 
              className="text-emerald-700 hover:text-emerald-800 font-bold underline"
            >
              0121 790 8800
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
