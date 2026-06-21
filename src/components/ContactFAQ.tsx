import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Send, Check } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const ACADEMY_FAQs: FAQItem[] = [
  {
    question: "Are the academy classes live or pre-recorded?",
    answer:
      "All masterclasses are filmed in exquisite, professional-grade 4K resolution. This means you can study, pause, and master complex palette knife steps at your own pace. You also receive lifetime access to all updates, plus participation privileges in monthly live critique circles hosted by Mahek.",
  },
  {
    question: "Do you offer physical kits with the masterclasses?",
    answer:
      "Yes! Advanced programs like the 'Wedding Cake Engineering' class include physical ingredient-sourcing directories, structural dowel rigs, and high-quality stainless palette scrapers shipped straight to your doorstep. Standard courses contain fully hyperlinked shopping sheets.",
  },
  {
    question: "Are there non-egg or gluten-free options available?",
    answer:
      "Absolutely. Science is at the heart of Mumma's Cake. We include complete eggless, gluten-free, and vegan chemical percentage spreadsheets for all major recipes, engineered carefully to retain pristine sponge structure, crumb elasticity, and moisture content.",
  },
  {
    question: "How does local custom cake pick-up operate?",
    answer:
      "All catalog and custom bakery products require 48 hours notice for baking, stabilizing, and sculpting. Pickups are carefully scheduled from our private pastry workspace in Mumbai. We provide secure carrier platforms to guarantee your cake travels safely.",
  },
];

const INQUIRY_TYPES = [
  "Academy Enrollment",
  "Bespoke Cake Orders",
  "Corporate Consulting",
  "Media & Partnerships",
];

