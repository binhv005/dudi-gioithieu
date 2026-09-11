import React from 'react';
import {
  Smartphone,
  Zap,
  Settings,
  Mail,
  Search,
  ShieldCheck,
  Layout,
  BookOpen,
  CheckCircle,
  Check,
  Sparkles,
  Lock
} from 'lucide-react';

export default function Deliverables() {
  const cards = [
    {
      id: 'cross-device',
      tag: 'Cross-Device Experience',
      tagColor: 'text-red-700 bg-red-50 border-red-200/60',
      icon: <Smartphone className="w-4 h-4 text-slate-400" />,
      title: 'Responsive Toàn Diện Đa Màn Hình',
      desc: 'Hiển thị mượt mà từ iPhone (375px), iPad (768px) đến màn hình 4K sắc nét.',
      renderSnippet: () => (
        <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800 text-white flex items-center justify-around gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-10 rounded-md border-2 border-slate-700 bg-slate-800 flex flex-col items-center justify-between p-1">
              <div className="w-2 h-0.5 bg-slate-600 rounded" />
              <div className="w-3.5 h-4 bg-red-500/40 rounded-xs" />
              <div className="w-1 h-1 rounded-full bg-slate-600" />
            </div>
            <div className="text-[10.5px]">
              <div className="font-bold">Mobile First</div>
              <div className="text-slate-400 text-[9.5px]">Tối ưu chạm vuốt</div>
            </div>
          </div>
          <div className="h-7 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="w-12 h-8 rounded-md border-2 border-slate-700 bg-slate-800 flex flex-col items-center justify-between p-1">
              <div className="w-full h-1 bg-slate-700 rounded-xs" />
              <div className="w-7 h-2.5 bg-red-500/30 rounded-xs" />
              <div className="w-2.5 h-0.5 bg-slate-600 rounded" />
            </div>
            <div className="text-[10.5px]">
              <div className="font-bold">Desktop / Laptop</div>
              <div className="text-slate-400 text-[9.5px]">Bố cục phân tầng</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'pagespeed',
      tag: 'PageSpeed Score',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      title: 'Tối Ưu Tốc Độ & Core Web Vitals',
      desc: 'Nén WebP tự động, lazy-load tài nguyên, tải trang dưới 1.5s mượt mà.',
      renderSnippet: () => (
        <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center font-mono font-black text-emerald-700 text-xs bg-white shadow-2xs">
              99
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900">LCP 0.8s • CLS 0.0</div>
              <div className="text-[9.5px] text-emerald-700 font-semibold">Tải tức thì, không giật khung</div>
            </div>
          </div>
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        </div>
      )
    },
    {
      id: 'admin-cms',
      tag: 'Admin CMS',
      tagColor: 'text-red-700 bg-red-50 border-red-200/60',
      icon: <Settings className="w-4 h-4 text-slate-400" />,
      title: 'Quản Trị CRUD Dễ Dàng',
      desc: 'Tự thêm, sửa, xóa bài viết và dịch vụ trực quan không cần biết lập trình.',
      renderSnippet: () => (
        <div className="rounded-xl bg-slate-900 p-3 text-white text-[11px] space-y-1.5 font-mono">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-slate-400 text-[9.5px]">Trạng thái bài viết:</span>
            <span className="text-[8.5px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Published</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px] text-slate-300">
            <span className="truncate max-w-[170px]">Dịch vụ Cơ khí chính xác</span>
            <span className="text-slate-500 shrink-0">Edit / Delete</span>
          </div>
        </div>
      )
    },
    {
      id: 'lead-capture',
      tag: 'Lead Capture',
      tagColor: 'text-amber-800 bg-amber-50 border-amber-200/60',
      icon: <Mail className="w-4 h-4 text-slate-400" />,
      title: 'Form Thu Lead & Anti-Spam',
      desc: 'Tự bắt tham số UTM, validate regex SĐT VN, Honeypot chặn bot.',
      renderSnippet: () => (
        <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-200/80 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-slate-500">UTM Source:</span>
            <span className="font-mono font-bold text-slate-800">google_ads / fb_ads</span>
          </div>
          <div className="flex items-center justify-between text-[9.5px]">
            <span className="text-slate-500">Honeypot Shield:</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> Active Bot-Blocker
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'seo-schema',
      tag: 'Search Engine',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200/60',
      icon: <Search className="w-4 h-4 text-slate-400" />,
      title: 'SEO On-page & Schema',
      desc: 'Thẻ Title, Meta, Sitemap.xml, Robots.txt, cấu trúc JSON-LD chuẩn.',
      renderSnippet: () => (
        <div className="rounded-xl bg-slate-900 p-2.5 text-[9.5px] font-mono text-slate-300 border border-slate-800 space-y-0.5">
          <div className="text-emerald-400">@context: "schema.org"</div>
          <div className="text-red-300">@type: "ProfessionalService"</div>
          <div className="text-slate-400 truncate">name: "DUDI Software Co."</div>
        </div>
      )
    },
    {
      id: 'security-ssl',
      tag: 'Security & Source Code',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200/60',
      icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
      title: 'Bảo Mật SSL & Toàn Quyền Mã Nguồn',
      desc: 'Chứng chỉ SSL 256-bit, bàn giao 100% mã nguồn sạch và cơ sở dữ liệu.',
      renderSnippet: () => (
        <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 p-2.5 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-bold text-slate-800">SSL 256-bit HTTPS</span>
          </div>
          <span className="text-[9px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded font-bold">
            100% Clean Code
          </span>
        </div>
      )
    },
    {
      id: 'ui-ux',
      tag: 'B2B Tech UI/UX',
      tagColor: 'text-rose-700 bg-rose-50 border-rose-200/60',
      icon: <Layout className="w-4 h-4 text-rose-500" />,
      title: 'Giao Diện Chuẩn Nhận Diện B2B',
      desc: 'Phân cấp thị giác khoa học, hình ảnh sắc nét, tăng tỷ lệ chuyển đổi.',
      renderSnippet: () => (
        <div className="rounded-xl bg-slate-900 p-2.5 border border-slate-800 text-white flex items-center justify-between text-[9.5px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EC1420]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span className="font-mono text-slate-300 ml-1">Design Token System</span>
          </div>
          <span className="text-emerald-400 font-bold">Pixel Perfect</span>
        </div>
      )
    },
    {
      id: 'handover-docs',
      tag: 'Handover & Support',
      tagColor: 'text-teal-700 bg-teal-50 border-teal-200/60',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      title: 'Tài Liệu & Hướng Dẫn Vận Hành',
      desc: 'Video quay màn hình chi tiết, hướng dẫn nhân viên quản trị từ A-Z.',
      renderSnippet: () => (
        <div className="rounded-xl bg-teal-50/70 border border-teal-200/80 p-2.5 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
            <span className="font-bold text-slate-800">Video Tutorial HD</span>
          </div>
          <span className="text-[9px] text-teal-800 font-bold bg-teal-100/80 px-2 py-0.5 rounded">
            Bảo hành 12 tháng
          </span>
        </div>
      )
    }
  ];

  // Duplicate cards for infinite seamless loop
  const marqueeCards = [...cards, ...cards];

  return (
    <section id="deliverables" className="py-10 md:py-14 bg-white border-y border-slate-200/60 overflow-hidden relative">

      {/* Scoped CSS Keyframe for Infinite Marquee */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes deliverablesInfiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .deliverables-scroll-track {
          display: flex;
          gap: 1.25rem;
          width: max-content;
          animation: deliverablesInfiniteScroll 36s linear infinite;
          will-change: transform;
        }
        .deliverables-scroll-track:hover {
          animation-play-state: paused !important;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-surface border border-red-200/80 text-brand-primary text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span>Đầu ra sản phẩm</span>
          </div>
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
            Những hạng mục thực tế khách hàng nhận được
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] text-slate-600">
            Trực quan hóa chuẩn kỹ thuật và các module hoàn thiện bàn giao khi nghiệm thu.
          </p>
        </div>

      </div>

      {/* Infinite Horizontal Auto-scrolling Cards Marquee with Gradient Fade Edges */}
      <div className="relative w-full overflow-hidden py-3">

        {/* Left Gradient Edge Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-20" />

        {/* Right Gradient Edge Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-20" />

        {/* Scrolling Track */}
        <div className="deliverables-scroll-track px-4">
          {marqueeCards.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[310px] sm:w-[350px] lg:w-[370px] shrink-0 rounded-2xl bg-white p-4.5 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-red-300/80 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group select-none"
            >
              <div>
                {/* Tag and Top Icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10.5px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <div className="p-1 rounded-md bg-slate-50 group-hover:bg-red-50 transition-colors">
                    {item.icon}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-[15.5px] sm:text-base font-extrabold text-slate-900 group-hover:text-[#EC1420] transition-colors mb-1 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Interactive Visual Mockup Snippet */}
              <div className="mt-auto transition-transform duration-300 group-hover:scale-[1.01]">
                {item.renderSnippet()}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
