import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

interface JourneySection {
  id: string;
  step: string;
  tagline: string;
  title: string;
  highlight: string;
  description: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
}

const SECTIONS: JourneySection[] = [
  {
    id: "s-1",
    step: "01",
    tagline: "RECIPES MEET BUSINESS",
    title: "Recipes alone don't pay bills,",
    highlight: "strategy does",
    description:
      "Many passionate home cooks focus only on perfecting their recipes but struggle to make good money because they miss the business side of food. We teach you both — amazing recipes that customers love AND smart business strategies.",
    bullets: [
      "Perfect recipes + smart business planning = profitable food business",
      "Learn customer psychology — understand what makes people buy your food",
      "Master pricing, marketing, and sales strategies that actually work",
    ],
    image: "/business.png",
    reverse: false,
  },
  {
    id: "s-2",
    step: "02",
    tagline: "COURSES BEYOND EXPECTATIONS",
    title: "Trending food + business +",
    highlight: "lifetime support + community + certificates",
    description:
      "Our courses are extremely affordable but don't compromise on quality — each class is packed with multiple recipes and covers everything about that food business.",
    bullets: [
      "Multiple recipes in every course at pocket-friendly prices",
      "Lifetime support means lifetime growth — Access recordings anytime, get your doubts solved on WhatsApp, earn certificates, and connect with successful food entrepreneurs in our community",
      "Daily knowledge boost on your phone — Follow our app and Instagram for regular tips, trends, and motivation to keep your food business growing every single day",
    ],
    image: "/certificate.png",
    reverse: true,
  },
  {
    id: "s-3",
    step: "03",
    tagline: "PRACTICAL KNOWLEDGE FOR REAL RESULTS",
    title: "Proven methods to launch your venture",
    highlight: "with minimal investment & maximum success",
    description:
      "Our vision is simple — help you start your own food business with knowledge that actually works and brings real money. We don't just teach and leave you alone; we stay with you through regular updates on our app and Instagram, plus keep launching new courses and products to help you grow bigger as markets change.",
    bullets: [
      "Your business partner from day one — We give you proven methods to start earning, not just fancy theories that don't work in real life",
      "Growing together, always — Get fresh knowledge daily through our app and Instagram to keep your business ahead of competitors and trends",
      "New courses for new opportunities — As food trends change and your business grows, we launch new products to help you scale up and earn even more",
    ],
    image: "/success.png",
    reverse: false,
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   INDIVIDUAL ROW COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
function JourneyRow({ section, idx }: { section: JourneySection; idx: number; key?: React.Key }) {
  const isDark = idx === 1;
  const rowRef = useRef<HTMLDivElement>(null);
  
  // Local scroll tracking for parallax effects
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Parallax the image slightly in the opposite direction of scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={rowRef} className={`relative z-10 ${idx > 0 ? "mt-20 md:mt-32" : ""}`}>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={
          isDark
            ? "bg-[#1E1B2E] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-16 relative"
            : "relative"
        }
      >
        <div className={`flex flex-col ${section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-24 xl:gap-32 items-center`}>
          
          {/* ─── TEXT SIDE ─── */}
          <div className="flex-1 relative w-full lg:w-1/2">
            <span
              className={`absolute -top-10 left-0 md:-top-16 text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none select-none pointer-events-none font-serif font-bold ${
                isDark ? "text-white/[0.03]" : "text-[#6B4FA0]/[0.04]"
              }`}
            >
              {section.step}
            </span>

            <div className="relative space-y-6 z-10">
              <span className={`inline-flex items-center gap-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${isDark ? "text-[#C4A8FF]" : "text-[#6B4FA0]"}`}>
                <span className={`w-6 h-px ${isDark ? "bg-[#C4A8FF]/40" : "bg-[#6B4FA0]/40"}`} />
                {section.tagline}
              </span>

              {/* Reveal Mask Title */}
              <div className="overflow-hidden">
                <motion.h3
                  initial={{ y: "100%", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] leading-[1.15] tracking-tight ${isDark ? "text-white" : "text-[#1E1B2E]"}`}
                >
                  {section.title}
                  <br />
                  <span className={`italic ${isDark ? "text-[#C4A8FF]" : "text-[#6B4FA0]"}`}>
                    {section.highlight ? section.highlight : ""}
                  </span>
                </motion.h3>
              </div>

              <p className={`font-sans text-[15px] md:text-base leading-[1.7] ${isDark ? "text-white/45" : "text-[#1E1B2E]/55"}`}>
                {section.description}
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                }}
                className="space-y-4 pt-2"
              >
                {section.bullets.map((bullet, bIdx) => (
                  <motion.div
                    key={bIdx}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`mt-[6px] w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isDark ? "bg-[#C4A8FF]/[0.1]" : "bg-[#6B4FA0]/[0.07]"}`}>
                      <Check className={`w-[10px] h-[10px] ${isDark ? "text-[#C4A8FF]" : "text-[#6B4FA0]"}`} strokeWidth={3} />
                    </div>
                    <p className={`font-sans text-[14px] leading-[1.65] ${isDark ? "text-white/60" : "text-[#1E1B2E]/70"}`}>
                      {bullet}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* ─── IMAGE SIDE ─── */}
          <div className="flex-1 w-full lg:w-1/2 flex justify-center">
            <motion.div 
              style={{ y: imageY }} 
              className="relative group w-full lg:max-w-[420px]"
            >
              {isDark ? (
                <>
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#C4A8FF]/20 to-[#6B4FA0]/20 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10 group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <picture>
                    <source srcSet={section.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
                    <img
                      src={section.image}
                      alt={section.tagline}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain scale-[1.01] group-hover:scale-[1.05] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </picture>
                  </div>
                </>
              ) : (
                <>
                  <div className={`absolute inset-0 border-2 border-[#6B4FA0]/[0.07] rounded-[2rem] transition-all duration-700 ease-out ${section.reverse ? "translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5" : "-translate-x-3 translate-y-3 group-hover:-translate-x-5 group-hover:translate-y-5"}`} />
                  <div className="relative rounded-[2rem] overflow-hidden group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <picture>
                    <source srcSet={section.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
                    <img
                      src={section.image}
                      alt={section.tagline}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-contain scale-[1.01] group-hover:scale-[1.05] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </picture>
                  </div>
                </>
              )}

              {/* Floating Step Circle */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-4 ${section.reverse ? "-left-4" : "-right-4"} w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${isDark ? "bg-[#6B4FA0]/30 backdrop-blur-md border border-[#C4A8FF]/20" : "bg-[#FAFAF7] border-2 border-[#6B4FA0]/15"}`}
              >
                <span className={`font-mono text-sm font-bold tracking-widest ${isDark ? "text-[#C4A8FF]" : "text-[#6B4FA0]"}`}>
                  {section.step}
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function StartYourJourney() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll for the central glowing timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ["0%", "100%"]);

  return (
    <section id="start-journey" ref={containerRef} className="relative py-28 md:py-40 overflow-hidden bg-[#f7f5fc]">
      
      {/* ─── Dot Grid Texture ─── */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1E1B2E 1px, transparent 0)`, backgroundSize: "28px 28px" }}
      />

      {/* ─── Gradient Orbs ─── */}
      <div className="absolute -top-48 -right-48 w-[800px] h-[800px] bg-[#6B4FA0]/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/2 -left-48 w-[600px] h-[600px] bg-[#C4A8FF]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* ══════════════════════════════════════ */}
      {/* ─── HEADER ─── */}
      {/* ══════════════════════════════════════ */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            {["01", "02", "03"].map((num, i) => (
              <React.Fragment key={num}>
                <span className="text-[11px] font-mono font-bold text-[#6B4FA0] tracking-wider">{num}</span>
                {i < 2 && <div className="w-8 h-px bg-[#6B4FA0]/20" />}
              </React.Fragment>
            ))}
          </div>

          <h2 className="font-serif text-[3rem] md:text-[5rem] lg:text-[6rem] text-[#1E1B2E] leading-[1.05] tracking-tight mb-6">
            Start Your{" "}
            <span className="italic text-[#6B4FA0] relative inline-block">
              Journey
              <svg className="absolute -bottom-2 left-0 w-full overflow-visible" viewBox="0 0 200 12" fill="none">
                <motion.path
                  d="M2 8 C60 2, 140 2, 198 8"
                  stroke="#6B4FA0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.25 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                />
              </svg>
            </span>
          </h2>

          <p className="font-sans text-lg md:text-xl text-[#1E1B2E]/40 max-w-lg mx-auto leading-relaxed">
            Start your journey towards building your food business and unlock your true potential
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════ */}
      {/* ─── JOURNEY SECTIONS ─── */}
      {/* ══════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-10">
        


        {SECTIONS.map((section, idx) => (
          <JourneyRow key={section.id} section={section} idx={idx} />
        ))}
      </div>

      {/* ══════════════════════════════════════ */}
      {/* ─── BOTTOM CTA (EDITORIAL LAYOUT) ─── */}
      {/* ══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-20 md:mt-32 relative z-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#1A1726] p-4 md:p-5 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-black/20 ring-1 ring-white/5 flex flex-col lg:flex-row gap-4 md:gap-5 group"
        >
          {/* ─── LEFT: TEXT & INTERACTION ─── */}
          <div className="flex-1 rounded-[1.75rem] md:rounded-[2.25rem] bg-[#1A1726] border border-white/5 overflow-hidden relative flex flex-col justify-between p-10 md:p-14 lg:p-16 z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            {/* Left Image Part */}
            <div className="absolute inset-0 z-0 pointer-events-none">
               <picture>
                 <source srcSet="/bg.webp" type="image/webp" />
                 <img src="/bg.jpg" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" className="w-full h-full object-cover object-left transform scale-100 group-hover:scale-[1.03] transition-transform duration-[3s] ease-out" />
               </picture>
               <div className="absolute inset-0 bg-[#1A1726]/85 backdrop-blur-xl" />
            </div>
            


            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#C4A8FF]/80">
                  <path d="M5 0L5.67785 4.32215L10 5L5.67785 5.67785L5 10L4.32215 5.67785L0 5L4.32215 4.32215L5 0Z" fill="currentColor"/>
                </svg>
                <span className="text-[10px] font-mono font-medium uppercase tracking-[0.3em] text-[#C4A8FF]/90">
                  THE NEXT CHAPTER
                </span>
              </div>

              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight max-w-sm">
                Your Journey{" "}
                <span className="italic text-[#C4A8FF] block mt-2">Starts Here.</span>
              </h3>
            </div>

            <div className="mt-20 md:mt-32 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
              <p className="font-sans text-white/60 text-sm md:text-base max-w-xs leading-relaxed font-light">
                Join thousands of food entrepreneurs who turned their passion into profit with our proven systems and continuous support.
              </p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#academy"
                className="shrink-0 relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-[#C4A8FF] text-[#1E1B2E] rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(196,168,255,0.2)] hover:shadow-[0_0_40px_rgba(196,168,255,0.4)] group"
              >
                {/* Background sliding effect */}
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:-rotate-45" />
              </motion.a>
            </div>
            
            {/* Subtle light leak */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#6B4FA0]/10 to-transparent pointer-events-none" />
          </div>

          {/* ─── RIGHT: EDITORIAL IMAGE ─── */}
          <div className="hidden lg:block w-full lg:w-[45%] h-[350px] md:h-[450px] lg:h-auto rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden relative border border-white/5 z-10 bg-[#1A1726]">
            {/* Right Image Part */}
            <picture>
              <source srcSet="/bg.webp" type="image/webp" />
              <img src="/bg.jpg" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center transform scale-100 group-hover:scale-[1.05] transition-transform duration-[3s] ease-out" />
            </picture>
            {/* Sophisticated Duotone / Mood Filter */}
            <div className="absolute inset-0 bg-[#6B4FA0]/20 mix-blend-color transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1726]/90 via-[#1A1726]/20 to-transparent pointer-events-none" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}