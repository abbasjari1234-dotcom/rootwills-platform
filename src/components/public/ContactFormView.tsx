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
  ArrowRight,
  Clock
} from 'lucide-react';
import { DoodleFlourish } from './DoodleFlourish';

export function ContactFormView() {
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
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-stone-900 overflow-x-hidden">
      
      {/* ─── ACT I: EDITORIAL HERO HEADER (Eggshell Canvas) ─── */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 border-b border-[#E8DEC8]/70 overflow-hidden">
        {/* Soft top gradient feathering */}
        <div 
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FCFCFA] via-[#FCFCFA]/80 to-transparent pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* Botanical Parchment Texture Overlay */}
        <div
          className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.16] mix-blend-multiply"
          style={{
            backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
            backgroundSize: '1100px auto',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-5">
          {/* Monospace Eyebrow Capsule */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BA8E4E]/10 border border-[#BA8E4E]/30 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BA8E4E] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#2E060D] font-semibold">
              01 // DIRECT PURVEYOR DESK
            </span>
          </div>

          <div className="relative">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#131313] leading-[1.12]">
              Speak with Our <br className="hidden sm:inline" />
              <span className="text-[#8B2635] italic font-normal">Wholesale Specialists</span>
            </h1>
            <div className="flex justify-center">
              <DoodleFlourish 
                variant="underline-wave" 
                color="#BA8E4E" 
                strokeWidth={3} 
                className="w-52 sm:w-72 -mt-1 sm:-mt-1.5 mb-2 text-[#BA8E4E]" 
                delay={150}
              />
            </div>
          </div>

          <p className="text-xs sm:text-sm lg:text-base text-stone-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Whether you require a bespoke contract rate sheet, produce samples for a seasonal menu development, or pre-dawn delivery logistics, our commercial desk is standing by.
          </p>
        </div>
      </section>

      {/* ─── ACT II: CONTACT & FORM SECTION ─── */}
      <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Direct Phone & Depot Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative bg-[#FFFDF9]/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#E8DEC8] shadow-[0_4px_20px_rgba(46,6,13,0.03)] space-y-6 overflow-hidden">
              {/* Specular top rim */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#BA8E4E] font-semibold block mb-1">
                  CENTRAL OPERATIONS // MIDLANDS &amp; LONDON
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#131313] tracking-tight">
                  Fulfilment &amp; Logistics Hub
                </h2>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Serving Midlands and London commercial hospitality kitchens daily.
                </p>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 text-[#BA8E4E] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#131313] text-sm font-serif font-bold">Midlands Fulfilment Hub</strong>
                    <span className="text-stone-600 block mt-0.5 font-sans leading-relaxed">
                      The Hub, Nobel Wy, Birmingham B6 7EU, United Kingdom
                    </span>
                  </div>
                </div>

                {/* Direct Phone Lines */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 text-[#BA8E4E] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <strong className="block text-[#131313] text-sm font-serif font-bold">Direct Telephone Desks</strong>
                    <div className="text-stone-600 space-y-1">
                      <p><span className="font-semibold text-stone-800">Commercial Sales Desk:</span> <a href="tel:+442012345678" className="hover:text-[#BA8E4E] font-mono">+44 (0) 20 1234 5678</a></p>
                      <p><span className="font-semibold text-stone-800">Night Order Desk (20:00 - 23:00):</span> <a href="tel:01217908801" className="hover:text-[#BA8E4E] font-mono">0121 790 8801</a></p>
                      <p><span className="font-semibold text-stone-800">Early Kitchen Dispatch (05:00 - 08:00):</span> <a href="tel:01217908802" className="hover:text-[#BA8E4E] font-mono">0121 790 8802</a></p>
                    </div>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8DEC8]">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F0] ring-1 ring-[#BA8E4E]/30 text-[#BA8E4E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#131313] text-sm font-serif font-bold">Digital Desk</strong>
                    <p className="text-stone-600 mt-0.5"><span className="font-semibold text-stone-800">General &amp; Accounts:</span> info@rootwills.co.uk</p>
                    <p className="text-stone-600"><span className="font-semibold text-stone-800">New Trade Enquiries:</span> trade@rootwills.co.uk</p>
                  </div>
                </div>

                {/* SLA Reassurance */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF6EE] border border-[#BA8E4E]/40 text-[#131313]">
                  <ShieldCheck className="w-5 h-5 text-[#BA8E4E] shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong className="block font-serif font-bold">Guaranteed Response Window</strong>
                    <span className="text-stone-600 font-sans">Commercial enquiries submitted during business hours are reviewed within 45 minutes by an account lead.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#FFFDF9]/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-[0_4px_20px_rgba(46,6,13,0.03)] overflow-hidden">
              {/* Specular top rim */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F0] text-[#BA8E4E] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#131313]">
                    Enquiry Received
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#131313] font-serif">{formData.contactName || 'Chef'}</strong>. Your commercial enquiry for <strong className="text-[#131313] font-serif">{formData.companyName}</strong> has been assigned to our commercial desk. A specialist will follow up shortly.
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
                      className="px-6 py-2.5 rounded-full border border-[#BA8E4E]/40 hover:border-[#BA8E4E] text-[#131313] text-xs font-serif font-semibold transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#131313] tracking-tight">
                      Send a Message to the Commercial Desk
                    </h2>
                    <p className="text-xs text-stone-500 font-sans mt-0.5">
                      Fill out your details below and an account manager will get back to you today.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Company or Venue Name <span className="text-[#BA8E4E]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Grand Bistro Collection"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Contact Name / Role <span className="text-[#BA8E4E]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Head Chef Marcus Vance"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Business Email <span className="text-[#BA8E4E]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. chef@venue.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-serif font-bold text-stone-700">
                        Phone Number <span className="text-[#BA8E4E]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 07123 456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-serif font-bold text-stone-700">
                      Kitchen Delivery Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. B2 5BN, W1D 3SG..."
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-serif font-bold text-stone-700">
                      Enquiry Details / Menu Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your weekly produce volume, delivery timing requirements, or specific products..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#E8DEC8] text-stone-900 placeholder:text-stone-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#BA8E4E] focus:bg-white focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full py-3.5 px-6 rounded-full bg-[#131313] hover:bg-[#2A2A2A] text-[#FCFCFA] font-sans font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Submit Commercial Enquiry</span>
                      <span className="text-stone-400 group-hover:text-white transition-colors">↗</span>
                    </button>
                  </div>

                  <div className="text-center pt-1">
                    <p className="text-[11px] text-stone-500 font-sans">
                      We typically respond to commercial enquiries within 45 minutes during business hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

