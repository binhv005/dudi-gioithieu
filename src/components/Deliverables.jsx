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
  Sparkles
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Deliverables() {
  const cards = [
    {
      id: 'cross-device',
      tag: 'Cross-Device Experience',
      tagColor: 'text-red-700 bg-red-50 border-red-200/60',
      icon: <Smartphone className="w-4 h-4 text-slate-400" />,
      title: 'Responsive Toàn Diện Đa Màn Hình',
      desc: 'Hiển thị mượt mà từ iPhone (375px), iPad (768px) đến màn hình 4K sắc nét.'
    },
    {
      id: 'pagespeed',
      tag: 'PageSpeed Score',
      tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      title: 'Tối Ưu Tốc Độ & Core Web Vitals',
      desc: 'Nén WebP tự động, lazy-load tài nguyên, tải trang dưới 1.5s mượt mà.'
    },
    {
      id: 'admin-cms',
      tag: 'Admin CMS',
      tagColor: 'text-red-700 bg-red-50 border-red-200/60',
      icon: <Settings className="w-4 h-4 text-slate-400" />,
      title: 'Quản Trị CRUD Dễ Dàng',
      desc: 'Tự thêm, sửa, xóa bài viết và dịch vụ trực quan không cần biết lập trình.'
    },
    {
      id: 'lead-capture',
      tag: 'Lead Capture',
      tagColor: 'text-amber-800 bg-amber-50 border-amber-200/60',
      icon: <Mail className="w-4 h-4 text-slate-400" />,
      title: 'Form Thu Lead & Anti-Spam',
      desc: 'Tự bắt tham số UTM, validate regex SĐT VN, Honeypot chặn bot.'
    },
    {
      id: 'seo-schema',
      tag: 'Search Engine',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200/60',
      icon: <Search className="w-4 h-4 text-slate-400" />,
      title: 'SEO On-page & Schema',
      desc: 'Thẻ Title, Meta, Sitemap.xml, Robots.txt, cấu trúc JSON-LD chuẩn.'
    },
    {
      id: 'security-ssl',
      tag: 'Security & Source Code',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200/60',
      icon: <ShieldCheck className="w-4 h-4 text-blue-500" />,
      title: 'Bảo Mật SSL & Toàn Quyền Mã Nguồn',
      desc: 'Chứng chỉ SSL 256-bit, bàn giao 100% mã nguồn sạch và cơ sở dữ liệu.'
    },
    {
      id: 'ui-ux',
      tag: 'B2B Tech UI/UX',
      tagColor: 'text-rose-700 bg-rose-50 border-rose-200/60',
      icon: <Layout className="w-4 h-4 text-rose-500" />,
      title: 'Giao Diện Chuẩn Nhận Diện B2B',
      desc: 'Phân cấp thị giác khoa học, hình ảnh sắc nét, tăng tỷ lệ chuyển đổi.'
    },
    {
      id: 'handover-docs',
      tag: 'Handover & Support',
      tagColor: 'text-teal-700 bg-teal-50 border-teal-200/60',
      icon: <BookOpen className="w-4 h-4 text-teal-600" />,
      title: 'Tài Liệu & Hướng Dẫn Vận Hành',
      desc: 'Video quay màn hình chi tiết, hướng dẫn nhân viên quản trị từ A-Z.'
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

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up" distance="30px" duration={600} threshold={0.05}>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-surface border border-red-200/80 text-brand-primary text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-red-500" />
              <span>Đầu ra sản phẩm</span>
            </div>
            <h2 className="text-2xl sm:text-[28px] lg:text-3xl 2xl:text-4xl font-extrabold text-slate-900 tracking-tight">
              Những hạng mục thực tế khách hàng nhận được
            </h2>
            <p className="mt-1 text-xs sm:text-[13px] 2xl:text-base text-slate-600">
              Trực quan hóa chuẩn kỹ thuật và các module hoàn thiện bàn giao khi nghiệm thu.
            </p>
          </div>
        </ScrollReveal>

      </div>

      {/* Infinite Horizontal Auto-scrolling Cards Marquee with Gradient Fade Edges */}
      <ScrollReveal direction="up" distance="35px" delay={150} duration={700} threshold={0.05}>
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
                className="w-[280px] sm:w-[320px] lg:w-[350px] 2xl:w-[400px] shrink-0 rounded-2xl bg-white p-4 sm:p-5 2xl:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-red-300/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer group select-none"
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
                  <h3 className="text-[15px] sm:text-base font-extrabold text-slate-900 group-hover:text-[#EC1420] transition-colors mb-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </ScrollReveal>

    </section>
  );
}
