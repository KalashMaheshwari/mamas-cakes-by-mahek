import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Award, Flame, Star } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onArtistryClick: () => void;
}

export default function Hero({ onExploreClick, onArtistryClick }: HeroProps) {
  // Editorial transitions  // Define transition for easy reuse
  const transition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

  // Rolling words
  const words = ["passion", "artistry", "formulas", "skills", "recipes"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12 lg:px-24 bg-plum overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        
        {/* Left Editorial Section (50% / columns 1 to 6) */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          


          {/* Staggered Title Reveal Line by Line */}
          <h1 className="flex flex-col gap-1 md:gap-2 block mb-6">
            <span className="block overflow-hidden pb-1">
              <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ ...transition, delay: 0.2 }} className="block origin-left font-serif text-[2.75rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-normal leading-[1.05] tracking-tight text-white [word-spacing:0.15em]">
                Turn your baking
              </motion.span>
            </span>
            <span className="block overflow-hidden relative text-[4.5rem] sm:text-[6.5rem] xl:text-[8rem] h-[1.3em] -mt-2 md:-mt-4 -mb-4 md:-mb-8">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="block absolute inset-0 font-serif font-light italic text-[#FB7185] lowercase leading-[1.2]"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            <div className="flex flex-wrap sm:flex-nowrap sm:whitespace-nowrap gap-[0.2em] md:gap-[0.3em]">
              <span className="block overflow-hidden pb-1 pr-4 md:pr-6">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ ...transition, delay: 0.5 }} className="block origin-left font-serif text-[2.75rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-normal leading-[1.05] tracking-tight text-white [word-spacing:0.15em]">
                  into a profitable
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ ...transition, delay: 0.65 }} className="block origin-left font-serif text-[2.75rem] sm:text-6xl md:text-7xl xl:text-[5.5rem] font-normal leading-[1.05] tracking-tight text-white [word-spacing:0.15em]">
                  empire.
                </motion.span>
              </span>
            </div>
          </h1>



          {/* Business Bio / Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.8 }}
            className="mt-8 text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/70 max-w-[42ch] font-sans border-l-2 border-white/20 pl-6"
          >
            Expert-led masterclasses and proven business blueprints to start, scale, and succeed in the high-end pastry industry. Join <strong className="text-white font-medium">30,000+</strong> thriving entrepreneurs.
          </motion.p>

          {/* Premium Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.95 }}
            className="mt-10 flex flex-wrap items-center gap-6 md:gap-8"
          >
            {/* Primary Business CTA */}
            <button
              onClick={onExploreClick}
              className="group relative flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-plum text-[13px] font-semibold uppercase tracking-widest hover:bg-white/90 transition-all duration-300 cursor-pointer rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
            >
              <span className="relative z-10">Explore Masterclasses</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-plum group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>

            {/* Secondary Artistry CTA */}
            <button
              onClick={onArtistryClick}
              className="group text-[13px] font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors py-2 relative cursor-pointer"
            >
              View Cake Artistry
              <span className="absolute bottom-0 left-0 w-3/4 h-[1px] bg-white/50 group-hover:w-full group-hover:bg-white transition-all duration-300" />
            </button>
          </motion.div>



          {/* Architectural Minimalist Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 1.1 }}
            className="mt-14 md:mt-16 flex items-center gap-6 md:gap-10 border-t border-white/20 pt-6 md:pt-8 w-fit"
          >
            {/* Avatars & Count */}
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                ].map((src, i) => (
                  <img 
                    key={i} 
                    src={src} 
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1E0B1B] object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:z-10 relative cursor-pointer" 
                    alt="Student"
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl md:text-[2rem] text-white tracking-tight leading-none mb-1">
                  30K+
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#FB7185] font-sans font-bold">
                  Students
                </span>
              </div>
            </div>

            {/* Crisp Divider */}
            <div className="w-[1px] h-12 bg-white/20" />

            {/* Rating */}
            <div className="flex flex-col justify-center">
              <div className="flex items-end gap-2 mb-1.5">
                <span className="font-serif text-2xl md:text-[2rem] text-white tracking-tight leading-none">
                  4.7/5
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#FB7185] font-sans font-bold mb-0.5">
                  Rating
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
                {/* 5th partial star for 4.7 */}
                <div className="relative w-3.5 h-3.5">
                  <Star className="absolute inset-0 w-3.5 h-3.5 text-[#D4AF37] opacity-30" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '70%' }}>
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Full Image Section (50% / columns 7 to 12) */}
        <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end mt-8 lg:-mt-[12rem] lg:translate-x-8">
          
          {/* Image container without frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
            className="relative w-full max-w-[480px] lg:max-w-[540px]"
          >
            
            {/* Offset Silhouette 1: Soft Blush */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 0.8, x: 22, y: 16 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="absolute inset-0 w-full h-full bg-[#FB7185] scale-[1.02]"
              style={{ 
                WebkitMaskImage: "url('/mahek-hero.png')", 
                WebkitMaskSize: "100% 100%", 
                WebkitMaskRepeat: "no-repeat"
              }}
            />

            {/* Offset Silhouette 2: Lavender */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 0.8, x: -18, y: -10 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
              className="absolute inset-0 w-full h-full bg-[#C084FC] scale-[1.02]"
              style={{ 
                WebkitMaskImage: "url('/mahek-hero.png')", 
                WebkitMaskSize: "100% 100%", 
                WebkitMaskRepeat: "no-repeat"
              }}
            />

            <picture>
              <source srcSet="/mahek-hero.webp" type="image/webp" />
              <img
                src="/mahek-hero.png"
                alt="Mahek Baldota"
                referrerPolicy="no-referrer"
                fetchpriority="high"
                decoding="async"
                className="relative w-full h-auto object-contain drop-shadow-2xl"
              />
            </picture>

            {/* Bottom Floating Container */}
            <div className="absolute -bottom-16 md:-bottom-24 left-0 right-0 z-30 flex flex-col gap-4">
              {/* Solid Bar across the bottom edge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="bg-white/95 backdrop-blur-lg shadow-[0_10px_40px_rgba(33,20,38,0.15)] border border-plum/10 px-6 py-5 flex items-center justify-between rounded-xl"
              >
                <div className="text-left">
                  <h3 className="font-serif text-3xl text-plum leading-none">Mahek Baldota</h3>
                  <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-mauve mt-1.5">
                    Master Baker & Founder
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-apricot/20 flex items-center justify-center text-[#80173F] shrink-0 border border-apricot/30">
                  <Award className="w-6 h-6" />
                </div>
              </motion.div>

              {/* App Store Buttons below Title Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex items-center justify-center md:justify-end gap-3"
              >
                <a href="#" className="hover:scale-105 transition-transform duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" loading="lazy" decoding="async" className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100" />
                </a>
                <a href="#" className="hover:scale-105 transition-transform duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" loading="lazy" decoding="async" className="h-8 md:h-10 w-auto opacity-90 hover:opacity-100" />
                </a>
              </motion.div>
            </div>

          </motion.div>



        </div>

      </div>
    </section>
  );
}
