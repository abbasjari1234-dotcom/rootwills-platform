'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Send,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { RootwillsLogo } from '@/components/brand/RootwillsLogo';

export function PublicFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#061811] via-[#081e15] to-[#04100c] text-slate-400 text-xs sm:text-sm pt-16 pb-12 border-t border-emerald-900/50 overflow-hidden">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 5-Column Luxury B2B Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-7 pb-14 border-b border-emerald-950/80">
          
          {/* Col 1: Brand & Socials (lg:col-span-3) - KEEP LOGO AS REQUESTED */}
          <div className="lg:col-span-3 space-y-4">
            <RootwillsLogo size="md" variant="full" theme="dark" />
            
            <p className="text-xs text-slate-300/80 font-sans leading-relaxed max-w-xs">
              Premier UK wholesale food and fresh produce distributor delivering direct to commercial kitchens, care groups, and hospitality operators nationwide.
            </p>

            <div className="pt-1">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-emerald-400/90 font-semibold block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 hover:border-emerald-400 hover:bg-emerald-900/70 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 hover:border-emerald-400 hover:bg-emerald-900/70 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 hover:border-emerald-400 hover:bg-emerald-900/70 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-emerald-950/70 border border-emerald-800/60 hover:border-emerald-400 hover:bg-emerald-900/70 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links 1 (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-white flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Products Catalogue</span>
                </Link>
              </li>
              <li>
                <Link href="/sectors/restaurants" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Sectors We Supply</span>
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Delivery &amp; Logistics</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links 2 / Portal (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-white flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Commercial</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/why-choose-us" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Why Choose Us</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Market Reports</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Contact Sales Desk</span>
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-emerald-400 font-semibold hover:text-emerald-300 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Become a Customer</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-300/85 hover:text-emerald-400 hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-150">
                  <span>Customer Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Get in Touch (lg:col-span-2.5) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-white flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Get in Touch</span>
            </h4>

            <div className="space-y-2.5">
              <a 
                href="tel:01217908800" 
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-300 group transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold">0121 790 8800</span>
              </a>

              <a 
                href="mailto:orders@rootwills.com" 
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-300 group transition-colors truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium truncate">orders@rootwills.com</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs leading-tight">Birmingham, West Midlands, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Col 5: Newsletter (lg:col-span-3) with Sleek Dark Glass Form */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-sans font-bold text-xs uppercase tracking-[0.14em] text-white flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Newsletter</span>
            </h4>
            
            <p className="text-xs text-slate-300/80 leading-relaxed font-sans">
              Weekly seasonal market pricing, harvest reports, and wholesale trade news.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5 animate-fade-in shadow-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">Thank you! You are subscribed to trade alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Your work email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-emerald-950/40 border border-emerald-800/60 focus:border-emerald-400 focus:bg-emerald-950/70 text-white placeholder:text-slate-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all duration-200 shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white font-sans text-xs font-bold transition-all duration-200 shadow-md shadow-emerald-950/60 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}

            <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-sans pt-0.5">
              <Lock className="w-3 h-3 text-emerald-500/80" />
              <span>No spam. Strictly trade market pricing and harvest updates.</span>
            </div>
          </div>

        </div>

        {/* ─── Bottom Sub-bar: Legal & Copyright ─── */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400/80 font-sans">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Rootwills Wholesale Ltd. All rights reserved.</span>
            <span className="hidden md:inline text-slate-600">&bull;</span>
            <span className="hidden md:inline text-slate-500 text-[11px]">Registered in England &amp; Wales</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms &amp; Conditions</Link>
            <span className="text-slate-700">&bull;</span>
            <Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
