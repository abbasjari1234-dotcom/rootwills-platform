'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  Building2 
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

export function OnboardingFlow() {
  const { currentStep, direction } = useOnboardingStore();
  const StepComponent = STEP_COMPONENTS[currentStep];
  const stepIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-champagne/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Brand & Back navigation */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6 px-2">
        <Link href="/" className="flex items-center gap-2 text-cream/70 hover:text-cream text-xs font-mono transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        <div className="flex items-center gap-3">
          <RootwillsLogo size="sm" variant="full" />
        </div>
      </div>

      {/* Primary Page Heading */}
      <div className="w-full max-w-2xl text-center mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-[11px] font-mono uppercase font-bold">
          <Building2 className="w-3 h-3" />
          <span>Commercial Trade Facility Application</span>
        </div>
        
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-cream uppercase">
          Open a Wholesale Trade Account
        </h1>
        
        <p className="text-xs text-cream/70 max-w-lg mx-auto">
          Instant B2B trade onboarding for UK restaurants, boutique hotels, and luxury catering kitchens.
        </p>
      </div>

      {/* Executive Credit Facility Highlights Banner */}
      <div className="w-full max-w-2xl mb-6 grid grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="bg-obsidian-900/80 border border-emerald-900/60 rounded-2xl p-3 backdrop-blur-md">
          <span className="text-champagne font-bold block text-sm sm:text-base">Up to £50,000</span>
          <span className="text-[10px] text-cream/60">Instant 30-Day Credit</span>
        </div>
        <div className="bg-obsidian-900/80 border border-emerald-900/60 rounded-2xl p-3 backdrop-blur-md">
          <span className="text-emerald-400 font-bold block text-sm sm:text-base">06:00 AM Drop</span>
          <span className="text-[10px] text-cream/60">Guaranteed Kitchen SLA</span>
        </div>
        <div className="bg-obsidian-900/80 border border-emerald-900/60 rounded-2xl p-3 backdrop-blur-md">
          <span className="text-cream font-bold block text-sm sm:text-base">11:00 PM Cut-off</span>
          <span className="text-[10px] text-cream/60">Order Night Prior</span>
        </div>
      </div>

      {/* Main Glassmorphic Structured Card Container */}
      <div className="w-full max-w-2xl bg-zinc-900/85 border border-zinc-800/90 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative">
        
        {/* Step Progress indicator */}
        <div className="mb-8 space-y-2.5">
          <div className="flex justify-between items-center text-[11px] font-mono text-cream/70">
            <span className="text-champagne font-bold">{STEP_LABELS[stepIndex]}</span>
            <span>Step {stepIndex + 1} of 4</span>
          </div>

          <div className="flex items-center gap-2">
            {STEP_ORDER.map((step, i) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  i <= stepIndex ? 'bg-gradient-to-r from-champagne-soft to-champagne shadow-gold-glow' : 'bg-zinc-800'
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
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-cream/60 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted B2B Credit Facility</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cream/40">Need direct phone assistance?</span>
            <a 
              href="tel:01210000000" 
              className="text-champagne hover:underline font-bold"
            >
              Birmingham Desk
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
