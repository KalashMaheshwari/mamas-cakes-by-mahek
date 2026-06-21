/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, ArrowUpRight, Youtube } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   TACTILE GRAIN
   ═══════════════════════════════════════════════════════════════════════ */
function GrainTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-multiply overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="mahekAboutNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#mahekAboutNoise)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   BACKGROUND LINEWORK
   ═══════════════════════════════════════════════════════════════════════ */
function EditorialLinework() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[0] overflow-hidden">
      <svg
        className="absolute -right-32 top-20 w-[48rem] h-[48rem] opacity-[0.09]"
        viewBox="0 0 600 600"
        fill="none"
      >
        {[80, 125, 170, 215, 260].map((r) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            stroke="currentColor"
            className="text-plum"
            strokeWidth="1"
          />
        ))}
      </svg>

      <svg
        className="absolute -left-40 bottom-10 w-[42rem] h-[42rem] opacity-[0.07]"
        viewBox="0 0 600 600"
        fill="none"
      >
        {[70, 115, 160, 205, 250].map((r) => (
          <rect
            key={r}
            x={300 - r}
            y={300 - r}
            width={r * 2}
            height={r * 2}
            rx="32"
            stroke="currentColor"
            className="text-mauve"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

const metrics = [
  { value: "30K+", label: "Students taught" },
  { value: "8+", label: "Years in business" },
  { value: "85K+", label: "Community followers" },
];


const achievements = [
  { title: "Women Entrepreneur", subtitle: "of the year 2022" },
  { title: "85k+ Followers", subtitle: "on Instagram" },
  { title: "30k+ Students", subtitle: "enrolled in our paid courses" },
  { title: "15+ Courses", subtitle: "launched and More to come" },
];

export default function AboutMahek() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-5%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  
  const plate1Rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 5]);
  const plate1Y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  const plate2Rotate = useTransform(scrollYProgress, [0, 1], [2, -6]);
  const plate2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-mahek"
      className="relative py-28 md:py-40 bg-[#f7f5fc] border-t border-plum/[0.07] overflow-hidden"
    >
      <GrainTexture />
      <EditorialLinework />

      {/* Rich atmospheric color fields */}
      <div className="absolute top-10 left-[8%] w-[24rem] h-[24rem] bg-blush/35 rounded-full blur-[120px] opacity-80 pointer-events-none" />
      <div className="absolute bottom-16 right-[10%] w-[28rem] h-[28rem] bg-apricot/20 rounded-full blur-[130px] opacity-80 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[16rem] h-[34rem] bg-plum/[0.04] blur-[100px] pointer-events-none" />

      {/* Oversized ghost typography */}
      <motion.div
        style={{ y: ghostY }}
        className="absolute top-20 left-1/2 -translate-x-1/2 font-serif text-[18vw] leading-none tracking-[-0.08em] text-plum/[0.025] pointer-events-none select-none whitespace-nowrap z-[0]"
      >
        MAHEK
      </motion.div>

      <div className="max-w-[92rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Top editorial rail */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center gap-4"
          >
            <span className="text-[9px] font-mono text-mauve/45 tabular-nums">
              01
            </span>
            <div className="w-12 h-px bg-mauve/45" />
            <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-mauve font-sans">
              Meet the Founder
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold text-plum/45"
          >
            <span>Texture</span>
            <span className="w-1 h-1 rounded-full bg-mauve/40" />
            <span>Technique</span>
            <span className="w-1 h-1 rounded-full bg-mauve/40" />
            <span>Scale</span>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            MOBILE ONLY TITLE (Appears before everything on small screens)
            ═══════════════════════════════════════════════════════════ */}
        <div className="lg:hidden mb-12 text-center z-20">
          <div className="overflow-hidden pb-2">
            <h2
              className="font-serif text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] font-normal leading-[0.88] text-black tracking-[-0.04em] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{ transform: mounted ? "translateY(0)" : "translateY(105%)" }}
            >
              Where Science
            </h2>
          </div>
          <div className="overflow-hidden mt-1 md:mt-2 pb-2">
            <h2
              className="font-serif text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] font-normal leading-[0.88] tracking-[-0.04em] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                transform: mounted ? "translateY(0)" : "translateY(105%)",
                transitionDelay: "110ms",
              }}
            >
              <span className="italic text-plum">meets Six-Figure</span> <span className="text-black">Success.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16 xl:gap-x-24 items-center">
          {/* ═══════════════════════════════════════════════════════════
              LEFT: DENSE PREMIUM PORTRAIT COMPOSITION
              ═══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            {/* DESKTOP Title (hidden on mobile) */}
            <div className="hidden lg:block mb-10 text-left z-20">
              <div className="overflow-hidden pb-2">
                <h2
                  className="font-serif text-[3.15rem] sm:text-[4.2rem] md:text-[5.25rem] xl:text-[5.8rem] font-normal leading-[0.88] text-black tracking-[-0.04em] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{
                    transform: mounted ? "translateY(0)" : "translateY(105%)",
                  }}
                >
                  Where Science
                </h2>
              </div>
              <div className="overflow-hidden mt-1 md:mt-2 pb-2">
                <h2
                  className="font-serif text-[3.15rem] sm:text-[4.2rem] md:text-[5.25rem] xl:text-[5.8rem] font-normal leading-[0.88] tracking-[-0.04em] transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
                  style={{
                    transform: mounted ? "translateY(0)" : "translateY(105%)",
                    transitionDelay: "110ms",
                  }}
                >
                  <span className="italic text-plum">meets Six-Figure</span> <span className="text-black">Success.</span>
                </h2>
              </div>
            </div>

            <motion.div style={{ y: imageY }} className="relative max-w-[34rem] mx-auto lg:mx-0 group">
              {/* Back color plate */}
              <motion.div style={{ rotate: plate1Rotate, y: plate1Y }} className="absolute -inset-5 md:-inset-7 bg-plum/[0.035] rounded-[2rem]" />
              <motion.div style={{ rotate: plate2Rotate, y: plate2Y }} className="absolute -inset-3 md:-inset-4 bg-apricot/20 rounded-[2rem]" />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                className="relative bg-white p-3 md:p-4 shadow-[0_30px_80px_rgba(37,20,38,0.11)] border border-plum/[0.06] overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-plum/5">
                  <picture>
                    <source srcSet="/mahek-about.webp" type="image/webp" />
                    <motion.img
                      animate={{ scale: [1.03, 1.08, 1.03] }}
                      transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
                      src="/mahek-about.jpeg"
                      alt="Mahek Baldota, founder of Mumma's Cake"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale-[8%] contrast-[1.06] saturate-[1.05]"
                    />
                  </picture>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
                  
                  {/* Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none skew-x-12" />

                  {/* Corner frame lines */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-white/50 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-white/50 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-white/50 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-white/50 pointer-events-none" />
                </div>
              </motion.div>

              {/* Punchy stat slab */}
              <motion.div
                style={{ y: badgeY }}
                initial={{ opacity: 0, x: 30, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
                className="absolute right-0 sm:-right-2 md:-right-12 top-10 bg-plum text-cream px-5 py-5 md:px-6 md:py-6 shadow-[0_18px_45px_rgba(47,20,43,0.22)] max-w-[11rem]"
              >
                <p className="font-serif text-5xl leading-none italic text-apricot">
                  30K+
                </p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.24em] text-cream/75 leading-relaxed">
                  Bakers trained across the community
                </p>
              </motion.div>

              {/* Certificate proof tile */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.76, 0, 0.24, 1] }}
                className="absolute left-0 sm:-left-2 md:-left-8 bottom-10 bg-cream border border-plum/[0.08] shadow-[0_18px_50px_rgba(37,20,38,0.12)] p-3 w-[10rem]"
              >
                <div className="flex items-center gap-3">
                  <picture>
                    <source srcSet="/certificate.webp" type="image/webp" />
                    <img
                      src="/certificate.png"
                      alt="Certification badge"
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 object-contain mix-blend-multiply"
                    />
                  </picture>
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-mauve leading-none">
                      Certified
                    </p>
                    <p className="font-serif text-base italic text-plum leading-tight mt-1">
                      Mastery
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-px bg-plum/[0.08]" />
                <p className="mt-2 text-[9px] leading-relaxed text-plum/55 font-medium">
                  Structured curriculums for craft, pricing, production and brand scale.
                </p>
              </motion.div>

              {/* Vertical academy ribbon */}
              <div className="hidden md:block absolute -right-8 bottom-0 top-0 my-auto h-fit rotate-90 origin-center">
                <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-plum/25">
                  Mumma&apos;s Cake Academy
                </span>
              </div>
            </motion.div>

            {/* Signature strip moved below image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.46, ease: [0.76, 0, 0.24, 1] }}
              className="mt-10 text-center lg:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div>
                <p className="font-serif text-4xl md:text-5xl italic tracking-[-0.03em] text-plum leading-none">
                  Mahek Baldota
                </p>
                <p className="mt-3 text-[9px] uppercase tracking-[0.28em] text-mauve font-semibold font-sans">
                  Entrepreneur, Influencer & Instructor
                </p>
              </div>

              <div className="flex flex-col gap-3 mx-auto lg:mx-0 shrink-0 w-full sm:w-auto mt-6 sm:mt-0">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 border border-plum/[0.12] bg-plum/5 hover:bg-plum hover:text-cream text-plum px-5 py-4 transition-all duration-500 w-full"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em]">
                    @MummasCake
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 border border-plum/[0.12] bg-plum/5 hover:bg-plum hover:text-cream text-plum px-5 py-4 transition-all duration-500 w-full"
                >
                  <Youtube className="w-5 h-5" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em]">
                    @MummasCake
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT: RICH STORY, PROOF, PRINCIPLES
              ═══════════════════════════════════════════════════════════ */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 order-1 lg:order-2"
          >


            {/* Founder quote panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="relative mb-10 md:mb-12 bg-plum text-cream p-6 md:p-8 overflow-hidden shadow-[0_25px_70px_rgba(48,20,42,0.16)]"
            >
              {/* Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <filter id="quoteNoise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#quoteNoise)" />
                </svg>
              </div>

              <div className="absolute -right-10 -top-10 w-40 h-40 bg-apricot/25 rounded-full blur-[35px]" />
              <div className="absolute right-6 top-6 text-[8rem] leading-none font-serif text-cream/[0.04] pointer-events-none select-none">
                ”
              </div>

              <p className="relative font-serif text-2xl md:text-3xl italic leading-snug max-w-3xl">
                What started as my way to help my family financially has now become my mission to help other women do the same by learning skills that actually earn money.
              </p>

              <div className="relative mt-6 flex items-center gap-3">
                <span className="w-8 h-px bg-apricot/80" />
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-cream/60">
                  Founder&apos;s note
                </span>
              </div>
            </motion.div>

            {/* Body + metric proof rail */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_15rem] gap-8 xl:gap-10 mb-12 md:mb-14">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
                className="text-[14.5px] md:text-[15px] font-light text-black/62 leading-[1.85] font-sans space-y-5"
              >
                <p>
                  <span className="float-left font-serif text-[4.5rem] leading-[0.8] mr-3 text-plum">
                    W
                  </span>
                  ith years of experience in baking and food business, I&apos;ve helped thousands turn their passion of food into a profession and build profitable food businesses. As your mentor, I share my secrets, techniques, and tips to help you master recipes from your home and set up a successful venture.
                </p>

                <p>
                  With 8+ years of running my own food business and teaching 30K+ students through online classes, I&apos;ve built a community of 85K+ followers who trust my guidance. Now, I&apos;m on a mission to help you start and scale your food business with knowledge that works!
                </p>
              </motion.div>

              {/* Vertical metric slab */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="grid grid-cols-3 xl:grid-cols-1 border border-white/40 bg-white/30 backdrop-blur-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] overflow-hidden"
              >
                {metrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={`p-5 ${
                      index !== metrics.length - 1
                        ? "border-r xl:border-r-0 xl:border-b border-white/40"
                        : ""
                    }`}
                  >
                    <p className="font-serif text-3xl md:text-4xl italic text-plum leading-none">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.18em] text-mauve/70 leading-relaxed">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Achievements: dense, premium, non-generic */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.76, 0, 0.24, 1] }}
              className="relative bg-plum p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_15px_35px_rgba(47,20,43,0.15)] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            >
              {/* Luxury inset border */}
              <div className="absolute inset-2 md:inset-3 border border-cream/[0.12] rounded-[1.1rem] md:rounded-[1.4rem] pointer-events-none" />

              {achievements.map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-0">
                  <picture className="w-8 sm:w-10 lg:w-12 shrink-0 -scale-x-100 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] -mr-2 md:-mr-3">
                    <source srcSet="/bracket.webp" type="image/webp" />
                    <img src="/bracket.png" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                  </picture>
                  <div className="text-center px-0 relative z-10">
                    <h4 className="font-serif text-[1.05rem] md:text-[1.15rem] text-cream leading-tight mb-1 whitespace-nowrap">
                      {item.title}
                    </h4>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-cream/70 max-w-[12rem] mx-auto leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                  <picture className="w-8 sm:w-10 lg:w-12 shrink-0 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] -ml-2 md:-ml-3">
                    <source srcSet="/bracket.webp" type="image/webp" />
                    <img src="/bracket.png" alt="" aria-hidden="true" role="presentation" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                  </picture>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}