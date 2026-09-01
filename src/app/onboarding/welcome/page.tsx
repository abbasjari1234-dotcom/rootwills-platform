import React from 'react';
import type { Metadata } from 'next';
import { WelcomeView } from '@/components/onboarding/WelcomeView';

export const metadata: Metadata = {
  title: 'Trade Account Activated & Ready to Order | Rootwills',
  description:
    'Your commercial trade account is active. Log in now to access your bespoke contract pricing and place your first morning delivery order online today.',
};

export default function OnboardingWelcomePage() {
  return <WelcomeView />;
}
