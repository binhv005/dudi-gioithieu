import React, { useState } from 'react';
import { REAL_PROJECTS } from '../data/cases';
import { Globe, ExternalLink, Check, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { trackCtaClick } from '../utils/tracking';

export default function CaseStudies() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const project = REAL_PROJECTS[activeProjectIdx];

  return (
    <section id="cases" className="relative py-6 sm:py-8 bg-gradient-to-r from-[#8B0B12] via-[#B91C1C] to-[#DC2626] text-white overflow-hidden">

      {/* Background Subtle Tech Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1.5px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 border border-white/20 text-white text-[10.5px] font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3 h-3 text-red-300" />
              <span>Dự án thực tế</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              Một số dự án DUDI đã thực hiện
            </h2>
          </div>

          {/* Project Switcher Segmented Control Bar */}
          <div className="inline-flex items-center p-1 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-lg self-start sm:self-auto">
            {REAL_PROJECTS.map((p, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProjectIdx(idx)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                      ? 'bg-white text-slate-950 shadow-md scale-[1.02]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  aria-pressed={isActive}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#EC1420]' : 'bg-white/40'}`} />
                  <span>{p.projectNumber}: {p.shortName}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isActive
                      ? 'bg-red-100 text-red-700'
                      : 'bg-white/15 text-white/90'
                    }`}>
                    {p.price.split(' ')[0]}tr
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Project Showcase Card */}
        <div className="relative rounded-2xl bg-black/20 backdrop-blur-sm p-4 sm:p-5 lg:p-6 border border-white/15 shadow-2xl transition-all duration-300 overflow-hidden">

          {/* Ambient Ha Giang Loop Road Background Graphic for Project 1 (Odyssey Ha Giang Loop) */}
          {project.id === 'project-1' && (
            <div className="hidden lg:flex absolute inset-0 pointer-events-none select-none z-0 overflow-hidden items-end justify-end">
              <img
                src="/cases/hagiang-loop-road.jpg"
                alt="Ha Giang Loop Winding Road Background"
                className="w-full max-w-[600px] lg:max-w-[700px] h-full object-cover object-right opacity-25 mix-blend-luminosity transition-opacity duration-500"
                width={800}
                height={450}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0B12] via-[#8B0B12]/60 to-transparent" />
            </div>
          )}

          {/* Ambient Green Tea Hills Background Graphic for Project 2 (Bao Bi Cao Nguyen Xanh) */}
          {project.id === 'project-2' && (
            <div className="hidden sm:flex absolute inset-0 pointer-events-none select-none z-0 overflow-hidden items-end justify-end">
              <img
                src="/cases/caonguyen-hills.webp"
                alt="Cao Nguyen Xanh Tea Hills Background"
                className="w-full max-w-[500px] lg:max-w-[650px] h-auto object-contain object-right-bottom opacity-25 mix-blend-luminosity -mr-4 -mb-3 transition-opacity duration-500"
                width={700}
                height={350}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B0B12]/85 via-[#8B0B12]/40 to-transparent" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center relative z-10">

            {/* Left Column: Website Mockup Screenshot (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group aspect-[16/10] bg-slate-900 border border-white/20 mx-auto w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = project.secondaryImage || '/cases/odyssey-hagiang-hd.jpg';
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 select-none"
                  width={600}
                  height={380}
                  loading="eager"
                />

                {/* Bottom Overlay with URL pill & Quick Link */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <div className="flex items-center gap-1.5 text-white text-xs font-bold drop-shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{project.displayUrl}</span>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCtaClick(`case_img_visit_${project.id}`, project.title, project.url)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EC1420] hover:bg-[#C80F1B] text-white text-[11px] font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Xem web</span>
                    <ExternalLink className="w-3 h-3 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Streamlined, Less Text (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">

              {/* Header: Project Number, Category & Big Price */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
                    {project.projectNumber}
                  </span>
                  <span className="text-xs font-medium text-red-100">
                    {project.category}
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 bg-black/30 px-3 py-1 rounded-xl border border-white/15">
                  <span className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {project.price}
                  </span>
                  <span className="text-[10.5px] font-normal text-red-200">
                    {project.priceUnit}
                  </span>
                </div>
              </div>

              {/* Project Title */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight mb-2">
                {project.title}
              </h3>

              {/* Short 1-sentence Description */}
              <p className="text-xs sm:text-[13px] text-red-100/90 leading-relaxed mb-4 font-normal">
                {project.desc}
              </p>

              {/* 4 Clean Highlights / Deliverables in 2x2 Grid (Short & Clear) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {(project.highlights || project.deliverables).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-white shadow-xs backdrop-blur-xs"
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Action Row: Status & Live CTA Button */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/15">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{project.status}</span>
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick(`case_visit_${project.id}`, project.title, project.url)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-black text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  <span>Truy cập {project.displayUrl}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EC1420]" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Ecosystem Bottom Footer Strip */}
        <div className="mt-3 pt-2 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-red-100">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <Globe className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Khám phá thêm các dự án tiêu biểu tại hệ sinh thái DUDI.</span>
          </div>
          <a
            href="https://dudisoftware.com/projects"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('cases_footer_link', 'dudisoftware.com/projects', 'https://dudisoftware.com/projects')}
            className="underline hover:text-white font-bold inline-flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Xem tất cả dự án tại dudisoftware.com/projects</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </section>
  );
}
