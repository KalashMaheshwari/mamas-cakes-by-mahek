import React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Command, MessageSquare, Users, DollarSign, Key, ArrowRight } from "lucide-react";

interface PerkData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  span: string; // Tailwind grid column span classes
}

const PERKS: PerkData[] = [
  {
    id: "p-1",
    title: "Lifetime Access",
    description: "Revisit modules and perfect your craft at your absolute own pace. No arbitrary expiration dates, ever.",
    icon: Command,
    span: "lg:col-span-2 md:col-span-3 col-span-1",
  },
  {
    id: "p-2",
    title: "WhatsApp Support",
    description: "Reach out directly for bespoke troubleshooting. Never feel stuck on a recipe again.",
    icon: MessageSquare,
    span: "lg:col-span-2 md:col-span-3 col-span-1",
  },
  {
    id: "p-3",
    title: "Strong Community",
    description: "A supportive network of ambitious food entrepreneurs to share wins and build powerful connections.",
    icon: Users,
    span: "lg:col-span-2 md:col-span-6 col-span-1",
  },
  {
    id: "p-4",
    title: "Affordable",
    description: "Premium masterclass production without the exorbitant, gate-kept price tags of traditional schools.",
    icon: DollarSign,
    span: "lg:col-span-3 md:col-span-6 col-span-1",
  },
  {
    id: "p-5",
    title: "Access to Everything",
    description: "From exact chemical spreadsheets to overarching marketing strategies to scale your business.",
    icon: Key,
    span: "lg:col-span-3 md:col-span-6 col-span-1",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   THE SPOTLIGHT BENTO CARD
   ═══════════════════════════════════════════════════════════════════════ */
function SpotlightCard({
  perk,
  index,
}: {
  perk: PerkData;
  index: number;
  key?: React.Key;
}) {
  const Icon = perk.icon;
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Motion values for the spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the light movement
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  // Opacity for the spotlight
  const opacity = useMotionValue(0);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = React.useCallback(() => {
    opacity.set(1);
  }, [opacity]);

  const handleMouseLeave = React.useCallback(() => {
    opacity.set(0);
  }, [opacity]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-[2rem] bg-[#310F28] border border-white/10 p-8 md:p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/30 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] min-h-[280px] md:min-h-[300px] ${perk.span}`}
    >
      {/* ── The Reactive Spotlight (Bright white glow on hover) ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: opacity,
          background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.12), transparent 40%)`,
        }}
      />

      {/* ── Magical Tracking Border ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] transition-opacity duration-300"
        style={{
          opacity: opacity,
          background: `radial-gradient(300px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.8), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px", // Thickness of the magical border
        }}
      />

      {/* ── Massive Animated Watermark Icon (Bottom Right) ── */}
      <div className="absolute -bottom-8 -right-8 pointer-events-none select-none z-0">
        <motion.div
          initial={false}
          animate={{ scale: 1.1, rotate: 10, opacity: 0.03 }}
          whileHover={{ scale: 1.5, rotate: -5, opacity: 0.12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon className="w-48 h-48 md:w-64 md:h-64 text-white" strokeWidth={0.5} />
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end pt-12">
        
        {/* Editorial Chapter Number */}
        <div className="flex items-center gap-6 mb-8 w-full absolute top-0 left-0">
          <span className="font-serif text-3xl md:text-4xl text-white/60 group-hover:text-white transition-colors duration-500">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="h-[1px] w-4 group-hover:w-[calc(100%-4rem)] bg-white/20 group-hover:bg-[#E0D4F5] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </div>

        <div className="pt-16">
          {/* Title */}
          <h3 className="font-serif text-3xl md:text-4xl text-white leading-[1.1] tracking-wide mb-5 group-hover:text-[#F0EBF8] group-hover:-translate-y-1 transition-all duration-500">
            {perk.title}
          </h3>
        </div>

        {/* Description */}
        <div className="relative">
          <motion.div 
            className="max-w-md transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
          >
            <p className="font-sans text-sm md:text-base text-white/50 group-hover:text-white/95 transition-colors duration-500 leading-relaxed font-light">
              {perk.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════════════ */
export default function WhyChooseUs() {
  return (
    <section 
      id="why-choose-us" 
      className="py-24 md:py-32 bg-[#f7f5fc] overflow-hidden"
    >
      <div className="max-w-[85rem] mx-auto px-5 md:px-10 relative z-10">
        
        {/* ═══════════ HEADER ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-[#632357] mb-5 font-bold">
            The Atelier Standard
          </span>
          <h2 className="font-serif text-[3.5rem] md:text-[5rem] text-[#1E1B2E] leading-none tracking-[-0.03em] mb-4">
            Why Choose Us
          </h2>
          <p className="font-sans text-[#1E1B2E]/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Perks like never before. An unparalleled, premium learning experience designed explicitly for your success.
          </p>
        </motion.div>

        {/* ═══════════ BENTO SPOTLIGHT GRID ═══════════ */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-4 md:gap-5">
          {PERKS.map((perk, index) => (
            <SpotlightCard key={perk.id} perk={perk} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}