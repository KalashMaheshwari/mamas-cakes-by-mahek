import React, { useState, Suspense } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SmoothScroll from "./components/SmoothScroll";

// Lazy loaded components for sections below the fold
const Courses = React.lazy(() => import("./components/Courses"));
const WhyChooseUs = React.lazy(() => import("./components/WhyChooseUs"));
const StartYourJourney = React.lazy(() => import("./components/StartYourJourney"));
const CakeArtistryShowcase = React.lazy(() => import("./components/CakeArtistryShowcase"));
const AboutMahek = React.lazy(() => import("./components/AboutMahek"));
const Testimonials = React.lazy(() => import("./components/Testimonials"));
const ContactFAQ = React.lazy(() => import("./components/ContactFAQ"));
const Footer = React.lazy(() => import("./components/Footer"));

// Minimal elegant loader for suspense fallback
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-white">
    <div className="w-6 h-6 border-2 border-plum/20 border-t-plum rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of floating navigation
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>      
      <SmoothScroll>
        <div className="bg-white min-h-screen text-plum selection:bg-mauve selection:text-white font-sans relative antialiased overflow-x-hidden">
          
          {/* 1. Global Navigation */}
          <Navigation
            onArtistryClick={() => scrollToSection("artistry-showcase")}
            onExploreClick={() => scrollToSection("academy")}
          />

          {/* 2. Hero Header */}
          <Hero
            onExploreClick={() => scrollToSection("academy")}
            onArtistryClick={() => scrollToSection("artistry-showcase")}
          />

          {/* 3. Infinite Scrolling Marquee */}
          <Marquee />

          <Suspense fallback={<SectionLoader />}>
            {/* 4. Why Choose Us Section */}
            <WhyChooseUs />

            {/* 5. Start Your Journey Section */}
            <StartYourJourney />

            {/* 6. Academy Masters Section */}
            <Courses />

            {/* 7. Endless Social Proof Divider */}
            <Marquee reverse={true} />

            {/* 8. High-texture Cake Artistry Exhibit */}
            <CakeArtistryShowcase />

            {/* 9. About Mahek */}
            <AboutMahek />

            {/* 10. Verified Alumnae Testimonials */}
            <Testimonials />

            {/* 11. Support FAQ & Contact Desk */}
            <ContactFAQ />

            {/* 12. Digital Footer */}
            <Footer />
          </Suspense>

          {/* Floating WhatsApp CTA */}
          <a
            href="https://wa.me/918598198765?text=Hi%20Mahek's%20team!%20I'd%20like%20to%20inquire%20about%20ordering%20a%20custom%20cake..."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-white/70 backdrop-blur-xl text-plum p-3.5 md:p-4 rounded-full shadow-[0_8px_32px_rgba(99,35,87,0.15)] border border-white hover:bg-white/90 hover:scale-110 hover:shadow-[0_15px_40px_rgba(99,35,87,0.25)] transition-all duration-300 flex items-center justify-center group"
            aria-label="Inquire via WhatsApp"
          >
            <svg
              className="w-7 h-7 md:w-8 md:h-8 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-white text-plum text-[11px] uppercase tracking-widest font-bold px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
              Inquire
            </span>
          </a>

        </div>
      </SmoothScroll>
    </>
  );
}
