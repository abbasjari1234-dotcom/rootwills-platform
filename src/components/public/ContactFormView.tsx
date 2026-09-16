'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { CommercialBottomCTA } from '@/components/public/CommercialBottomCTA';

export function ContactFormView() {
  const addLead = useAppStore((state) => state.addLead);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postcode: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.phone) return;

    addLead({
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      sector: 'fine_dining',
      postcode: formData.postcode || 'B1 1AA',
      city: 'Birmingham',
      estimatedWeeklySpend: 2500,
      source: 'website_form',
      assignedSalesRep: 'Rootwills Commercial Desk',
      notes: `Contact page message: ${formData.message}`,
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="relative py-16 lg:py-20 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-950/40 via-slate-950/90 to-slate-950 pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5" />
            <span>Commercial Support &bull; Digbeth Central Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white leading-tight">
            Speak with Our Wholesale Specialists
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Whether you require a bespoke contract rate sheet, produce samples for a menu redevelopment, or daily logistics assistance, our team is standing by.
          </p>
        </div>
      </section>

      {/* ─── ACT II: CONTACT & FORM SECTION ─── */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* Left Column: Direct Phone & Depot Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-sans font-extrabold text-slate-900 tracking-tight">
                  Central Operations &amp; Commercial Hub
                </h2>
                <p className="text-xs text-slate-500 font-sans mt-1">
                  Serving Midlands and London commercial hospitality kitchens.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">Midlands Fulfilment Hub</strong>
                    <span className="text-slate-600 block mt-0.5">
                      Digbeth Wholesale Quarter, Pershore Street, Birmingham, B5 5JR
                    </span>
                  </div>
                </div>

                {/* Direct Phone Lines */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-slate-900 text-sm font-bold">Direct Telephone Desks</strong>
                    <div className="text-slate-600 space-y-0.5">
                      <p><span className="font-semibold text-slate-800">Commercial Sales Desk:</span> 0121 790 8800</p>
                      <p><span className="font-semibold text-slate-800">Night Order Desk (20:00 - 23:00):</span> 0121 790 8801</p>
                      <p><span className="font-semibold text-slate-800">Early Kitchen Dispatch (05:00 - 08:00):</span> 0121 790 8802</p>
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 text-sm font-bold">Digital Desk</strong>
                    <p className="text-slate-600 mt-0.5">General &amp; Accounts: orders@rootwills.com</p>
                    <p className="text-slate-600">New Accounts: trade@rootwills.com</p>
                  </div>
                </div>

                {/* SLA Reassurance */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong className="block font-bold">Guaranteed Response Window</strong>
                    <span>Commercial enquiries submitted during business hours are reviewed within 45 minutes.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-sans font-extrabold text-slate-900">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.contactName || 'Chef'}</strong>. Your commercial enquiry for <strong className="text-slate-900">{formData.companyName}</strong> has been assigned to our Birmingham commercial desk. A specialist will follow up shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          companyName: '',
                          contactName: '',
                          email: '',
                          phone: '',
                          postcode: '',
                          message: '',
                        });
                      }}
                      className="px-6 py-2.5 rounded-full border border-slate-300 hover:border-emerald-500 text-slate-700 text-xs font-sans font-semibold transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-sans font-extrabold text-slate-900 tracking-tight">
                      Send a Message to the Commercial Desk
                    </h2>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Fill out the details below and an account manager will get back to you today.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold text-slate-700">
                        Company or Venue Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Grand Gastro Pub"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold text-slate-700">
                        Contact Name / Role <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chef Marcus Vance"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold text-slate-700">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. chef@venue.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-sans font-bold text-slate-700">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07123 456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-bold text-slate-700">
                      Kitchen Delivery Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B2 5BN, CV3 4FL..."
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-sans font-bold text-slate-700">
                      Enquiry Details / Menu Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your weekly produce spend, delivery timing requirements, or specific products..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Commercial Enquiry</span>
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <p className="text-[11px] text-slate-400 font-sans">
                      Need immediate trade terms? <Link href="/apply" className="text-emerald-700 font-bold hover:underline">Apply for 30-Day Trade Credit directly &rarr;</Link>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ─── ACT III: BOTTOM SPLIT CTA ─── */}
      <CommercialBottomCTA />

    </div>
  );
}
