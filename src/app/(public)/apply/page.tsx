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
    <main className="min-h-screen bg-obsidian-950 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,39,0.08),_transparent_65%)]">
      <OnboardingFlow />
    </main>
  );
}
