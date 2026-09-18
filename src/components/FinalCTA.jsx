import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { trackCtaClick } from '../utils/tracking';
import ScrollReveal from './ScrollReveal';

export default function FinalCTA({ onSelectPackage }) {
  const handleCtaClick = (e) => {
    e.preventDefault();
    trackCtaClick('final_cta', 'Nhận tư vấn gói website phù hợp', '#lead-form');
    if (onSelectPackage) onSelectPackage('unknown');
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-slate-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl text-white shadow-2xl p-6 sm:p-10 md:p-12 text-center overflow-hidden border border-slate-800/20">
          
          {/* Background Image inside the Card */}
          <div className="absolute inset-0 z-0">
            <img
              src="/cases/8dfe6b628d7ceaadb014e2458d5c5018.webp"
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          <ScrollReveal direction="up" distance="30px" duration={650} threshold={0.05} className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-[11px] font-bold uppercase tracking-wider mb-3 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Bắt đầu ngay hôm nay</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2 max-w-2xl mx-auto drop-shadow-md">
              Cho DUDI biết ngành nghề và website bạn cần
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-100 mb-6 max-w-xl mx-auto leading-relaxed drop-shadow-sm font-medium">
              Website giới thiệu doanh nghiệp chỉ từ <strong>3.000.000đ</strong> — Bàn giao toàn quyền, rõ phạm vi, không phát sinh chi phí.
            </p>

            {/* Primary CTA Button */}
            <div className="flex items-center justify-center">
              <a
                href="#lead-form"
                onClick={handleCtaClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#EC1420] hover:bg-[#C80F1B] active:scale-[0.98] shadow-xl shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: '#EC1420' }}
              >
                <span>Nhận tư vấn gói website phù hợp</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
