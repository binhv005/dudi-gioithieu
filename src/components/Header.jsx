import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ChevronRight, User, Rocket } from 'lucide-react';
import { trackCtaClick, trackPhoneClick, trackZaloClick } from '../utils/tracking';

export default function Header({ onSelectPackage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Calculate Reading/Scroll Progress Percentage
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScrollable = docHeight - winHeight;
      if (totalScrollable > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalScrollable) * 100));
        setScrollProgress(progress);
      }

      // Detect Active Section
      const sectionIds = ['audience', 'problems', 'deliverables', 'pricing', 'cases', 'process', 'faq', 'lead-form'];
      let currentActive = '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = id;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Đối tượng', href: '#audience', id: 'audience' },
    { name: 'Vấn đề', href: '#problems', id: 'problems' },
    { name: 'Phạm vi', href: '#deliverables', id: 'deliverables' },
    { name: 'Bảng giá', href: '#pricing', id: 'pricing' },
    { name: 'Case mẫu', href: '#cases', id: 'cases' },
    { name: 'Quy trình', href: '#process', id: 'process' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
  ];

  const handleCtaClick = (e) => {
    e.preventDefault();
    trackCtaClick('header_nav', 'Nhận tư vấn', '#lead-form');
    if (onSelectPackage) onSelectPackage('unknown');
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2.5 text-slate-900'
          : 'bg-white/60 backdrop-blur-xs py-3.5 text-slate-900 border-b border-slate-100/60'
        }`}
    >
      {/* Dynamic Top Scroll Progress Transition Line */}
      <div
        className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-[#EC1420] via-rose-500 to-amber-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(236,20,32,0.8)] z-50"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Left: Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-0.5 cursor-pointer shrink-0"
            aria-label="Công ty TNHH Giải Pháp Phần Mềm DUDI - Về đầu trang"
          >
            <img
              src="/logo.webp"
              alt="Công ty TNHH Giải Pháp Phần Mềm DUDI"
              width="36"
              height="36"
              loading="eager"
              fetchPriority="high"
              className="w-9 h-9 rounded-lg object-contain shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none group-hover:text-[#EC1420] transition-colors">
                DUDI<span className="text-[#EC1420] font-black"> SOFTWARE</span>
              </span>
              <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">
                GIẢI PHÁP PHẦN MỀM
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links (Evenly distributed without capsule background) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#EC1420]'
                      : 'text-slate-700 hover:text-[#EC1420]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#EC1420] rounded-full animate-in fade-in zoom-in-75 duration-200" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Action Buttons & Hotline */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:0909163821"
              onClick={() => trackPhoneClick('header_desktop')}
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#EC1420] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#EC1420]" />
              <span>0909 163 821</span>
            </a>

            {/* Pure Brand Red CTA Button with Lucide Rocket Icon */}
            <a
              href="#lead-form"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 text-xs font-black text-white bg-[#EC1420] hover:bg-[#C80F1B] active:scale-95 px-5 py-2.5 rounded-full shadow-md shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/40 transition-all duration-200 cursor-pointer"
              style={{ backgroundColor: '#EC1420' }}
            >
              <span>Nhận tư vấn</span>
              <Rocket className="w-3.5 h-3.5 text-white" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href="#lead-form"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-white bg-[#EC1420] hover:bg-[#C80F1B] px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-md shadow-red-600/30"
              style={{ backgroundColor: '#EC1420' }}
            >
              <span>Tư vấn</span>
              <Rocket className="w-3 h-3 text-white" />
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
              aria-label="Mở danh mục điều hướng"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Light Theme) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-slate-900">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2 text-xs font-bold text-slate-700 hover:text-[#EC1420] hover:bg-slate-50 rounded-lg transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:0909163821"
                onClick={() => trackPhoneClick('header_mobile_drawer')}
                className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 py-2 rounded-lg text-center hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#EC1420]" />
                <span>0909 163 821</span>
              </a>
              <a
                href="https://zalo.me/0909163821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackZaloClick('header_mobile_drawer')}
                className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-[#0068FF] hover:bg-[#0057D9] py-2 rounded-lg text-center transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Zalo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
