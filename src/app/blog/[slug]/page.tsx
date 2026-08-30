import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";
import Image from "next/image";
import Link from 'next/link';
import { Calendar, Clock, User, ChevronRight, Home, MapPin, Share2 } from "lucide-react";

// In a real application, this would come from a CMS (Sanity, Strapi) or MDX files.
const BLOG_DB = {
  "best-places-to-visit-in-naran": {
    title: "Best Places to Visit in Naran Valley on a Motorcycle",
    excerpt: "Discover the hidden gems and must-visit destinations in Kaghan and Naran Valley, from Saif-ul-Muluk to Lulusar Lake.",
    content: "Naran Valley is the crown jewel of Pakistan's tourism, offering breathtaking landscapes, alpine lakes, and some of the most thrilling motorcycle routes in the world...\n\n### 1. Lake Saif-ul-Muluk\nNo trip to Naran is complete without visiting the legendary fairy-tale lake. Taking a dirt bike up the rocky jeep track is an adventure in itself.\n\n### 2. Lulusar Lake\nLocated on the main Naran-Chilas road, the paved sweeping corners leading up to the highest large body of water in Kaghan Valley are a motorcyclist's dream.\n\n### 3. Babusar Top\nA bucket-list destination for every high-altitude rider.",
    image: "/tours_hero.png",
    date: "July 15, 2026",
    readTime: "5 min read",
    author: "Hamza Khan",
    tags: ["Naran", "Kaghan", "Destinations"],
  },
  "bike-trip-to-babusar-top": {
    title: "Ultimate Guide: Bike Trip to Babusar Top (4173m)",
    excerpt: "Everything you need to know about preparing your bike, what to pack, and what to expect when riding up to Babusar Pass.",
    content: "Riding to Babusar Pass (13,691 ft) is a test of both rider and machine. As oxygen levels drop, both you and your carburetor-fed engines will feel the strain...\n\n### Bike Preparation\nEnsure your brakes are newly bled, chain is freshly lubed, and you've tuned the carburetor for high altitude running if you're not on fuel injection.\n\n### What to Wear\nTemperatures at the top can drop to near freezing even in mid-summer. Windproof layers and armored jackets are mandatory.",
    image: "/bikes_hero.png",
    date: "July 12, 2026",
    readTime: "8 min read",
    author: "Ahmed Raza",
    tags: ["Babusar Top", "Guides", "Preparation"],
  },
  "naran-to-hunza-bike-tour-guide": {
    title: "Naran to Hunza Bike Tour: The Karakoram Highway Experience",
    excerpt: "A complete itinerary for riding from Naran to Hunza via Babusar Pass and the legendary Karakoram Highway.",
    content: "Transitioning from the lush greenery of Kaghan Valley to the rugged, towering peaks of the Karakoram Highway is an unforgettable visual shock...\n\n### The Route via Babusar\nCross Babusar, descend into Chilas, and hit the KKH. From there, it's a straight shot to Raikot, Gilgit, and finally the pristine Hunza Valley.",
    image: "/tours_hero.png",
    date: "July 08, 2026",
    readTime: "10 min read",
    author: "Ali Hassan",
    tags: ["Hunza", "KKH", "Itinerary"],
  },
  "motorcycle-touring-in-pakistan": {
    title: "Motorcycle Touring in Pakistan: A Beginner's Guide",
    excerpt: "Planning your first motorcycle tour in Northern Pakistan? Here are the essential tips for a safe and memorable adventure.",
    content: "Northern Pakistan has rapidly become a premier global destination for adventure motorcycle touring. But the terrain demands respect...\n\n### 1. Always Wear Proper Gear\nJeans won't save your skin on mountain gravel. Helmet, gloves, and armored boots.\n\n### 2. Hydration\nAltitude sickness is real. Drink water before you feel thirsty.",
    image: "/about_team.png",
    date: "July 02, 2026",
    readTime: "6 min read",
    author: "Usman Tariq",
    tags: ["Beginner Guide", "Safety", "Pakistan"],
  },
  "best-time-to-visit-kaghan-valley": {
    title: "The Best Time to Visit Kaghan Valley for a Bike Tour",
    excerpt: "Weather conditions, road access, and seasonal highlights to help you plan the perfect motorcycle trip to Kaghan Valley.",
    content: "Timing is everything in the mountains. Arrive too early, and passes are snowed in. Arrive too late, and you face freezing conditions...\n\n### Peak Touring Season (June - September)\nThis is when Babusar Pass is open, linking KP to Gilgit-Baltistan. The monsoon season in late July can bring rain, so waterproof gear is essential.",
    image: "/tours_hero.png",
    date: "June 28, 2026",
    readTime: "4 min read",
    author: "Hamza Khan",
    tags: ["Seasons", "Weather", "Kaghan"],
  },
  "bike-rental-guide-in-naran": {
    title: "How to Rent a Bike in Naran: Requirements & Tips",
    excerpt: "A comprehensive guide on documentation, security deposits, and choosing the right motorcycle for your Naran Valley exploration.",
    content: "Renting a bike in Naran has never been easier, but you should know what to expect...\n\n### Requirements\nOriginal CNIC or Passport. A valid driving license. Security deposit.\n\n### Choosing the Bike\nFor Babusar Top, a 150cc bike like the Suzuki GS150 or Honda CB150F is recommended. For local valley hops, a 125 is plenty.",
    image: "/bikes_hero.png",
    date: "June 20, 2026",
    readTime: "5 min read",
    author: "Bilal Shah",
    tags: ["Rental Guide", "Naran", "Tips"],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_DB[resolvedParams.slug as keyof typeof BLOG_DB];
  
  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Naran Bikers Hub Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://naranbikershub.com/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://naranbikershub.com/blog/${resolvedParams.slug}`,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = BLOG_DB[resolvedParams.slug as keyof typeof BLOG_DB];

  if (!post) {
    notFound();
  }

  // Schema Generation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://naranbikershub.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://naranbikershub.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://naranbikershub.com/blog/${resolvedParams.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://naranbikershub.com/blog/${resolvedParams.slug}`
    },
    "headline": post.title,
    "image": `https://naranbikershub.com${post.image}`,  
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Naran Bikers Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://naranbikershub.com/logo.png"
      }
    },
    "description": post.excerpt
  };

  return (
    <>
      <Navbar />
      {/* Inject SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300 pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-500 dark:text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="flex items-center gap-1 hover:text-brand-orange transition-colors">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-neutral-700" />
            <Link href="/blog" className="hover:text-brand-orange transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-neutral-700" />
            <span className="text-slate-800 dark:text-white truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-brand-orange/30 bg-brand-orange/5 text-brand-orange text-[10px] font-black uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs font-semibold text-slate-500 dark:text-neutral-400">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-brand-orange" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-orange" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-orange" /> {post.readTime}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-slate-200 dark:border-white/5">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body */}
          <article className="prose prose-slate dark:prose-invert prose-lg max-w-none mb-16
            prose-headings:font-serif prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white
            prose-p:text-slate-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed
            prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 dark:prose-strong:text-white">
            {/* Extremely simple markdown parser for the hardcoded dummy content */}
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-2xl mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </article>

          {/* Share & CTA Footer */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Share this:</span>
              <button title="Share link" className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 hover:text-brand-orange transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <Link 
              href="/bikes" 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white text-xs font-black uppercase tracking-widest glow-orange transition-all text-center"
            >
              Ready? Rent Your Bike Now
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <BookingModal />
    </>
  );
}
