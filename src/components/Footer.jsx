import React from 'react';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, FileCheck, ArrowUp } from 'lucide-react';
import { trackPhoneClick, trackZaloClick } from '../utils/tracking';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Legal Entity Info (Zero-Tolerance Exactness) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.webp"
                alt="Công ty TNHH Giải Pháp Phần Mềm DUDI"
                width="36"
                height="36"
                loading="lazy"
                className="w-9 h-9 rounded-xl object-contain shadow-xs"
              />
              <span className="text-base font-extrabold text-white tracking-tight">
                DUDI<span className="text-brand-primary"> Software</span>
              </span>
            </div>

            {/* Exact Legal Name */}
            <div className="text-sm font-bold text-slate-200">
              Công ty TNHH Giải Pháp Phần Mềm DUDI
            </div>

            <p className="text-slate-400 leading-relaxed max-w-md text-xs">
              Đơn vị cung cấp giải pháp thiết kế website giới thiệu doanh nghiệp chuẩn mực, tối ưu trải nghiệm người dùng và chuyển giao công nghệ toàn diện.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span><strong>Mã số thuế:</strong> 0319641544</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span><strong>Địa chỉ:</strong> 49/2 Đường 14, Phường Thủ Đức, TP.HCM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Direct Contact Channels */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Liên Hệ Trực Tiếp
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <a
                href="tel:0909163821"
                onClick={() => trackPhoneClick('footer')}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                </div>
                <span>Hotline: <strong>0909 163 821</strong></span>
              </a>

              <a
                href="mailto:contact@dudisoftware.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                  <Mail className="w-3.5 h-3.5 text-brand-primary" />
                </div>
                <span>contact@dudisoftware.com</span>
              </a>

              <a
                href="https://zalo.me/0909163821"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackZaloClick('footer')}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-primary" />
                </div>
                <span>Zalo OA: 0909 163 821</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation & Compliance */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Điều Khoản & Minh Bạch
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>• Minh bạch phạm vi theo hợp đồng</li>
              <li>• Nghiệm thu theo từng mốc kỹ thuật</li>
              <li>• Hỗ trợ xử lý lỗi phát sinh sau bàn giao</li>
              <li>• Bảo mật thông tin khách hàng</li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Về đầu trang</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Copyright © 2026 DUDI Software. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Thông tin đăng ký kinh doanh chính thức</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
