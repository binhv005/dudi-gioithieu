import React from 'react';
import { FIT_DATA } from '../data/deliverables';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { trackCtaClick } from '../utils/tracking';

export default function FitSection({ onSelectPackage }) {
  const handleCustomQuote = (e) => {
    e.preventDefault();
    trackCtaClick('fit_section', 'Tư vấn dự án riêng', '#lead-form');
    if (onSelectPackage) onSelectPackage('premium');
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fit" className="py-3 sm:py-4 md:py-5 bg-gradient-to-r from-[#8B0B12] via-[#B91C1C] to-[#88080E] text-white relative overflow-hidden">

      {/* Ambient background glows */}
      <div className="absolute -top-10 left-1/4 w-60 h-60 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-60 h-60 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Tech Hexagon Matrix Graphic on Top-Right */}
      <div className="absolute -top-6 -right-6 w-52 sm:w-72 md:w-80 opacity-25 pointer-events-none select-none z-0">
        <img
          src="/tech-hexagon-bg.webp"
          alt=""
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Tech Network Sphere Graphic on Left */}
      <div className="absolute -bottom-12 -left-10 w-48 sm:w-64 opacity-20 pointer-events-none select-none z-0">
        <img
          src="/tech-network-bg.webp"
          alt=""
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>

      {/* Subtle Tech Geometric Accent on Top-Left */}
      <div className="absolute -top-8 left-8 w-36 sm:w-48 opacity-15 pointer-events-none select-none z-0">
        <img
          src="/tech-geometric-bg.webp"
          alt=""
          className="w-full h-auto object-contain"
          loading="lazy"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (Ultra Compact) */}
        <div className="text-center max-w-xl mx-auto mb-2 sm:mb-2.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/30 text-white text-[9.5px] font-extrabold uppercase tracking-wider mb-0.5 shadow-sm backdrop-blur-xs">
            Bộ lọc phù hợp
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight drop-shadow-xs">
            Xác định đúng nhu cầu để tối ưu ngân sách
          </h2>
          <p className="text-[10.5px] sm:text-[11px] text-white/90 max-w-lg mx-auto leading-tight">
            DUDI luôn tư vấn đúng phạm vi thực tế để khách hàng không phải chi trả cho những tính năng không cần thiết.
          </p>
        </div>

        {/* 2-Column Bento Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 sm:gap-3.5">

          {/* Column 1: Fit Perfectly */}
          <div className="rounded-xl bg-white/95 border border-emerald-300 p-2.5 sm:p-3 flex flex-col justify-between shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-slate-900 backdrop-blur-sm">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[9.5px] font-black uppercase tracking-wide mb-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                <span>Rất phù hợp</span>
              </div>

              <h3 className="text-xs sm:text-sm font-black text-slate-900 mb-0.5">
                {FIT_DATA.suited.title}
              </h3>
              <p className="text-[10px] sm:text-[10.5px] text-slate-500 mb-1.5">
                {FIT_DATA.suited.subtitle}
              </p>

              <div className="space-y-1">
                {FIT_DATA.suited.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-emerald-50/50 border border-emerald-100 shadow-2xs hover:bg-emerald-50 transition-colors">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[8.5px] font-black shadow-xs">
                      ✓
                    </div>
                    <div>
                      <div className="text-[10.5px] sm:text-[11px] font-bold text-slate-900 leading-tight">{point.main}</div>
                      <div className="text-[9.5px] sm:text-[10px] text-slate-500 leading-tight">{point.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-emerald-100 text-[10px] sm:text-[10.5px] text-emerald-800 font-bold flex items-center gap-1">
              <span>✓</span>
              <span>Cam kết tiến độ & bàn giao đúng theo phạm vi 3 gói chuẩn.</span>
            </div>
          </div>

          {/* Column 2: Custom Quote Needed */}
          <div className="rounded-xl bg-white/95 border border-amber-300 p-2.5 sm:p-3 flex flex-col justify-between shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-slate-900 backdrop-blur-sm">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[9.5px] font-black uppercase tracking-wide mb-1 shadow-xs">
                <AlertTriangle className="w-3 h-3 text-amber-700" />
                <span>Cần khảo sát riêng</span>
              </div>

              <h3 className="text-xs sm:text-sm font-black text-slate-900 mb-0.5">
                {FIT_DATA.customQuote.title}
              </h3>
              <p className="text-[10px] sm:text-[10.5px] text-slate-500 mb-1.5">
                {FIT_DATA.customQuote.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {FIT_DATA.customQuote.points.map((point, idx) => (
                  <div key={idx} className="p-1.5 rounded-lg bg-amber-50/50 border border-amber-200/70 shadow-2xs hover:bg-amber-50 transition-colors">
                    <span className="text-[8.5px] font-mono font-bold text-amber-900 bg-amber-200/80 px-1 py-0.2 rounded block w-fit mb-0.5">
                      {point.tag}
                    </span>
                    <span className="text-[10px] sm:text-[10.5px] font-bold text-slate-800 leading-tight block">
                      {point.main}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-amber-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
              <span className="text-[10px] text-amber-950 font-semibold">
                Cần phân tích tài liệu kỹ thuật & kiến trúc riêng
              </span>
              <a
                href="#lead-form"
                onClick={handleCustomQuote}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EC1420] text-white hover:bg-[#C80F1B] text-[10px] font-black transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Gửi yêu cầu khảo sát</span>
                <ArrowRight className="w-2.5 h-2.5 text-white" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