export default function ContactFAQ() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);
  const [selectedInquiry, setSelectedInquiry] = useState(INQUIRY_TYPES[0]);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setContactSubmitted(true);
    }, 1500);
  };

  return (
    <section id="faq" className="relative py-28 md:py-40 bg-[#F7F5FC] overflow-hidden">
      {/* Structural Background Diagonal */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#F0EBF8] clip-diagonal-left pointer-events-none hidden lg:block" />
      <style>{`
        .clip-diagonal-left { clip-path: polygon(0 0, 55% 0, 40% 100%, 0% 100%); }
      `}</style>

      <div className="max-w-[90rem] mx-auto px-5 md:px-10 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ═══════════ LEFT: EDITORIAL FAQ ═══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-12 md:mb-16">
              <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-[#6B4FA0] mb-4">
                05 — Inquiry Desk
              </span>
              <h2 className="font-serif text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] text-[#1E1B2E] leading-[0.85] tracking-[-0.03em]">
                Frequently<br/>
                <span className="italic text-[#6B4FA0]">Clarified.</span>
              </h2>
            </div>

            <div className="space-y-0">
              {ACADEMY_FAQs.map((faq, idx) => {
                const isActive = activeFAQ === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveFAQ(isActive ? null : idx)}
                    className="relative cursor-pointer group border-b border-[#1E1B2E]/10 last:border-none"
                  >
                    {/* Animated Left Border */}
                    {isActive && (
                      <motion.div
                        layoutId="activeFAQIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#6B4FA0] rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    <div className="flex items-start gap-6 py-6 pl-6">
                      <span className="font-serif text-2xl md:text-3xl text-[#1E1B2E]/10 group-hover:text-[#6B4FA0]/30 transition-colors duration-300 mt-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-serif text-lg md:text-xl text-[#1E1B2E] group-hover:text-[#6B4FA0] transition-colors duration-300">
                            {faq.question}
                          </h3>
                          <motion.div
                            animate={{ rotate: isActive ? 45 : 0 }}
                            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                            className="shrink-0 w-8 h-8 rounded-full border border-[#1E1B2E]/10 flex items-center justify-center group-hover:border-[#6B4FA0]/50 transition-colors"
                          >
                            <span className="text-[#1E1B2E] group-hover:text-[#6B4FA0] text-lg leading-none transition-colors">+</span>
                          </motion.div>
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm md:text-base font-light text-[#1E1B2E]/60 leading-relaxed pt-4 pb-2 max-w-xl">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Channels */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <a href="mailto:academy@mummascake.com" className="flex items-center gap-3 group/contact">
                <div className="w-10 h-10 rounded-full border border-[#6B4FA0]/20 flex items-center justify-center text-[#6B4FA0] group-hover/contact:bg-[#6B4FA0] group-hover/contact:text-white transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#6B4FA0]/50">Academy Direct</p>
                  <p className="text-sm font-medium text-[#1E1B2E] group-hover/contact:text-[#6B4FA0] transition-colors">academy@mummascake.com</p>
                </div>
              </a>
              <a href="tel:+918598198765" className="flex items-center gap-3 group/contact">
                <div className="w-10 h-10 rounded-full border border-[#6B4FA0]/20 flex items-center justify-center text-[#6B4FA0] group-hover/contact:bg-[#6B4FA0] group-hover/contact:text-white transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#6B4FA0]/50">Bakery Intake</p>
                  <p className="text-sm font-medium text-[#1E1B2E] group-hover/contact:text-[#6B4FA0] transition-colors">+91 85981-98765</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* ═══════════ RIGHT: BESPOKE CONTACT FORM ═══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-[#6B4FA0]/10 p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(107,79,160,0.05)]">
              {contactSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="py-16 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#6B4FA0] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#6B4FA0]/20">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#1E1B2E] mb-3">
                    Brief Dispatched
                  </h3>
                  <p className="text-sm font-light text-[#1E1B2E]/60 max-w-xs mx-auto leading-relaxed">
                    We have logged your inquiry. Mahek's team will analyze the details and reach back with blueprints within 24 hours.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-8 px-6 py-3 border border-[#1E1B2E] text-[#1E1B2E] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#1E1B2E] hover:text-white transition-all duration-300"
                  >
                    Submit Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h3 className="font-serif text-3xl text-[#1E1B2E] mb-1">
                      File a Brief
                    </h3>
                    <p className="text-xs font-light text-[#1E1B2E]/50 leading-relaxed">
                      Bespoke requirements or custom workshops? Let's draft the blueprints.
                    </p>
                  </div>

                  {/* Floating Inputs */}
                  <div className="space-y-6 pt-2">
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="userName"
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-[#1E1B2E]/15 py-3 text-[#1E1B2E] focus:outline-none focus:border-[#6B4FA0] transition-colors duration-300 text-sm"
                      />
                      <label className="absolute left-0 top-3 text-sm text-[#1E1B2E]/40 transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#6B4FA0] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold">
                        Your Full Name
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="userEmail"
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-[#1E1B2E]/15 py-3 text-[#1E1B2E] focus:outline-none focus:border-[#6B4FA0] transition-colors duration-300 text-sm"
                      />
                      <label className="absolute left-0 top-3 text-sm text-[#1E1B2E]/40 transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#6B4FA0] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold">
                        Email Address
                      </label>
                    </div>
                  </div>

                  {/* Interactive Pill Selectors */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1E1B2E]/40 mb-3">
                      Inquiry Type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setSelectedInquiry(type)}
                          className={`relative px-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 border ${
                            selectedInquiry === type
                              ? "bg-[#6B4FA0] text-white border-[#6B4FA0] shadow-md shadow-[#6B4FA0]/20"
                              : "bg-transparent text-[#1E1B2E]/70 border-[#1E1B2E]/15 hover:border-[#6B4FA0]/50"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Textarea */}
                  <div className="relative">
                    <textarea
                      required
                      rows={3}
                      name="userMsg"
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-[#1E1B2E]/15 py-3 text-[#1E1B2E] focus:outline-none focus:border-[#6B4FA0] transition-colors duration-300 text-sm resize-none leading-relaxed"
                    />
                    <label className="absolute left-0 top-3 text-sm text-[#1E1B2E]/40 transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#6B4FA0] peer-focus:uppercase peer-focus:tracking-widest peer-focus:font-bold peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest peer-[:not(:placeholder-shown)]:font-bold">
                      Your Inquiry Notes
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#1E1B2E] text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#6B4FA0] transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 shadow-lg shadow-[#1E1B2E]/10 hover:shadow-[#6B4FA0]/20"
                  >
                    {loading ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Submit Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}