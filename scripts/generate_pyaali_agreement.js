const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const logoBuf = fs.readFileSync(path.resolve(process.cwd(), 'public/images/logo.png'));
const logoBase64 = 'data:image/png;base64,' + logoBuf.toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rootwills Ltd | B2B Commercial Supply Agreement & Trade Credit Application - Pyaali By Jaan</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --oxblood: #260309;
      --burgundy: #3D0711;
      --gold: #BA8E4E;
      --gold-light: #E8D3A7;
      --parchment: #FAF7F2;
      --ink: #181614;
      --muted: #5A544C;
      --border: #DCD2C0;
      --border-subtle: #EBE4D5;
      --card-bg: #FFFFFF;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    @page {
      size: A4 portrait;
      margin: 0mm !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #EFEBE4;
      color: var(--ink);
      line-height: 1.36;
      font-size: 10.5px;
      -webkit-font-smoothing: antialiased;
      padding: 24px 0 60px;
    }

    .action-bar {
      position: fixed;
      top: 14px;
      right: 20px;
      z-index: 1000;
      display: flex;
      gap: 10px;
      background: rgba(38, 3, 9, 0.94);
      padding: 8px 14px;
      border-radius: 9999px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.28);
      border: 1px solid var(--gold);
      backdrop-filter: blur(8px);
    }

    .action-bar button {
      background: var(--gold);
      color: #1a0509;
      border: none;
      padding: 8px 16px;
      font-size: 11px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .action-bar button:hover {
      background: #FFFFFF;
      transform: translateY(-1px);
    }

    .action-bar span {
      color: #E8D3A7;
      font-size: 11px;
      align-self: center;
      font-family: 'JetBrains Mono', monospace;
      padding-right: 4px;
    }

    .document-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto 30px auto;
      background: var(--parchment);
      padding: 14mm 16mm 12mm 16mm;
      box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
      border: 1px solid var(--border);
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    .document-page::before {
      content: '';
      position: absolute;
      inset: 6mm;
      border: 1px solid rgba(186, 142, 78, 0.35);
      pointer-events: none;
    }

    .document-page::after {
      content: '';
      position: absolute;
      inset: 7.5mm;
      border: 0.5px solid rgba(186, 142, 78, 0.15);
      pointer-events: none;
    }

    .masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1.5px solid var(--oxblood);
      margin-bottom: 8px;
    }

    .brand-lockup {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-logo {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--gold);
    }

    .brand-text h1 {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--oxblood);
      line-height: 1;
      margin-bottom: 3px;
    }

    .brand-text p {
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--gold);
      font-weight: 600;
      font-family: 'JetBrains Mono', monospace;
    }

    .masthead-info {
      text-align: right;
      font-size: 8px;
      color: var(--muted);
      line-height: 1.35;
      font-family: 'JetBrains Mono', monospace;
    }

    .masthead-info strong {
      color: var(--oxblood);
      font-weight: 700;
    }

    .title-banner {
      background: var(--oxblood);
      color: #FFFFFF;
      padding: 7px 12px;
      border-radius: 3px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 3px solid var(--gold);
    }

    .title-banner h2 {
      font-family: 'Cinzel', serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #FFFFFF;
    }

    .ref-badge {
      background: rgba(186, 142, 78, 0.22);
      border: 1px solid var(--gold);
      color: var(--gold-light);
      padding: 2px 7px;
      font-size: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      border-radius: 2px;
      letter-spacing: 0.06em;
    }

    .section-block {
      margin-bottom: 7px;
    }

    .section-header {
      font-family: 'Cinzel', serif;
      font-size: 9.5px;
      font-weight: 700;
      color: var(--oxblood);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding-bottom: 2px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .section-number {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      color: var(--gold);
      background: #FAF5EB;
      padding: 1px 4px;
      border-radius: 2px;
      border: 1px solid rgba(186, 142, 78, 0.35);
    }

    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 9px;
    }

    .form-grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px 9px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .field-label {
      font-size: 7.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .field-input {
      border: 1px solid var(--border);
      background: #FCFBF9;
      padding: 3.5px 6px;
      font-size: 9px;
      border-radius: 2px;
      color: #111;
      font-weight: 500;
      min-height: 22px;
      display: flex;
      align-items: center;
    }

    .field-input.prefilled {
      background: #FAF7F2;
      color: var(--oxblood);
      font-weight: 600;
      border-color: #D3C7B2;
    }

    .checkbox-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding: 2px 0;
    }

    .checkbox-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 8.5px;
      font-weight: 500;
    }

    .checkbox-box {
      width: 10px;
      height: 10px;
      border: 1.5px solid var(--gold);
      border-radius: 2px;
      background: #FFFFFF;
      display: inline-block;
    }

    .checkbox-box.checked {
      background: var(--oxblood);
      position: relative;
    }

    .checkbox-box.checked::after {
      content: '✓';
      position: absolute;
      color: var(--gold-light);
      font-size: 8px;
      top: -1px;
      left: 1px;
      font-weight: bold;
    }

    .spec-table {
      width: 100%;
      border-collapse: collapse;
      margin: 3px 0 5px;
      font-size: 8.5px;
    }

    .spec-table th {
      background: #FAF5EB;
      color: var(--oxblood);
      font-family: 'JetBrains Mono', monospace;
      font-size: 7px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      text-align: left;
      padding: 4px 6px;
      border: 1px solid var(--border);
    }

    .spec-table td {
      padding: 3.5px 6px;
      border: 1px solid var(--border-subtle);
      color: #222;
      line-height: 1.3;
    }

    .spec-table tr:nth-child(even) td {
      background: #FCFBF9;
    }

    .legal-box {
      background: #FAF8F5;
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 5px 8px;
      font-size: 7.8px;
      color: #444;
      line-height: 1.38;
      margin-bottom: 6px;
    }

    .legal-box ol {
      padding-left: 14px;
    }

    .legal-box li {
      margin-bottom: 3px;
    }

    .guarantee-box {
      background: #FAF5EB;
      border: 1px solid var(--gold);
      border-radius: 3px;
      padding: 5px 8px;
      margin-bottom: 6px;
    }

    .guarantee-box h3 {
      font-family: 'Cinzel', serif;
      font-size: 8.5px;
      font-weight: 700;
      color: var(--oxblood);
      letter-spacing: 0.06em;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .guarantee-box p {
      font-size: 7.5px;
      color: #555;
      line-height: 1.32;
      margin-bottom: 4px;
    }

    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 5px;
    }

    .signature-card {
      border: 1px solid var(--border);
      background: #FFFFFF;
      padding: 7px 9px;
      border-radius: 3px;
    }

    .signature-card.supplier {
      background: #FAF6EF;
      border-color: #D3C4A5;
    }

    .sig-title {
      font-family: 'Cinzel', serif;
      font-size: 8.5px;
      font-weight: 700;
      color: var(--oxblood);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      padding-bottom: 2px;
    }

    .sig-line {
      height: 30px;
      border-bottom: 1.5px solid #BA8E4E;
      margin-bottom: 3px;
      position: relative;
    }

    .sig-line span {
      position: absolute;
      bottom: -11px;
      left: 0;
      font-size: 7px;
      font-family: 'JetBrains Mono', monospace;
      color: #888;
      text-transform: uppercase;
    }

    .footer-doc {
      margin-top: auto;
      padding-top: 5px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      font-size: 7.2px;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
    }

    .pill-tag {
      display: inline-block;
      font-size: 7px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      text-transform: uppercase;
      padding: 1px 4px;
      border-radius: 2px;
      background: #FAF2DF;
      color: #7D591F;
      border: 1px solid #E4CD96;
    }

    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .action-bar {
        display: none !important;
      }
      .document-page {
        box-shadow: none !important;
        margin: 0 !important;
        page-break-after: always;
        page-break-inside: avoid;
      }
      .document-page:last-child {
        page-break-after: avoid;
      }
    }
  </style>
