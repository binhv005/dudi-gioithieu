import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { trackCtaClick } from '../utils/tracking';

export default function Hero({ onSelectPackage }) {
  const handlePrimaryCta = (e) => {
    e.preventDefault();
    trackCtaClick('hero_primary', 'Nhận tư vấn gói website phù hợp', '#lead-form');
    if (onSelectPackage) onSelectPackage('unknown');
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryCta = (e) => {
    e.preventDefault();
    trackCtaClick('hero_secondary', 'Xem bảng giá', '#pricing');
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-20 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 text-slate-900 overflow-hidden bg-white min-h-[560px] sm:min-h-[640px] lg:min-h-screen lg:h-screen flex items-center">

      {/* Full 3D Daylight Graphic - City skyline on Mobile (No mascot), Full Scene on Desktop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/hero-3d-bg.webp"
          alt="DUDI Software 3D Hero"
          className="w-full h-full object-cover object-[0%_center] sm:object-[78%_center] lg:object-[80%_center]"
        />

        {/* Soft daylight readability overlay on mobile */}
        <div className="sm:hidden absolute inset-0 bg-white/40 pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative w-full z-10">

        {/* Top Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">

          {/* Left Column: H1 & CTA Buttons */}
          <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-6 flex flex-col items-start text-left py-2 sm:py-4">

            {/* THE ONLY H1 ON PAGE - Compact & Balanced Fluid Typography */}
            <h1 className="text-[clamp(1.2rem,2.4vw,2.4rem)] font-black text-slate-900 tracking-tight leading-[1.3] mb-4 max-w-xl xl:max-w-2xl 2xl:max-w-3xl font-sans">
              Website giới thiệu chuyên nghiệp cho doanh nghiệp —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC1420] via-rose-600 to-[#C80F1B]">
                rõ gói, rõ phạm vi, dễ quản lý.
              </span>
            </h1>

            {/* CTA Buttons - 1 Single Row on Mobile */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-3.5 flex-wrap sm:flex-nowrap pt-1">
              <a
                href="#lead-form"
                onClick={handlePrimaryCta}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 2xl:px-8 py-2.5 sm:py-3 2xl:py-3.5 rounded-full text-[11px] sm:text-xs md:text-sm 2xl:text-base font-black text-white bg-[#EC1420] hover:bg-[#C80F1B] shadow-lg shadow-red-600/35 hover:shadow-red-600/50 active:scale-95 transition-all duration-200 cursor-pointer group whitespace-nowrap shrink-0"
                style={{ backgroundColor: '#EC1420' }}
              >
                <span>
                  <span className="hidden sm:inline">Nhận tư vấn gói website phù hợp</span>
                  <span className="sm:hidden">Nhận tư vấn</span>
                </span>
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#pricing"
                onClick={handleSecondaryCta}
                className="inline-flex items-center justify-center gap-1 sm:gap-2 px-3.5 sm:px-6 2xl:px-8 py-2.5 sm:py-3 2xl:py-3.5 rounded-full text-[11px] sm:text-xs md:text-sm 2xl:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/90 shadow-md shadow-slate-200/50 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Xem bảng giá</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 2xl:w-4 2xl:h-4 text-slate-600" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
