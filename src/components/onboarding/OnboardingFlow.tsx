'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnboardingStore } from '@/store/onboarding-store';
import { StepIndustry } from '@/components/onboarding/steps/StepIndustry';
import { StepBusinessDetails } from '@/components/onboarding/steps/StepBusinessDetails';
import { StepLogistics } from '@/components/onboarding/steps/StepLogistics';
import { StepTradeAccount } from '@/components/onboarding/steps/StepTradeAccount';
import { STEP_ORDER } from '@/store/onboarding-store';
import { ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

const STEP_COMPONENTS = {
  industry: StepIndustry,
  details: StepBusinessDetails,
  logistics: StepLogistics,
  account: StepTradeAccount,
} as const;

const STEP_LABELS = [
  '1. Sector',
  '2. Business Details',
  '3. Logistics',
  '4. Credit Facility',
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
    <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Brand & Back navigation */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-8 px-2">
        <Link href="/" className="flex items-center gap-2 text-cream/60 hover:text-cream text-xs font-mono transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-champagne text-obsidian-950 font-display font-bold text-sm flex items-center justify-center">
            R
          </div>
          <span className="font-display font-bold text-cream tracking-tight text-base">ROOTWILLS</span>
          <span className="text-[10px] font-mono text-champagne bg-champagne/10 px-2 py-0.5 rounded border border-champagne/20">
            Trade Account Setup
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Structured Card Container */}
      <div className="w-full max-w-2xl bg-zinc-900/70 border border-zinc-800/90 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative">
        
        {/* Step Progress indicator */}
        <div className="mb-8 space-y-2.5">
          <div className="flex justify-between items-center text-[11px] font-mono text-cream/50">
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

        {/* Security Reassurance Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-cream/50 font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>🔒 256-Bit Encrypted Commercial Application</span>
          </div>
          <div>Instant Automated Credit Assessment</div>
        </div>
      </div>
    </div>
  );
}
