import React from 'react';
import { AUDIENCES } from '../data/audience';
import { User, Building2, Award, Target, ArrowRight, Sparkles } from 'lucide-react';
import { trackCtaClick } from '../utils/tracking';
import ScrollReveal from './ScrollReveal';

export default function Audience({ onSelectPackage }) {
  const getIcon = (id) => {
    switch (id) {
      case 'individual':
        return <User className="w-4 h-4" />;
      case 'sme':
        return <Building2 className="w-4 h-4" />;
      case 'branding':
        return <Award className="w-4 h-4" />;
      case 'lead-gen':
        return <Target className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const handleCardCta = (e, audience) => {
    e.preventDefault();
    trackCtaClick(`audience_${audience.id}`, `Gợi ý ${audience.suggestedPackage}`, '#pricing');
    if (onSelectPackage && audience.packageId) {
      onSelectPackage(audience.packageId);
    }
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="audience"
      className="pt-12 sm:pt-14 md:pt-16 pb-14 sm:pb-16 md:pb-20 border-t border-rose-300/40 relative text-slate-900 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fa8781 0%, #faa483 28%, #fac388 58%, #fcd69a 82%, #fffcf5 100%)'
      }}
    >
      {/* Bottom Soft Cream Curve Wave matching sample */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 sm:h-18 md:h-24 text-[#fffcf5] fill-current">
          <path d="M0,40 C300,95 900,95 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up" distance="30px" duration={600} threshold={0.05}>
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-white/80 text-[#e0312b] text-[11px] font-black uppercase tracking-wider mb-2 shadow-sm backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#EC1420]" />
              <span>Đối tượng phù hợp</span>
            </div>
            <h2 className="text-2xl sm:text-[28px] font-black text-slate-900 tracking-tight drop-shadow-2xs">
              Giải pháp thiết kế website cho từng giai đoạn
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-800/90 font-medium">
              Tối ưu hóa đúng nhu cầu thực tế và mục tiêu tăng trưởng của doanh nghiệp.
            </p>
          </div>
        </ScrollReveal>

        {/* Balanced 4-Column Grid with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 items-stretch">
          {AUDIENCES.map((item, idx) => {
            const isFeatured = item.recommended;
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                distance="40px"
                delay={idx * 120}
                duration={650}
                threshold={0.05}
                className="h-full flex flex-col"
              >
                <div
                  className={`relative rounded-2xl flex-1 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group ${isFeatured
                    ? 'bg-white border-2 border-[#EC1420] shadow-2xl shadow-red-600/30 ring-4 ring-red-500/20 lg:-translate-y-2 z-10'
                    : 'bg-white/95 border border-white/90 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:border-slate-300'
                    }`}
                >
                  {/* Featured Highlight Badge */}
                  {isFeatured && (
                    <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-[#EC1420] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-lg shadow-red-600/50 ring-2 ring-white/60 flex items-center gap-1.5 whitespace-nowrap z-20 backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-white animate-pulse" />
                      <span>LỰA CHỌN PHỔ BIẾN</span>
                    </div>
                  )}

                  {/* Top Half: Full-width Edge-to-Edge Image */}
                  <div className="relative w-full h-36 sm:h-40 bg-slate-900 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Subtle Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Icon & Step Number Badges at bottom of image */}
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shadow-md backdrop-blur-md ${
                        isFeatured
                          ? 'bg-[#EC1420] text-white border border-white/40'
                          : 'bg-white/95 text-slate-900 border border-white/80'
                      }`}>
                        {getIcon(item.id)}
                      </div>
                      <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md shadow-md ${
                        isFeatured
                          ? 'bg-[#EC1420] text-white border border-white/40'
                          : 'bg-slate-900/90 text-white border border-white/20'
                      }`}>
                        {item.number}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Half: Content Body */}
                  <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Typography */}
                      <h3 className="text-[15px] font-extrabold mb-1 text-slate-900 leading-snug group-hover:text-[#EC1420] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3.5 min-h-[34px]">
                        {item.headline}
                      </p>

                      {/* Micro-tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold border ${isFeatured
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200/90'
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Bar: Action & Metric */}
                    <div className={`pt-3 border-t flex items-center justify-between ${isFeatured ? 'border-red-100' : 'border-slate-100'}`}>
                      <div>
                        <span className="text-[9.5px] text-slate-400 block font-medium">Gói tối ưu:</span>
                        <span className={`text-xs font-black ${isFeatured ? 'text-[#EC1420]' : 'text-slate-900'}`}>
                          {item.suggestedPackage}
                        </span>
                      </div>
                      <a
                        href="#pricing"
                        onClick={(e) => handleCardCta(e, item)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${isFeatured
                          ? 'px-3 py-1.5 rounded-lg bg-[#EC1420] hover:bg-[#C80F1B] text-white shadow-md shadow-red-500/30 active:scale-95'
                          : 'px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs group/btn active:scale-95'
                          }`}
                      >
                        <span>Chi tiết</span>
                        <ArrowRight className={`w-3.5 h-3.5 text-white group-hover/btn:translate-x-0.5 transition-transform`} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
