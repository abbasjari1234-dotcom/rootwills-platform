'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck, Clock, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FAQItem[] = [
  {
    tag: 'Ordering & SLAs',
    question: 'How does the late 11:00 PM ordering cut-off work for 06:00 AM delivery?',
    answer: 'Chefs and kitchen managers can place orders directly through our digital web & mobile portal until 11:00 PM every night after dinner service wraps up. Our Digbeth Central Hub picks and stages your crates in continuous +2°C chilled vaults between 01:00 AM and 04:00 AM. Our calibrated refrigerated fleet delivers straight to your kitchen coldroom between 06:00 AM and 07:30 AM before morning prep begins.',
  },
  {
    tag: 'Quality Control',
    question: 'What is the Rootwills 100% Zero-Substitution Guarantee?',
    answer: 'We never send surprise unapproved substitute items. If a seasonal item or specific sizing fails our strict Class 1 Extra intake quality inspection, our commercial sales desk alerts your head chef via SMS/portal with verified alternatives before dispatch. If an item does not meet your standard upon delivery, you receive an instant 1-click digital credit.',
  },
  {
    tag: 'Commercial Accounts',
    question: 'How do locked contract prices and the £30,000 credit facility work?',
    answer: 'When you open a Rootwills trade account, we analyze your core weekly produce volume and issue locked contract rates valid for 30–90 day cycles. Qualified hospitality groups receive up to £30,000 in revolving credit with standard 30-day payment terms via GoCardless Direct Debit or automated BACS invoicing.',
  },
  {
    tag: 'Tech & Integration',
    question: 'Can Rootwills integrate with our kitchen inventory & e-procurement software?',
    answer: 'Yes. The Rootwills platform natively supports EDI data feeds and CSV invoice exports compatible with Procure Wizard, Fourth Hospitality, MarketMan, Toast, and Xero/QuickBooks accounting systems.',
  },
];

export function InteractiveChefFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
      
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-champagne" />
          <span>Executive Chef & Operator FAQ</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cream uppercase">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-cream/70 font-sans">
          Everything you need to know about opening an account, ordering cut-offs, and logistics.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-emerald-950/60 border-champagne/50 shadow-[0_0_25px_rgba(228,199,103,0.15)]' 
                  : 'bg-obsidian-900/80 border-emerald-950 hover:border-emerald-800/60'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="space-y-1 block">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    {faq.tag}
                  </span>
                  <span className="font-display text-lg sm:text-xl font-bold text-cream block">
                    {faq.question}
                  </span>
                </span>

                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                  isOpen ? 'bg-champagne text-obsidian-950 border-champagne rotate-180' : 'bg-obsidian-950 text-cream/60 border-emerald-900'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-cream/80 font-sans leading-relaxed border-t border-emerald-900/40 mt-1">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs font-mono text-cream/60">
          Have a specific kitchen requirement?{' '}
          <Link href="/contact" className="text-champagne font-bold hover:underline">
            Speak directly with our Birmingham Sales Desk &rarr;
          </Link>
        </p>
      </div>

    </section>
  );
}
