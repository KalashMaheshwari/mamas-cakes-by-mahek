import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { Clock, Users, Star, Check, ArrowRight, X, ArrowUpRight } from "lucide-react";
import { Course } from "../types";
import { ACADEMY_COURSES } from "../data/courses";

/* ═══════════════════════════════════════════════════════════════════════
   GRAIN TEXTURE
   ═══════════════════════════════════════════════════════════════════════ */
function GrainTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.028] mix-blend-multiply overflow-hidden">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grainNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainNoise)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   INFINITE MARQUEE
   ═══════════════════════════════════════════════════════════════════════ */
function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-5 border-y border-plum/[0.06] mb-14 md:mb-20 select-none flex">
      <style>{`
        @keyframes courses-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-courses-marquee {
          animation: courses-marquee 25s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-courses-marquee {
            animation: courses-marquee 15s linear infinite;
          }
        }
      `}</style>
      <div className="flex w-max animate-courses-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 mx-5 shrink-0">
            <span className="font-serif text-lg text-plum/40">{item}</span>
            <span className="w-1.5 h-1.5 bg-plum/30 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PREMIUM COURSE CARD
   ═══════════════════════════════════════════════════════════════════════ */
interface CourseCardProps {
  key?: React.Key;
  course: Course;
  globalIndex: number;
  onClick: () => void;
}

