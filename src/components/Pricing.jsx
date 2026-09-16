import React from 'react';
import { PACKAGES, PRICING_DISCLAIMER } from '../data/packages';
import { Sparkles, ArrowRight, Info, Check } from 'lucide-react';
import { trackCtaClick, trackPackageSelect } from '../utils/tracking';
import ScrollReveal from './ScrollReveal';

export default function Pricing({ onSelectPackage }) {
  const handlePackageClick = (e, pkg) => {
    e.preventDefault();
    trackPackageSelect(pkg.name, pkg.price || 'Liên hệ');
    trackCtaClick(`pricing_${pkg.id}`, pkg.ctaText, '#lead-form');

    if (onSelectPackage) {
      onSelectPackage(pkg.id);
    }

    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const nameInput = document.getElementById('fullName');
        if (nameInput) {
          nameInput.focus();
        }
      }, 300);
    }
  };

  const cardThemes = {
    basic: {
      headerGradient: 'from-[#0D9488] via-[#0F766E] to-[#115E59]',
      accentColor: '#0D9488',
      dotColor: 'bg-teal-500',
      hoverBorder: 'hover:border-teal-500/70',
      hoverShadow: 'hover:shadow-2xl hover:shadow-teal-600/25',
      btnBg: 'bg-slate-900 hover:bg-[#0D9488]',
      englishTitle: 'BASIC',
      vehicleMotion: 'group-hover:translate-x-2.5 group-hover:-translate-y-2 group-hover:scale-115 group-hover:-rotate-6',
      vehicleIcon: (
        /* Paper Airplane Graphic like Image 2 */
        <svg viewBox="0 0 120 70" className="w-20 h-12 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud / Wind Lines */}
          <line x1="10" y1="20" x2="35" y2="20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="5" y1="35" x2="25" y2="35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <line x1="15" y1="50" x2="40" y2="50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Paper Airplane Body */}
          <path d="M105 20L30 38L62 46L105 20Z" fill="#FFFFFF" />
          <path d="M105 20L62 46L68 62L76 50L105 20Z" fill="#E0F2FE" />
          <path d="M62 46L68 62L65 52L62 46Z" fill="#93C5FD" />
        </svg>
      )
    },
    standard: {
      headerGradient: 'from-[#FF5500] via-[#EC1420] to-[#C80F1B]',
      accentColor: '#EC1420',
      dotColor: 'bg-[#EC1420]',
      hoverBorder: 'hover:border-red-500',
      hoverShadow: 'hover:shadow-2xl hover:shadow-red-500/40',
      btnBg: 'bg-[#EC1420] hover:bg-[#C80F1B]',
      englishTitle: 'STANDARD',
      vehicleMotion: 'group-hover:translate-x-3.5 group-hover:-translate-y-1.5 group-hover:scale-115',
      vehicleIcon: (
        /* Commercial Jet Airplane Graphic like Image 2 */
        <svg viewBox="0 0 140 75" className="w-24 h-13 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Cloud */}
          <path d="M20 52 C20 45, 28 40, 36 42 C40 35, 52 35, 58 42 C64 40, 72 45, 72 52 Z" fill="#FFFFFF" fillOpacity="0.25" />
          {/* Airplane Fuselage */}
          <path d="M125 35 C125 28, 110 24, 75 24 L35 24 C25 24, 20 28, 20 35 C20 42, 28 45, 45 45 L95 45 C115 45, 125 42, 125 35 Z" fill="#FFFFFF" />
          {/* Wings */}
          <path d="M75 32 L45 58 L58 58 L90 32 Z" fill="#FFFFFF" />
          <path d="M78 24 L55 8 L65 8 L90 24 Z" fill="#FFFFFF" />
          {/* Tail */}
          <path d="M20 28 L10 12 L22 12 L32 28 Z" fill="#FFFFFF" />
          {/* Windows */}
          <circle cx="50" cy="33" r="2.5" fill="#EC1420" />
          <circle cx="60" cy="33" r="2.5" fill="#EC1420" />
          <circle cx="70" cy="33" r="2.5" fill="#EC1420" />
          <circle cx="80" cy="33" r="2.5" fill="#EC1420" />
          {/* Cockpit Window */}
          <path d="M102 30 C102 28, 108 29, 112 33 L102 33 Z" fill="#EC1420" />
        </svg>
      )
    },
    premium: {
      headerGradient: 'from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]',
      accentColor: '#7C3AED',
      dotColor: 'bg-purple-500',
      hoverBorder: 'hover:border-purple-500/70',
      hoverShadow: 'hover:shadow-2xl hover:shadow-purple-600/25',
      btnBg: 'bg-slate-900 hover:bg-[#7C3AED]',
      englishTitle: 'PREMIUM',
      vehicleMotion: 'group-hover:-translate-y-3 group-hover:scale-115 group-hover:-rotate-6',
      vehicleIcon: (
        /* Rocket / Spaceship Graphic like Image 2 */
        <svg viewBox="0 0 120 70" className="w-20 h-12 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stars & Speed Trails */}
          <line x1="8" y1="22" x2="28" y2="22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <line x1="4" y1="35" x2="20" y2="35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <line x1="10" y1="48" x2="32" y2="48" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          {/* Rocket Body */}
          <path d="M98 35 C98 25, 75 22, 45 22 L35 22 C35 22, 35 48, 35 48 L45 48 C75 48, 98 45, 98 35 Z" fill="#FFFFFF" />
          <path d="M98 35 C98 27, 85 24, 75 23 L75 47 C85 46, 98 43, 98 35 Z" fill="#DDD6FE" />
          {/* Rocket Nose Cone Point */}
          <path d="M98 35 L108 35 Z" stroke="#FFFFFF" strokeWidth="2" />
          {/* Porthole Window */}
          <circle cx="62" cy="35" r="5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Fins */}
          <path d="M42 22 L30 12 L38 22 Z" fill="#FFFFFF" />
          <path d="M42 48 L30 58 L38 48 Z" fill="#FFFFFF" />
          {/* Exhaust Flame */}
          <path d="M35 30 L22 35 L35 40 Z" fill="#FBBF24" />
        </svg>
      )
    }
  };

  return (
    <section id="pricing" className="py-4 sm:py-5 md:py-6 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollReveal direction="up" distance="30px" duration={600} threshold={0.05}>
          <div className="text-center max-w-xl mx-auto mb-3 sm:mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-surface border border-red-200/80 text-brand-primary text-[10px] font-bold uppercase tracking-wider mb-0.5">
              Bảng giá & Phạm vi
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Bảng giá minh bạch — Đúng cam kết, không phí ẩn
            </h2>
            <p className="text-[11px] text-slate-500">
              Thanh toán một lần theo dự án, không phát sinh chi phí trong phạm vi thống nhất.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Pricing Cards: Styled with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-4 items-center max-w-5xl mx-auto mb-3 pt-2">
          {PACKAGES.map((pkg, idx) => {
            const isStandard = pkg.recommended;
            const theme = cardThemes[pkg.id] || cardThemes.basic;

            return (
              <ScrollReveal
                key={pkg.id}
                direction="up"
                distance="40px"
                delay={idx * 130}
                duration={650}
                threshold={0.05}
                className="h-full flex flex-col"
              >
                <div
                  className={`group relative rounded-3xl bg-white flex-1 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
                    isStandard
                      ? `shadow-xl shadow-red-500/20 border-2 border-[#EC1420] md:-translate-y-2 z-20 ring-4 ring-red-500/10 hover:-translate-y-4 hover:scale-[1.015] ${theme.hoverShadow}`
                      : `shadow-md border border-slate-200/80 hover:-translate-y-2.5 hover:border-slate-300 ${theme.hoverShadow} ${theme.hoverBorder} z-10`
                  }`}
                >
                  {/* Floating "LỰA CHỌN PHỔ BIẾN" Badge on Standard Card */}
                  {isStandard && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-red-600 text-[10px] font-black uppercase tracking-wider whitespace-nowrap shadow-md flex items-center gap-1 z-30 transition-transform duration-300 group-hover:scale-105">
                      <Sparkles className="w-3 h-3 text-red-600 animate-pulse" />
                      <span>LỰA CHỌN PHỔ BIẾN</span>
                    </div>
                  )}

                  {/* Top Wavy Colored Header Banner */}
                  <div className={`relative bg-gradient-to-b ${theme.headerGradient} text-white pt-6 pb-7 px-4 flex flex-col items-center text-center overflow-hidden transition-all duration-300`}>
                    {/* Subtle hover background highlight shimmer */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />

                    {/* Vehicle Graphic Illustration with interactive hover motion */}
                    <div className={`mb-1 transform transition-all duration-500 ease-out ${theme.vehicleMotion}`}>
                      {theme.vehicleIcon}
                    </div>

                    {/* English Package Title (BASIC, STANDARD, PREMIUM) */}
                    <h3 className="text-base sm:text-lg font-black tracking-wider uppercase text-white drop-shadow-xs transition-transform duration-300 group-hover:scale-105">
                      {theme.englishTitle}
                    </h3>

                    <span className="text-[10.5px] font-medium text-white/90">
                      Gói {pkg.name} • {pkg.target}
                    </span>

                    {/* SVG Smooth Wave Transition into White Body */}
                    <svg
                      viewBox="0 0 500 60"
                      preserveAspectRatio="none"
                      className="absolute -bottom-0.5 left-0 w-full h-5 sm:h-6 text-white pointer-events-none"
                      fill="currentColor"
                    >
                      <path d="M 0 30 C 150 65, 350 -10, 500 30 L 500 60 L 0 60 Z" />
                    </svg>
                  </div>

                  {/* White Card Body with Price & Features */}
                  <div className="px-4 sm:px-5 pt-2 pb-4 sm:pb-5 flex-1 flex flex-col justify-between bg-white text-center">

                    <div>
                      {/* Big Bold Price Display */}
                      <div className="mb-2.5 pb-2 border-b border-slate-100 flex flex-col items-center">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-xs font-semibold text-slate-400">
                            {pkg.priceLabel || 'Từ'}
                          </span>
                          <span className={`text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight transition-transform duration-300 group-hover:scale-105 ${isStandard ? 'text-[#EC1420]' : 'text-slate-900'}`}>
                            {pkg.price || 'Liên hệ'}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 line-clamp-1 font-normal">
                          {pkg.objective}
                        </p>
                      </div>

                      {/* Bullet Points with Color Dots */}
                      <ul className="space-y-1.5 text-left mb-4 px-1">
                        {pkg.features.slice(0, 5).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-[11px] leading-tight text-slate-700 transition-transform duration-200 group-hover:translate-x-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor} shrink-0 transition-transform duration-200 group-hover:scale-125`} />
                            <span className={feat.highlight ? 'font-bold text-slate-900' : 'text-slate-600'}>
                              {feat.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Rounded Pill Action Button */}
                    <div className="pt-1">
                      <a
                        href="#lead-form"
                        onClick={(e) => handlePackageClick(e, pkg)}
                        className={`w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-md group-hover:shadow-lg ${theme.btnBg} ${
                          isStandard ? 'shadow-red-500/30 group-hover:shadow-red-500/50' : ''
                        }`}
                      >
                        <span>{pkg.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
                      </a>
                    </div>

                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Minimal Compact Disclaimer Note */}
        <ScrollReveal direction="up" distance="20px" delay={300} duration={600} threshold={0.05}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[10px] text-slate-500 inline-flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs">
              <Info className="w-3 h-3 text-brand-primary shrink-0" />
              <span>Giá thanh toán 01 lần theo dự án, không phí ẩn. Chưa bao gồm Domain/Hosting và các module ERP chuyên sâu.</span>
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
