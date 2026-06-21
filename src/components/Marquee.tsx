/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface MarqueeProps {
  reverse?: boolean;
}

export default function Marquee({ reverse = false }: MarqueeProps) {
  const words = [
    "30,000+ STUDENTS ENROLLED",
    "85K+ ACTIVE INSTAGRAM COMMUNITY",
    "15+ PROVEN MASTERCLASSES",
    "LIFETIME ACCESS & UPDATES",
    "100% SUCCESS BUSINESS BLUEPRINT",
    "VIRAL LOCAL CAKES DAILY",
  ];

  // Concatenate multiple times to cover horizontal overflow and support smooth looping
  const duplicatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full bg-plum py-6 overflow-hidden border-y border-cream/10 z-20 relative select-none">
      <div
        className={`flex whitespace-nowrap items-center ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ width: "max-content" }}
      >
        {duplicatedWords.map((word, index) => (
          <div key={index} className="flex items-center mx-4 md:mx-6">
            <span className="font-sans text-xs md:text-sm font-bold tracking-[0.25em] text-cream">
              {word}
            </span>
            <span className="text-mauve text-lg sm:text-xl font-light ml-8 md:ml-12 select-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
