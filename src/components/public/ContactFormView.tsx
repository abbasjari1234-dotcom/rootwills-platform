'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useDemoStore } from '@/lib/store/demo-store';

export function ContactFormView() {
  const addLead = useDemoStore((state) => state.addLead);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-mono uppercase">
          <Phone className="w-3.5 h-3.5" />
          <span>Commercial Sales Desk</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream">
          Speak with Our Wholesale Specialists
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          Whether you need a bespoke contract quote, produce samples for a new menu launch, or emergency morning support, our Birmingham team is here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="glass-panel p-8 rounded-2xl space-y-8">
          <h2 className="font-display text-2xl font-bold text-cream">Central Commercial Office</h2>

          <div className="space-y-6 text-sm text-cream/80">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-cream">Midlands Headquarters & Fulfilment Hub</strong>
                <span className="text-xs text-cream/60">Digbeth Wholesale Quarter, Pershore Street, Birmingham, B5 5JR</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-cream">Direct Phone Lines</strong>
                <span className="text-xs text-cream/60 block">Commercial Desk: 0121 790 8800</span>
                <span className="text-xs text-cream/60 block">Night Order Hotline (20:00 - 23:00): 0121 790 8801</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-cream">Email Enquiries</strong>
                <span className="text-xs text-cream/60 block">New Accounts: sales@rootwills.co.uk</span>
                <span className="text-xs text-cream/60 block">Customer Invoicing: accounts@rootwills.co.uk</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-champagne/10 text-champagne flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <strong className="block text-cream">Operating Hours</strong>
                <span className="text-xs text-cream/60 block">Commercial Desk: Mon – Sat, 06:00 AM – 23:00 PM</span>
                <span className="text-xs text-cream/60 block">Customer Online Portal: 24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel-gold p-8 rounded-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-cream mb-2">
                Send an Inquiry to Sales
              </h2>
              <p className="text-xs text-cream/70 mb-4">
                Fill out the form below. Your request will be routed directly to your regional account manager.
              </p>

              <div>
                <label className="block text-xs font-mono uppercase text-cream/70 mb-1">Company / Establishment Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Simpsons Restaurant"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-cream/70 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Luke Tipping"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cream/70 mb-1">Postcode *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B15 3DZ"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-cream/70 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="chef@restaurant.co.uk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-cream/70 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0121 454 3434"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs text-cream focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-cream/70 mb-1">Message / Key Products Required</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your menu requirements, current delivery schedules, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-obsidian-950 border border-cream/20 rounded-xl p-3 text-xs text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-champagne text-obsidian-950 font-bold shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Commercial Desk</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">Message Received</h3>
              <p className="text-xs text-cream/70 max-w-sm mx-auto">
                Thank you! Your inquiry has been routed to our Birmingham Commercial Desk. A sales manager will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-lg border border-cream/20 text-xs text-cream/70 hover:text-cream"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
