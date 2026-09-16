'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/app-store';
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

export function PortalInvoicesView() {
  const { currentOrgId, organizations, invoices, payInvoice } = useAppStore();
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<any>(null);
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [payModalInvoice, setPayModalInvoice] = useState<any>(null);
  const [paymentTab, setPaymentTab] = useState<PaymentMethodTab>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [mandateSuccess, setMandateSuccess] = useState(false);
  const [mandateLoading, setMandateLoading] = useState(false);

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0] || {
    id: 'org-default',
    name: 'Commercial Client',
    paymentTerms: '30-Day EOM',
    creditLimit: 25000,
    creditUsed: 4200,
    creditTier: 'Standard',
    companyRegNumber: '12345678'
  };
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
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 uppercase font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Commercial Invoices &amp; Ledger</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Invoices &amp; Account Statements
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>Account: <strong className="text-slate-900">{currentOrg.name}</strong></span>
            <span>&bull;</span>
            <span>Payment Terms: <strong className="text-slate-900">{currentOrg.paymentTerms}</strong></span>
            <span>&bull;</span>
            <span className="text-emerald-800 font-mono flex items-center gap-1 font-semibold">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
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
            className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-xs text-emerald-800 font-bold flex items-center gap-2 transition-colors shadow-2xs"
          >
            <Landmark className="w-4 h-4 text-emerald-700" />
            <span>Setup BACS Direct Debit</span>
          </button>

          {/* Accounting Sync Dropdown */}
          <div className="relative group">
            <button
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs text-slate-800 font-semibold flex items-center gap-2 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
              <span>Export to ERP &darr;</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 hidden group-hover:block z-20 space-y-1 text-xs">
              <button
                onClick={() => handleExportAccountingCSV('xero')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-800 flex items-center justify-between transition-colors font-medium"
              >
                <span>Xero CSV Format</span>
                <ArrowDownToLine className="w-3 h-3 text-emerald-700" />
              </button>
              <button
                onClick={() => handleExportAccountingCSV('quickbooks')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-800 flex items-center justify-between transition-colors font-medium"
              >
                <span>QuickBooks Format</span>
                <ArrowDownToLine className="w-3 h-3 text-emerald-700" />
              </button>
              <button
                onClick={() => handleExportAccountingCSV('sage')}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-emerald-800 flex items-center justify-between transition-colors font-medium"
              >
                <span>Sage 50 Format</span>
                <ArrowDownToLine className="w-3 h-3 text-emerald-700" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setStatementModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all font-mono"
          >
            <Printer className="w-4 h-4" />
            <span>Monthly Statement</span>
          </button>
        </div>
      </div>

      {/* ─── Financial Summary Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl space-y-2 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Approved Trade Credit</div>
          <div className="font-sans text-3xl font-bold text-slate-900">
            £{currentOrg.creditLimit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-800 font-mono font-bold">Tier: {currentOrg.creditTier?.toUpperCase() || 'STANDARD'} &bull; 30 Days</div>
        </div>

        <div className="bg-white p-6 rounded-2xl space-y-2 border-2 border-emerald-500/20 shadow-xs">
          <div className="text-[11px] font-mono uppercase text-emerald-800 font-bold">Available Credit Balance</div>
          <div className="font-sans text-3xl font-bold text-emerald-700 font-mono">
            £{availableCredit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Ready for daily morning orders</div>
        </div>

        <div className="bg-white p-6 rounded-2xl space-y-2 border border-slate-200 shadow-xs">
          <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Total Outstanding Balance</div>
          <div className="font-sans text-3xl font-bold text-slate-900 font-mono">
            £{totalOutstanding.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">Terms: {currentOrg.paymentTerms}</div>
        </div>
      </div>

      {/* ─── Aged Debt Breakdown Bar ─── */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono uppercase text-slate-700 font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Aged Balance Ledger</span>
          </span>
          <span className="text-[11px] text-emerald-800 font-mono flex items-center gap-1 font-semibold">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>GoCardless BACS Direct Debit Mandate: Active</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 uppercase block font-medium">Current (0–30 Days)</span>
            <span className="font-mono font-bold text-slate-900 text-sm">£{agedCurrent.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-mono text-amber-700 uppercase block font-medium">31–60 Days (Due)</span>
            <span className="font-mono font-bold text-amber-900 text-sm">£{aged30Days.toFixed(2)}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-mono text-emerald-700 uppercase block font-medium">60+ Days Overdue</span>
            <span className="font-mono font-bold text-emerald-800 text-sm">£0.00</span>
          </div>
        </div>
      </div>

      {/* ─── Invoices Table ─── */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h2 className="font-sans text-base font-bold text-slate-900">Invoice History &amp; Line Items</h2>
          <span className="text-xs text-slate-500 font-mono">{orgInvoices.length} invoices issued</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-mono text-[10px] border-b border-slate-200 font-bold">
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
            <tbody className="divide-y divide-slate-100">
              {orgInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 pl-5 font-mono text-emerald-800 font-bold">{inv.invoiceNumber}</td>
                  <td className="p-4 font-mono text-slate-700">{inv.orderNumber || '—'}</td>
                  <td className="p-4 text-slate-600 font-mono">{inv.issueDate}</td>
                  <td className="p-4 text-slate-600 font-mono">{inv.dueDate}</td>
                  <td className="p-4 font-mono text-slate-800 font-semibold">£{inv.subtotal.toFixed(2)}</td>
                  <td className="p-4 font-mono text-slate-500">£{inv.vatAmount.toFixed(2)}</td>
                  <td className="p-4 font-mono font-bold text-slate-900">£{inv.totalAmount.toFixed(2)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono capitalize border ${
                        inv.status === 'paid'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold'
                          : inv.status === 'open'
                          ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                          : 'bg-rose-50 text-rose-800 border-rose-200 font-bold'
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
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-2xs transition-colors"
                      >
                        Settle Invoice
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedInvoiceForModal(inv)}
                      className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 border border-slate-300 transition-colors shadow-2xs"
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

      {/* ─── Settle Invoice Payment Modal ─── */}
      {payModalInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <div className="flex justify-between items-start border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">B2B Trade Settlement</span>
                <h3 className="font-sans text-2xl font-bold text-slate-900">Settle {payModalInvoice.invoiceNumber}</h3>
                <div className="text-xs text-slate-500">Amount: <strong className="text-emerald-800 font-mono">£{payModalInvoice.totalAmount.toFixed(2)}</strong></div>
              </div>
              <button
                onClick={() => setPayModalInvoice(null)}
                className="text-slate-400 hover:text-slate-700 text-sm p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-[11px]">
              <button
                type="button"
                onClick={() => setPaymentTab('card')}
                className={`py-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  paymentTab === 'card'
                    ? 'bg-white text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    ? 'bg-white text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    ? 'bg-white text-slate-900 font-bold border border-slate-300 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {/* Tab 1: Card */}
            {paymentTab === 'card' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Payment Processor:</span>
                    <span className="text-slate-900 font-bold">Stripe 256-Bit SSL Encrypted</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Supported Methods:</span>
                    <span className="text-slate-900 font-mono font-medium">Visa &bull; Mastercard &bull; Apple Pay</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Charge:</span>
                    <span className="text-emerald-800 font-bold font-mono text-sm">£{payModalInvoice.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Instant VAT tax receipt will be issued to your accounts email.</span>
                </div>

                <button
                  onClick={() => handleSettleCardPayment(payModalInvoice)}
                  disabled={isProcessingPayment}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                >
                  {isProcessingPayment ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Pay £{payModalInvoice.totalAmount.toFixed(2)} via Card / Apple Pay</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Tab 2: Direct Debit */}
            {paymentTab === 'direct_debit' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <Landmark className="w-4 h-4 text-emerald-600" />
                    <span>UK BACS Direct Debit Scheme (GoCardless)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Automate your 30-day invoice payments. Invoices are automatically collected on their due date with zero manual intervention.
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Protected by the official UK Direct Debit Guarantee scheme.
                  </div>
                </div>

                {mandateSuccess ? (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Direct Debit Mandate Activated for {currentOrg.name}!</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSetupDirectDebit}
                    disabled={mandateLoading}
                    aria-label="Authorize GoCardless 30-Day BACS Mandate"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {mandateLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
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

            {/* Tab 3: Bank Transfer */}
            {paymentTab === 'bank_transfer' && (
              <div className="space-y-4 text-xs animate-fade-in">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 font-mono">
                  <div className="text-[11px] text-emerald-800 uppercase font-bold">Rootwills Commercial Bank Account</div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Beneficiary:</span>
                    <strong className="text-slate-900">Rootwills Foodservice Ltd</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Bank:</span>
                    <strong className="text-slate-900">Barclays Corporate UK</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Sort Code:</span>
                    <strong className="text-slate-900 font-bold">40-11-18</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Account No:</span>
                    <strong className="text-slate-900 font-bold">81923049</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Your Reference:</span>
                    <strong className="text-emerald-800 font-bold">RW-{payModalInvoice.invoiceNumber}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-relaxed">
                  Please quote reference <strong className="text-slate-900 font-mono">RW-{payModalInvoice.invoiceNumber}</strong> in your banking app for automated same-day ledger reconciliation.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Invoice PDF Preview Modal ─── */}
      {selectedInvoiceForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Official Tax Invoice</span>
                <h3 className="font-sans text-2xl font-bold text-slate-900">{selectedInvoiceForModal.invoiceNumber}</h3>
                <div className="text-xs text-slate-500">Rootwills Ltd &bull; VAT Reg: GB 412 8901 34</div>
              </div>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 uppercase font-mono text-[10px] block font-medium">Billed To:</span>
                <strong className="text-slate-900 block font-bold">{currentOrg.name}</strong>
                <span className="text-slate-500">{currentOrg.companyRegNumber ? `Co. Reg: ${currentOrg.companyRegNumber}` : ''}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 uppercase font-mono text-[10px] block font-medium">Invoice Details:</span>
                <span className="text-slate-600 block">Issue Date: {selectedInvoiceForModal.issueDate}</span>
                <span className="text-slate-600 block">Due Date: {selectedInvoiceForModal.dueDate}</span>
                <span className="text-emerald-800 font-bold block font-mono">Terms: {currentOrg.paymentTerms}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Net Subtotal:</span>
                <span className="font-mono text-slate-900 font-semibold">£{selectedInvoiceForModal.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>VAT (0% / 20% blended):</span>
                <span className="font-mono text-slate-900 font-semibold">£{selectedInvoiceForModal.vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Amount Due:</span>
                <span className="font-mono text-emerald-800">£{selectedInvoiceForModal.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <Link
                href={`/invoices/${selectedInvoiceForModal.id}/print`}
                target="_blank"
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Open Official A4 Tax Invoice</span>
              </Link>
              <button
                onClick={() => setSelectedInvoiceForModal(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700 font-semibold hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Statement of Account Modal ─── */}
      {statementModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900">
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">Monthly Commercial Statement</span>
                <h3 className="font-sans text-2xl font-bold text-slate-900">{currentOrg.name}</h3>
                <div className="text-xs text-slate-500">Statement Date: 17 Aug 2026 &bull; Account #{currentOrg.id}</div>
              </div>
              <button
                onClick={() => setStatementModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm p-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block">Credit Limit</span>
                <strong className="text-slate-900">£{currentOrg.creditLimit.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Credit Used</span>
                <strong className="text-slate-900">£{currentOrg.creditUsed.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Available Balance</span>
                <strong className="text-emerald-800 font-bold">£{availableCredit.toLocaleString()}</strong>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 text-xs custom-scroll">
              {orgInvoices.map((inv) => (
                <div key={inv.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{inv.invoiceNumber}</span>
                    <span className="text-slate-500 ml-2">Issued {inv.issueDate}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">£{inv.totalAmount.toFixed(2)}</span>
                    <span className={`text-[10px] font-mono ml-2 uppercase font-bold ${inv.status === 'paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Statement</span>
              </button>
              <button
                onClick={() => setStatementModalOpen(false)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-xs text-slate-700 font-semibold hover:bg-slate-50"
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
