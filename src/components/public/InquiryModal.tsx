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

          {/* Modal Container with Double-Bezel Shell & Apple Critically Damped Spring */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl p-1.5 rounded-[2rem] bg-gradient-to-b from-[#BA8E4E]/45 via-[#EFE8D8]/90 to-[#BA8E4E]/30 shadow-[0_28px_80px_rgba(0,0,0,0.65)] ring-1 ring-[#F3D08A]/40 z-10 my-auto max-h-[calc(100dvh-2rem)] flex flex-col"
          >
            <div className="bg-[#FAF7F2] rounded-[calc(2rem-0.375rem)] overflow-hidden flex flex-col max-h-full">
              {/* Header with royal burgundy bar & Specular top highlight */}
              <div className="bg-[#260309] text-white p-5 sm:p-7 relative border-b border-[#BA8E4E]/35 shrink-0 overflow-hidden">
                <div 
                  className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/textures/burgundy_damask_texture.jpg')" }}
                />
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#F3D08A]/60 to-transparent pointer-events-none" />
                <button
                  onClick={onClose}
                  className="absolute top-4 sm:top-5 right-4 sm:right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors apple-tactile active:scale-90 z-10 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="relative z-10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F3D08A] font-semibold mb-1">
                    — ROOTWILLS PARTNERSHIP DESK —
                  </div>
                  <h3 id="inquiry-modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-[-0.02em] leading-tight">
                    Connect With Our Team
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans leading-relaxed">
                    Discuss wholesale supply, seasonal samples, and pre-dawn delivery schedules tailored to your kitchen.
                  </p>
                </div>
              </div>

              {/* Form Body - Scrollable internally so it never cuts off */}
              <div className="p-5 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
                {submitted ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#BA8E4E]/15 ring-1 ring-[#BA8E4E]/40 text-[#2E060D] flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-9 h-9 text-[#BA8E4E]" />
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-[#2E060D] mb-2">
                      Enquiry Received
                    </h4>
                    <p className="text-sm text-stone-600 max-w-sm font-sans leading-relaxed">
                      Thank you. A senior wholesale specialist from Rootwills will contact you within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-name" className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                          Your Name <span className="text-[#BA8E4E]">*</span>
                        </label>
                        <input
                          id="inquiry-name"
                          type="text"
                          required
                          autoComplete="name"
                          enterKeyHint="next"
                          placeholder="e.g. James Wilson"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-xl text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="inquiry-business" className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                          Business Name <span className="text-[#BA8E4E]">*</span>
                        </label>
                        <input
                          id="inquiry-business"
                          type="text"
                          required
                          autoComplete="organization"
                          enterKeyHint="next"
                          placeholder="e.g. The Dorchester Bistro"
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-xl text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-email" className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                          Work Email <span className="text-[#BA8E4E]">*</span>
                        </label>
                        <input
                          id="inquiry-email"
                          type="email"
                          required
                          inputMode="email"
                          autoComplete="email"
                          enterKeyHint="next"
                          placeholder="james@restaurant.co.uk"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-xl text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="inquiry-phone" className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                          Phone Number <span className="text-[#BA8E4E]">*</span>
                        </label>
                        <input
                          id="inquiry-phone"
                          type="tel"
                          required
                          inputMode="tel"
                          autoComplete="tel"
                          enterKeyHint="next"
                          placeholder="+44 7123 456789"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-xl text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inquiry-sector" className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                        Hospitality Sector
                      </label>
                      <select
                        id="inquiry-sector"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-xl text-base sm:text-sm text-stone-900 focus:outline-none focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all"
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
                      <label htmlFor="inquiry-notes" className="block text-xs font-serif font-bold text-[#2E060D] mb-1.5">
                        Your Requirements or Message
                      </label>
                      <textarea
                        id="inquiry-notes"
                        rows={3}
                        placeholder="Tell us about your produce volume, delivery frequency, or specific supply needs..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FFFDF9] border border-[#E8DEC8] rounded-xl text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#BA8E4E] focus:ring-2 focus:ring-[#BA8E4E]/20 transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group w-full py-3 pl-6 pr-2.5 rounded-full bg-[#131313] hover:bg-[#260309] text-[#FAF7F2] font-sans font-semibold text-xs sm:text-[13px] tracking-wider uppercase flex items-center justify-between shadow-[0_8px_24px_rgba(19,19,19,0.18)] hover:shadow-[0_12px_32px_rgba(38,3,9,0.28)] transition-[background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] apple-tactile active:scale-[0.98] cursor-pointer"
                      >
                        <span className="mx-auto pl-6">Submit Partnership Enquiry</span>
                        <div className="w-8 h-8 rounded-full bg-white/12 ring-1 ring-white/20 flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[#F3D08A]">
                          <Send className="w-3.5 h-3.5 text-[#F3D08A] group-hover:text-[#131313] transition-colors" />
                        </div>
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-stone-600 font-mono">
                      <span className="flex items-center gap-1.5 tabular-nums">
                        <Phone className="w-3.5 h-3.5 text-[#BA8E4E]" /> +44 (0) 20 1234 5678
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#BA8E4E]" /> info@rootwills.co.uk
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
