"use client";

import React, { useEffect, useState } from "react";
import { PhoneCall, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">

      {/* Tooltip badge */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-neutral-900 text-white text-[11px] font-bold py-2 px-3 rounded-xl border border-white/10 shadow-2xl relative max-w-[200px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1.5 -right-1.5 p-0.5 bg-neutral-800 rounded-full hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span>Helpline Active</span>
            </div>
            <p className="text-[10px] text-neutral-400 font-normal mt-0.5">
              Need assistance? Speak directly on WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Group */}
      <div className="flex flex-col gap-3">
        {/* Phone Speed dial */}
        <motion.a
          href="tel:+923009484055"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="p-3 bg-neutral-900 border border-white/15 hover:border-brand-orange/40 text-brand-orange rounded-full shadow-2xl hover:scale-108 active:scale-95 transition-all text-white flex items-center justify-center glow-orange cursor-pointer"
          title="Call Hub Hotline"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
        </motion.a>

        {/* WhatsApp Chat float */}
        <motion.a
          href="https://wa.me/923009484055?text=I%20want%20to%20book%20a%20bike%20from%20Naran%20Bikers%20Hub.%20Please%20share%20available%20bikes%20and%20rates."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="p-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-full shadow-2xl hover:scale-108 active:scale-95 transition-all flex items-center justify-center relative group cursor-pointer"
          title="WhatsApp Support desk"
        >
          {/* Pulsing circle overlay */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 -z-10 animate-ping duration-1500" />
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>
      </div>

    </div>
  );
}
