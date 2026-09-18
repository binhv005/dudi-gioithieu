import React, { useState } from 'react';
import { PROBLEMS } from '../data/problems';
import {
  Globe,
  Share2,
  ShieldAlert,
  FolderKanban,
  MessageSquareDashed,
  Lock,
  AlertTriangle
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Problems() {
  const [hoveredId, setHoveredId] = useState(null);

  const problemConfigs = [
    {
      id: 'prob-1',
      num: '01',
      color: '#EC1420',
      icon: <Globe className="w-3.5 h-3.5 text-white" />,
      // Angle: 270 deg (Top)
      posClass: 'top-[12.5%] left-1/2 -translate-x-1/2 -translate-y-1/2',
      cardPosClass: 'left-full top-1/2 -translate-y-1/2 ml-2',
      labelPosClass: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
    },
    {
      id: 'prob-2',
      num: '02',
      color: '#EC1420',
      icon: <Share2 className="w-3.5 h-3.5 text-white" />,
      // Angle: 330 deg (Top Right)
      posClass: 'top-[31.25%] left-[82.5%] -translate-x-1/2 -translate-y-1/2',
      cardPosClass: 'left-full top-1/2 -translate-y-1/2 ml-2',
      labelPosClass: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
    },
    {
      id: 'prob-3',
      num: '03',
      color: '#EC1420',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-white" />,
      // Angle: 30 deg (Bottom Right)
      posClass: 'top-[68.75%] left-[82.5%] -translate-x-1/2 -translate-y-1/2',
      cardPosClass: 'left-full top-1/2 -translate-y-1/2 ml-2',
      labelPosClass: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
    },
    {
      id: 'prob-4',
      num: '04',
      color: '#EC1420',
      icon: <FolderKanban className="w-3.5 h-3.5 text-white" />,
      // Angle: 90 deg (Bottom)
      posClass: 'top-[87.5%] left-1/2 -translate-x-1/2 -translate-y-1/2',
      cardPosClass: 'left-full top-1/2 -translate-y-1/2 ml-2',
      labelPosClass: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
    },
    {
      id: 'prob-5',
      num: '05',
      color: '#EC1420',
      icon: <MessageSquareDashed className="w-3.5 h-3.5 text-white" />,
      // Angle: 150 deg (Bottom Left)
      posClass: 'top-[68.75%] left-[17.5%] -translate-x-1/2 -translate-y-1/2',
      cardPosClass: 'right-full top-1/2 -translate-y-1/2 mr-2',
      labelPosClass: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    },
    {
      id: 'prob-6',
      num: '06',
      color: '#EC1420',
      icon: <Lock className="w-3.5 h-3.5 text-white" />,
      // Angle: 210 deg (Top Left)
      posClass: 'top-[31.25%] left-[17.5%] -translate-x-1/2 -translate-y-1/2',
      cardPosClass: 'right-full top-1/2 -translate-y-1/2 mr-2',
      labelPosClass: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    },
  ];

  return (
    <section id="problems" className="py-4 sm:py-5 lg:py-6 bg-slate-50 border-y border-slate-200/70 relative overflow-hidden">

      {/* Background Subtle Tech Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up" distance="30px" duration={600} threshold={0.05}>
          <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-3">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200/90 text-red-600 text-[10px] font-black uppercase tracking-wider mb-1 shadow-2xs">
              <AlertTriangle className="w-3 h-3 text-red-500" />
              <span>Thực trạng doanh nghiệp</span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-[22px] 2xl:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Rào cản khi chưa sở hữu website bài bản
            </h2>
            <p className="text-[11px] sm:text-xs 2xl:text-sm text-slate-500 mt-0.5 font-normal">
              Tránh lãng phí ngân sách và rủi ro thất thoát khách hàng tiềm năng.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop Layout: 3 Columns */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-3 xl:gap-6 2xl:gap-8 items-center">

          {/* Left Column: 2 Sleek Pain-Point Metric Cards */}
          <ScrollReveal direction="left" distance="35px" delay={100} duration={650} threshold={0.05} className="lg:col-span-3">
            <div className="flex flex-col gap-2.5 2xl:gap-3.5">
              <div className="flex items-center gap-1.5 pb-0.5 border-b border-red-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Tác động chuyển đổi</span>
              </div>

              {/* Left Card 1 */}
              <div className="bg-white/95 rounded-xl p-3 2xl:p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-400/60 transition-all duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                    75% Khách hàng
                  </span>
                </div>
                <h3 className="text-xs 2xl:text-sm font-black text-slate-900 leading-snug">
                  Mất uy tín ngay từ đầu
                </h3>
              </div>

              {/* Left Card 2 */}
              <div className="bg-white/95 rounded-xl p-3 2xl:p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-400/60 transition-all duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Lãng phí 3.2x
                  </span>
                </div>
                <h3 className="text-xs 2xl:text-sm font-black text-slate-900 leading-snug">
                  Thất thoát chi phí Ads
                </h3>
              </div>
            </div>
          </ScrollReveal>

          {/* Center Column: 360° Circular Wheel */}
          <ScrollReveal direction="zoom" distance="20px" delay={200} duration={700} threshold={0.05} className="lg:col-span-6 flex justify-center items-center">
            <div className="relative w-[340px] h-[340px] xl:w-[380px] xl:h-[380px] 2xl:w-[440px] 2xl:h-[440px] flex items-center justify-center">

              {/* Outer Circular SVG Track */}
              <svg viewBox="0 0 360 360" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <circle
                  cx="180"
                  cy="180"
                  r="135"
                  fill="none"
                  stroke="#EC1420"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="opacity-85"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="105"
                  fill="none"
                  stroke="#FCA5A5"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  className="opacity-50"
                />
              </svg>

              {/* Central Mascot Robot Head */}
              <div className="relative z-10 w-[160px] h-[160px] 2xl:w-[200px] 2xl:h-[200px] flex items-center justify-center pointer-events-none select-none">
                <div className="absolute inset-2 bg-red-500/15 rounded-full blur-xl animate-pulse" />
                <img
                  src="/robot-head.webp"
                  alt="DUDI AI Mascot Robot"
                  className="w-[145px] h-[145px] xl:w-[165px] xl:h-[165px] 2xl:w-[195px] 2xl:h-[195px] object-contain drop-shadow-[0_12px_24px_rgba(236,20,32,0.25)] transition-transform duration-300 hover:scale-105"
                  width={290}
                  height={290}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* 6 Circular Nodes with Side Hover Detail Cards */}
              {problemConfigs.map((cfg, index) => {
                const prob = PROBLEMS[index];
                const isHovered = hoveredId === prob.id;

                return (
                  <div
                    key={cfg.id}
                    onMouseEnter={() => setHoveredId(prob.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`absolute ${cfg.posClass} z-20 cursor-pointer group`}
                  >
                    {/* Default Small Title Pill */}
                    {!isHovered && (
                      <div className={`absolute ${cfg.labelPosClass} whitespace-nowrap pointer-events-none transition-all duration-200 opacity-95 group-hover:opacity-100`}>
                        <span className="px-2 py-1 rounded-full bg-white/95 border border-red-200 shadow-xs text-[10px] font-bold text-slate-800 flex items-center gap-1 backdrop-blur-xs">
                          <span>{prob.title}</span>
                        </span>
                      </div>
                    )}

                    {/* Expanded Detail Card on Hover */}
                    {isHovered && (
                      <div className={`absolute ${cfg.cardPosClass} z-50 w-[230px] bg-white rounded-xl p-3 border-2 border-red-500 shadow-xl ring-4 ring-red-500/15 pointer-events-none animate-fade-in`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-5 h-5 rounded-full bg-brand-primary text-white font-black text-[10px] flex items-center justify-center shadow-xs">
                            {cfg.num}
                          </div>
                          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded-full border border-red-200">
                            {prob.badge}
                          </span>
                        </div>

                        <h4 className="text-xs font-black text-slate-900 mb-1 leading-tight">
                          {prob.title}
                        </h4>

                        <p className="text-[10px] text-slate-600 leading-snug font-normal mb-1.5">
                          {prob.desc}
                        </p>

                        <div className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-red-600 text-white text-[8.5px] font-black uppercase tracking-wider">
                          <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                          <span>Mức độ: {prob.severity}</span>
                        </div>
                      </div>
                    )}

                    {/* Circular Number Node in Brand Red */}
                    <div
                      className={`w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-brand-primary text-white font-black text-[11px] xl:text-xs flex items-center justify-center shadow-md ring-3 transition-all duration-200 ${isHovered
                          ? 'scale-120 ring-red-400 ring-offset-2 shadow-red-500/40 z-50'
                          : 'ring-white hover:scale-110 shadow-red-500/20'
                        }`}
                    >
                      {cfg.num}
                    </div>
                  </div>
                );
              })}

            </div>
          </ScrollReveal>

          {/* Right Column: 2 Sleek Pain-Point Metric Cards */}
          <ScrollReveal direction="right" distance="35px" delay={300} duration={650} threshold={0.05} className="lg:col-span-3">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 pb-0.5 border-b border-red-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Rủi ro kinh doanh</span>
              </div>

              {/* Right Card 1 */}
              <div className="bg-white/95 rounded-xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-400/60 transition-all duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    88% Doanh nghiệp
                  </span>
                </div>
                <h3 className="text-xs font-black text-slate-900 leading-snug">
                  Khó chào thầu & chốt Deal
                </h3>
              </div>

              {/* Right Card 2 */}
              <div className="bg-white/95 rounded-xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-400/60 transition-all duration-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                    100% Rủi ro
                  </span>
                </div>
                <h3 className="text-xs font-black text-slate-900 leading-snug">
                  Phụ thuộc mạng xã hội
                </h3>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Tablet View (md to lg) */}
        <div className="hidden md:flex lg:hidden justify-center items-center py-2">
          <ScrollReveal direction="zoom" distance="20px" duration={650} threshold={0.05}>
            <div className="relative w-[340px] h-[340px] flex items-center justify-center">
              <svg viewBox="0 0 340 340" className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <circle cx="170" cy="170" r="130" fill="none" stroke="#EC1420" strokeWidth="2" strokeDasharray="6 4" className="opacity-85" />
                <circle cx="170" cy="170" r="100" fill="none" stroke="#FCA5A5" strokeWidth="1" className="opacity-50" />
              </svg>

              <div className="relative z-10 w-[145px] h-[145px] flex items-center justify-center pointer-events-none select-none">
                <img src="/robot-head.webp" alt="DUDI Mascot" className="w-[135px] h-[135px] object-contain drop-shadow-md" width={270} height={270} />
              </div>

              {problemConfigs.map((cfg, index) => {
                const prob = PROBLEMS[index];
                const isHovered = hoveredId === prob.id;

                return (
                  <div key={cfg.id} onMouseEnter={() => setHoveredId(prob.id)} onMouseLeave={() => setHoveredId(null)} className={`absolute ${cfg.posClass} z-20 cursor-pointer group`}>
                    {!isHovered && (
                      <div className={`absolute ${cfg.labelPosClass} whitespace-nowrap pointer-events-none transition-all duration-200 opacity-90 group-hover:opacity-100`}>
                        <span className="px-2 py-0.5 rounded-full bg-white/95 border border-red-200 text-[10px] font-bold text-slate-800">
                          {prob.title}
                        </span>
                      </div>
                    )}

                    {isHovered && (
                      <div className={`absolute ${cfg.cardPosClass} z-40 w-[220px] bg-white rounded-xl p-3 border-2 border-red-500 shadow-xl pointer-events-none animate-fade-in`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-5 h-5 rounded-full bg-brand-primary text-white font-black text-[10px] flex items-center justify-center">
                            {cfg.num}
                          </div>
                          <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded-full border border-red-200">
                            {prob.badge}
                          </span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900 mb-0.5">{prob.title}</h4>
                        <p className="text-[10px] text-slate-600 leading-snug mb-1">{prob.desc}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-red-600 text-white text-[8.5px] font-black uppercase">
                          Mức độ: {prob.severity}
                        </span>
                      </div>
                    )}

                    <div className={`w-8 h-8 rounded-full bg-brand-primary text-white font-black text-[11px] flex items-center justify-center shadow-md ring-2 transition-all ${isHovered ? 'scale-115 ring-red-400' : 'ring-white hover:scale-105'}`}>
                      {cfg.num}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-2.5">
          <ScrollReveal direction="up" distance="25px" duration={600} threshold={0.05}>
            <div className="flex justify-center mb-0.5">
              <img src="/robot-head.webp" alt="DUDI Mascot" className="w-16 h-16 object-contain drop-shadow-md" width={64} height={64} />
            </div>

            <div className="flex items-center justify-center gap-1.5 flex-wrap mb-2">
              {problemConfigs.map((cfg, idx) => {
                const prob = PROBLEMS[idx];
                const isSelected = hoveredId === prob.id || (!hoveredId && idx === 0);

                return (
                  <button
                    key={cfg.id}
                    onClick={() => setHoveredId(prob.id)}
                    className={`w-8 h-8 rounded-full bg-brand-primary text-white font-bold text-xs flex items-center justify-center shadow-md transition-all ${isSelected ? 'ring-3 ring-red-400 scale-110' : 'opacity-80'
                      }`}
                  >
                    {cfg.num}
                  </button>
                );
              })}
            </div>

            {(() => {
              const currentProb = PROBLEMS.find(p => p.id === (hoveredId || 'prob-1'));
              const currentCfg = problemConfigs.find(c => c.id === (hoveredId || 'prob-1'));
              return (
                <div className="bg-white rounded-xl p-3 border-2 border-red-200 shadow-xs transition-all">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-brand-primary text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                      {currentCfg.num}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 flex-1">{currentProb.title}</h3>
                    <span className="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded-full border border-red-100">
                      {currentProb.badge}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed mb-1.5">{currentProb.desc}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px]">
                    <span className="text-slate-500">Tác động: {currentProb.badge}</span>
                    <span className="px-2 py-0.2 rounded-full bg-red-600 text-white font-black uppercase">
                      Mức độ: {currentProb.severity}
                    </span>
                  </div>
                </div>
              );
            })()}
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}
