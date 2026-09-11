import React from 'react';
import { AUDIENCES } from '../data/audience';
import { User, Building2, Award, Target, ArrowRight, Sparkles } from 'lucide-react';
import { trackCtaClick } from '../utils/tracking';

export default function Audience({ onSelectPackage }) {
  const getIcon = (id) => {
    switch (id) {
      case 'individual':
        return <User className="w-5 h-5 text-slate-700" />;
      case 'sme':
        return <Building2 className="w-5 h-5 text-brand-primary" />;
      case 'branding':
        return <Award className="w-5 h-5 text-amber-500" />;
      case 'lead-gen':
        return <Target className="w-5 h-5 text-emerald-500" />;
      default:
        return <Building2 className="w-5 h-5 text-brand-primary" />;
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
    <section id="audience" className="pt-20 sm:pt-24 md:pt-28 lg:pt-30 pb-12 md:pb-16 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-surface border border-red-200/80 text-brand-primary text-[11px] font-bold uppercase tracking-wider mb-2">
            Đối tượng phù hợp
          </div>
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
            Giải pháp thiết kế website cho từng giai đoạn
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            Tối ưu hóa đúng nhu cầu thực tế và mục tiêu tăng trưởng của doanh nghiệp.
          </p>
        </div>

        {/* Balanced 4-Column Grid: 4 columns on Desktop (1 row), 2x2 on Tablet, 1 col on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 items-stretch">
          {AUDIENCES.map((item) => {
            const isFeatured = item.recommended;
            return (
              <div
                key={item.id}
                className={`relative rounded-2xl p-5 sm:p-5 md:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${isFeatured
                  ? 'bg-gradient-to-b from-white via-red-50/25 to-white border-2 border-[#EC1420] shadow-2xl shadow-red-500/20 ring-4 ring-red-500/10 lg:-translate-y-2 z-10'
                  : 'bg-white border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300'
                  }`}
              >
                {/* Featured Highlight Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#EC1420] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-red-600/40 ring-2 ring-white flex items-center gap-1.5 whitespace-nowrap z-20">
                    <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span>LỰA CHỌN PHỔ BIẾN</span>
                  </div>
                )}

                <div>
                  {/* Top Bar with Icon & Step */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${isFeatured
                      ? 'bg-red-100 text-[#EC1420] border border-red-200 shadow-sm'
                      : 'bg-slate-100/80 text-slate-700 border border-slate-200/80'
                      }`}>
                      {getIcon(item.id)}
                    </div>
                    <span className={`text-xs font-mono font-extrabold ${isFeatured ? 'text-red-400' : 'text-slate-400'}`}>
                      {item.number}
                    </span>
                  </div>

                  {/* Two-layer Typography */}
                  <h3 className={`text-base font-extrabold mb-1.5 ${isFeatured ? 'text-slate-900' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[32px]">
                    {item.headline}
                  </p>

                  {/* Micro-tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${isFeatured
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200/70'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Action & Metric */}
                <div className={`pt-3.5 border-t flex items-center justify-between ${isFeatured ? 'border-red-100' : 'border-slate-100'}`}>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Gói tối ưu:</span>
                    <span className={`text-xs font-black ${isFeatured ? 'text-[#EC1420]' : 'text-slate-900'}`}>
                      {item.suggestedPackage}
                    </span>
                  </div>
                  <a
                    href="#pricing"
                    onClick={(e) => handleCardCta(e, item)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${isFeatured
                      ? 'px-3 py-1.5 rounded-lg bg-[#EC1420] hover:bg-[#C80F1B] text-white shadow-md shadow-red-500/25 active:scale-95'
                      : 'text-slate-900 hover:text-[#EC1420] group'
                      }`}
                  >
                    <span>Chi tiết</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isFeatured ? 'text-white' : 'text-slate-900 group-hover:text-[#EC1420] group-hover:translate-x-1'} transition-transform`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
