# Rootwills Trade Platform — Build Roadmap

Reference implementation for the luxury B2B onboarding flow + client portal.
This is architecture-complete code meant to be dropped into a scaffolded
Next.js project, not a finished, deployed app — see "Getting this running"
below for the missing scaffolding steps.

## What's here vs. what's still to build

**Included (this delivery):**
- Full Postgres/Supabase schema with RLS (`db/schema.sql`, `db/seed.sql`)
- Zod schemas + TypeScript types for the full onboarding flow
- Zustand store driving the multi-step wizard
- The Sector Selection Card (Framer Motion hover/active states)
- All four onboarding step components (industry, business details, logistics,
  trade account) wired to React Hook Form + Zod
- The multi-step engine with `AnimatePresence` slide transitions
- The Server Action that validates, geocodes, routes to nearest depot,
  decides instant-provision vs. concierge review, provisions the Supabase
  Auth user + organization + profile, and sends branded emails via Resend
- Depot-routing helper (haversine distance + free UK postcode geocoding via
  postcodes.io — swap for Google Places/Mapbox if you need full address
  autocomplete, not just postcode lookup)
- Tailwind design tokens + global styles

**Also included — Module 2, the client ordering portal:**
- `middleware.ts` + `lib/supabase/middleware.ts` — session refresh and
  auth-gating for every route under `/(portal)`
- `lib/auth.ts` — `requireProfile()` / `assertRole()`, the RBAC primitives
  every portal page is built on (admin / purchaser / finance)
- `lib/pricing.ts` — resolves each organization's tiered price (override or
  percentage discount) on top of `base_price`
- `catalog/page.tsx` — Server Component fetching products + this org's
  tiering in two queries, grouped by category
- `store/cart-store.ts` + `components/portal/CartDrawer.tsx` — cart state,
  standing-order toggle, recurrence, delivery slot picker, checkout
- `actions/orders.ts` — the Server Action that actually places an order:
  re-resolves every price and MOQ server-side (cart prices are UX only),
  checks the order against available trade credit, inserts the order +
  items, and updates `credit_used` — all before the client ever sees success
- `dashboard/page.tsx`, `orders/page.tsx`, `orders/[id]/page.tsx` — credit
  overview, order history, and order detail
- `invoices/page.tsx` — gated to `admin`/`finance` via `assertRole()`;
  purchasers are redirected to the dashboard if they try the URL directly

**Not included — build next:**
- Auth screens (login, magic-link callback handler, password set page) —
  the middleware redirects to `/login`, but that page doesn't exist yet
- Invoice PDF generation — the schema has `invoices.pdf_url`, but nothing
  populates it; you'll want a job (Supabase Edge Function or a cron route)
  that generates a PDF and uploads it to Supabase Storage per billing cycle
- Standing order *execution* — the schema stores `recurrence_rule`, but
  nothing currently re-places a standing order on schedule; that needs a
  scheduled function reading `orders where is_standing_order = true` and
  calling the same pricing/credit logic as `placeOrder`
