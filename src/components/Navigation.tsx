import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  onArtistryClick: () => void;
  onExploreClick: () => void;
}

export default function Navigation({ onArtistryClick, onExploreClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isScrolled
            ? "top-4 w-[calc(100%-2rem)] max-w-6xl px-4 md:px-8 py-2 md:py-3 bg-white/85 backdrop-blur-xl border border-white/40 shadow-2xl shadow-plum/10 rounded-full"
            : "top-0 w-full max-w-screen-2xl px-4 md:px-8 lg:px-12 py-6 bg-transparent border-transparent rounded-none"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Brand Logo - Elegant Serif */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-left"
          >
            <picture>
              <source srcSet="/mahek-logo.webp" type="image/webp" />
              <img 
                src="/mahek-logo.png" 
                alt="Mumma's Cake Logo" 
                className={`object-contain transition-all duration-500 ${isScrolled ? 'w-10 h-10' : 'w-14 h-14 md:w-16 md:h-16'}`} 
              />
            </picture>
            <div className="flex flex-col justify-center">
              <span className={`transition-all duration-500 leading-none block ${isScrolled ? 'font-serif font-normal tracking-tight text-xl md:text-2xl text-plum' : 'font-display font-bold tracking-normal text-4xl md:text-5xl text-white'}`}>
                Mumma's Cake
              </span>
              <div className={`grid transition-all duration-500 ${isScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100 mt-0.5'}`}>
                <span className={`text-[8px] md:text-[9px] uppercase tracking-[0.25em] font-sans overflow-hidden transition-colors duration-500 ${isScrolled ? 'text-mauve' : 'text-cream'}`}>
                  by Mahek Baldota
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-sans">
            <button
              onClick={() => scrollToSection("why-choose-us")}
              className={`text-[10px] font-semibold uppercase tracking-widest transition-colors relative group py-1 ${isScrolled ? 'text-plum/70 hover:text-plum' : 'text-white/70 hover:text-white'}`}
            >
              Why Us
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-plum' : 'bg-white'}`} />
            </button>
            <button
              onClick={() => scrollToSection("academy")}
              className={`text-[10px] font-semibold uppercase tracking-widest transition-colors relative group py-1 ${isScrolled ? 'text-plum/70 hover:text-plum' : 'text-white/70 hover:text-white'}`}
            >
              Courses
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-plum' : 'bg-white'}`} />
            </button>
            <button
              onClick={() => scrollToSection("artistry-showcase")}
              className={`text-[10px] font-semibold uppercase tracking-widest transition-colors relative group py-1 ${isScrolled ? 'text-plum/70 hover:text-plum' : 'text-white/70 hover:text-white'}`}
            >
              Artistry
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-plum' : 'bg-white'}`} />
            </button>
            <button
              onClick={() => scrollToSection("about-mahek")}
              className={`text-[10px] font-semibold uppercase tracking-widest transition-colors relative group py-1 ${isScrolled ? 'text-plum/70 hover:text-plum' : 'text-white/70 hover:text-white'}`}
            >
              Story
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-plum' : 'bg-white'}`} />
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className={`text-[10px] font-semibold uppercase tracking-widest transition-colors relative group py-1 ${isScrolled ? 'text-plum/70 hover:text-plum' : 'text-white/70 hover:text-white'}`}
            >
              Reviews
              <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-plum' : 'bg-white'}`} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={onArtistryClick}
              className={`text-[10px] font-semibold uppercase tracking-widest transition-colors flex items-center gap-1 group ${isScrolled ? 'text-plum/70 hover:text-plum' : 'text-white/70 hover:text-white'}`}
            >
              Gallery
              <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isScrolled ? 'text-mauve' : 'text-white'}`} />
            </button>
            
            <button
              onClick={onExploreClick}
              className={`px-6 text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                isScrolled 
                  ? 'bg-plum text-cream hover:bg-mauve py-2.5 rounded-full' 
                  : 'bg-white text-plum hover:bg-cream py-3 rounded-none'
              }`}
            >
              Start Learning
            </button>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-plum hover:text-mauve bg-plum/5 rounded-full' : 'text-white hover:text-cream'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-full h-screen bg-plum/95 backdrop-blur-2xl z-40 pt-28 px-8 sm:px-12 flex flex-col justify-between pb-12 lg:hidden"
          >
            <div className="flex flex-col gap-4 text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40 font-bold font-sans block mb-2">
                — Menu
              </span>
              {[
                { label: "Why Choose Us", id: "why-choose-us" },
                { label: "Academy Courses", id: "academy" },
                { label: "Cake Artistry", id: "artistry-showcase" },
                { label: "The Founder", id: "about-mahek" },
                { label: "Success Stories", id: "reviews" }
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, y: 25 },
                    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] } })
                  }}
                  onClick={() => scrollToSection(item.id)}
                  className="font-serif text-[2.25rem] sm:text-[3rem] font-light text-cream hover:text-apricot transition-colors py-1 block text-left leading-none"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onArtistryClick();
                }}
                className="w-full py-4 border border-cream/20 hover:border-cream text-cream text-[11px] font-bold uppercase tracking-widest transition-colors text-center rounded-full"
              >
                View Cake Artistry
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onExploreClick();
                }}
                className="w-full py-4 bg-cream text-plum text-[11px] font-bold uppercase tracking-widest hover:bg-white transition-colors text-center rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                Explore Masterclasses
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