</head>
<body>

  <!-- Floating Print & Action Bar -->
  <div class="action-bar">
    <span>PYAALI BY JAAN COMMERCIAL ONBOARDING</span>
    <button onclick="window.print()">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
      Print / Save as PDF
    </button>
  </div>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="document-page">
    <div>
      <!-- Masthead -->
      <header class="masthead">
        <div class="brand-lockup">
          <img src="${logoBase64}" alt="Rootwills Master Seal" class="brand-logo" />
          <div class="brand-text">
            <h1>ROOTWILLS</h1>
            <p>Food Services &amp; Wholesale Purveyors</p>
          </div>
        </div>
        <div class="masthead-info">
          <strong>ROOTWILLS LTD</strong> (Co. No. 17398744)<br>
          Central Depot: 7d Yates Street, Middleton, Manchester, M24 4GA<br>
          Midlands Fleet Hub: Birmingham Pre-Dawn Trunk<br>
          Trade Accounts Desk: +44 16164 12803 | sales@rootwills.co.uk
        </div>
      </header>

      <!-- Document Title -->
      <div class="title-banner">
        <div>
          <h2>Commercial Supply Agreement &amp; Trade Credit Application</h2>
          <div style="font-size: 8px; opacity: 0.9; margin-top: 1px;">Dedicated Artisan Hospitality &amp; Café Supply Schedule</div>
        </div>
        <div class="ref-badge">CONTRACT REF: RW-PYAALI-2026/01</div>
      </div>

      <!-- Section 1: Customer Profile -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">01</span>
          <span>Customer Business Profile &amp; Legal Entity</span>
          <span class="pill-tag" style="margin-left: auto;">Verified Account</span>
        </div>

        <div class="form-grid-2">
          <div class="field-group">
            <label class="field-label">Trading Name / Brand Venue</label>
            <div class="field-input prefilled">Pyaali By Jaan</div>
          </div>
          <div class="field-group">
            <label class="field-label">Operating Entity Legal Name (Ltd / LLP)</label>
            <div class="field-input prefilled">PYAALI LIMITED</div>
          </div>
        </div>

        <div class="form-grid-3" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Companies House Reg Number</label>
            <div class="field-input prefilled">16802845 (Incorporated UK)</div>
          </div>
          <div class="field-group">
            <label class="field-label">UK VAT Registration Number</label>
            <div class="field-input">&nbsp;</div>
          </div>
          <div class="field-group">
            <label class="field-label">Direct Contact Phone</label>
            <div class="field-input prefilled">+44 121 820 3610</div>
          </div>
        </div>

        <div class="form-grid-2" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Registered Corporate Office Address</label>
            <div class="field-input prefilled">173 Witton Road, Aston, Birmingham</div>
          </div>
          <div class="field-group">
            <label class="field-label">Registered Office Postcode</label>
            <div class="field-input prefilled">B6 6JR</div>
          </div>
        </div>
      </div>

      <!-- Section 2: Store Delivery Site & Logistics -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">02</span>
          <span>Store Delivery Site &amp; Pre-Dawn Drop Logistics</span>
        </div>

        <div class="form-grid-2">
          <div class="field-group">
            <label class="field-label">Store Delivery Address (Physical Location)</label>
            <div class="field-input prefilled">173 Witton Road, Aston, Birmingham</div>
          </div>
          <div class="field-group">
            <label class="field-label">Store Postcode</label>
            <div class="field-input prefilled">B6 6JR</div>
          </div>
        </div>

        <div class="form-grid-3" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Store General Manager</label>
            <div class="field-input">&nbsp;</div>
          </div>
          <div class="field-group">
            <label class="field-label">Direct Mobile / WhatsApp</label>
            <div class="field-input prefilled">+44 121 820 3610</div>
          </div>
          <div class="field-group">
            <label class="field-label">Store Order Contact Email</label>
            <div class="field-input prefilled">orders@pyaali.co.uk</div>
          </div>
        </div>

        <div style="margin-top: 5px;">
          <label class="field-label">Authorized Delivery Window (Birmingham Daily Trunk Fleet)</label>
          <div class="checkbox-row">
            <label class="checkbox-item"><span class="checkbox-box checked"></span> Pre-Dawn Keyhole Drop (04:00 AM – 07:30 AM) <em>[Recommended for Zero Kitchen Disruption]</em></label>
            <label class="checkbox-item"><span class="checkbox-box"></span> Morning Kitchen Receipt (08:00 AM – 10:30 AM)</label>
          </div>
        </div>

        <div class="form-grid-2" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Keyholder / Key-Safe Drop Authorized?</label>
            <div class="checkbox-row" style="padding-top: 2px;">
              <label class="checkbox-item"><span class="checkbox-box"></span> YES, Keyhole Chiller Access Permitted</label>
              <label class="checkbox-item"><span class="checkbox-box"></span> NO, Staff Signature Required on Drop</label>
            </div>
          </div>
          <div class="field-group">
            <label class="field-label">Access Details / Key-Safe Code / Alarm Procedure</label>
            <div class="field-input">&nbsp;</div>
          </div>
        </div>
      </div>

      <!-- Section 3: Pyaali By Jaan Dedicated Product Schedules -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">03</span>
          <span>Dedicated Wholesale Supply Categories &amp; Quality Protocols</span>
        </div>

        <table class="spec-table">
          <thead>
            <tr>
              <th style="width: 25%;">Product Category</th>
              <th style="width: 47%;">Core Contracted Lines &amp; Specifications</th>
              <th style="width: 28%;">Logistics &amp; Cold-Chain SLA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fresh Dairy &amp; Barista Milks</strong></td>
              <td>Whole Barista Milk (2L / Bulk Crates), Semi-Skimmed, Double Cream, Salted Butter Blocks, Desi Ghee tins.</td>
              <td>Dual-evaporator refrigerated vans (0°C to 4°C). Daily pre-dawn intake.</td>
            </tr>
            <tr>
              <td><strong>Karak Chai &amp; Specialty Spices</strong></td>
              <td>Premium CTC Loose Tea (Assam/Ceylon), Whole Green Cardamom, Cinnamon Quills, Cloves, Ginger &amp; Pure Jaggery.</td>
              <td>Hermetically sealed dry catering packs. Inspected spice freshness.</td>
            </tr>
            <tr>
              <td><strong>Artisan Bakery &amp; Brunch Lines</strong></td>
              <td>Brioche Buns, Sourdough Bread Loaves, Flaky Parathas, French Toast Bread, Pancake Batters &amp; Pastry Flour.</td>
              <td>Fresh morning delivery, protected ambient palleting.</td>
            </tr>
            <tr>
              <td><strong>Fresh Poultry &amp; Savoury Proteins</strong></td>
              <td>Red Tractor Fresh Chicken Breast Fillets &amp; Thighs, Naga Chili Marinades, Tikka seasonings, Halloumi blocks.</td>
              <td>Vacuum sealed, sub-2°C cold chain tracking with batch health tags.</td>
            </tr>
            <tr>
              <td><strong>Cooking Oils, Sauces &amp; Packaging</strong></td>
              <td>Bulk Pure Vegetable Oil (15L / 20L), Monin Syrups, Custom Sauces, Premium Hot Cups &amp; Foodservice disposables.</td>
              <td>Dry bulk pallet delivery with zero breakage guarantee.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-doc">
      <span>ROOTWILLS LTD &amp; PYAALI BY JAAN (PYAALI LIMITED) · B2B SUPPLY AGREEMENT</span>
      <span>PAGE 1 OF 2 · CONFIDENTIAL</span>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="document-page">
    <div>
      <!-- Masthead Compact -->
      <header class="masthead">
        <div class="brand-lockup">
          <img src="${logoBase64}" alt="Rootwills Master Seal" class="brand-logo" />
          <div class="brand-text">
            <h1 style="font-size: 16px;">ROOTWILLS</h1>
            <p style="font-size: 7.5px;">B2B Wholesale Purveyors · Legal &amp; Financial Schedule</p>
          </div>
        </div>
        <div class="masthead-info">
          CONTRACT REF: <strong>RW-PYAALI-2026/01</strong><br>
          Customer: <strong>Pyaali By Jaan (Pyaali Limited)</strong>
        </div>
      </header>

      <!-- Section 4: Accounts & Invoicing -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">04</span>
          <span>Invoicing, Commercial Credit &amp; Payment Terms</span>
        </div>

        <div class="form-grid-3">
          <div class="field-group">
            <label class="field-label">Accounts Payable Contact</label>
            <div class="field-input">&nbsp;</div>
          </div>
          <div class="field-group">
            <label class="field-label">Accounts Direct Phone</label>
            <div class="field-input prefilled">+44 121 820 3610</div>
          </div>
          <div class="field-group">
            <label class="field-label">PDF Invoicing Email Address</label>
            <div class="field-input prefilled">orders@pyaali.co.uk</div>
          </div>
        </div>

        <div class="form-grid-3" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Requested Weekly Credit Limit</label>
            <div class="field-input prefilled">£&nbsp;</div>
          </div>
          <div class="field-group">
            <label class="field-label">Minimum Order Value (MOV)</label>
            <div class="field-input prefilled">£120.00 Net per Drop (Free Birmingham Delivery)</div>
          </div>
          <div class="field-group">
            <label class="field-label">Agreed Commercial Credit Terms</label>
            <div class="field-input prefilled">[ X ] 14 Days Net from Invoice Date</div>
          </div>
        </div>

        <div style="margin-top: 5px;">
          <label class="field-label">Primary Settlement Method</label>
          <div class="checkbox-row">
            <label class="checkbox-item"><span class="checkbox-box checked"></span> Direct Debit Mandate (GoCardless Automated Trade Settlement) <em>[Preferred]</em></label>
            <label class="checkbox-item"><span class="checkbox-box"></span> BACS Electronic Bank Transfer to Rootwills Ltd Account</label>
            <label class="checkbox-item"><span class="checkbox-box"></span> Corporate Trade Card on File</label>
          </div>
        </div>
      </div>

      <!-- Section 5: Trade Credit References -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">05</span>
          <span>Trade Credit References (Two Existing UK Wholesale Suppliers)</span>
        </div>

        <div class="form-grid-2">
          <div style="background: #FCFBF9; border: 1px solid var(--border-subtle); padding: 5px 8px; border-radius: 3px;">
            <strong style="color: var(--oxblood); font-size: 8px; font-family: 'JetBrains Mono', monospace;">TRADE REFERENCE 01</strong>
            <div class="field-group" style="margin-top: 2px;">
              <label class="field-label">Supplier Company Name</label>
              <div class="field-input" style="min-height: 20px; padding: 2px 5px;">&nbsp;</div>
            </div>
            <div class="form-grid-2" style="margin-top: 2px;">
              <div class="field-group">
                <label class="field-label">Contact Person</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">&nbsp;</div>
              </div>
              <div class="field-group">
                <label class="field-label">Telephone / Email</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">&nbsp;</div>
              </div>
            </div>
          </div>

          <div style="background: #FCFBF9; border: 1px solid var(--border-subtle); padding: 5px 8px; border-radius: 3px;">
            <strong style="color: var(--oxblood); font-size: 8px; font-family: 'JetBrains Mono', monospace;">TRADE REFERENCE 02</strong>
            <div class="field-group" style="margin-top: 2px;">
              <label class="field-label">Supplier Company Name</label>
              <div class="field-input" style="min-height: 20px; padding: 2px 5px;">&nbsp;</div>
            </div>
            <div class="form-grid-2" style="margin-top: 2px;">
              <div class="field-group">
                <label class="field-label">Contact Person</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">&nbsp;</div>
              </div>
              <div class="field-group">
                <label class="field-label">Telephone / Email</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 6: Commercial Terms -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">06</span>
          <span>Terms &amp; Conditions of Wholesale Supply (Summary)</span>
        </div>

        <div class="legal-box">
          <ol>
            <li><strong>Orders &amp; Acceptance:</strong> All supply orders placed via phone, WhatsApp (+44 7984 709478), email, or Rootwills Direct online portal are subject to acceptance by Rootwills Ltd. Deliveries under £120.00 Net incur a standard £15.00 delivery surcharge.</li>
            <li><strong>Temperature &amp; Cold-Chain Integrity:</strong> Goods are transported under HACCP-compliant dual-temperature regimes (0–4°C for chilled dairy & poultry). Risk in products transfers to Customer upon delivery at the store pass or unattended keyhole drop.</li>
            <li><strong>Claims, Shortages &amp; Rejections:</strong> Any damage, temperature break, or discrepancy must be reported in writing with photographic evidence within <strong>24 hours of delivery</strong> to <em>sales@rootwills.co.uk</em>. Qualified claims result in an immediate credit note issued against the account.</li>
            <li><strong>Settlement &amp; Late Interest:</strong> Payment must be made strictly according to agreed credit terms. Overdue balances shall accrue statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998 at 8% above Bank of England base rate, plus statutory compensation fees.</li>
            <li><strong>Retention of Title:</strong> Legal and beneficial ownership of all delivered goods remains with Rootwills Ltd until payment in full has been cleared into Rootwills Ltd's nominated bank account.</li>
          </ol>
        </div>
      </div>

      <!-- Section 7: Director Guarantee & Execution -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">07</span>
          <span>Director Personal Guarantee &amp; Commercial Execution</span>
        </div>

        <div class="guarantee-box">
          <h3>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--gold);"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            DIRECTOR PERSONAL GUARANTEE &amp; INDEMNITY
          </h3>
          <p>
            In consideration of Rootwills Ltd granting trade credit facilities to the Customer, I/we, the undersigned Director(s) of the operating company, hereby unconditionally, personally, jointly and severally guarantee payment of all monies and performance of all obligations owed by the Customer to Rootwills Ltd.
          </p>
          <div class="form-grid-3">
            <div class="field-group">
              <label class="field-label">Director Full Legal Name</label>
              <div class="field-input">&nbsp;</div>
            </div>
            <div class="field-group">
              <label class="field-label">Date of Birth</label>
              <div class="field-input">DD / MM / YYYY</div>
            </div>
            <div class="field-group">
              <label class="field-label">Director Mobile Phone</label>
              <div class="field-input">&nbsp;</div>
            </div>
          </div>
          <div class="field-group" style="margin-top: 4px;">
            <label class="field-label">Director Residential Address (Required for Personal Guarantee)</label>
            <div class="field-input">&nbsp;</div>
          </div>
        </div>

        <!-- Signatures -->
        <div class="signature-grid">
          <div class="signature-card">
            <div class="sig-title">For &amp; On Behalf of the Customer</div>
            <div style="font-size: 8px; color: var(--muted); margin-bottom: 5px;">PYAALI LIMITED / Pyaali By Jaan</div>
            <div class="sig-line"><span>Authorized Signature</span></div>
            <div class="form-grid-2" style="margin-top: 10px;">
              <div class="field-group">
                <label class="field-label">Print Name</label>
                <div class="field-input" style="min-height: 18px; padding: 2px 4px;">&nbsp;</div>
              </div>
              <div class="field-group">
                <label class="field-label">Date</label>
                <div class="field-input" style="min-height: 18px; padding: 2px 4px;">&nbsp;</div>
              </div>
            </div>
          </div>

          <div class="signature-card supplier">
            <div class="sig-title">For &amp; On Behalf of Rootwills Ltd</div>
            <div style="font-size: 8px; color: var(--muted); margin-bottom: 5px;">Wholesale Commercial Accounts Directorate</div>
            <div class="sig-line"><span>Authorized Officer Signature</span></div>
            <div class="form-grid-2" style="margin-top: 10px;">
              <div class="field-group">
                <label class="field-label">Position</label>
                <div class="field-input prefilled" style="min-height: 18px; padding: 2px 4px;">Commercial Accounts Director</div>
              </div>
              <div class="field-group">
                <label class="field-label">Date</label>
                <div class="field-input prefilled" style="min-height: 18px; padding: 2px 4px;">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-doc">
      <span>ROOTWILLS LTD (CO. NO. 17398744) · 7D YATES ST, MIDDLETON, MANCHESTER M24 4GA</span>
      <span>PAGE 2 OF 2 · CONTRACT REF: RW-PYAALI-2026/01</span>
    </div>
  </div>

</body>
</html>
`;

// Save public HTML document
const publicDocsDir = path.resolve(process.cwd(), 'public/docs');
if (!fs.existsSync(publicDocsDir)) {
  fs.mkdirSync(publicDocsDir, { recursive: true });
}
const outHtmlPath = path.join(publicDocsDir, 'rootwills-pyaali-agreement.html');
fs.writeFileSync(outHtmlPath, htmlContent, 'utf-8');
console.log('Contract successfully created at:', outHtmlPath);

// Save to user desktop
const desktopPath = 'C:\\\\Users\\\\abc\\\\Desktop\\\\Rootwills-Pyaali-By-Jaan-Supply-Agreement.html';
fs.writeFileSync(desktopPath, htmlContent, 'utf-8');
console.log('Copied to desktop at:', desktopPath);
