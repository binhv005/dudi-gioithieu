import React, { useState } from 'react';
import { FAQS } from '../data/faq';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const [openItems, setOpenItems] = useState({ 'faq-1': true });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="faq" className="py-6 sm:py-8 md:py-10 bg-white border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-Column Layout: Left Header & 3D Illustration, Right Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* LEFT COLUMN: Header & 3D FAQ Mascot Illustration */}
          <ScrollReveal direction="left" distance="35px" duration={650} threshold={0.05} className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200/80 text-[#EC1420] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                Câu hỏi thường gặp
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Giải đáp thắc mắc dịch vụ
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Các câu hỏi phổ biến nhất về quy trình, quyền sở hữu và chi phí thiết kế website tại DUDI.
              </p>
            </div>

            {/* 3D Mascot Illustration Box */}
            <div className="hidden lg:block relative max-w-[460px] lg:max-w-[490px] xl:max-w-[530px] w-full mx-auto lg:mx-0 group pt-2">
              <img
                src="/faq-mascot-illustration.webp"
                alt="DUDI Software FAQ Mascot"
                className="relative z-10 w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: 8 Accordion Items with Staggered ScrollReveal */}
          <div className="lg:col-span-7 space-y-2">
            {FAQS.map((faq, idx) => {
              const isOpen = !!openItems[faq.id];
              const contentId = `faq-content-${faq.id}`;
              const headerId = `faq-header-${faq.id}`;

              return (
                <ScrollReveal
                  key={faq.id}
                  direction="up"
                  distance="25px"
                  delay={idx * 60}
                  duration={500}
                  threshold={0.05}
                >
                  <div
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-white border-red-300 shadow-sm ring-1 ring-red-100'
                      : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-2xs'
                      }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={headerId}
                        onClick={() => toggleItem(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-slate-900 hover:text-[#EC1420] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors cursor-pointer"
                      >
                        <span className="pr-2 flex items-center gap-2">
                          <MessageCircleQuestion className={`w-3.5 h-3.5 shrink-0 ${isOpen ? 'text-[#EC1420]' : 'text-slate-400'}`} />
                          <span className="leading-snug">{faq.question}</span>
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-red-50 text-[#EC1420]' : 'text-slate-500'
                            }`}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </div>
                      </button>
                    </h3>

                    {/* Content */}
                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      className={`px-3 pb-3 text-xs text-slate-600 leading-relaxed transition-all duration-200 ${isOpen ? 'block pt-0.5' : 'hidden'
                        }`}
                    >
                      <p className="border-t border-slate-100 pt-2 pl-5.5 text-[11.5px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
