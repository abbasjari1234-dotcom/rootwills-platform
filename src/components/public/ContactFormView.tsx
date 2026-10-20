'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
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
    <div className="bg-[#FAF7F2] min-h-screen text-stone-900">
      
      {/* ─── ACT I: HERO HEADER ─── */}
      <section className="bg-[#2E060D] text-white relative overflow-hidden border-b border-[#BA8E4E]/25 pt-16 sm:pt-24 pb-16">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('/images/textures/burgundy_damask_texture.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#380710] via-[#2E060D] to-[#1E0307] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BA8E4E]/15 border border-[#BA8E4E]/40 text-[#D4A86A] text-xs font-serif uppercase tracking-[0.2em] font-semibold">
            <Phone className="w-3.5 h-3.5 text-[#D4A86A]" />
            <span>Commercial Support &bull; Direct Purveyor Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Speak with Our Wholesale Specialists
          </h1>

          <p className="text-xs sm:text-base text-[#EDE4D8]/85 font-sans max-w-2xl mx-auto leading-relaxed">
            Whether you require a bespoke contract rate sheet, produce samples for a menu redevelopment, or daily logistics assistance, our team is standing by.
          </p>
        </div>
      </section>

      {/* ─── ACT II: CONTACT & FORM SECTION ─── */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Direct Phone & Depot Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-serif uppercase tracking-[0.2em] text-[#BA8E4E] font-semibold block mb-1">
                  — DIRECT PURVEYOR DESK —
                </span>
                <h2 className="text-xl font-serif font-bold text-[#2E060D] tracking-tight">
                  Central Operations &amp; Commercial Hub
                </h2>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Serving Midlands and London commercial hospitality kitchens.
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center shrink-0 border border-[#BA8E4E]/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#2E060D] text-sm font-serif font-bold">Midlands Fulfilment Hub</strong>
                    <span className="text-stone-600 block mt-0.5 font-sans">
                      Digbeth Wholesale Quarter, Pershore Street, Birmingham, B5 5JR
                    </span>
                  </div>
                </div>

                {/* Direct Phone Lines */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center shrink-0 border border-[#BA8E4E]/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block text-[#2E060D] text-sm font-serif font-bold">Direct Telephone Desks</strong>
                    <div className="text-stone-600 space-y-0.5">
                      <p><span className="font-semibold text-stone-800">Commercial Sales Desk:</span> +44 (0) 20 1234 5678</p>
                      <p><span className="font-semibold text-stone-800">Night Order Desk (20:00 - 23:00):</span> 0121 790 8801</p>
                      <p><span className="font-semibold text-stone-800">Early Kitchen Dispatch (05:00 - 08:00):</span> 0121 790 8802</p>
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#2E060D] text-[#D4A86A] flex items-center justify-center shrink-0 border border-[#BA8E4E]/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#2E060D] text-sm font-serif font-bold">Digital Desk</strong>
                    <p className="text-stone-600 mt-0.5">General &amp; Accounts: info@rootwills.co.uk</p>
                    <p className="text-stone-600">New Trade Enquiries: trade@rootwills.co.uk</p>
                  </div>
                </div>

                {/* SLA Reassurance */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#BA8E4E]/40 text-[#2E060D]">
                  <ShieldCheck className="w-5 h-5 text-[#BA8E4E] shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong className="block font-serif font-bold">Guaranteed Response Window</strong>
                    <span className="text-stone-600 font-sans">Commercial enquiries submitted during business hours are reviewed within 45 minutes.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#2E060D] text-[#D4A86A] border border-[#BA8E4E]/40 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2E060D]">
                    Enquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#2E060D] font-serif">{formData.contactName || 'Chef'}</strong>. Your commercial enquiry for <strong className="text-[#2E060D] font-serif">{formData.companyName}</strong> has been assigned to our commercial desk. A specialist will follow up shortly.
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
                      className="px-6 py-2.5 rounded-full border border-[#BA8E4E]/40 hover:border-[#BA8E4E] text-[#2E060D] text-xs font-serif font-semibold transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-[#2E060D] tracking-tight">
                      Send a Message to the Commercial Desk
                    </h2>
                    <p className="text-xs text-stone-500 font-sans mt-0.5">
                      Fill out the details below and an account manager will get back to you today.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Company or Venue Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Grand Gastro Collection"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#FAF6EE] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Contact Name / Role <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chef Marcus Vance"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#FAF6EE] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Business Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. chef@venue.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF6EE] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07123 456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF6EE] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-serif font-bold text-stone-700">
                      Kitchen Delivery Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B2 5BN, CV3 4FL..."
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full bg-[#FAF6EE] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-serif uppercase focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-serif font-bold text-stone-700">
                      Enquiry Details / Menu Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your weekly produce spend, delivery timing requirements, or specific products..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF6EE] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#D4A86A] hover:bg-[#C59958] text-[#2E060D] font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-[#2E060D]" />
                      <span>Submit Commercial Enquiry</span>
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <p className="text-[11px] text-stone-500 font-sans">
                      Need immediate trade terms? <Link href="/apply" className="text-[#BA8E4E] font-serif font-bold hover:underline">Apply for 30-Day Trade Credit directly &rarr;</Link>
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
