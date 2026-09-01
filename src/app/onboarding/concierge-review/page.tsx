import React from 'react';
import type { Metadata } from 'next';
import { ConciergeReviewView } from '@/components/onboarding/ConciergeReviewView';

export const metadata: Metadata = {
  title: 'Enterprise Trade Account Priority Review | Rootwills',
  description:
    'Our commercial underwriting team is reviewing your bespoke pricing structure and credit line. Track your corporate onboarding application status now.',
};

export default function OnboardingConciergeReviewPage() {
  return <ConciergeReviewView />;
}
