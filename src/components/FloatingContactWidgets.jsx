import React, { useState, useEffect } from 'react';
import { Phone, Check, ChevronUp, Sparkles } from 'lucide-react';
import { trackPhoneClick, trackZaloClick } from '../utils/tracking';
import AIChatModal from './AIChatModal';

export default function FloatingContactWidgets() {
  const [hovered, setHovered] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handlePhoneClick = (e) => {
    trackPhoneClick('floating_widget');

    // Check if device is desktop vs mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    if (!isMobile) {
      e.preventDefault();
      const phoneNumber = '0909 163 821';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phoneNumber.replace(/\s+/g, '')).then(() => {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), 2500);
        }).catch(() => {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), 2500);
        });
      } else {
        const tempInput = document.createElement('input');
        tempInput.value = phoneNumber.replace(/\s+/g, '');
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2500);
      }
    }
  };

  return (
    <>
      {/* Floating AI Chatbot Modal */}
      <AIChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <aside
        aria-label="Liên hệ nhanh và điều hướng"
        className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col gap-2.5 sm:gap-3.5 items-end pointer-events-none"
      >
        {/* 1. Scroll To Top Button */}
        {showScrollTop && (
          <div className="relative flex items-center pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Tooltip */}
            <span
              className={`hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap shadow-lg border border-slate-700/60 transition-all duration-200 pointer-events-none ${
                hovered === 'scrolltop' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
            >
              Lên đầu trang
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => setHovered('scrolltop')}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered('scrolltop')}
              onBlur={() => setHovered(null)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 hover:bg-[#EC1420] text-white border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
              title="Lên đầu trang"
              aria-label="Cuộn lên đầu trang"
            >
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200" />
            </button>
          </div>
        )}

        {/* 2. Floating AI Mascot Button */}
        <div className="relative flex items-center pointer-events-auto">
          {/* Ripple Waves */}
          <div 
            className="absolute inset-0 rounded-full bg-rose-500/30 animate-ripple-1 -z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div 
            className="absolute inset-0 rounded-full bg-red-500/20 animate-ripple-2 -z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Tooltip Label (Desktop) */}
          <span
            className={`hidden md:flex items-center gap-1.5 absolute right-full mr-3 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-md text-white transition-all duration-200 pointer-events-none ${
              hovered === 'ai' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-red-400 font-bold">Trợ lý AI DUDI</span>
          </span>

          <button
            type="button"
            data-chat-toggle="true"
            onClick={() => setIsChatOpen((prev) => !prev)}
            onMouseEnter={() => setHovered('ai')}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered('ai')}
            onBlur={() => setHovered(null)}
            aria-label="Mở Trợ lý ảo AI DUDI"
            title="Chat với Trợ lý AI DUDI"
            className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#D60F1A] via-[#EC1420] to-[#FF4B57] p-0.5 flex items-center justify-center shadow-lg shadow-red-500/35 hover:shadow-red-500/55 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 ${
              isChatOpen ? 'ring-2 ring-red-400 scale-105' : ''
            }`}
          >
            <div className="w-full h-full rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
              <img
                src="/robot-mascot.webp"
                alt="Trợ lý AI DUDI"
                className="w-full h-full object-contain hover:rotate-6 transition-transform duration-300 drop-shadow-xs"
              />
            </div>
            
            {/* Online Green Dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </button>
        </div>

        {/* 3. Hotline Widget */}
        <div className="relative flex items-center pointer-events-auto">
          {/* Tooltip Label (Desktop) */}
          <span
            className={`hidden md:flex items-center gap-1.5 absolute right-full mr-3 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl border transition-all duration-200 pointer-events-none ${
              copiedPhone
                ? 'opacity-100 translate-x-0 bg-emerald-600 text-white border-emerald-500 ring-4 ring-emerald-500/20'
                : hovered === 'hotline'
                  ? 'opacity-100 translate-x-0 bg-slate-900/95 backdrop-blur-md text-white border-slate-700/60'
                  : 'opacity-0 translate-x-2'
            }`}
          >
            {copiedPhone ? (
              <>
                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                <span>Đã sao chép: 0909 163 821</span>
              </>
            ) : (
              <span>Nhấp để sao chép: 0909 163 821</span>
            )}
          </span>

          <a
            href="tel:0909163821"
            onClick={handlePhoneClick}
            onMouseEnter={() => setHovered('hotline')}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered('hotline')}
            onBlur={() => setHovered(null)}
            className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#D60F1A] via-[#EC1420] to-[#FF3B47] text-white flex items-center justify-center shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400 group cursor-pointer"
            title="Hotline: 0909 163 821 (Desktop: Sao chép | Mobile: Gọi trực tiếp)"
            aria-label="Hotline 0909 163 821"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-12 transition-transform duration-200" />
          </a>
        </div>

        {/* 4. Zalo Widget */}
        <div className="relative flex items-center pointer-events-auto">
          {/* Tooltip Label (Desktop) */}
          <span
            className={`hidden md:block absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap shadow-lg border border-slate-700/60 transition-all duration-200 pointer-events-none ${
              hovered === 'zalo' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}
          >
            Chat Zalo chính thức
          </span>

          <a
            href="https://zalo.me/0909163821"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackZaloClick('floating_widget')}
            onMouseEnter={() => setHovered('zalo')}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered('zalo')}
            onBlur={() => setHovered(null)}
            className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0068FF] hover:bg-[#0057D9] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400 group cursor-pointer"
            title="Chat Zalo: 0909 163 821"
            aria-label="Chat Zalo DUDI Software"
          >
            <span className="font-black text-xs sm:text-[14px] tracking-tight text-white select-none group-hover:scale-105 transition-transform">
              Zalo
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}