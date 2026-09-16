import React from 'react';
import { ArrowRight, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { trackCtaClick, trackPhoneClick, trackZaloClick } from '../utils/tracking';
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
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-900 to-slate-950 text-white border-t border-slate-800 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <ScrollReveal direction="up" distance="35px" duration={650} threshold={0.05}>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bắt đầu ngay hôm nay</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 max-w-2xl mx-auto">
            Cho DUDI biết ngành nghề và website bạn cần
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
            Website giới thiệu doanh nghiệp chỉ từ <strong>3.000.000đ</strong> — Bàn giao toàn quyền, rõ phạm vi, không phát sinh chi phí.
          </p>

          {/* Primary CTA & Secondary Channels */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#lead-form"
              onClick={handleCtaClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#EC1420] hover:bg-[#C80F1B] active:scale-[0.98] shadow-xl shadow-red-500/30 transition-all cursor-pointer"
              style={{ backgroundColor: '#EC1420' }}
            >
              <span>Nhận tư vấn gói website phù hợp</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <a
                href="tel:0909163821"
                onClick={() => trackPhoneClick('final_cta_section')}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                title="Hotline DUDI"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                <span>0909 163 821</span>
              </a>

              <a
                href="https://zalo.me/0909163821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackZaloClick('final_cta_section')}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-xs sm:text-sm font-semibold text-red-300 bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 transition-colors"
                title="Chat Zalo DUDI"
              >
                <MessageSquare className="w-4 h-4 text-brand-accent" />
                <span>Zalo Chat</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
