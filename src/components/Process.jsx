import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/process';
import ScrollReveal from './ScrollReveal';
import {
  FileQuestion,
  FolderTree,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  Check,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function Process() {
  const [activeStepIdx, setActiveStepIdx] = useState(2); // Step 3 active by default

  const icons = [
    <FileQuestion className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <FolderTree className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Palette className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Code2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />,
    <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
  ];

  const activeStep = PROCESS_STEPS[activeStepIdx];

  return (
    <section id="process" className="py-6 sm:py-8 lg:py-9 bg-white border-t border-slate-200/70 relative overflow-hidden">

      {/* Background Subtle Tech Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E2E8F0 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Tech Hexagon Corner Background - Top Right (Larger & Spread Outward) */}
      <img
        src="/tech-hexagon-bg.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-12 -right-12 sm:-top-16 sm:-right-16 lg:-top-20 lg:-right-20 w-72 sm:w-96 lg:w-[460px] xl:w-[520px] h-auto opacity-40 mix-blend-multiply z-0"
      />

      {/* Tech Hexagon Corner Background - Bottom Left (Larger & Spread Outward) */}
      <img
        src="/tech-hexagon-bg.webp"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-12 -left-12 sm:-bottom-16 sm:-left-16 lg:-bottom-20 lg:-left-20 w-72 sm:w-96 lg:w-[460px] xl:w-[520px] h-auto opacity-40 mix-blend-multiply rotate-180 z-0"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header - Compact */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 border border-amber-300/70 text-amber-950 text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>Quy trình 6 bước</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight mb-1">
            Quy trình phối hợp khoa học
          </h2>
          <p className="text-[11.5px] sm:text-xs text-slate-600 leading-snug max-w-md mx-auto">
            Nguyên tắc chuẩn DUDI: <strong className="text-slate-900 font-bold">Không lập trình trước khi duyệt sitemap và UI chính</strong>.
          </p>
        </div>

        {/* Horizontal Stepper matching Reference Image - Compact */}
        <ScrollReveal direction="up" delay={100} duration={600} threshold={0.1} once={true}>
          <div className="relative py-1 mb-5 sm:mb-6">

            {/* Horizontal Line Connector */}
            <div className="absolute top-[48px] sm:top-[50px] left-[7%] right-[7%] h-[2.5px] bg-slate-200 z-0">
              {/* Completed Active Progress Fill */}
              <div
                className="h-full bg-gradient-to-r from-slate-700 via-slate-800 to-[#EC1420] transition-all duration-500 ease-out"
                style={{
                  width: `${(activeStepIdx / (PROCESS_STEPS.length - 1)) * 100}%`
                }}
              />
            </div>

            {/* Stepper Columns */}
            <div className="grid grid-cols-6 gap-1 sm:gap-2 relative z-10">
              {PROCESS_STEPS.map((item, index) => {
                const isCompleted = index < activeStepIdx;
                const isActive = index === activeStepIdx;
                const isUpcoming = index > activeStepIdx;

                return (
                  <div
                    key={item.step}
                    onClick={() => setActiveStepIdx(index)}
                    className="flex flex-col items-center text-center cursor-pointer group select-none transition-all duration-300"
                  >
                    {/* 1. Top Icon */}
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1.5">
                      <div className={`transition-all duration-300 ${isActive
                          ? 'text-[#EC1420] scale-110 drop-shadow-xs'
                          : isCompleted
                            ? 'text-slate-700'
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}>
                        {icons[index]}
                      </div>
                    </div>

                    {/* 2. Middle Node Indicator */}
                    <div className="h-7 sm:h-8 flex items-center justify-center mb-1.5">
                      {isCompleted && (
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {isActive && (
                        <div className="relative flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-[#EC1420] text-white flex items-center justify-center shadow-sm ring-3 ring-red-100 transition-transform duration-300 group-hover:scale-110">
                            <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping opacity-75 absolute" />
                            <div className="w-2 h-2 rounded-full bg-white relative z-10" />
                          </div>
                        </div>
                      )}

                      {isUpcoming && (
                        <div className="w-4.5 h-4.5 rounded-full bg-[#FAF7F2] border-2 border-slate-300 transition-all duration-300 group-hover:border-slate-400 group-hover:scale-110" />
                      )}
                    </div>

                    {/* 3. Bottom Step Title */}
                    <div className="max-w-[95px] sm:max-w-[115px]">
                      <span className={`text-[9.5px] sm:text-[11px] font-bold block leading-tight transition-colors duration-200 ${isActive
                          ? 'text-[#EC1420] font-black'
                          : isCompleted
                            ? 'text-slate-800'
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}>
                        {item.title}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

        {/* Dynamic Detail Card for the Selected/Active Step - Full Red Theme */}
        <ScrollReveal direction="up" delay={180} duration={500} threshold={0.1} once={true}>
          <div className="max-w-2xl mx-auto rounded-2xl bg-gradient-to-r from-[#8B0B12] via-[#B91C1C] to-[#DC2626] text-white p-4 sm:p-5 border border-white/20 shadow-xl shadow-red-950/25 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 mb-3 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-white text-[#8B0B12] font-mono font-black text-[11px] flex items-center justify-center shadow-xs">
                  {activeStep.step}
                </span>
                <div>
                  <span className="text-[9.5px] font-mono font-bold text-red-200 uppercase tracking-wider">Đang xem chi tiết</span>
                  <h3 className="text-sm sm:text-[15px] font-black text-white leading-snug">
                    {activeStep.title}
                  </h3>
                </div>
              </div>

              {/* Step Navigation Pill */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  type="button"
                  disabled={activeStepIdx === 0}
                  onClick={() => setActiveStepIdx(prev => Math.max(0, prev - 1))}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-white/25 text-white hover:bg-white/15 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  ← Trước
                </button>
                <button
                  type="button"
                  disabled={activeStepIdx === PROCESS_STEPS.length - 1}
                  onClick={() => setActiveStepIdx(prev => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white text-slate-950 hover:bg-red-50 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Tiếp theo</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Description & Deliverable Output Boxes - Bright High-Contrast Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">

              {/* Left Box: Nội dung thực hiện */}
              <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-md border border-red-100/60 text-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EC1420] block mb-1">
                  Nội dung thực hiện:
                </span>
                <p className="text-slate-700 leading-snug font-medium text-[11.5px] sm:text-xs">
                  {activeStep.desc}
                </p>
              </div>

              {/* Right Box: Đầu ra bàn giao */}
              <div className="bg-white rounded-xl p-3 sm:p-3.5 shadow-md border border-red-100/60 text-slate-900 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Đầu ra bàn giao:
                  </span>
                  <p className="text-slate-900 font-extrabold text-[12px] sm:text-[13px] leading-snug">
                    {activeStep.output}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-2 text-[10.5px] text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Nghiệm thu trước khi chuyển bước</span>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
