# Rootwills B2B Food-Service Platform — Production Deployment & CI/CD Guide

This guide provides instructions for automated testing, container packaging, and deploying the Rootwills platform to production environments.

---

## 1. Automated CI/CD Pipeline (GitHub Actions)

The platform includes production-ready GitHub Actions workflows located in [`.github/workflows/`](file:///c:/Users/abc/Desktop/rootwills-platform/.github/workflows):

### A. Continuous Integration (`ci.yml`)
- **Triggers:** Push to `main`, all Pull Requests.
- **Automated Tasks:**
  1. Dependencies installation via clean `npm ci`.
  2. Strict TypeScript type check (`npx tsc --noEmit`).
  3. Production build compilation across all routes (`npm run build`).
  4. Dependency security vulnerability scan (`npm audit --audit-level=critical`).

### B. Continuous Deployment (`deploy.yml`)
- **Triggers:** Pushes to `main`, tagged releases (`v*.*.*`), or manual trigger via `workflow_dispatch`.
- **Automated Tasks:**
  1. Multi-stage Docker image build with layer caching.
  2. Standalone output packaging.
  3. Publishing container image to GitHub Container Registry (`ghcr.io/your-org/rootwills-platform:latest`).

---

## 2. Production Health Check & Monitoring

The platform provides a live monitoring and container probe endpoint:

* **Endpoint:** `GET /api/health`
* **Response format:**
```json
{
  "status": "healthy",
  "timestamp": "2026-08-19T20:50:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "services": {
    "api": "operational",
    "database": "connected",
    "dbLatencyMs": 14,
    "aiGateway": "enabled"
  },
  "system": {
    "nodeVersion": "v20.x",
    "uptimeSeconds": 14200,
    "memory": {
      "heapUsedMb": 68,
      "heapTotalMb": 94,
      "rssMb": 148
    }
  },
  "responseTimeMs": 18
}
```
* **Use Cases:** AWS ALB / ECS Target Group health checks, Kubernetes liveness/readiness probes, Better Uptime / Pingdom monitors.

---

## 3. Containerized Deployment (Docker & Docker Compose)

The Dockerfile uses Next.js `output: 'standalone'`, reducing the production image from ~1.2GB down to **~120MB**.

### Launch with Docker Compose:
```bash
# 1. Build and run in background
docker compose up -d --build

# 2. Check health status
docker compose ps

# 3. View live access & application logs
docker compose logs -f
```

### Standalone Docker Run:
```bash
# Build container image
docker build -t rootwills-platform:latest .

# Run on port 3000
docker run -d -p 3000:3000 --env-file .env.local --name rootwills_app rootwills-platform:latest
```

---

## 4. Zero-Config Vercel Deployment

1. Connect your GitHub repository to **[Vercel](https://vercel.com)**.
2. Vercel automatically detects Next.js 14 App Router.
3. Configure your Environment Variables in the Vercel Project Settings (see Section 5 below).
4. Configure your custom domains (e.g. `rootwills.co.uk` and `portal.rootwills.co.uk`).
5. Click **Deploy**.

---

## 5. Production Environment Variables Checklist

Ensure the following secrets are configured in your hosting platform (Vercel, AWS ECS, or `.env.local`):

| Variable Name | Required | Description |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | **YES** | Supabase project URL (`https://xyz.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **YES** | Supabase anonymous / public key |
| `SUPABASE_SERVICE_ROLE_KEY` | **YES** | Supabase service-role secret key (Server-only) |
| `STRIPE_SECRET_KEY` | Optional | Stripe Live Secret Key (`sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Optional | Stripe Webhook Signing Secret (`whsec_...`) |
| `GOCARDLESS_ACCESS_TOKEN` | Optional | GoCardless Live Access Token |
| `GOCARDLESS_WEBHOOK_SECRET` | Optional | GoCardless Webhook Secret for HMAC verification |
| `GOCARDLESS_ENVIRONMENT` | Optional | `live` or `sandbox` |
| `RESEND_API_KEY` | Optional | Resend API key for transactional emails (`re_...`) |
| `AI_ENABLED` | Optional | `true` (default) or `false` (emergency kill switch) |

---

## 6. Database Setup & Migrations

Before launching live traffic, apply the SQL schemas in your Supabase SQL Editor in the following order:

1. [`db/schema.sql`](file:///c:/Users/abc/Desktop/rootwills-platform/db/schema.sql) — Core database tables and indexes.
2. [`db/production_security_rls.sql`](file:///c:/Users/abc/Desktop/rootwills-platform/db/production_security_rls.sql) — Row Level Security policies and security definer functions.
3. [`db/seed.sql`](file:///c:/Users/abc/Desktop/rootwills-platform/db/seed.sql) — (Optional) Initial demo data and product catalog.