- Admin-side catalog and tiered-pricing management UI (the API/RLS from
  Module 1 supports admin product CRUD; there's no screen for it yet)
- Shadcn/ui primitives installation (`npx shadcn@latest init`) — components
  here use Tailwind directly and are shadcn-compatible, but shadcn itself
  isn't scaffolded
- `/onboarding/welcome` and `/onboarding/concierge-review` pages referenced
  by the Server Action's redirect
- Real depot coordinates (seed data is illustrative)
- Company registration number *lookup* (the brief asks for lookup, not just
  format validation — that needs the Companies House API, which requires a
  free API key: https://developer.company-information.service.gov.uk/)

## Directory structure

```
rootwills-platform/
├── db/
│   ├── schema.sql              # full Postgres schema + RLS policies
│   └── seed.sql                # sample depots and products
├── src/
│   ├── types/
│   │   └── onboarding.ts       # Zod schemas + TS types, all 4 steps
│   ├── store/
│   │   └── onboarding-store.ts # Zustand wizard state
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # browser client (RLS-respecting)
│   │   │   └── server.ts       # server client + service-role client
│   │   ├── depot-routing.ts    # haversine + postcode geocoding
│   │   └── utils.ts            # cn() helper
│   ├── actions/
│   │   └── onboarding.ts       # the Server Action — provisioning logic
│   ├── components/
│   │   └── onboarding/
│   │       ├── SectorCard.tsx
│   │       ├── FormField.tsx
│   │       ├── OnboardingFlow.tsx
│   │       └── steps/
│   │           ├── StepIndustry.tsx
│   │           ├── StepBusinessDetails.tsx
│   │           ├── StepLogistics.tsx
│   │           └── StepTradeAccount.tsx
│   └── app/
│       ├── globals.css
│       ├── onboarding/
│       │   └── page.tsx
│       ├── (portal)/
│       │   ├── layout.tsx          # auth-gated shell + role-aware nav
│       │   ├── dashboard/page.tsx
│       │   ├── catalog/page.tsx
│       │   ├── orders/
│       │   │   ├── page.tsx
│       │   │   └── [id]/page.tsx
│       │   └── invoices/page.tsx   # admin/finance only
│       └── api/
│           └── depots/nearest/route.ts
├── middleware.ts                   # session refresh + portal auth gate
└── tailwind.config.ts
```

## Getting this running

```bash
# 1. Scaffold a fresh Next.js app, then copy this src/, db/, and
#    tailwind.config.ts into it (or merge if you already have one).
npx create-next-app@latest rootwills-platform --typescript --tailwind --app

cd rootwills-platform

# 2. Install the dependencies this code assumes
npm install @supabase/ssr @supabase/supabase-js zustand zod \
  react-hook-form @hookform/resolvers framer-motion lucide-react \
  resend clsx tailwind-merge

# 3. Add shadcn/ui (optional but referenced in the brief for form primitives)
npx shadcn@latest init

# 4. Create a Supabase project (supabase.com), then run the schema
supabase link --project-ref <your-project-ref>
supabase db push   # or paste db/schema.sql into the SQL editor, then db/seed.sql

# 5. Set environment variables — see below

# 6. Run it
npm run dev
```

## ⚠️ Mandatory Secret Rotation Warning (Before Production Deployment)

> [!CAUTION]
> **CRITICAL SECURITY NOTICE: ROTATE ALL PREVIOUS CREDENTIALS**
> If any API keys, Supabase credentials, database passwords, or test credentials were previously hardcoded or committed to git history during development:
> 1. **Rotate Supabase API Keys**: Go to Supabase Dashboard &rarr; Project Settings &rarr; API &rarr; Rotate Anon and Service Role Keys.
> 2. **Rotate Stripe & GoCardless Keys**: Ensure new production/restricted keys are generated in the Stripe Dashboard and GoCardless Dashboard.
> 3. **Rotate Resend API Keys**: Regenerate your Resend API token.
> 4. **Git History**: Remember that removing keys from code does not scrub old git commit history. All secrets ever present in git commits must be considered compromised and rotated immediately.

## Environment Variables Configuration

Copy `.env.example` to `.env.local` for local development:

```bash
# 1. Site URL
NEXT_PUBLIC_SITE_URL=https://www.rootwills.co.uk

# 2. Supabase Cloud Database & Authentication (RLS Enforced)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key   # Server-only — NEVER expose to browser

# 3. Database Connection String (Prisma ORM with SSL/TLS)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require&pgbouncer=true

# 4. Resend Transactional Email Engine
RESEND_API_KEY=re_your_resend_api_key
CONCIERGE_NOTIFICATION_EMAIL=sales@rootwills.co.uk

# 5. Stripe Payments
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# 6. GoCardless (UK BACS Direct Debit)
GOCARDLESS_ACCESS_TOKEN=live_your_gocardless_token
GOCARDLESS_WEBHOOK_SECRET=your_gocardless_webhook_secret
GOCARDLESS_ENVIRONMENT=live

# 7. AI Gateway
AI_ENABLED=true
AI_MAX_INPUT_LENGTH=1000

# 8. Local Demo / Sandbox Auth (NON-PRODUCTION ONLY)
DEMO_AUTH_PASSWORD=

# 9. Optional Geocoding & Companies House APIs
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=
COMPANIES_HOUSE_API_KEY=
```

## Deployment plan

- **Frontend + API routes + Server Actions:** Vercel. This stack is fully
  serverless-compatible — unlike a SQLite-backed Express API, there's no
  persistent disk dependency, since Supabase hosts Postgres separately.
- **Database + Auth:** Supabase (managed Postgres, Auth, Realtime, Storage
  if you add product images later).
- **Email:** Resend, with a verified sending domain (e.g. `mail.rootwills.co.uk`)
  so welcome/concierge emails don't land in spam.
- **Environment variables:** set in Vercel's project settings, mirrored in
  a local `.env.local` for development (never commit real keys).
- **Migrations:** keep `db/schema.sql` under version control; use the
  Supabase CLI (`supabase migration new ...`) for changes going forward
  rather than editing the schema file directly once you're in production.

## A note on Supabase types

The portal pages (`lib/auth.ts`, `orders/[id]/page.tsx`) cast joined-table
results defensively (`Array.isArray(x) ? x[0] : x`), because Supabase's
query builder types a joined relation as an array unless you generate types
from your actual schema. Once your Supabase project is live, run:

```bash
npx supabase gen types typescript --project-id <your-project-ref> > src/types/database.ts
```

and pass that type into `createClient<Database>(...)` in both
`lib/supabase/client.ts` and `lib/supabase/server.ts` — it'll tighten up
every query in the portal and let you remove the defensive casts.

## Design decision worth flagging

The onboarding flow currently sends every multi-location applicant to
concierge review regardless of spend (see `needsConciergeReview` in
`src/actions/onboarding.ts`). That's a deliberate default — multi-site trade
credit terms usually need a human — but it's a business rule, not a
technical constraint, so change it freely if instant provisioning should
also cover multi-site accounts under some threshold.
