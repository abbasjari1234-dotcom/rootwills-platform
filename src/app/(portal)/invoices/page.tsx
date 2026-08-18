'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemoStore } from '@/lib/store/demo-store';
import { 
  FileText, 
  Download, 
  CreditCard, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  Building2,
  Clock,
  Printer,
  Sparkles,
  ArrowDownToLine,
  Layers,
  Check,
  Landmark,
  Zap,
  Lock,
  ArrowRight,
  ExternalLink,
  Receipt
} from 'lucide-react';
import { createStripePaymentIntent, settleInvoiceViaCard } from '@/lib/payments/stripe';
import { createDirectDebitMandateFlow } from '@/lib/payments/gocardless';

type PaymentMethodTab = 'card' | 'direct_debit' | 'bank_transfer';

export default function InvoicesStatementsPage() {
  const { currentOrgId, organizations, invoices, payInvoice } = useDemoStore();
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<any>(null);
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [payModalInvoice, setPayModalInvoice] = useState<any>(null);
  const [paymentTab, setPaymentTab] = useState<PaymentMethodTab>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [mandateSuccess, setMandateSuccess] = useState(false);
  const [mandateLoading, setMandateLoading] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const orgInvoices = invoices.filter((inv) => inv.organizationId === currentOrg.id);

  const totalOutstanding = orgInvoices
    .filter((inv) => inv.status === 'open' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const availableCredit = Math.max(0, currentOrg.creditLimit - currentOrg.creditUsed);

  // Aged Debt buckets
  const agedCurrent = orgInvoices.filter(i => i.status === 'open').reduce((s, i) => s + i.totalAmount, 0);
  const aged30Days = orgInvoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.totalAmount, 0);

  // Export to Xero / QuickBooks CSV handler
  const handleExportAccountingCSV = (format: 'xero' | 'quickbooks' | 'sage') => {
    let headers = '';
    let rows: string[] = [];

    if (format === 'xero') {
      headers = '*ContactName,EmailAddress,InvoiceNumber,Reference,InvoiceDate,DueDate,Total,TaxTotal,Status';
      rows = orgInvoices.map(
        (i) => `"${currentOrg.name}","billing@${currentOrg.name.toLowerCase().replace(/[^a-z]/g, '')}.co.uk","${i.invoiceNumber}","${i.orderNumber || ''}","${i.issueDate}","${i.dueDate}",${i.totalAmount.toFixed(2)},${i.vatAmount.toFixed(2)},"${i.status.toUpperCase()}"`
      );
    } else if (format === 'quickbooks') {
      headers = 'Customer,InvoiceNo,InvoiceDate,DueDate,Amount,TaxAmount,Balance';
      rows = orgInvoices.map(
        (i) => `"${currentOrg.name}","${i.invoiceNumber}","${i.issueDate}","${i.dueDate}",${i.totalAmount.toFixed(2)},${i.vatAmount.toFixed(2)},${i.status === 'paid' ? '0.00' : i.totalAmount.toFixed(2)}`
      );
    } else {
      headers = 'Type,Account Ref,Date,Ref,Net,Tax,Gross';
      rows = orgInvoices.map(
        (i) => `"SI","${currentOrg.id.toUpperCase()}","${i.issueDate}","${i.invoiceNumber}",${i.subtotal.toFixed(2)},${i.vatAmount.toFixed(2)},${i.totalAmount.toFixed(2)}`
      );
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rootwills_${currentOrg.name.replace(/\s+/g, '_')}_Invoices_${format.toUpperCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSettleCardPayment = async (inv: any) => {
    setIsProcessingPayment(true);
    await settleInvoiceViaCard(inv.id, inv.totalAmount, currentOrg.name);
    payInvoice(inv.id);
    setIsProcessingPayment(false);
    setPayModalInvoice(null);
    alert(`Payment of £${inv.totalAmount.toFixed(2)} for Invoice #${inv.invoiceNumber} processed successfully via Stripe!`);
  };

  const handleSetupDirectDebit = async () => {
    setMandateLoading(true);
    try {
      const res = await fetch('/api/payments/gocardless/create-mandate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: currentOrg.id,
          companyName: currentOrg.name,
          contactEmail: `accounts@${currentOrg.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.co.uk`,
        }),
      });
      const data = await res.json();
      setMandateLoading(false);
      setMandateSuccess(true);
      setTimeout(() => {
        setMandateSuccess(false);
        setPayModalInvoice(null);
        alert('GoCardless BACS Direct Debit mandate registered! Invoices will be automatically collected on day 30.');
      }, 1500);
    } catch {
      setMandateLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Commercial Invoices & Ledger</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Billing & Invoices &bull; {currentOrg.name}
          </h1>
          <div className="flex items-center gap-2 text-xs text-cream/60 mt-0.5">
            <span>Payment Terms: <strong>{currentOrg.paymentTerms}</strong></span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5" />
              <span>GoCardless BACS Direct Debit Active</span>
            </span>
          </div>
        </div>

        {/* Actions Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Direct Debit Setup CTA */}
          <button
            onClick={() => {
              setPayModalInvoice(orgInvoices[0] || null);
              setPaymentTab('direct_debit');
            }}
            className="px-4 py-2.5 rounded-xl bg-obsidian-900 border border-emerald-500/30 hover:border-emerald-500 text-xs text-emerald-300 font-semibold flex items-center gap-2 transition-colors"
          >
            <Landmark className="w-4 h-4 text-emerald-400" />
            <span>Setup BACS Direct Debit</span>
          </button>

          {/* Accounting Sync Dropdown */}
          <div className="relative group">
            <button
              className="px-4 py-2.5 rounded-xl bg-obsidian-900 border border-cream/20 hover:border-champagne text-xs text-cream font-semibold flex items-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export to ERP &darr;</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-20 space-y-1 text-xs">
              <button
                onClick={() => handleExportAccountingCSV('xero')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 text-cream flex items-center justify-between"
              >
                <span>Xero CSV Format</span>
                <ArrowDownToLine className="w-3 h-3 text-champagne" />
              </button>
              <button
                onClick={() => handleExportAccountingCSV('quickbooks')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 text-cream flex items-center justify-between"
              >
                <span>QuickBooks Format</span>
                <ArrowDownToLine className="w-3 h-3 text-champagne" />
              </button>
              <button
                onClick={() => handleExportAccountingCSV('sage')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-zinc-800 text-cream flex items-center justify-between"
              >
                <span>Sage 50 Format</span>
                <ArrowDownToLine className="w-3 h-3 text-champagne" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setStatementModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Monthly Statement</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl space-y-2 border-zinc-800">
          <div className="text-[11px] font-mono uppercase text-cream/50">Approved Trade Credit</div>
          <div className="font-display text-3xl font-bold text-cream">
            £{currentOrg.creditLimit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-champagne font-mono">Tier: {currentOrg.creditTier.toUpperCase()} &bull; 30 Days</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2 border-emerald-500/30 bg-emerald-500/5">
          <div className="text-[11px] font-mono uppercase text-emerald-400">Available Credit Balance</div>
          <div className="font-display text-3xl font-bold text-emerald-400">
            £{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-400/70 font-mono">Ready for daily morning orders</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-2 border-zinc-800">
          <div className="text-[11px] font-mono uppercase text-cream/50">Total Outstanding Balance</div>
          <div className="font-display text-3xl font-bold text-cream">
            £{totalOutstanding.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-cream/50 font-mono">Terms: {currentOrg.paymentTerms}</div>
        </div>
      </div>

      {/* Aged Debt Breakdown Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono uppercase text-cream/60 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-champagne" />
            <span>Aged Balance Ledger</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>GoCardless BACS Direct Debit Mandate: Active</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-mono text-cream/40 uppercase block">Current (0–30 Days)</span>
            <span className="font-mono font-bold text-cream text-sm">£{agedCurrent.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-mono text-amber-400 uppercase block">31–60 Days (Due)</span>
            <span className="font-mono font-bold text-amber-300 text-sm">£{aged30Days.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-mono text-emerald-400 uppercase block">60+ Days Overdue</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">£0.00</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-cream/15 shadow-xl">
        <div className="p-4 border-b border-cream/10 bg-obsidian-950/60 flex justify-between items-center">
          <h2 className="font-display text-lg font-bold text-cream">Invoice History & Line Items</h2>
          <span className="text-xs text-cream/50 font-mono">{orgInvoices.length} invoices issued</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-obsidian-950 text-cream/50 uppercase font-mono text-[10px] border-b border-cream/10">
              <tr>
                <th className="p-4 pl-5">Invoice #</th>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Goods (Net)</th>
                <th className="p-4">VAT</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream/5">
              {orgInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-obsidian-900/60 transition-colors">
                  <td className="p-4 pl-5 font-mono text-champagne font-bold">{inv.invoiceNumber}</td>
                  <td className="p-4 font-mono text-cream/80">{inv.orderNumber || '—'}</td>
                  <td className="p-4 text-cream/70 font-mono">{inv.issueDate}</td>
                  <td className="p-4 text-cream/70 font-mono">{inv.dueDate}</td>
                  <td className="p-4 font-mono text-cream">£{inv.subtotal.toFixed(2)}</td>
                  <td className="p-4 font-mono text-cream/50">£{inv.vatAmount.toFixed(2)}</td>
                  <td className="p-4 font-mono font-bold text-cream">£{inv.totalAmount.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono capitalize border ${
                        inv.status === 'paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : inv.status === 'open'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 pr-5 text-right space-x-2">
                    {inv.status !== 'paid' && (
                      <button
                        onClick={() => {
                          setPayModalInvoice(inv);
                          setPaymentTab('card');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:brightness-110 text-obsidian-950 text-[11px] font-bold shadow-emerald-glow"
                      >
                        Settle Invoice
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoiceForModal(inv)}
                      className="px-3 py-1 rounded-lg bg-obsidian-900 hover:bg-champagne hover:text-obsidian-950 text-[11px] font-semibold text-cream border border-cream/15 transition-colors"
                    >
                      PDF View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settle Invoice Payment Modal (Stripe & GoCardless) */}
      {payModalInvoice && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-zinc-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">B2B Trade Settlement</span>
                <h3 className="font-display text-2xl font-bold text-cream">Settle {payModalInvoice.invoiceNumber}</h3>
                <div className="text-xs text-cream/60">Amount: <strong className="text-champagne font-mono">£{payModalInvoice.totalAmount.toFixed(2)}</strong></div>
              </div>
              <button
                onClick={() => setPayModalInvoice(null)}
                className="text-cream/50 hover:text-cream text-sm"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950 rounded-xl border border-zinc-800 text-[11px]">
              <button
                type="button"
                onClick={() => setPaymentTab('card')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  paymentTab === 'card'
                    ? 'bg-zinc-800 text-champagne font-bold border border-champagne/30 shadow-sm'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card / Apple Pay</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab('direct_debit')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  paymentTab === 'direct_debit'
                    ? 'bg-zinc-800 text-emerald-400 font-bold border border-emerald-500/30 shadow-sm'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Direct Debit</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentTab('bank_transfer')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  paymentTab === 'bank_transfer'
                    ? 'bg-zinc-800 text-cream font-bold border border-zinc-700 shadow-sm'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {/* Tab 1: Instant Card / Apple Pay (Stripe) */}
            {paymentTab === 'card' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="flex justify-between text-cream/70">
                    <span>Payment Processor:</span>
                    <span className="text-cream font-bold">Stripe 256-Bit SSL Encrypted</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span>Supported Methods:</span>
                    <span className="text-champagne font-mono">Visa &bull; Mastercard &bull; Apple Pay</span>
                  </div>
                  <div className="flex justify-between text-cream/70">
                    <span>Total Charge:</span>
                    <span className="text-emerald-400 font-bold font-mono text-sm">£{payModalInvoice.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-300 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Instant VAT tax receipt will be issued to your accounts email.</span>
                </div>

                <button
                  onClick={() => handleSettleCardPayment(payModalInvoice)}
                  disabled={isProcessingPayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Pay £{payModalInvoice.totalAmount.toFixed(2)} via Card / Apple Pay</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Tab 2: Automated BACS Direct Debit (GoCardless) */}
            {paymentTab === 'direct_debit' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Landmark className="w-4 h-4" />
                    <span>UK BACS Direct Debit Scheme (GoCardless)</span>
                  </div>
                  <p className="text-cream/60 leading-relaxed text-[11px]">
                    Automate your 30-day invoice payments. Invoices are automatically collected on their due date with zero manual intervention.
                  </p>
                  <div className="text-[10px] text-cream/40 font-mono">
                    Protected by the official UK Direct Debit Guarantee scheme.
                  </div>
                </div>

                {mandateSuccess ? (
                  <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Direct Debit Mandate Activated for {currentOrg.name}!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSetupDirectDebit}
                    disabled={mandateLoading}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 text-obsidian-950 font-bold text-xs shadow-emerald-glow hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {mandateLoading ? (
                      <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Landmark className="w-4 h-4" />
                        <span>Authorize GoCardless 30-Day BACS Mandate</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Tab 3: BACS Faster Payments */}
            {paymentTab === 'bank_transfer' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2.5 font-mono">
                  <div className="text-[11px] text-champagne uppercase font-bold">Rootwills Commercial Bank Account</div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                    <span className="text-cream/50">Beneficiary:</span>
                    <strong className="text-cream">Rootwills Foodservice Ltd</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                    <span className="text-cream/50">Bank:</span>
                    <strong className="text-cream">Barclays Corporate UK</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                    <span className="text-cream/50">Sort Code:</span>
                    <strong className="text-champagne font-bold">40-11-18</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                    <span className="text-cream/50">Account No:</span>
                    <strong className="text-champagne font-bold">81923049</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-cream/50">Your Reference:</span>
                    <strong className="text-emerald-400 font-bold">RW-{payModalInvoice.invoiceNumber}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-cream/50 leading-relaxed">
                  Please quote reference <strong className="text-cream font-mono">RW-{payModalInvoice.invoiceNumber}</strong> in your banking app for automated same-day ledger reconciliation.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Invoice PDF Preview Modal */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-900 border border-champagne/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-cream/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne">Official Tax Invoice</span>
                <h3 className="font-display text-2xl font-bold text-cream">{selectedInvoiceForModal.invoiceNumber}</h3>
                <div className="text-xs text-cream/60">Rootwills Ltd &bull; VAT Reg: GB 412 8901 34</div>
              </div>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="text-cream/50 hover:text-cream text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-cream/40 uppercase font-mono text-[10px] block">Billed To:</span>
                <strong className="text-cream block">{currentOrg.name}</strong>
                <span className="text-cream/60">{currentOrg.companyRegNumber ? `Co. Reg: ${currentOrg.companyRegNumber}` : ''}</span>
              </div>
              <div className="text-right">
                <span className="text-cream/40 uppercase font-mono text-[10px] block">Invoice Details:</span>
                <span className="text-cream/70 block">Issue Date: {selectedInvoiceForModal.issueDate}</span>
                <span className="text-cream/70 block">Due Date: {selectedInvoiceForModal.dueDate}</span>
                <span className="text-champagne font-bold block">Terms: {currentOrg.paymentTerms}</span>
              </div>
            </div>

            <div className="p-4 bg-obsidian-950 rounded-xl border border-cream/10 space-y-2 text-xs">
              <div className="flex justify-between text-cream/70">
                <span>Net Subtotal:</span>
                <span className="font-mono text-cream">£{selectedInvoiceForModal.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>VAT (0% / 20% blended):</span>
                <span className="font-mono text-cream">£{selectedInvoiceForModal.vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-cream pt-2 border-t border-cream/10">
                <span>Total Amount Due:</span>
                <span className="font-mono text-champagne">£{selectedInvoiceForModal.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <Link
                href={`/invoices/${selectedInvoiceForModal.id}/print`}
                target="_blank"
                className="flex-1 py-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5 hover:brightness-110"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Open Official A4 Tax Invoice</span>
              </Link>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="px-5 py-2.5 rounded-xl border border-cream/20 text-xs text-cream/60 hover:text-cream"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statement of Account Modal */}
      {statementModalOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-obsidian-900 border border-champagne/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-cream/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne font-bold">Monthly Commercial Statement</span>
                <h3 className="font-display text-2xl font-bold text-cream">{currentOrg.name}</h3>
                <div className="text-xs text-cream/60">Statement Date: 17 Aug 2026 &bull; Account #{currentOrg.id}</div>
              </div>
              <button
                onClick={() => setStatementModalOpen(false)}
                className="text-cream/50 hover:text-cream text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs font-mono">
              <div>
                <span className="text-[10px] text-cream/40 block">Credit Limit</span>
                <strong className="text-cream">£{currentOrg.creditLimit.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-[10px] text-cream/40 block">Credit Used</span>
                <strong className="text-champagne">£{currentOrg.creditUsed.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-[10px] text-cream/40 block">Available Balance</span>
                <strong className="text-emerald-400">£{availableCredit.toLocaleString()}</strong>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 text-xs">
              {orgInvoices.map((inv) => (
                <div key={inv.id} className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-champagne">{inv.invoiceNumber}</span>
                    <span className="text-cream/50 ml-2">Issued {inv.issueDate}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-cream">£{inv.totalAmount.toFixed(2)}</span>
                    <span className={`text-[10px] font-mono ml-2 uppercase ${inv.status === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-champagne text-obsidian-950 font-bold text-xs shadow-gold-glow flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Statement</span>
              </button>
              <button
                onClick={() => setStatementModalOpen(false)}
                className="px-5 py-3 rounded-xl border border-cream/20 text-xs text-cream/60 hover:text-cream"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
