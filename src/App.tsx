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

        </div>
      </SmoothScroll>
    </>
  );
}
