# Rootwills B2B Food-Service Platform — Deployment Guide

This guide provides instructions for deploying the Rootwills platform to production environments.

---

## 1. Zero-Config Vercel Deployment (Recommended for Serverless)

1. Connect your repository to **[Vercel](https://vercel.com)**.
2. Vercel automatically detects Next.js 14 App Router.
3. Configure your custom domain (e.g. `rootwills.co.uk` and `portal.rootwills.co.uk`).
4. Click **Deploy**.

---

## 2. Docker & Containerized Deployment (AWS ECS / DigitalOcean / VPS)

### Build and Run with Docker Compose:
```bash
# Build production container image and launch in background
docker compose up -d --build

# Inspect container health
docker compose ps

# View live access logs
docker compose logs -f
```

### Run Standalone Docker:
```bash
# Build image
docker build -t rootwills-platform:latest .

# Run on port 3000
docker run -p 3000:3000 --name rootwills_app rootwills-platform:latest
```

---

## 3. Node.js Production Process (PM2 / Systemd)

```bash
# 1. Install production dependencies
npm ci

# 2. Build production assets
npm run build

# 3. Start with PM2 process manager
npm install -g pm2
pm2 start npm --name "rootwills-b2b" -- start
pm2 save
pm2 startup
```

---

## 4. Key Routes & System Architecture

| Route | Purpose | Access Level |
| :--- | :--- | :--- |
| `/` | Public Company Marketing & SLA Engine | Public |
| `/products` | Commercial Catalog with Sticky Filter & Quick Specs | Public / Trade |
| `/delivery` | Postcode SLA Lookup & Fleet Cold-Chain Telemetry | Public |
| `/onboarding` | 4-Step Trade Account & Credit Provisioning | Inbound Leads |
| `/login` | Segmented Demo Switcher & Authenticated Portal Access | Public / Staff |
| `/dashboard` | Daily Order Pad, Spending Tracker, AI Prep Assistant | Trade Customer |
| `/quick-order` | High-Speed Multi-SKU Kitchen Pad | Trade Customer |
| `/price-list` | Locked Bespoke Contract Price List & PDF Generator | Trade Customer |
| `/invoices` | Billing Ledger, 30/60d Aged Debt, Xero/Sage CSV Export | Trade Customer |
| `/admin/crm` | Sales CRM Kanban & 1-Click Credit Account Conversion | Rootwills Admin |
| `/admin/orders` | Overnight Fulfillment Manifests & Picker Verification | Rootwills Admin |
| `/admin/standing-orders` | Recurring Daily Orders Auto-Execution Engine | Rootwills Admin |
| `/admin/notifications` | 10:30 PM Cut-off WhatsApp / 05:45 AM Dispatch SMS Cockpit | Rootwills Admin |
| `/driver` | Mobile Cold-Chain Chamber Logging & Sign-on-Glass POD | Driver Logistics |
