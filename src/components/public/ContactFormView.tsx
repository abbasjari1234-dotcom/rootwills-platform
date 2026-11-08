'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export function ContactFormView() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      Name: formData.name.trim(),
      Email: formData.email.trim(),
      Subject: formData.subject.trim() || 'Wholesale & Produce Supply Enquiry',
      Message: formData.message.trim(),
      Source: 'Rootwills Contact Page (/contact)',
      _replyto: formData.email.trim(),
      _subject: `New Rootwills Enquiry: ${formData.subject.trim() || formData.name.trim()}`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      let response = await fetch('https://formsubmit.co/ajax/sales@rootwills.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch(() => null);

      if (!response || !response.ok) {
        response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
    } catch {
      setErrorMsg(
        'Could not send message right now. Please email us directly at sales@rootwills.co.uk or WhatsApp +44 7984 709478.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-[#FAF7F2] min-h-screen text-[#131313] overflow-x-hidden pb-20 sm:pb-28">
      {/* Upper Soft Tinted Header Backdrop (mirrors the two-tone split in the reference) */}
      <div className="absolute top-0 inset-x-0 h-[310px] sm:h-[470px] bg-[#F3ECE0]/80 border-b border-[#E8DEC8]/60 pointer-events-none" />

      {/* Seamless Botanical Parchment Texture Overlay */}
      <div
        className="absolute inset-0 z-0 bg-repeat pointer-events-none opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage: `url('/images/textures/rootwills_unified_parchment.jpg')`,
          backgroundSize: '1100px auto',
        }}
      />

      {/* ─── CENTERED "GET IN TOUCH" HEADER ─── */}
      <section className="relative z-10 pt-24 sm:pt-36 pb-5 sm:pb-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-3.5">
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight text-[#2E060D]">
            Get In Touch
          </h1>
          <p className="text-xs sm:text-sm lg:text-[15px] text-stone-600 font-sans max-w-[54ch] mx-auto leading-[1.6] sm:leading-[1.7]">
            We supply hand-graded British farm produce and artisan wholesale lines to leading kitchens, paving the way for reliable pre-dawn delivery and seasonal excellence.
          </p>
        </div>
      </section>

      {/* ─── UNIFIED CONTACT INFORMATION & FORM CARD ─── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[20px] sm:rounded-[22px] p-2 sm:p-3.5 shadow-[0_24px_70px_rgba(46,6,13,0.08)] border border-[#EAE0CE]/90 grid grid-cols-1 lg:grid-cols-12">
          
          {/* ─── LEFT PANEL: CONTACT INFORMATION CARD ─── */}
          <div className="lg:col-span-5 relative rounded-[14px] sm:rounded-[16px] bg-gradient-to-br from-[#5A101D] via-[#430A13] to-[#2B040A] text-white p-5 sm:p-10 overflow-hidden flex flex-col justify-between min-h-0 sm:min-h-[450px]">
            {/* Top Heading & Intro */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2.5">
              <h2 className="text-lg sm:text-[22px] font-sans font-bold tracking-tight text-white">
                Contact Information
              </h2>
              <p className="text-[11.5px] sm:text-[13px] text-white/80 font-sans leading-relaxed max-w-[34ch] sm:max-w-[30ch]">
                Reach our wholesale partnerships desk and pre-dawn logistics team directly for bespoke kitchen supply.
              </p>
            </div>

            {/* Middle Contact Details List */}
            <div className="relative z-10 space-y-3.5 sm:space-y-6 my-4 sm:my-auto py-1 sm:py-4">
              {/* Landline Number */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95 tabular-nums">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Landline No
                  </span>
                  <a
                    href="tel:+441616412803"
                    className="block font-medium hover:text-[#F3D08A] transition-colors"
                  >
                    +44 16164 12803
                  </a>
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95 tabular-nums">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    WhatsApp No
                  </span>
                  <a
                    href="https://wa.me/447984709478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-medium hover:text-[#F3D08A] transition-colors"
                  >
                    +44 7984 709478
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <div className="text-xs sm:text-[13.5px] font-sans text-white/95">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#F3D08A]/85 mb-0.5">
                    Email
                  </span>
                  <a
                    href="mailto:sales@rootwills.co.uk"
                    className="block font-medium hover:text-[#F3D08A] transition-colors"
                  >
                    sales@rootwills.co.uk
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#F3D08A] shrink-0" />
                <span className="text-xs sm:text-[13.5px] font-sans text-white/95 leading-snug">
                  The Hub, Nobel Wy, Birmingham, UK
                </span>
              </div>
            </div>

            {/* Bottom spacer for balance */}
            <div className="hidden sm:block relative z-10 h-2" />

            {/* Decorative Translucent Corner Circle (matches reference design) */}
            <div
              className="
                absolute -bottom-10 -right-10 w-32 h-32 sm:w-52 sm:h-52 rounded-full pointer-events-none
                bg-gradient-to-tl from-[#F3D08A]/25 via-[#BA8E4E]/20 to-white/5
              "
            />
          </div>

          {/* ─── RIGHT PANEL: MINIMALIST UNDERLINE FORM ─── */}
          <div className="lg:col-span-7 px-4 py-5 sm:px-12 sm:py-11 flex flex-col justify-center bg-white rounded-r-[16px]">
            {submitted ? (
              <div className="py-8 sm:py-12 text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F0] text-[#4E0D17] ring-1 ring-[#BA8E4E]/40 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2E060D]">
                  Message Sent
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#2E060D]">{formData.name}</strong>. Our wholesale team has received your enquiry and will respond within 45 minutes during business hours.
                </p>
                <div className="pt-2 sm:pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg bg-[#4E0D17] hover:bg-[#2B040A] text-white text-xs font-sans font-semibold transition-all cursor-pointer active:scale-95"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-7">
                {/* Row 1: Your Name & Your Email (2 columns on both mobile & desktop) */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  <div className="group">
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] sm:text-xs font-sans font-medium text-stone-500 group-focus-within:text-[#4E0D17] transition-colors"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="John Trangely"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pt-1.5 pb-2 sm:pt-2 sm:pb-2.5 text-xs sm:text-[15px] font-sans font-medium text-[#180205] bg-transparent border-b border-stone-200 focus:border-[#4E0D17] focus:outline-none transition-colors placeholder:text-stone-400"
                    />
                  </div>

                  <div className="group">
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] sm:text-xs font-sans font-medium text-stone-500 group-focus-within:text-[#4E0D17] transition-colors"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="hello@venue.co.uk"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pt-1.5 pb-2 sm:pt-2 sm:pb-2.5 text-xs sm:text-[15px] font-sans font-medium text-[#180205] bg-transparent border-b border-stone-200 focus:border-[#4E0D17] focus:outline-none transition-colors placeholder:text-stone-400"
                    />
                  </div>
                </div>

                {/* Row 2: Your Subject */}
                <div className="group">
                  <label
                    htmlFor="contact-subject"
                    className="block text-[11px] sm:text-xs font-sans font-medium text-stone-500 group-focus-within:text-[#4E0D17] transition-colors"
                  >
                    Your Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    placeholder="Wholesale supply & seasonal produce enquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pt-1.5 pb-2 sm:pt-2 sm:pb-2.5 text-xs sm:text-[15px] font-sans font-medium text-[#180205] bg-transparent border-b border-stone-200 focus:border-[#4E0D17] focus:outline-none transition-colors placeholder:text-stone-400"
                  />
                </div>

                {/* Row 3: Message */}
                <div className="group">
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] sm:text-xs font-sans font-semibold text-[#5A101D] transition-colors"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    required
                    placeholder="Write here your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pt-1.5 pb-2 sm:pt-2.5 sm:pb-3 text-xs sm:text-[15px] font-sans text-[#180205] bg-transparent border-b-2 border-[#5A101D] focus:border-[#2B040A] focus:outline-none transition-colors resize-none placeholder:text-stone-400"
                  />
                </div>

                {/* Error Message if any */}
                {errorMsg && (
                  <p className="text-xs font-sans text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                    {errorMsg}
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 sm:px-7 sm:py-3.5 rounded-lg bg-[#4E0D17] hover:bg-[#2B040A] disabled:opacity-60 text-white font-sans font-semibold text-xs sm:text-[13px] tracking-wide shadow-[0_10px_24px_rgba(78,13,23,0.22)] hover:shadow-[0_14px_30px_rgba(43,4,10,0.32)] transition-all cursor-pointer active:scale-95"
                  >
                    {isSubmitting ? 'Sending Enquiry...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
