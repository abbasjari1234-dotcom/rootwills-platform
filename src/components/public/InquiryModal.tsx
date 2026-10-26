'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Phone, Mail, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container with Apple Critically Damped Spring & Viewport Safe Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border-t border-white/80 border-b border-[#BA8E4E]/30 overflow-hidden z-10 my-auto max-h-[calc(100vh-2rem)] flex flex-col"
          >
            {/* Header with royal burgundy bar & Specular top highlight */}
            <div className="bg-[#2E060D] text-white p-5 sm:p-7 relative border-b border-[#BA8E4E]/25 shrink-0">
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
              <button
                onClick={onClose}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors apple-tactile active:scale-90"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#D4A86A] font-medium mb-1">
                — ROOTWILLS PARTNERSHIP —
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-[-0.02em] leading-tight">
                Connect With Our Team
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans leading-relaxed">
                Discuss wholesale supply, bespoke pricing, and delivery schedules tailored to your business.
              </p>
            </div>

            {/* Form Body - Scrollable internally so it never cuts off or gets hidden by footer */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#2E060D]/10 text-[#2E060D] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#2E060D] mb-2">
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D]"
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D]"
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D]"
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
                        className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D]"
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
                      className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D]"
                    >
                      <option value="Restaurant / Hospitality">Restaurant &amp; Hospitality</option>
                      <option value="Hotel & Boutique Resort">Hotel &amp; Boutique Resort</option>
                      <option value="Commercial Catering">Commercial &amp; Event Catering</option>
                      <option value="Pub & Gastro Bar">Pub &amp; Gastro Bar</option>
                      <option value="Institutional / Education">Education &amp; Healthcare</option>
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
                      className="w-full px-3.5 py-2.5 bg-white border border-[#BA8E4E]/30 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-[#2E060D] focus:ring-1 focus:ring-[#2E060D] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group w-full py-3.5 px-6 rounded-xl bg-[#D4A86A] hover:bg-[#C59958] text-[#2D060D] font-serif font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all duration-100 ease-out apple-tactile active:scale-[0.98] cursor-pointer"
                    >
                      <span>Submit Partnership Enquiry</span>
                      <div className="w-6 h-6 rounded-full bg-[#2D060D]/10 flex items-center justify-center transition-transform duration-200 ease-out group-hover:translate-x-1">
                        <Send className="w-3.5 h-3.5 text-[#2D060D]" />
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
    </AnimatePresence>,
    document.body
  );
}
