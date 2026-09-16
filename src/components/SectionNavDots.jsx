import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'audience', label: 'Đối tượng' },
  { id: 'problems', label: 'Vấn đề' },
  { id: 'deliverables', label: 'Phạm vi' },
  { id: 'pricing', label: 'Bảng giá' },
  { id: 'cases', label: 'Case mẫu' },
  { id: 'process', label: 'Quy trình' },
  { id: 'faq', label: 'FAQ' },
  { id: 'lead-form', label: 'Tư vấn' }
];

export default function SectionNavDots() {
  const [activeSection, setActiveSection] = useState('');
  const [showDots, setShowDots] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowDots(scrollY > 250);

      for (const item of SECTIONS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260 && rect.bottom >= 260) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!showDots) return null;

  return (
    <div
      aria-label="Điều hướng nhanh trang"
      className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 p-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 shadow-xl transition-all duration-500 animate-in fade-in slide-in-from-right-4"
    >
      {SECTIONS.map((sec, idx) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={sec.id}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Tooltip on Hover */}
            {isHovered && (
              <div className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-slate-900/95 text-white text-[11px] font-bold whitespace-nowrap shadow-xl border border-white/20 pointer-events-none animate-in fade-in slide-in-from-right-2 duration-150">
                {sec.label}
              </div>
            )}

            {/* Dot Button */}
            <button
              type="button"
              onClick={() => handleDotClick(sec.id)}
              aria-label={`Cuộn đến phần ${sec.label}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#EC1420] ring-4 ring-red-500/30 scale-130 shadow-md shadow-red-500/50'
                  : 'bg-white/50 hover:bg-white hover:scale-125'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
