import React from 'react';
import type { Metadata } from 'next';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export const metadata: Metadata = {
  title: 'Apply for a Wholesale Trade Credit Account | Rootwills',
  description:
    'Instant B2B wholesale trade application. Up to £50,000 credit line, 30-day terms, 11:00 PM cut-offs, and 06:00 AM delivery for restaurants, hotels, and caterers.',
};

export default function ApplyPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <OnboardingFlow isStandalone={false} />
    </div>
  );
}
