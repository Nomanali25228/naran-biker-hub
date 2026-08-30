import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { BookingProvider } from "@/context/BookingContext";


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://naranbikershub.com'),
  title: {
    default: "Naran Bikers Hub | Premium Bike Rental & Motorcycle Tours in Pakistan",
    template: "%s | Naran Bikers Hub",
  },
  description: "Rent premium mountain motorcycles (Yamaha YBR 125G, Suzuki GS 150, Honda CB 150F, heavy adventure bikes) in Naran, Kaghan Valley. Experience guided tours to Babusar Top, Hunza, Skardu, and Fairy Meadows.",
  keywords: [
    "Bike Rental Naran",
    "Rent a Bike in Naran",
    "Naran Bike Rental",
    "Motorcycle Rental Naran",
    "Bike on Rent Naran",
    "Naran Motorcycle Rental",
    "Best Bike Rental in Naran",
    "Naran Bikers Hub",
    "Bike Tour Naran",
    "Motorcycle Tour Pakistan",
    "Naran Tour Packages",
    "Kaghan Valley Bike Tour",
    "Babusar Top Bike Trip",
    "Hunza Bike Tour",
    "Skardu Bike Tour",
    "Pakistan Motorcycle Tours"
  ],
  authors: [{ name: "Naran Bikers Hub Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://naranbikershub.com",
    languages: {
      "en-PK": "https://naranbikershub.com",
    },
  },
  openGraph: {
    type: "website",
    url: "https://naranbikershub.com",
    title: "Naran Bikers Hub | Premium Bike Rental & Motorcycle Tours",
    description: "Rent premium mountain motorcycles in Naran, Kaghan Valley. Experience guided tours to Babusar Top, Hunza, and Skardu.",
    siteName: "Naran Bikers Hub",
    images: [{
      url: "/hero_background.png",
      width: 1200,
      height: 630,
      alt: "Naran Bikers Hub Motorcycle Touring Pakistan",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naran Bikers Hub | Premium Bike Rental & Motorcycle Tours",
    description: "Rent premium mountain motorcycles in Naran, Kaghan Valley. Experience guided tours to Babusar Top, Hunza, and Skardu.",
    images: ["/hero_background.png"],
  },
  verification: {
    google: "google-site-verification-id-placeholder", // Add real Google Verification ID here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    name: "Naran Bikers Hub",
    image: "https://naranbikershub.com/hero_background.png",
    "@id": "https://naranbikershub.com",
    url: "https://naranbikershub.com",
    telephone: "+923009484055",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Main Bypass Road, near Jamil Hotel",
      addressLocality: "Naran",
      addressRegion: "Khyber Pakhtunkhwa",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.9014,
      longitude: 73.6517,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "22:00",
    },
  };

  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable} h-full scroll-smooth dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
