"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, User, Clock, ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    slug: "best-places-to-visit-in-naran",
    title: "Best Places to Visit in Naran Valley on a Motorcycle",
    excerpt: "Discover the hidden gems and must-visit destinations in Kaghan and Naran Valley, from Saif-ul-Muluk to Lulusar Lake.",
    image: "/tours_hero.png",
    date: "July 15, 2026",
    readTime: "5 min read",
    author: "Hamza Khan",
  },
  {
    slug: "bike-trip-to-babusar-top",
    title: "Ultimate Guide: Bike Trip to Babusar Top (4173m)",
    excerpt: "Everything you need to know about preparing your bike, what to pack, and what to expect when riding up to Babusar Pass.",
    image: "/bikes_hero.png",
    date: "July 12, 2026",
    readTime: "8 min read",
    author: "Ahmed Raza",
  },
  {
    slug: "naran-to-hunza-bike-tour-guide",
    title: "Naran to Hunza Bike Tour: The Karakoram Highway Experience",
    excerpt: "A complete itinerary for riding from Naran to Hunza via Babusar Pass and the legendary Karakoram Highway.",
    image: "/tours_hero.png",
    date: "July 08, 2026",
    readTime: "10 min read",
    author: "Ali Hassan",
  },
  {
    slug: "motorcycle-touring-in-pakistan",
    title: "Motorcycle Touring in Pakistan: A Beginner's Guide",
    excerpt: "Planning your first motorcycle tour in Northern Pakistan? Here are the essential tips for a safe and memorable adventure.",
    image: "/about_team.png",
    date: "July 02, 2026",
    readTime: "6 min read",
    author: "Usman Tariq",
  },
  {
    slug: "best-time-to-visit-kaghan-valley",
    title: "The Best Time to Visit Kaghan Valley for a Bike Tour",
    excerpt: "Weather conditions, road access, and seasonal highlights to help you plan the perfect motorcycle trip to Kaghan Valley.",
    image: "/tours_hero.png",
    date: "June 28, 2026",
    readTime: "4 min read",
    author: "Hamza Khan",
  },
  {
    slug: "bike-rental-guide-in-naran",
    title: "How to Rent a Bike in Naran: Requirements & Tips",
    excerpt: "A comprehensive guide on documentation, security deposits, and choosing the right motorcycle for your Naran Valley exploration.",
    image: "/bikes_hero.png",
    date: "June 20, 2026",
    readTime: "5 min read",
    author: "Bilal Shah",
  },
];

export default function BlogListingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300 pb-20">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden text-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/tours_hero.png"
              alt="Motorcycle touring blog"
              fill
              className="object-cover object-center opacity-20 dark:opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-light-bg/90 via-light-bg/80 to-light-bg dark:from-dark-bg/90 dark:via-dark-bg/80 dark:to-dark-bg" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-xs font-black uppercase tracking-[0.25em] text-brand-orange mb-4"
            >
              Travel Guides & Stories
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-gradient-light dark:text-gradient mb-6"
            >
              Adventure Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto"
            >
              Expert tips, detailed itineraries, and inspiring stories from the road.
              Your ultimate resource for motorcycle touring in Northern Pakistan.
            </motion.p>
          </div>
        </section>

        {/* ── Blog Grid ────────────────────────────────────── */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col bg-white dark:bg-dark-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 hover:border-brand-orange/30 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/5"
                >
                  <Link href={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden bg-slate-100 dark:bg-neutral-900">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-3">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-3 group-hover:text-brand-orange transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-sm text-slate-600 dark:text-neutral-400 mb-5 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-brand-orange" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300">{post.author}</span>
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-transform uppercase text-[10px] font-black tracking-widest text-brand-orange flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <BookingModal />
    </>
  );
}
