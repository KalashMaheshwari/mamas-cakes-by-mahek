import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Play, ArrowUpRight, Instagram } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════
   REEL DATA
   ═══════════════════════════════════════════════════════════════════════ */
interface ReelData {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  reelUrl: string;
}

const SHOWCASE_REELS: ReelData[] = [
  {
    id: "r-1",
    title: "Stable Whipping Cream",
    subtitle: "Fail-Proof Hack",
    thumbnail: "/thumbnails/r1.jpg",
    reelUrl: "https://www.instagram.com/p/DZzuQiwM7ib/",
  },
  {
    id: "r-2",
    title: "Chocolate Overload",
    subtitle: "Viral Cake Bowl",
    thumbnail: "/thumbnails/r2.jpg",
    reelUrl: "https://www.instagram.com/p/DZukJl6s8pt/",
  },
  {
    id: "r-3",
    title: "Homemade Icing Sugar",
    subtitle: "The Baker's Guide",
    thumbnail: "/thumbnails/r3.jpg",
    reelUrl: "https://www.instagram.com/p/DZr_XzdMeIm/",
  },
  {
    id: "r-4",
    title: "Mango Cake Bowl",
    subtitle: "Viral Recipe",
    thumbnail: "/thumbnails/r4.jpg",
    reelUrl: "https://www.instagram.com/p/DZpZelTMmFe/",
  },
  {
    id: "r-5",
    title: "Egg Replacements",
    subtitle: "Baking Essentials",
    thumbnail: "/thumbnails/r5.jpg",
    reelUrl: "https://www.instagram.com/p/DZm49ktsKrM/",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════════════ */
export default function CakeArtistryShowcase() {
  const galleryRef = React.useRef<HTMLDivElement>(null);

  /* ── Custom Cursor Logic ── */
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);

  const springConfig = { damping: 30, stiffness: 200 };
  const cx = useSpring(cursorX, springConfig);
  const cy = useSpring(cursorY, springConfig);
  const cs = useSpring(cursorScale, { damping: 20, stiffness: 300 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      const rect = galleryRef.current?.getBoundingClientRect();
      if (rect) {
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
      }
    },
    [cursorX, cursorY]
  );

  return (
    <section
      id="artistry-showcase"
      className="relative py-24 md:py-40 bg-[#F7F5FC] overflow-hidden"
    >
      {/* ── Structural background element ── */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F0EBF8] clip-path-slant hidden lg:block pointer-events-none" />
      <style>{`
        .clip-path-slant { clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%); }
      `}</style>

      <div className="max-w-[90rem] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
        {/* ═══════════ HEADER ═══════════ */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12 md:mb-20 border-b border-[#6B4FA0]/10 pb-8 md:pb-12">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-[#6B4FA0] mb-5"
            >
              04 — Studio Reels
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[3rem] md:text-[5.5rem] lg:text-[7rem] text-[#1E1B2E] leading-[0.85] tracking-[-0.03em]"
            >
              The Process
              <br />
              <span className="italic text-[#6B4FA0]">Behind the Craft.</span>
            </motion.h2>
          </div>

          <motion.a
            href="https://instagram.com/mummascake"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group flex items-center gap-3 px-6 py-3.5 bg-[#1E1B2E] text-white rounded-full hover:bg-[#6B4FA0] transition-colors duration-300 shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Follow @MummasCake
            </span>
            <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </motion.a>
        </div>

        {/* ═══════════ ACCORDION GALLERY ═══════════ */}
        <div
          ref={galleryRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => cursorScale.set(1)}
          onMouseLeave={() => cursorScale.set(0)}
          className="relative hidden md:flex flex-row items-stretch h-[75vh] gap-3 cursor-none"
        >
          {/* Custom Cursor */}
          <motion.div
            style={{ x: cx, y: cy, scale: cs }}
            className="absolute top-0 left-0 w-20 h-20 rounded-full bg-violet-600 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-violet-900/30"
          >
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </motion.div>

          {SHOWCASE_REELS.map((reel, index) => (
            <DesktopReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        {/* ═══════════ MOBILE GALLERY ═══════════ */}
        <div className="flex flex-col gap-5 md:hidden">
          {SHOWCASE_REELS.map((reel, index) => (
            <MobileReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        {/* ═══════════ FOOTER LINE ═══════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 md:mt-24 flex items-center justify-between text-[#6B4FA0]/40"
        >
          <div className="h-px flex-1 bg-[#6B4FA0]/10 mr-6" />
          <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
            © MummasCake Studio
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   DESKTOP ACCORDION CARD — The premium interaction
   ═══════════════════════════════════════════════════════════════════════ */
function DesktopReelCard({
  reel,
  index,
}: {
  reel: ReelData;
  index: number;
  key?: React.Key;
}) {
  return (
    <motion.a
      href={reel.reelUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex-1 hover:flex-[3] min-w-[70px] rounded-2xl overflow-hidden cursor-pointer
                 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      {/* Image Container */}
      <div className="absolute inset-0 bg-[#1E1B2E]">
        <picture>
          <source srcSet={reel.thumbnail.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
          <img
            src={reel.thumbnail}
            alt={reel.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </picture>
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B2E] via-[#1E1B2E]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

      {/* Closed State Number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-white/10 font-serif text-[8rem] leading-none transition-all duration-500 group-hover:opacity-0 group-hover:scale-50">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content Reveal */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#A89CC8]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A89CC8]">
            Watch Reel
          </span>
        </div>
        <h3 className="font-serif text-2xl lg:text-3xl text-white leading-tight mb-1">
          {reel.title}
        </h3>
        <p className="font-sans text-sm text-white/60">{reel.subtitle}</p>

        {/* Play Button */}
        <div className="mt-5 flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#6B4FA0] transition-all duration-300">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 delay-200">
            Play Now
          </span>
        </div>
      </div>

      {/* Border Treatment */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.05] group-hover:border-[#6B4FA0]/30 transition-colors duration-700 pointer-events-none z-20" />
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MOBILE CARD — Clean, editorial vertical stack
   ═══════════════════════════════════════════════════════════════════════ */
function MobileReelCard({
  reel,
  index,
}: {
  reel: ReelData;
  index: number;
  key?: React.Key;
}) {
  return (
    <motion.a
      href={reel.reelUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-[#1E1B2E]"
    >
      <picture>
        <source srcSet={reel.thumbnail.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
        <img
          src={reel.thumbnail}
          alt={reel.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B2E] via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#6B4FA0]" />
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#A89CC8]">
            0{index + 1} — Watch Reel
          </span>
        </div>
        <h3 className="font-serif text-2xl text-white leading-tight">
          {reel.title}
        </h3>
        <p className="font-sans text-sm text-white/50 mt-1">{reel.subtitle}</p>
      </div>
    </motion.a>
  );
}