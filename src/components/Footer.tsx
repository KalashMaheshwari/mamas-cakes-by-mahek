import React from "react";
import { Instagram, Youtube, ArrowUp, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Why Us", id: "why-choose-us" },
  { label: "Academy", id: "academy" },
  { label: "Artistry", id: "artistry-showcase" },
  { label: "Founder", id: "about-mahek" },
  { label: "Reviews", id: "reviews" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Refund Policy", href: "/refunds" },
  { label: "Shipping", href: "/shipping" },
];

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#632357] text-[#F5EDE3] select-none mt-12">
      {/* ─── The Architectural Fold ─── */}
      {/* This slanted overlay creates a physical "page turn" effect transitioning into the footer */}
      <div
        className="absolute -top-[40px] left-0 w-full h-[80px] bg-[#632357] origin-top-left"
        style={{ transform: "skewY(-1.2deg)", zIndex: 1 }}
        aria-hidden="true"
      />
      
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── Footer Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-8">
        
        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 pb-10 border-b border-[#F5EDE3]/20">
          
          {/* ─── Brand + Micro CTA ─── */}
          <div className="col-span-2 md:col-span-4 flex flex-col justify-between">
            <div>
              {/* Kerning Explosion Hover - Ultra Premium Detail */}
              <a 
                href="#top" 
                onClick={(e) => { e.preventDefault(); handleScrollTop(); }}
                className="group flex items-center gap-4 origin-left"
              >
                <picture>
                  <source srcSet="/mahek-logo.webp" type="image/webp" />
                  <img 
                    src="/mahek-logo.png" 
                    alt="Mumma's Cake Logo" 
                    className="w-14 h-14 md:w-16 md:h-16 object-contain" 
                  />
                </picture>
                <div>
                  <h3 className="font-display font-bold text-3xl md:text-4xl tracking-normal group-hover:tracking-[0.1em] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    Mumma's Cake
                  </h3>
                  <span className="block text-[9px] font-mono uppercase tracking-[0.3em] text-[#C9A96E]/70 mt-1 group-hover:tracking-[0.4em] transition-all duration-700 delay-75">
                    by Mahek Baldota
                  </span>
                </div>
              </a>
              
              <p className="mt-5 text-[12px] text-[#F5EDE3]/70 leading-relaxed max-w-[30ch] font-light">
                Premium culinary academy & artisan bakery for ambitious food entrepreneurs.
              </p>
            </div>

            {/* Socials - Substantial and attention grabber */}
            <div className="flex items-center gap-4 mt-12 md:mt-16">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="group/social flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F5EDE3]/10 border border-[#F5EDE3]/20 text-[#F5EDE3]/90 hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-[#632357] transition-all duration-300 shadow-sm hover:-translate-y-1">
                <Instagram className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="group/social flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F5EDE3]/10 border border-[#F5EDE3]/20 text-[#F5EDE3]/90 hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-[#632357] transition-all duration-300 shadow-sm hover:-translate-y-1">
                <Youtube className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">YouTube</span>
              </a>
            </div>
          </div>

          {/* ─── Navigation ─── */}
          <div className="md:col-span-2 md:col-start-6">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#C9A96E]/70 font-bold block mb-4">
              Navigate
            </span>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className="group flex items-center gap-2 text-left text-[12px] text-[#F5EDE3]/70 hover:text-[#F5EDE3] transition-colors duration-300 w-fit cursor-pointer"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-[#C9A96E] transition-all duration-300 ease-out" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* ─── Legals ─── */}
          <div className="md:col-span-2">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#C9A96E]/70 font-bold block mb-4">
              Legal
            </span>
            <nav className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-2 text-[12px] text-[#F5EDE3]/70 hover:text-[#F5EDE3] transition-colors duration-300 w-fit"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-[#C9A96E] transition-all duration-300 ease-out" />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* ─── Headquarters (Coordinates Style) ─── */}
          <div className="md:col-span-3">
            <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#C9A96E]/70 font-bold block mb-4">
              HQ
            </span>
            {/* Lat/Long format - Design forward, architectural feel */}
            <div className="space-y-2">
              <p className="text-[11px] font-mono text-[#F5EDE3]/60 tracking-wider">
                19.0596° N, 72.8295° E
              </p>
              <p className="text-[12px] text-[#F5EDE3]/80 leading-relaxed font-light">
                Mumma's Cake Studio<br/>
                Hill Road, Bandra West<br/>
                Mumbai, IN 400050
              </p>
              <span className="inline-flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em] text-[#C9A96E]/60 font-mono mt-1">
                <span className="w-1 h-1 rotate-45 bg-[#C9A96E]/60" />
                Invite Only
              </span>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#F5EDE3]/50 font-mono tracking-wider text-center sm:text-left">
            © 2026 MUMMA'S CAKE STUDIO. ALL RIGHTS RESERVED.
          </p>

          {/* Scroll to Top - Minimalist line & arrow */}
          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#F5EDE3]/50 group-hover:text-[#C9A96E]/80 transition-colors duration-300">
              Top
            </span>
            <span className="relative flex items-center justify-center w-6 h-6 border border-[#F5EDE3]/20 group-hover:border-[#C9A96E]/40 rounded-full transition-all duration-500 group-hover:-translate-y-0.5">
              <ArrowUp className="w-2.5 h-2.5 text-[#F5EDE3]/50 group-hover:text-[#C9A96E] transition-colors duration-300" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}