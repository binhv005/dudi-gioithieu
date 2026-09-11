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

  const heroFeatures = [
    {
      id: 'web-design',
      title: 'THIẾT KẾ UI/UX CHUẨN THƯƠNG HIỆU',
      desc: 'Giao diện hiện đại, chuẩn nhận diện doanh nghiệp, hiển thị mượt mà trên 100% thiết bị Mobile, Tablet và Desktop.',
      icon: (
        <svg viewBox="0 0 100 80" className="w-12 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="8" width="70" height="48" rx="6" fill="#153664" stroke="#60A5FA" strokeWidth="2.5" />
          <path d="M42 56L37 68H63L58 56" fill="#2563EB" />
          <rect x="30" y="68" width="40" height="4" rx="2" fill="#93C5FD" />
          <rect x="18" y="11" width="64" height="8" rx="2" fill="#1D4ED8" />
          <circle cx="23" cy="15" r="2" fill="#EC1420" />
          <circle cx="29" cy="15" r="2" fill="#FBBF24" />
          <circle cx="35" cy="15" r="2" fill="#10B981" />
          <rect x="22" y="23" width="22" height="15" rx="3" fill="#60A5FA" fillOpacity="0.8" />
          <rect x="48" y="23" width="30" height="4" rx="1.5" fill="#E2E8F0" />
          <rect x="48" y="30" width="24" height="3" rx="1" fill="#94A3B8" />
          <rect x="48" y="35" width="28" height="3" rx="1" fill="#94A3B8" />
          <rect x="22" y="42" width="56" height="10" rx="2" fill="#3B82F6" fillOpacity="0.35" />
          <rect x="7" y="30" width="20" height="16" rx="3" fill="#EC1420" stroke="#FFFFFF" strokeWidth="1.8" />
          <line x1="11" y1="35" x2="23" y2="35" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="39" x2="20" y2="39" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'web-development',
      title: 'LẬP TRÌNH TỐI ƯU HIỆU NĂNG',
      desc: 'Mã nguồn sạch chuẩn SEO On-page, tốc độ tải trang nhanh, bàn giao toàn quyền sở hữu source code và CMS quản trị.',
      icon: (
        <svg viewBox="0 0 100 80" className="w-12 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="10" width="60" height="44" rx="5" fill="#153664" stroke="#60A5FA" strokeWidth="2.5" />
          <path d="M10 54H90L83 67H17L10 54Z" fill="#2563EB" stroke="#60A5FA" strokeWidth="1.5" />
          <rect x="38" y="56" width="24" height="3.5" rx="1.5" fill="#93C5FD" />
          <rect x="23" y="13" width="54" height="7" rx="1.5" fill="#1D4ED8" />
          <text x="34" y="38" fill="#F87171" fontSize="16" fontWeight="900" fontFamily="monospace">&lt;/&gt;</text>
          <line x1="28" y1="45" x2="48" y2="45" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="52" y1="45" x2="72" y2="45" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <rect x="5" y="34" width="20" height="16" rx="3" fill="#EC1420" stroke="#FFFFFF" strokeWidth="1.8" />
          <text x="7.5" y="46" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
          <rect x="75" y="22" width="18" height="14" rx="2" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="78" y1="26" x2="90" y2="26" stroke="#FFFFFF" strokeWidth="1.2" />
          <line x1="78" y1="30" x2="86" y2="30" stroke="#FBBF24" strokeWidth="1.2" />
        </svg>
      ),
    },
    {
      id: 'seo-service',
      title: 'BÀN GIAO TOÀN DIỆN & VẬN HÀNH',
      desc: 'Hướng dẫn sử dụng chi tiết, rõ gói rõ phạm vi, không phí ẩn và hỗ trợ xử lý kịp thời các lỗi kỹ thuật phát sinh.',
      icon: (
        <svg viewBox="0 0 100 80" className="w-12 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="8" width="68" height="48" rx="6" fill="#153664" stroke="#60A5FA" strokeWidth="2.5" />
          <path d="M42 56L37 68H63L58 56" fill="#2563EB" />
          <rect x="30" y="68" width="40" height="4" rx="2" fill="#93C5FD" />
          <path d="M50 13C44 21 43 32 43 38H57C57 32 56 21 50 13Z" fill="#EC1420" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="50" cy="24" r="3.5" fill="#FFFFFF" />
          <path d="M43 32L36 38H43V32Z" fill="#3B82F6" />
          <path d="M57 32L64 38H57V32Z" fill="#3B82F6" />
          <path d="M46 38L50 47L54 38H46Z" fill="#FBBF24" />
          <rect x="6" y="22" width="16" height="24" rx="2.5" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="9" y1="27" x2="19" y2="27" stroke="#FFFFFF" strokeWidth="1.2" />
          <line x1="9" y1="31" x2="17" y2="31" stroke="#FFFFFF" strokeWidth="1.2" />
          <rect x="78" y="22" width="16" height="24" rx="2.5" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="81" y1="27" x2="91" y2="27" stroke="#FFFFFF" strokeWidth="1.2" />
          <line x1="81" y1="31" x2="88" y2="31" stroke="#FFFFFF" strokeWidth="1.2" />
          <path d="M48 47L54 58L57 53L63 55L65 51L59 49L62 46L48 47Z" fill="#FFFFFF" stroke="#153664" strokeWidth="1.2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative z-20 pt-20 sm:pt-22 md:pt-24 pb-2 sm:pb-3 md:pb-4 bg-gradient-to-r from-[#011736] via-[#042852] to-[#6d0922] text-white">

      {/* Background Decor Wrapper (Scoped overflow-hidden so cards are not clipped) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {/* Subtle Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Subtle Glowing Stars / Particle Dots */}
        <div className="absolute top-10 left-[8%] w-1.5 h-1.5 bg-blue-300/80 rounded-full animate-pulse" />
        <div className="absolute top-24 left-[28%] w-1 h-1 bg-white/70 rounded-full" />
        <div className="absolute top-16 right-[35%] w-2 h-2 bg-red-400/60 rounded-full blur-[0.5px] animate-pulse" />
        <div className="absolute top-36 right-[15%] w-1 h-1 bg-blue-200/90 rounded-full" />

        {/* Scalloped Cloud Wave Background Graphic (Continuous Circular Arcs with Sharp Creases) */}
        <div className="absolute -bottom-2 -right-2 w-[480px] sm:w-[600px] md:w-[720px] lg:w-[840px] h-[360px] sm:h-[420px] pointer-events-none z-0 overflow-hidden">
          <svg
            viewBox="0 0 1000 520"
            className="w-full h-full drop-shadow-[-24px_-16px_32px_rgba(0,0,0,0.35)]"
            fill="none"
            preserveAspectRatio="xMaxYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Secondary/Left small cloud puff behind astronaut rocket */}
            <g fill="#FFFFFF">
              <circle cx="120" cy="460" r="36" />
              <circle cx="170" cy="440" r="42" />
              <circle cx="225" cy="455" r="38" />
              <rect x="90" y="450" width="180" height="70" fill="#FFFFFF" />
            </g>

            {/* Back Cloud Layer (Translucent Glow Arc) */}
            <path
              d="M 60 520 A 55 55 0 0 1 120 430 A 60 60 0 0 1 195 345 A 65 65 0 0 1 280 265 A 70 70 0 0 1 375 195 A 75 75 0 0 1 480 135 A 80 80 0 0 1 600 80 A 85 85 0 0 1 730 35 A 90 90 0 0 1 870 5 L 1020 0 L 1020 520 Z"
              fill="#FFFFFF"
              fillOpacity="0.2"
            />

            {/* Main Front Scalloped Cloud (Exact Circular Wave Lobes with Creases) */}
            <path
              d="M 120 520 A 55 55 0 0 1 175 440 A 55 55 0 0 1 235 365 A 58 58 0 0 1 305 295 A 60 60 0 0 1 385 230 A 64 64 0 0 1 475 170 A 68 68 0 0 1 575 115 A 72 72 0 0 1 685 65 A 76 76 0 0 1 805 25 A 78 78 0 0 1 930 0 L 1020 0 L 1020 520 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">

        {/* Top Hero Row: Left Copy & Right Astronaut */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">

          {/* Left Column: H1 & CTA Buttons (Refined & Minimal) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            {/* THE ONLY H1 ON PAGE */}
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-[1.25] mb-5 font-sans">
              Website giới thiệu chuyên nghiệp cho doanh nghiệp —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-white">
                rõ gói, rõ phạm vi, dễ quản lý.
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#lead-form"
                onClick={handlePrimaryCta}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-black text-white bg-[#EC1420] hover:bg-[#C80F1B] shadow-xl shadow-red-600/45 hover:shadow-red-600/65 active:scale-95 transition-all duration-200 cursor-pointer group"
                style={{ backgroundColor: '#EC1420' }}
              >
                <span>Nhận tư vấn gói website phù hợp</span>
                <Rocket className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#pricing"
                onClick={handleSecondaryCta}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-100 bg-white/10 hover:bg-white/20 border border-white/20 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Xem bảng giá</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
              </a>
            </div>

          </div>

          {/* Right Column: Astronaut Rocket 3D Graphic with Infinite Floating Animation */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-2 sm:pt-4">

            {/* Scoped CSS Keyframe for Mascot Floating Motion */}
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes mascotFloatInfinite {
                0% {
                  transform: translateY(0px) rotate(0deg);
                }
                50% {
                  transform: translateY(-26px) rotate(3deg);
                }
                100% {
                  transform: translateY(0px) rotate(0deg);
                }
              }
              .mascot-floating-element {
                animation: mascotFloatInfinite 3.2s ease-in-out infinite !important;
                will-change: transform;
              }
            `}} />

            {/* Ambient Radial Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* 3D Transparent WebP Rocket Astronaut with Infinite Floating Motion */}
            <div
              className="mascot-floating-element relative z-10 mx-auto flex items-center justify-center"
              style={{ animation: 'mascotFloatInfinite 3.2s ease-in-out infinite' }}
            >
              <img
                src="/hero-rocket.webp"
                alt="Công ty TNHH Giải Pháp Phần Mềm DUDI - Thiết kế website giới thiệu doanh nghiệp"
                width="455"
                height="438"
                loading="eager"
                fetchPriority="high"
                className="w-full max-w-[200px] sm:max-w-[230px] lg:max-w-[255px] h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)] select-none pointer-events-none"
              />
            </div>

          </div>

        </div>

        {/* 3 Hero Feature Cards: Positioned Exactly 50/50 in the Middle of Blue Hero & White Audience Border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mt-4 sm:mt-5 translate-y-8 sm:translate-y-10 md:translate-y-12 -mb-8 sm:-mb-10 md:-mb-12 relative z-30">
          {heroFeatures.map((card) => (
            <div
              key={card.id}
              className="group relative bg-gradient-to-b from-[#082954] via-[#051e3e] to-[#021329] backdrop-blur-xl border border-blue-400/35 hover:border-red-500/60 rounded-xl p-3.5 sm:p-4 shadow-xl shadow-slate-950/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/20 flex flex-col items-start"
            >
              {/* Card Top Border Highlight */}
              <div className="absolute top-0 left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-blue-400/70 group-hover:via-red-500/90 to-transparent transition-all duration-300" />

              {/* Card Vector Illustration Box */}
              <div className="mb-2 w-full flex justify-center py-1 bg-gradient-to-b from-blue-950/50 to-transparent rounded-lg border border-blue-500/15 group-hover:border-red-500/25 transition-all">
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-[13px] font-black text-white tracking-wider mb-1 group-hover:text-red-100 transition-colors">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-slate-200/90 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



