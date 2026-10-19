'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    sector: 'Restaurant / Hospitality',
    notes: '',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#BA8E4E]/30 overflow-hidden z-10"
          >
            {/* Header with obsidian bar */}
            <div className="bg-[#0F1714] text-white p-6 sm:p-7 relative border-b border-[#BA8E4E]/25">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#BA8E4E] font-medium mb-1">
                — ROOTWILLS PARTNERSHIP —
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Connect With Our Team
              </h3>
              <p className="text-sm text-cream-200/80 mt-1.5 font-sans">
                Discuss wholesale supply, bespoke pricing, and delivery schedules tailored to your business.
              </p>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#16201B]/10 text-[#16201B] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#16201B] mb-2">
                    Enquiry Received
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm">
                    Thank you. A senior wholesale specialist from Rootwills will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. James Wilson"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-1 focus:ring-[#BA8E4E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Dorchester Bistro"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-1 focus:ring-[#BA8E4E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="james@restaurant.co.uk"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-1 focus:ring-[#BA8E4E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7123 456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-1 focus:ring-[#BA8E4E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Business Sector
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-1 focus:ring-[#BA8E4E]"
                    >
                      <option value="Restaurant / Hospitality">Restaurant & Hospitality</option>
                      <option value="Hotel & Boutique Resort">Hotel & Boutique Resort</option>
                      <option value="Commercial Catering">Commercial & Event Catering</option>
                      <option value="Pub & Gastro Bar">Pub & Gastro Bar</option>
                      <option value="Institutional / Education">Education & Healthcare</option>
                      <option value="Retailer / Other">Specialty Retailer / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Requirements or Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your produce volume, delivery frequency, or specific supply needs..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-1 focus:ring-[#BA8E4E] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full py-3.5 px-6 rounded-lg bg-[#BA8E4E] hover:bg-[#A87D38] text-white font-serif font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] active:translate-y-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] cursor-pointer"
                    >
                      <span>Submit Partnership Enquiry</span>
                      <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                        <Send className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" /> +44 (0) 20 1234 5678
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#BA8E4E]" /> info@rootwills.co.uk
                    </span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
