import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, ArrowUpRight, BadgeCheck } from "lucide-react";
import { Testimonial } from "../types";

import { REVIEWS } from "../data/testimonials";

/* ═══════════════════════════════════════════════════════════════════════
   GRAIN TEXTURE
   ═══════════════════════════════════════════════════════════════════════ */
function GrainTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-multiply overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="testimonialsGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#testimonialsGrain)" />
      </svg>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-28 md:py-48 bg-[#f7f5fc] border-t border-plum/[0.06] overflow-hidden"
    >
      <GrainTexture />

      {/* Atmospheric Blurs */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-0 w-[60rem] h-[60rem] bg-blush/20 rounded-full filter blur-[150px] pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-mauve/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* ═══════════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-span-8 lg:col-span-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[9px] font-mono text-mauve/40 tabular-nums">03</span>
              <div className="w-8 h-px bg-mauve/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mauve font-sans">
                Alumnae Success
              </span>
            </div>
            <h2 className="font-serif text-[2.75rem] sm:text-[5rem] md:text-[6rem] font-normal leading-[0.9] text-black tracking-[-0.02em]">
              Proof in
              <br />
              <span className="italic text-plum/80">the Batter.</span>
            </h2>
          </div>

          <div className="md:col-span-4 lg:col-span-6 flex items-end">
            <div className="border-l-2 border-plum/10 pl-6 md:pl-10 max-w-md">
              <p className="text-[13px] md:text-sm font-light text-black/50 leading-relaxed">
                From kitchen hobbyists to thriving boutique owners. Real metrics from real students who mastered the craft.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BENTO GRID (Curated Layout)
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Featured Large Card (Spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-2 lg:row-span-2 relative bg-plum text-cream rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-10 -translate-y-10" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-mauve/10 rounded-full -translate-x-20 translate-y-20" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 opacity-70">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Featured Story</span>
              </div>
              <p className="font-serif text-2xl md:text-3xl leading-snug mb-8 relative z-10">
                "{REVIEWS[0].quote}"
              </p>
            </div>

            <div className="relative z-10 mt-auto border-t border-white/10 pt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl md:text-6xl font-serif text-apricot leading-none mb-1">
                    {REVIEWS[0].achievement.split(" ")[0]}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/50">
                    {REVIEWS[0].achievement.split(" ").slice(1).join(" ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-lg">{REVIEWS[0].studentName}</p>
                  <p className="text-[11px] text-cream/60">{REVIEWS[0].businessName}</p>
                </div>
              </div>
            </div>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Standard Cards */}
          {REVIEWS.slice(1, 5).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * (index + 1), ease: [0.76, 0, 0.24, 1] }}
              className="relative bg-white border border-plum/[0.06] rounded-2xl p-6 flex flex-col justify-between group cursor-pointer hover:border-plum/20 transition-colors duration-500"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-apricot fill-apricot" />
                  ))}
                </div>
                <p className="text-sm font-light text-black/70 leading-relaxed mb-6 line-clamp-4">
                  "{review.quote}"
                </p>
              </div>
              
              <div className="mt-auto">
                <div className="h-px bg-plum/10 mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-base text-plum">{review.studentName}</p>
                    <p className="text-[10px] text-mauve/70 truncate max-w-[120px]">{review.businessName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-lg text-plum font-bold">{review.achievement.split(" ")[0]}</span>
                    <span className="block text-[8px] uppercase tracking-wider text-mauve/50">{review.achievement.split(" ").slice(1).join(" ")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Wide Metric Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="lg:col-span-2 relative bg-apricot/10 border border-apricot/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#80173F]/70">Volume Success</span>
                <ArrowUpRight className="w-4 h-4 text-[#80173F]/40" />
             </div>
             <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs font-light text-[#80173F]/60 leading-relaxed max-w-xs">
                        "The concrete texturing courses are unbelievably detailed. Truly game-changing for my business."
                    </p>
                </div>
                <div className="text-right">
                    <p className="font-serif text-4xl text-[#80173F] leading-none">30,000+</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#80173F]/50 mt-1">Students Globally</p>
                </div>
             </div>
          </motion.div>

          {/* Minimalist Card 1 */}
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="relative bg-blush/10 border border-blush/10 rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
          >
            <p className="text-sm font-light text-plum/80 leading-relaxed mb-4">
                "Clients keep telling me my sponge is the absolute most velvety they have ever tasted."
            </p>
            <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-plum">Kavita Sen</span>
                <span className="text-xs font-mono text-mauve font-bold">48hr Waitlist</span>
            </div>
          </motion.div>

          {/* Minimalist Card 2 */}
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="relative bg-white border border-plum/[0.06] rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
          >
            <p className="text-sm font-light text-plum/80 leading-relaxed mb-4">
                "These recipes deliver perfect spring rate and velvet core hydration in egg-free sponges."
            </p>
            <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-plum">Riya Fernandez</span>
                <span className="text-xs font-mono text-mauve font-bold">Sold Out</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
} 