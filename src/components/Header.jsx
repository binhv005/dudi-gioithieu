import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ChevronRight, User, Rocket } from 'lucide-react';
import { trackCtaClick, trackPhoneClick, trackZaloClick } from '../utils/tracking';

export default function Header({ onSelectPackage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Đối tượng', href: '#audience' },
    { name: 'Vấn đề', href: '#problems' },
    { name: 'Phạm vi', href: '#deliverables' },
    { name: 'Bảng giá', href: '#pricing' },
    { name: 'Case mẫu', href: '#cases' },
    { name: 'Quy trình', href: '#process' },
    { name: 'FAQ', href: '#faq' },
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
          ? 'bg-[#021836]/95 backdrop-blur-md border-b border-white/10 shadow-xl py-2.5'
          : 'bg-[#021836]/90 backdrop-blur-sm py-3 border-b border-white/10'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-0.5 cursor-pointer"
            aria-label="Công ty TNHH Giải Pháp Phần Mềm DUDI - Về đầu trang"
          >
            <img
              src="/logo.webp"
              alt="Công ty TNHH Giải Pháp Phần Mềm DUDI"
              width="36"
              height="36"
              loading="eager"
              fetchPriority="high"
              className="w-9 h-9 rounded-lg object-contain shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-white leading-none group-hover:text-red-400 transition-colors">
                DUDI<span className="text-brand-primary font-bold"> SOFTWARE</span>
              </span>
              <span className="text-[9px] font-semibold text-slate-300/80 tracking-widest uppercase mt-0.5">
                GIẢI PHÁP PHẦN MỀM
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Pure Brand Red CTA Button with Lucide Rocket Icon */}
            <a
              href="#lead-form"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-2 text-xs font-extrabold text-white bg-[#EC1420] hover:bg-[#C80F1B] active:scale-95 px-5 py-2.5 rounded-full shadow-lg shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200 cursor-pointer flex-shrink-0"
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
              className="p-1.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Mở danh mục điều hướng"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#021836] border-b border-white/15 px-4 pt-2 pb-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-white">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:0909163821"
                onClick={() => trackPhoneClick('header_mobile_drawer')}
                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-200 bg-white/10 py-2 rounded-lg text-center"
              >
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>0909 163 821</span>
              </a>
              <a
                href="https://zalo.me/0909163821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackZaloClick('header_mobile_drawer')}
                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-[#EC1420] py-2 rounded-lg text-center"
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
