import { z } from 'zod';

// ============================================================================
// STEP 1 — Industry sector
// ============================================================================

export const SECTORS = [
  { value: 'fine_dining', label: 'Fine Dining', description: 'Michelin, tasting menus, chef-led kitchens' },
  { value: 'boutique_hotel', label: 'Boutique Hotels', description: 'Independent and luxury hospitality groups' },
  { value: 'luxury_catering', label: 'Luxury Catering', description: 'Private events, weddings, corporate hospitality' },
  { value: 'private_club', label: 'Private Members\' Clubs', description: 'Members\' dining and event spaces' },
  { value: 'artisan_cafe', label: 'Artisan Cafés', description: 'Specialty coffee, bakery, all-day dining' },
  { value: 'other', label: 'Something Else', description: 'Tell us a little more about your business' },
] as const;

export const sectorSchema = z.enum([
  'fine_dining',
  'boutique_hotel',
  'luxury_catering',
  'private_club',
  'artisan_cafe',
  'other',
]);

export type Sector = z.infer<typeof sectorSchema>;

export const stepIndustrySchema = z.object({
  sector: sectorSchema,
});
export type StepIndustryValues = z.infer<typeof stepIndustrySchema>;

// ============================================================================
// STEP 2 — Business details
// ============================================================================

export const stepBusinessDetailsSchema = z.object({
  organizationName: z.string().min(2, 'Enter your business name.'),
  companyRegNumber: z
    .string()
    .regex(/^[A-Z0-9]{6,8}$/i, 'Enter a valid Companies House registration number.')
    .optional()
    .or(z.literal('')),
  weeklyCovers: z.coerce.number().int().positive().optional(),
  estimatedWeeklySpend: z.coerce.number().positive('Enter an estimated weekly spend.'),
  multiLocation: z.boolean().default(false),
  siteCount: z.coerce.number().int().min(1).default(1),
});
export type StepBusinessDetailsValues = z.infer<typeof stepBusinessDetailsSchema>;

// ============================================================================
// STEP 3 — Logistics & depot routing
// ============================================================================

export const stepLogisticsSchema = z.object({
  postcode: z
    .string()
    .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, 'Enter a valid UK postcode.'),
  deliveryNotes: z.string().max(500).optional(),
});
export type StepLogisticsValues = z.infer<typeof stepLogisticsSchema>;

// ============================================================================
// STEP 4 — Trade account & credentials
// ============================================================================

export const creditTierSchema = z.enum(['standard', 'premium', 'concierge']);
export type CreditTier = z.infer<typeof creditTierSchema>;

export const stepTradeAccountSchema = z.object({
  contactName: z.string().min(2, 'Enter a contact name.'),
  contactEmail: z.string().email('Enter a valid email address.'),
  contactPhone: z.string().min(7, 'Enter a valid phone number.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .default(''),
  creditTierRequested: creditTierSchema.default('standard'),
  agreedToTerms: z.literal(true, {
    invalid_type_error: 'You must accept the trade account terms to continue.',
  }),
});
export type StepTradeAccountValues = z.infer<typeof stepTradeAccountSchema>;

// ============================================================================
// FULL APPLICATION — combined payload sent to the server action
// ============================================================================

export const onboardingApplicationSchema = stepIndustrySchema
  .merge(stepBusinessDetailsSchema)
  .merge(stepLogisticsSchema)
  .merge(stepTradeAccountSchema);

export type OnboardingApplicationValues = z.infer<typeof onboardingApplicationSchema>;

export const CONCIERGE_REVIEW_SPEND_THRESHOLD = 5000;
export const CONCIERGE_REVIEW_TIERS: CreditTier[] = ['concierge'];
