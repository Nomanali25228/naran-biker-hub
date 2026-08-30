"use client";

import { useEffect } from "react";

export default function GoogleReviews() {
  useEffect(() => {
    // Check if the Elfsight script is already loaded
    if (document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      return;
    }
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup not needed — Elfsight initialises globally once
    };
  }, []);

  return (
    <section className="py-16 md:py-20 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange">
            Customer Feedback
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-gradient-light dark:text-gradient">
            What Our Riders Say
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Real reviews from real adventurers — straight from Google
          </p>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div className="elfsight-app-a55965a3-408b-4476-80c5-f0c4ae232608" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}