function CourseCard({ course, globalIndex, onClick }: CourseCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      {/* ── Hover Background ── */}
      <div className="absolute -inset-5 bg-plum rounded-[20px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] scale-95 group-hover:scale-100 z-0 pointer-events-none shadow-[0_8px_30px_rgba(88,28,72,0.15)]" />

      <div className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1.5">
        {/* ── Image ── */}
        <div className="relative overflow-hidden rounded-sm mb-5 aspect-[4/3] z-[2] shadow-[0_2px_20px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-700">
          <picture>
            <source srcSet={course.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
            <img
              src={course.image}
              alt={course.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)]"
            />
          </picture>
          <div className="absolute inset-0 bg-plum/0 group-hover:bg-black/[0.08] transition-colors duration-700" />

          {/* Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-2.5 py-1 bg-white/[0.92] backdrop-blur-sm text-[8px] font-bold uppercase tracking-[0.15em] text-plum group-hover:bg-cream group-hover:text-plum transition-colors duration-500">
              {course.tag}
            </span>
          </div>

          {/* Arrow peek */}
          <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="w-8 h-8 rounded-full bg-cream/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5 text-plum" />
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="relative z-[2] pl-0.5">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-mauve group-hover:text-cream/70 transition-colors duration-500">
              {course.category}
            </span>
            <span className="w-3 h-px bg-mauve/25 group-hover:bg-cream/25 transition-colors duration-500" />
            <div className="flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-plum fill-plum group-hover:text-cream group-hover:fill-cream group-hover:rotate-12 transition-all duration-500" />
              <span className="text-[10px] font-semibold text-plum/60 group-hover:text-cream/90 font-sans transition-colors duration-500">
                {course.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <h3 className="font-serif text-[1.3rem] font-normal leading-snug text-black group-hover:text-cream transition-colors duration-500 mb-4 line-clamp-2 min-h-[2.6rem]">
            {course.title}
          </h3>

          {/* Accent line that grows on hover */}
          <div className="relative h-px mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-plum/[0.06] group-hover:from-cream/[0.15] to-transparent transition-colors duration-500" />
            <div className="absolute inset-y-0 left-0 bg-plum/30 group-hover:bg-cream/40 w-0 group-hover:w-2/3 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl italic text-black group-hover:text-cream transition-colors duration-500 leading-none">
                {course.price}
              </span>
              {course.originalPrice && (
                <span className="text-sm font-medium text-black/30 group-hover:text-cream/50 transition-colors duration-500 line-through font-sans">
                  {course.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-plum/40 group-hover:text-cream/90 transition-colors duration-500 flex items-center gap-1">
              Details
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COURSES COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const uniqueCategories = Array.from(
    new Set(ACADEMY_COURSES.map((c) => c.category))
  );
  const categories = ["All", ...uniqueCategories];

  const filteredCourses =
    selectedCategory === "All"
      ? ACADEMY_COURSES
      : ACADEMY_COURSES.filter((c) => c.category === selectedCategory);

  const handleEnroll = () => {
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
      setActiveCourse(null);
    }, 4500);
  };

  useEffect(() => {
    document.body.style.overflow = activeCourse ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCourse]);

  return (
    <section
      ref={sectionRef}
      id="academy"
      className="relative py-28 md:py-40 bg-[#f7f5fc] border-t border-plum/[0.06] overflow-hidden"
    >
      <GrainTexture />

      {/* Atmospheric depth blurs */}
      <motion.div
        style={{ y: parallaxSlow }}
        className="absolute top-20 right-[8%] w-72 h-72 rounded-full bg-plum/[0.015] blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: parallaxFast }}
        className="absolute bottom-40 left-[5%] w-56 h-56 rounded-full bg-mauve/[0.03] blur-[80px] pointer-events-none"
      />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* ═══════════════════════════════════════════════════════════
            HEADER
            ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-8 items-end mb-10 md:mb-14">
          <div className="md:col-span-7 lg:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-mauve/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-mauve font-sans">
                Academy
              </span>
            </div>

            <div className="overflow-hidden mb-1 pb-2">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-normal leading-none text-black tracking-[-0.02em]"
              >
                Master the Craft
              </motion.h2>
            </div>
            <div className="overflow-hidden pb-4">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
                className="font-serif text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-normal leading-none tracking-[-0.02em] italic text-plum/80"
              >
                of Business
              </motion.h2>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start md:items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
              className="text-[13px] font-light text-black/50 max-w-[30ch] font-sans text-left md:text-right leading-relaxed mb-8"
            >
              Providing 30,000+ chefs, entrepreneurs, and hobbyists with
              detailed science-based formulas to scale profitable cake
              businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
              className="flex items-baseline gap-3"
            >
              <span className="font-serif text-6xl md:text-7xl font-normal text-plum/70 leading-none tracking-tight">
                {ACADEMY_COURSES.length}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-mauve leading-none">
                  Courses
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-mauve/50 leading-none">
                  Available
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            MARQUEE
            ═══════════════════════════════════════════════════════════ */}
        <div className="-mx-6 md:-mx-12 lg:-mx-20">
          <Marquee items={ACADEMY_COURSES.map((c) => c.title)} />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FILTER + GRID
            ═══════════════════════════════════════════════════════════ */}
        <div className="flex gap-10 lg:gap-14">
          {/* ── Desktop: Sticky Side Filter ── */}
          <div className="hidden lg:block w-44 shrink-0">
            <div className="sticky top-28">
              <div className="mb-5">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-mauve/50 font-sans">
                  Filter by
                </span>
              </div>
              <ul className="space-y-0.5">
                {categories.map((category, i) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left py-2.5 pl-4 pr-3 transition-all duration-300 cursor-pointer border-l-2 rounded-r-sm ${
                        selectedCategory === category
                          ? "border-plum bg-plum/[0.04] text-plum font-semibold"
                          : "border-transparent text-black/30 hover:text-black/60 hover:border-plum/15 hover:bg-plum/[0.015] font-medium"
                      }`}
                    >
                      <span className="text-[9px] text-mauve/35 mr-2 font-mono tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[12px] tracking-wide">
                        {category}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-plum/[0.06]">
                <span className="font-serif text-4xl text-plum/50 leading-none">
                  {filteredCourses.length}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-mauve/45 mt-1.5">
                  {filteredCourses.length === 1 ? "Course" : "Courses"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Main Content Area ── */}
          <div className="flex-1 min-w-0">
            {/* Mobile/Tablet: Horizontal Filter */}
            <div className="lg:hidden mb-12">
              <div className="flex items-center gap-0 overflow-x-auto pb-2 border-b border-plum/[0.06]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="relative px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap cursor-pointer transition-colors duration-300 shrink-0"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        selectedCategory === category
                          ? "text-plum"
                          : "text-black/30 hover:text-black/55"
                      }`}
                    >
                      {category}
                    </span>
                    {selectedCategory === category && (
                      <motion.div
                        layoutId="mobileFilter"
                        className="absolute bottom-0 left-4 right-4 h-[2px] bg-plum"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-mauve/50 font-sans">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1 ? "course" : "courses"}
                </span>
              </div>
            </div>

            {/* ── Course Grid ── */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-20"
            >
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course) => {
                  const globalIndex = ACADEMY_COURSES.findIndex(
                    (c) => c.id === course.id
                  );
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      globalIndex={globalIndex}
                      onClick={() => setActiveCourse(course)}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="mt-28 h-px bg-gradient-to-r from-transparent via-plum/[0.12] to-transparent origin-center"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          COURSE DETAIL DRAWER
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeCourse && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setActiveCourse(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative w-full max-w-[52rem] bg-white h-full flex flex-col md:flex-row z-10 shadow-[0_0_80px_rgba(0,0,0,0.12)]"
            >
              {/* ── Left: Image Panel ── */}
              <div className="hidden md:flex w-[45%] h-full relative flex-col">
                <motion.div
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="flex-1 relative overflow-hidden"
                >
                  <picture>
                    <source srcSet={activeCourse.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
                    <img
                      src={activeCourse.image}
                      alt={activeCourse.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </motion.div>

                <div className="absolute bottom-10 left-8 right-8 text-white z-10">
                  <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md text-[8px] font-bold uppercase tracking-[0.15em] rounded-full mb-5">
                    {activeCourse.tag}
                  </span>
                  <h4 className="font-serif text-3xl leading-snug mb-3">
                    {activeCourse.title}
                  </h4>
                  <div className="flex items-center gap-4 text-[12px] font-light text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {activeCourse.duration}
                    </span>
                    <span className="w-1 h-1 bg-white/35 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />{" "}
                      {activeCourse.studentsCount}
                    </span>
                    <span className="w-1 h-1 bg-white/35 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white/70 text-white/70" />{" "}
                      {activeCourse.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Right: Content Panel ── */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto relative flex flex-col">
                {/* Close */}
                <button
                  onClick={() => setActiveCourse(null)}
                  className="absolute top-6 right-6 p-2.5 bg-black/[0.03] hover:bg-black/[0.07] text-black/50 hover:text-black/80 rounded-full transition-all duration-300 z-20 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {purchaseSuccess ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-20 h-20 rounded-full bg-plum/[0.05] flex items-center justify-center mb-8"
                    >
                      <Check className="w-8 h-8 text-plum" strokeWidth={2.5} />
                    </motion.div>
                    <h4 className="font-serif text-3xl font-normal text-plum mb-3">
                      Registration Confirmed!
                    </h4>
                    <p className="text-[13px] font-light text-plum/55 max-w-sm mb-8 font-sans leading-relaxed">
                      A personalized onboarding email containing your login,
                      recipe materials, and schedules is on its way.
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-mauve font-semibold font-sans">
                      Welcome to Mumma's Academy
                    </span>
                  </div>
                ) : (
                  <div className="p-8 md:p-12 flex-1 flex flex-col">
                    {/* Mobile image */}
                    <div className="md:hidden mb-8">
                      <div className="aspect-[16/9] w-full rounded-sm overflow-hidden mb-5 relative">
                        <picture>
                          <source srcSet={activeCourse.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')} type="image/webp" />
                          <img
                            src={activeCourse.image}
                            alt={activeCourse.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </picture>
                        <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-plum">
                          {activeCourse.tag}
                        </div>
                      </div>
                      <h4 className="font-serif text-2xl text-black mb-3">
                        {activeCourse.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] font-semibold text-plum/60">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {activeCourse.duration}
                        </span>
                        <span className="w-1 h-1 bg-plum/15 rounded-full" />
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />{" "}
                          {activeCourse.studentsCount}
                        </span>
                      </div>
                    </div>

                    {/* Desktop: Category + Rating */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="hidden md:block mb-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-mauve">
                          {activeCourse.category}
                        </span>
                        <span className="w-3 h-px bg-mauve/25" />
                        <div className="flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 text-plum fill-plum" />
                          <span className="text-[10px] font-semibold text-plum/55">
                            {activeCourse.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* About */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="mb-10"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-5 h-px bg-plum/15" />
                        <h5 className="text-[10px] uppercase tracking-[0.2em] text-mauve font-bold font-sans">
                          About Masterclass
                        </h5>
                      </div>
                      <p className="text-[13.5px] font-light text-black/60 leading-[1.8] font-sans">
                        {activeCourse.description}
                      </p>
                    </motion.div>

                    {/* Syllabus */}
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mb-10 flex-1"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-5 h-px bg-plum/15" />
                        <h5 className="text-[10px] uppercase tracking-[0.2em] text-mauve font-bold font-sans">
                          What You Will Master
                        </h5>
                      </div>

                      <ul className="relative">
                        <div className="absolute left-[9px] top-3 bottom-3 w-px bg-plum/[0.07]" />
                        {activeCourse.syllabus.map((item, index) => (
                          <motion.li
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.55 + index * 0.07,
                              duration: 0.5,
                              ease: [0.76, 0, 0.24, 1],
                            }}
                            key={index}
                            className="flex items-start gap-3 py-2.5 relative"
                          >
                            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-plum/20 bg-white flex items-center justify-center shrink-0 mt-0.5 z-10">
                              <div className="w-[5px] h-[5px] rounded-full bg-plum/40" />
                            </div>
                            <span className="text-[12.5px] font-medium text-black/70 leading-snug pt-px">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* CTA */}
                    <div className="mt-auto pt-8 border-t border-plum/[0.06] sticky bottom-0 bg-white/95 backdrop-blur-sm pb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] text-mauve/55 font-semibold font-sans block mb-1.5">
                            Special Price
                          </span>
                          <div className="flex items-baseline gap-2.5">
                            <span className="font-serif text-3xl font-normal text-plum italic leading-none">
                              {activeCourse.price}
                            </span>
                            {activeCourse.originalPrice && (
                              <span className="font-serif text-xl font-medium text-plum/30 line-through leading-none">
                                {activeCourse.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={handleEnroll}
                          className="group/btn relative overflow-hidden bg-plum text-cream px-8 py-4 cursor-pointer rounded-full shadow-[0_8px_30px_rgba(88,28,72,0.18)] hover:shadow-[0_12px_40px_rgba(88,28,72,0.28)] transition-shadow duration-500"
                        >
                          <span className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.12em]">
                            Enroll Now
                          </span>
                          <div className="absolute inset-0 bg-mauve origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}