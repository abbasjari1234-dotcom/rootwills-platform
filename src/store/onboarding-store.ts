import { create } from 'zustand';
import type {
  StepIndustryValues,
  StepBusinessDetailsValues,
  StepLogisticsValues,
  StepTradeAccountValues,
} from '@/types/onboarding';

export const STEP_ORDER = ['industry', 'details', 'logistics', 'account'] as const;
export type StepId = (typeof STEP_ORDER)[number];

interface OnboardingState {
  currentStep: StepId;
  direction: 1 | -1; // drives the Framer Motion slide direction
  industry: Partial<StepIndustryValues>;
  details: Partial<StepBusinessDetailsValues>;
  logistics: Partial<StepLogisticsValues>;
  account: Partial<StepTradeAccountValues>;
  submitting: boolean;
  submitError: string | null;

  setIndustry: (values: StepIndustryValues) => void;
  setDetails: (values: StepBusinessDetailsValues) => void;
  setLogistics: (values: StepLogisticsValues) => void;
  setAccount: (values: StepTradeAccountValues) => void;
  goNext: () => void;
  goBack: () => void;
  setSubmitting: (submitting: boolean) => void;
  setSubmitError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 'industry' as StepId,
  direction: 1 as const,
  industry: {},
  details: {},
  logistics: {},
  account: {},
  submitting: false,
  submitError: null,
};

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  ...initialState,

  setIndustry: (values) => set({ industry: values }),
  setDetails: (values) => set({ details: values }),
  setLogistics: (values) => set({ logistics: values }),
  setAccount: (values) => set({ account: values }),

  goNext: () => {
    const idx = STEP_ORDER.indexOf(get().currentStep);
    if (idx < STEP_ORDER.length - 1) {
      set({ currentStep: STEP_ORDER[idx + 1], direction: 1 });
    }
  },
  goBack: () => {
    const idx = STEP_ORDER.indexOf(get().currentStep);
    if (idx > 0) {
      set({ currentStep: STEP_ORDER[idx - 1], direction: -1 });
    }
  },

  setSubmitting: (submitting) => set({ submitting }),
  setSubmitError: (submitError) => set({ submitError }),
  reset: () => set(initialState),
}));
