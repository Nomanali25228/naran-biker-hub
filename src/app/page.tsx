import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedBikes from "@/components/FeaturedBikes";
import Destinations from "@/components/Destinations";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import GoogleReviews from "@/components/GoogleReviews";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 bg-light-bg dark:bg-dark-bg text-foreground transition-colors duration-300">

        {/* Parallax banner and fast estimator widget */}
        <Hero />

        {/* Dashboard numbers below fold */}
        <Stats />

        {/* Catalog of adventure bikes */}
        <FeaturedBikes />

        {/* Geographic routes elevations and track guides */}
        <Destinations />

        {/* Customer trust and mechanical support highlights */}
        <Features />

        {/* Live Google Reviews from customers */}
        <GoogleReviews />

        {/* Accordions for license requirements & security deposits */}
        <FAQ />

        {/* Contact form and dispatch button */}
        <ContactCTA />



      </main>

      {/* Footer information desk & disclaimer */}
      <Footer />

      {/* Floating Speed dial & WhatsApp widgets */}
      <WhatsAppButton />

      {/* Interactive Booking Calculation Dialog */}
      <BookingModal />
    </>
  );
}
