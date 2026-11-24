const fs = require('fs');
const path = require('path');

const logoBuf = fs.readFileSync(path.resolve(process.cwd(), 'public/images/logo.png'));
const logoBase64 = 'data:image/png;base64,' + logoBuf.toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rootwills Ltd | B2B Commercial Supply Agreement & Trade Credit Application</title>
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

    /* Force browsers to NOT print URL, date/time or header/footer */
    @page {
      size: A4 portrait;
      margin: 0mm !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #EFEBE4;
      color: var(--ink);
      line-height: 1.38;
      font-size: 10.5px;
      -webkit-font-smoothing: antialiased;
      padding: 24px 0 60px;
    }

    /* Floating Print & Download Action Bar */
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

    /* A4 Document Canvas */
    .document-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto 24px;
      background: var(--card-bg);
      padding: 10mm 14mm 8mm;
      box-shadow: 0 18px 45px rgba(38, 3, 9, 0.12), 0 2px 6px rgba(0,0,0,0.04);
      border: 1px solid #D8CEBB;
      position: relative;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Page Breaks & Print Perfection */
    @media print {
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #FFFFFF !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .action-bar {
        display: none !important;
      }
      .document-page {
        width: 210mm !important;
        height: 297mm !important;
        max-height: 297mm !important;
        margin: 0 !important;
        padding: 10mm 14mm 8mm !important;
        box-shadow: none !important;
        border: none !important;
        page-break-after: always !important;
        page-break-inside: avoid !important;
        overflow: hidden !important;
      }
      .document-page:last-child {
        page-break-after: avoid !important;
      }
    }

    /* Header Masthead */
    .masthead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--gold);
      margin-bottom: 10px;
    }

    .brand-lockup {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      padding: 2px;
      background: #FAF7F2;
      box-shadow: 0 4px 10px rgba(38, 3, 9, 0.15);
      object-fit: contain;
    }

    .brand-text h1 {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--oxblood);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .brand-text p {
      font-size: 8.5px;
      color: var(--gold);
      font-family: 'JetBrains Mono', monospace;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      font-weight: 600;
      margin-top: 1px;
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
      font-size: 8.5px;
    }

    /* Document Title Banner */
    .title-banner {
      background: linear-gradient(135deg, var(--oxblood) 0%, var(--burgundy) 100%);
      color: #FFFFFF;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 4px solid var(--gold);
    }

    .title-banner h2 {
      font-family: 'Cinzel', serif;
      font-size: 11.5px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 700;
      color: #FFFFFF;
    }

    .title-banner .ref-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8px;
      background: rgba(186, 142, 78, 0.2);
      border: 1px solid var(--gold);
      color: var(--gold-light);
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.06em;
    }

    /* Sections */
    .section-block {
      margin-bottom: 9px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Cinzel', serif;
      font-size: 10px;
      font-weight: 700;
      color: var(--oxblood);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding-bottom: 2px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 6px;
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

    /* Form Grids */
    .form-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5px 10px;
    }

    .form-grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5px 10px;
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
      font-size: 9px;
      font-weight: 500;
    }

    .checkbox-box {
      width: 11px;
      height: 11px;
      border: 1.5px solid var(--gold);
      border-radius: 2px;
      background: #FFFFFF;
      display: inline-block;
    }

    /* Custom Table for Dessert Supply Lines */
    .spec-table {
      width: 100%;
      border-collapse: collapse;
      margin: 3px 0 6px;
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

    /* Legal Clause Box */
    .legal-box {
      background: #FAF8F5;
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 6px 9px;
      font-size: 8px;
      color: #444;
      line-height: 1.4;
      margin-bottom: 7px;
    }

    .legal-box ol {
      padding-left: 12px;
    }

    .legal-box li {
      margin-bottom: 2px;
    }

    .legal-box strong {
      color: var(--oxblood);
    }

    /* Guarantee Box */
    .guarantee-box {
      border: 1.5px solid var(--gold);
      background: #FFFDF9;
      border-radius: 3px;
      padding: 7px 10px;
      margin-bottom: 8px;
    }

    .guarantee-box h3 {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      color: var(--oxblood);
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .guarantee-box p {
      font-size: 8px;
      line-height: 1.35;
      color: #333;
      margin-bottom: 5px;
    }

    /* Signature Area */
    .signature-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 6px;
    }

    .signature-card {
      border: 1px solid var(--border);
      border-radius: 3px;
      padding: 8px 10px;
      background: #FCFBF9;
    }

    .signature-card.supplier {
      background: #FAF6EF;
      border-color: #D3C4A5;
    }

    .sig-title {
      font-family: 'Cinzel', serif;
      font-size: 9px;
      font-weight: 700;
      color: var(--oxblood);
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      padding-bottom: 2px;
    }

    .sig-line {
      height: 32px;
      border-bottom: 1.5px dashed #A89D8B;
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
      padding-top: 6px;
      border-top: 1px solid var(--border-subtle);
      display: flex;
      justify-content: space-between;
      font-size: 7.5px;
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
  </style>
</head>
<body>

  <!-- Floating Print & Action Bar -->
  <div class="action-bar">
    <span>LITTLE DESSERT SHOP ONBOARDING</span>
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
          <div style="font-size: 8px; opacity: 0.9; margin-top: 1px;">Dedicated Franchise &amp; Operator Supply Schedule</div>
        </div>
        <div class="ref-badge">CONTRACT REF: RW-LDS-2026/01</div>
      </div>

      <!-- Section 1: Customer Profile -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">01</span>
          <span>Customer Business Profile &amp; Legal Entity</span>
          <span class="pill-tag" style="margin-left: auto;">Client To Complete</span>
        </div>

        <div class="form-grid-2">
          <div class="field-group">
            <label class="field-label">Trading Name / Brand Store</label>
            <div class="field-input prefilled">Little Dessert Shop – (Branch: _____________________________)</div>
          </div>
          <div class="field-group">
            <label class="field-label">Parent Brand / Franchise Network</label>
            <div class="field-input prefilled">Little Dessert Shop (Holdings) Limited Franchise Network</div>
          </div>
        </div>

        <div class="form-grid-3" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Operating Entity Legal Name (Ltd / LLP)</label>
            <div class="field-input">_______________________________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">Companies House Reg Number</label>
            <div class="field-input">_________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">UK VAT Registration Number</label>
            <div class="field-input">GB ______________________</div>
          </div>
        </div>

        <div class="form-grid-2" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Registered Corporate Office Address</label>
            <div class="field-input">________________________________________________________________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">Registered Office Postcode</label>
            <div class="field-input">_________________________</div>
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
            <div class="field-input">________________________________________________________________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">Store Postcode</label>
            <div class="field-input">_________________________</div>
          </div>
        </div>

        <div class="form-grid-3" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Store General Manager</label>
            <div class="field-input">_________________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">Direct Mobile / WhatsApp</label>
            <div class="field-input">+44 _________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">Store Order Contact Email</label>
            <div class="field-input">_________________________________</div>
          </div>
        </div>

        <div style="margin-top: 5px;">
          <label class="field-label">Authorized Delivery Window</label>
          <div class="checkbox-row">
            <label class="checkbox-item"><span class="checkbox-box"></span> Pre-Dawn Keyhole Drop (04:00 AM – 07:30 AM) <em>[Recommended for Zero Daytime Disruption]</em></label>
            <label class="checkbox-item"><span class="checkbox-box"></span> Store Morning Receipt (08:00 AM – 11:00 AM)</label>
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
            <div class="field-input">Key-Safe Code: ___________ | Alarm Disarm/Chiller Access: ________________________</div>
          </div>
        </div>
      </div>

      <!-- Section 3: Little Dessert Shop Dedicated Product Schedules -->
      <div class="section-block">
        <div class="section-header">
          <span class="section-number">03</span>
          <span>Dedicated Wholesale Supply Categories &amp; Quality Protocols</span>
        </div>

        <table class="spec-table">
          <thead>
            <tr>
              <th style="width: 28%;">Product Category</th>
              <th style="width: 44%;">Core Contracted Lines &amp; Specifications</th>
              <th style="width: 28%;">Logistics &amp; Cold-Chain SLA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Fresh Dairy, Creams &amp; Milks</strong></td>
              <td>Double Cream (2L/5L), Whipping Cream, Barista Whole &amp; Semi-Skimmed Milk, Unsalted &amp; Salted Butter Blocks.</td>
              <td>Dual-evaporator refrigerated vans (0°C to 4°C). Daily pre-dawn intake.</td>
            </tr>
            <tr>
              <td><strong>Fresh Soft Fruit &amp; Berries</strong></td>
              <td>Class 1 Hand-Graded Strawberries, Blueberries, Raspberries, Bananas, Mint Sprigs &amp; Seasonal Garnishes.</td>
              <td>Inspected &amp; temperature-monitored. 24-hr field-to-fridge guarantee.</td>
            </tr>
            <tr>
              <td><strong>Bakery, Waffle &amp; Crepe Dry Store</strong></td>
              <td>Commercial Belgian Waffle &amp; Crepe Mixes, Sourdough Bread Bases, Glazed Brioche, Pastry Flour, Refined Sugars.</td>
              <td>Dry sealed ambient storage. Protective palletized delivery.</td>
            </tr>
            <tr>
              <td><strong>Chocolates, Coulis &amp; Spreads</strong></td>
              <td>Hazelnut Cocoa Spreads (Bulk 3kg/5kg), Belgian Chocolate Drops (Milk, White, Dark), Fruit Coulis, Crushed Lotus/Oreo.</td>
              <td>Commercial catering formats for high-volume dessert stations.</td>
            </tr>
            <tr>
              <td><strong>Frozen Dessert Essentials</strong></td>
              <td>Cookie Dough Pucks (Triple Choc, White Choc, Milk Choc), Pre-Portioned Cheesecake Bases, Specialty Artisan Gelato lines.</td>
              <td>Sub-zero temperature-certified deep freeze (-18°C).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="footer-doc">
      <span>ROOTWILLS LTD &amp; LITTLE DESSERT SHOP · B2B SUPPLY AGREEMENT</span>
      <span>PAGE 1 OF 2 · CONFIDENTIAL</span>
    </div>
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="document-page">
    <div>
      <!-- Masthead Compact -->
      <header class="masthead" style="padding-bottom: 8px; margin-bottom: 10px;">
        <div class="brand-lockup">
          <img src="${logoBase64}" alt="Rootwills Logo" style="width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--gold); padding: 1px;" />
          <div class="brand-text">
            <h1 style="font-size: 16px;">ROOTWILLS</h1>
            <p style="font-size: 7.5px;">B2B Wholesale Purveyors · Legal &amp; Financial Schedule</p>
          </div>
        </div>
        <div class="masthead-info">
          CONTRACT REF: <strong>RW-LDS-2026/01</strong><br>
          Customer: <strong>Little Dessert Shop Franchisee</strong>
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
            <div class="field-input">_________________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">Accounts Direct Phone</label>
            <div class="field-input">+44 _________________________</div>
          </div>
          <div class="field-group">
            <label class="field-label">PDF Invoicing Email Address</label>
            <div class="field-input">_________________________________</div>
          </div>
        </div>

        <div class="form-grid-3" style="margin-top: 5px;">
          <div class="field-group">
            <label class="field-label">Requested Weekly Credit Limit</label>
            <div class="field-input prefilled">£ __________________ (e.g. £2,500 – £5,000)</div>
          </div>
          <div class="field-group">
            <label class="field-label">Minimum Order Value (MOV)</label>
            <div class="field-input prefilled">£120.00 Net per Drop (Free Delivery)</div>
          </div>
          <div class="field-group">
            <label class="field-label">Agreed Commercial Credit Terms</label>
            <div class="field-input prefilled">[ X ] 14 Days Net from Invoice Date</div>
          </div>
        </div>

        <div style="margin-top: 5px;">
          <label class="field-label">Primary Settlement Method</label>
          <div class="checkbox-row">
            <label class="checkbox-item"><span class="checkbox-box"></span> Direct Debit Mandate (GoCardless Automated Trade Settlement) <em>[Preferred]</em></label>
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
          <div style="background: #FCFBF9; border: 1px solid var(--border-subtle); padding: 6px 8px; border-radius: 3px;">
            <strong style="color: var(--oxblood); font-size: 8px; font-family: 'JetBrains Mono', monospace;">TRADE REFERENCE 01</strong>
            <div class="field-group" style="margin-top: 2px;">
              <label class="field-label">Supplier Company Name</label>
              <div class="field-input" style="min-height: 20px; padding: 2px 5px;">_________________________________________________</div>
            </div>
            <div class="form-grid-2" style="margin-top: 2px;">
              <div class="field-group">
                <label class="field-label">Contact Person</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">_________________________</div>
              </div>
              <div class="field-group">
                <label class="field-label">Telephone / Email</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">_________________________</div>
              </div>
            </div>
          </div>

          <div style="background: #FCFBF9; border: 1px solid var(--border-subtle); padding: 6px 8px; border-radius: 3px;">
            <strong style="color: var(--oxblood); font-size: 8px; font-family: 'JetBrains Mono', monospace;">TRADE REFERENCE 02</strong>
            <div class="field-group" style="margin-top: 2px;">
              <label class="field-label">Supplier Company Name</label>
              <div class="field-input" style="min-height: 20px; padding: 2px 5px;">_________________________________________________</div>
            </div>
            <div class="form-grid-2" style="margin-top: 2px;">
              <div class="field-group">
                <label class="field-label">Contact Person</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">_________________________</div>
              </div>
              <div class="field-group">
                <label class="field-label">Telephone / Email</label>
                <div class="field-input" style="min-height: 20px; padding: 2px 5px;">_________________________</div>
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
            <li><strong>Temperature &amp; Cold-Chain Integrity:</strong> Goods are transported under HACCP-compliant dual-temperature regimes (0–4°C for chilled dairy, -18°C for frozen). Risk in products transfers to Customer upon delivery at the store pass or unattended keyhole drop.</li>
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
              <div class="field-input">_________________________________</div>
            </div>
            <div class="field-group">
              <label class="field-label">Date of Birth</label>
              <div class="field-input">DD / MM / YYYY</div>
            </div>
            <div class="field-group">
              <label class="field-label">Director Mobile Phone</label>
              <div class="field-input">+44 _________________________</div>
            </div>
          </div>
          <div class="field-group" style="margin-top: 4px;">
            <label class="field-label">Director Residential Address (Required for Personal Guarantee)</label>
            <div class="field-input">____________________________________________________________________________________________________</div>
          </div>
        </div>

        <!-- Signatures -->
        <div class="signature-grid">
          <div class="signature-card">
            <div class="sig-title">For &amp; On Behalf of the Customer</div>
            <div style="font-size: 8px; color: var(--muted); margin-bottom: 5px;">Little Dessert Shop Franchisee / Trading Entity</div>
            <div class="sig-line"><span>Authorized Signature</span></div>
            <div class="form-grid-2" style="margin-top: 10px;">
              <div class="field-group">
                <label class="field-label">Print Name</label>
                <div class="field-input" style="min-height: 18px; padding: 2px 4px;">_________________________</div>
              </div>
              <div class="field-group">
                <label class="field-label">Date</label>
                <div class="field-input" style="min-height: 18px; padding: 2px 4px;">____ / ____ / 2026</div>
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
                <div class="field-input prefilled" style="min-height: 18px; padding: 2px 4px;">____ / ____ / 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-doc">
      <span>ROOTWILLS LTD (CO. NO. 17398744) · 7D YATES ST, MIDDLETON, MANCHESTER M24 4GA</span>
      <span>PAGE 2 OF 2 · EXECUTABLE LEGAL INSTRUMENT</span>
    </div>

  </div>

</body>
</html>
`;

const outDir = path.resolve(process.cwd(), 'public/docs');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'rootwills-little-dessert-shop-agreement.html');
fs.writeFileSync(outPath, htmlContent, 'utf8');
console.log('Contract successfully created at:', outPath);
