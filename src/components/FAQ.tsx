"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqData: FAQItem[] = [
    {
      question: "What documents are required to rent a motorcycle?",
      answer: "You must provide an original valid Computerized National Identity Card (CNIC) or a valid Passport (for international tourists), along with a valid motorcycle riding license. An international driving permit works perfectly for foreign visitors.",
    },
    {
      question: "Is there a security deposit or collateral required?",
      answer: "Yes, we require a small, fully refundable cash security deposit (varies by bike model, e.g., PKR 5,000 for YBR/GS and PKR 15,000 for Royal Enfield). We also keep a photocopy of your CNIC/Passport. The deposit is refunded instantly upon returning the motorcycle in its original pickup condition.",
    },
    {
      question: "Can I take the rental bikes to Hunza, Skardu, or Khunjerab Pass?",
      answer: "Absolutely! Our fleet is permitted to cross KP province over to Gilgit-Baltistan (including Hunza, Skardu, Ghizer, Passu, and Khunjerab border). Please inform us during checkout so we can prepare the official road permit folders (NOC folders) for check posts.",
    },
    {
      question: "Do you supply riding safety equipment and luggage carriers?",
      answer: "Yes. Every rental includes one sanitized safety helmet and a basic toolkit. We can provide secondary helmets, armor guard jackets, gloves, and bungee cords. Heavy bikes like the Suzuki GS150 and Himalayan come pre-fitted with robust metallic luggage racks.",
    },
    {
      question: "What happens in case of a flat tire or mechanical breakdown?",
      answer: "Our bikes are thoroughly inspected, but mountain terrains are rugged. We provide a 24/7 breakdown helpline. We have cooperative mechanic networks in Naran, Babusar, Chilas, Gilgit, and Skardu. For minor issues, local workshops will fix it (cost reimbursed by us with receipt). For major issues, we will dispatch a mechanical rescue team or a replacement bike.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-neutral-950/20 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-brand-orange">
            Client Support
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-neutral-100">
            Frequently Answered Questions
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Everything you need to know about safety protocols, deposit logistics, and route policies before starting your motorcycle exploration.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel-dark border border-white/5 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-100 group-hover:text-brand-orange transition-colors pr-4">
                    {item.question}
                  </span>
                  <div className="p-1 rounded-lg bg-neutral-900 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-neutral-450 dark:text-neutral-400 light:text-slate-550 leading-relaxed border-t border-white/5 dark:border-white/5 light:border-slate-100 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support contact info */}
        <div className="mt-12 text-center p-6 rounded-2xl border border-brand-orange/20 bg-brand-orange/5 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-center gap-3">
          <HelpCircle className="w-5 h-5 text-brand-orange" />
          <span>Still have unresolved inquiries? Call our support desk directly at <a href="tel:+923009484055" className="text-brand-orange font-bold hover:underline">+92 (300) 948-4055</a>.</span>
        </div>

      </div>
    </section>
  );
}
