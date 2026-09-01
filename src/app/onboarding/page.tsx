import React from 'react';
import type { Metadata } from 'next';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export const metadata: Metadata = {
  title: 'Open a Commercial Wholesale Trade Account | Rootwills',
  description:
    'Apply for an instant B2B wholesale trade account with up to £50,000 credit, 11pm ordering cut-offs, and 6am delivery. Start your application today.',
};

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-obsidian-950 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,39,0.06),_transparent_60%)]">
      <OnboardingFlow />
    </main>
  );
}
