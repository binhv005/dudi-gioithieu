import React, { useState, useEffect, useRef } from 'react';
import { submitLeadApi } from '../api/leads';
import { validateLeadForm } from '../utils/validation';
import {
  trackFormStart,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
  trackPhoneClick,
  trackZaloClick
} from '../utils/tracking';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Loader2,
  Building2,
  User,
  Copy,
  Check
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function LeadForm({ selectedPackage, onSelectPackage }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    companyName: '',
    industry: '',
    customIndustry: '',
    packageId: 'standard',
    pageCount: '5-6',
    features: ['Blog', 'Quản trị CMS'],
    referenceUrl: '',
    description: '',
    consent: true,
    website_company_fax: '' // Honeypot
  });

  const [formState, setFormState] = useState('idle');
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitResult, setSubmitResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const formStartedRef = useRef(false);

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        packageId: selectedPackage
      }));
    }
  }, [selectedPackage]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackFormStart(name, 'lead_form_section');
    }

    if (formState === 'error') {
      setFormState('editing');
    }

    if (type === 'checkbox' && name === 'features') {
      setFormData((prev) => {
        const currentFeatures = prev.features || [];
        if (checked) {
          return { ...prev, features: [...currentFeatures, value] };
        } else {
          return { ...prev, features: currentFeatures.filter((f) => f !== value) };
        }
      });
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleBlur = (field) => {
    const validation = validateLeadForm(formData);
    if (validation.errors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payloadToValidate = {
      ...formData,
      industry: formData.industry === 'other' ? formData.customIndustry : formData.industry
    };

    const validation = validateLeadForm(payloadToValidate);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      setFormState('error');
      trackFormError('validation_failure');

      const firstErrorKey = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
      }
      return;
    }

    setFormState('submitting');
    trackFormSubmit(payloadToValidate.packageId, payloadToValidate.pageCount);

    try {
      const response = await submitLeadApi(payloadToValidate);
      if (response.success) {
        setSubmitResult(response);
        setFormState('success');
        trackFormSuccess(response.lead_id, 'lead_form');
      } else {
        setFormState('error');
        setFieldErrors({ submit: response.message || 'Có lỗi xảy ra khi gửi yêu cầu.' });
        trackFormError('api_error');
      }
    } catch (err) {
      setFormState('error');
      setFieldErrors({ submit: 'Lỗi kết nối máy chủ. Vui lòng liên hệ Hotline 0909 163 821 để được hỗ trợ nhanh.' });
      trackFormError('network_failure');
    }
  };

  const copyLeadId = () => {
    if (submitResult?.lead_id) {
      navigator.clipboard.writeText(submitResult.lead_id);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleResetForm = () => {
    setFormState('idle');
    setSubmitResult(null);
    setFieldErrors({});
    setFormData({
      fullName: '',
      phone: '',
      companyName: '',
      industry: '',
      customIndustry: '',
      packageId: 'standard',
      pageCount: '5-6',
      features: ['Blog', 'Quản trị CMS'],
      referenceUrl: '',
      description: '',
      consent: true,
      website_company_fax: ''
    });
  };

  return (
    <section id="lead-form" className="py-6 sm:py-8 md:py-10 bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 right-1/4 w-60 h-60 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up" distance="30px" duration={600} threshold={0.05}>
          <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#EC1420] text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              Nhận tư vấn & Báo giá
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Gửi yêu cầu tư vấn gói website phù hợp
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
              Điền thông tin bên dưới, DUDI sẽ liên hệ tư vấn sitemap và bảng phạm vi chi tiết.
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Grid: Mascot on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">

          {/* LEFT: Mascot Illustration */}
          <ScrollReveal direction="left" distance="35px" delay={100} duration={650} threshold={0.05} className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center text-center order-2 lg:order-1">
            <div className="relative group max-w-[192px] sm:max-w-[240px] lg:max-w-[276px] mx-auto">
              {/* Mascot background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-red-500/10 to-transparent rounded-full blur-xl pointer-events-none" />

              {/* Mascot Image */}
              <img
                src="/dudi-mascot-laptop.webp"
                alt="DUDI Mascot AI Consultant"
                className="relative z-10 w-full h-auto object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* RIGHT: Compact Form Container */}
          <ScrollReveal direction="up" distance="35px" delay={200} duration={650} threshold={0.05} className="lg:col-span-8 order-1 lg:order-2 relative">

            {/* Robot Head Mascot Peeking at Top-Right Corner */}
            <div className="absolute -top-4 right-2 sm:-top-7 sm:-right-2 md:-top-8 md:-right-3.5 w-10 sm:w-14 md:w-16 z-30 pointer-events-none drop-shadow-lg select-none">
              <img
                src="/robot-head.webp"
                alt="DUDI Robot"
                className="w-full h-auto object-contain transform rotate-6 drop-shadow-md"
                loading="lazy"
              />
            </div>

            {/* Red Gradient Form Card */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#EC1420] via-[#D8121D] to-[#990A12] border-2 border-red-400/40 p-3.5 sm:p-4 shadow-2xl shadow-red-600/35 backdrop-blur-md text-white overflow-hidden">

              {/* Subtle Tech Hexagon Matrix Watermark in Red Card Corner */}
              <div className="absolute -bottom-8 -right-8 w-44 sm:w-56 opacity-15 pointer-events-none select-none mix-blend-overlay">
                <img
                  src="/tech-hexagon-bg.webp"
                  alt=""
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>

              {/* SUCCESS STATE CARD */}
              {formState === 'success' && submitResult && (
                <div className="text-center py-3 space-y-3 animate-in fade-in zoom-in-95 duration-200 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto ring-4 ring-white/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      Yêu cầu đã được gửi thành công!
                    </h3>
                    <p className="text-[11px] text-white/90 max-w-lg mx-auto leading-relaxed">
                      DUDI đã nhận yêu cầu. Bên mình sẽ xem nhu cầu và liên hệ qua số điện thoại/Zalo trong thời gian sớm nhất.
                    </p>
                  </div>

                  {/* Lead Tracking ID Box */}
                  <div className="p-2 rounded-lg bg-slate-950/90 border border-white/25 max-w-sm mx-auto flex items-center justify-between shadow-inner">
                    <div className="text-left">
                      <span className="text-[9.5px] text-slate-300 block font-medium">Mã tra cứu yêu cầu:</span>
                      <span className="text-xs font-mono font-bold text-amber-300">{submitResult.lead_id}</span>
                    </div>
                    <button
                      type="button"
                      onClick={copyLeadId}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                      title="Sao chép mã"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>

                  {/* Quick Contact Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1.5 border-t border-white/20 max-w-sm mx-auto">
                    <a
                      href="tel:0909163821"
                      onClick={() => trackPhoneClick('success_screen')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-[#EC1420] font-black text-xs shadow-md transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#EC1420]" />
                      <span>Gọi ngay: 0909 163 821</span>
                    </a>
                    <a
                      href="https://zalo.me/0909163821"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackZaloClick('success_screen')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs border border-white/20 transition-colors"
                    >
                      <MessageSquare className="w-3 h-3 text-brand-accent" />
                      <span>Nhắn Zalo</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-[10px] text-white/80 hover:text-white underline pt-1 block mx-auto"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              )}

              {/* EDITING / IDLE / SUBMITTING FORM */}
              {formState !== 'success' && (
                <form onSubmit={handleSubmit} noValidate className="space-y-2.5 relative z-10">

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_company_fax">Company Fax</label>
                    <input
                      type="text"
                      id="website_company_fax"
                      name="website_company_fax"
                      value={formData.website_company_fax}
                      onChange={handleFieldChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Error Banner */}
                  {fieldErrors.submit && (
                    <div className="p-2 rounded-lg bg-black/40 border border-white/30 text-amber-200 text-[11px] flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                      <span>{fieldErrors.submit}</span>
                    </div>
                  )}

                  {/* GROUP 1: THÔNG TIN LIÊN HỆ */}
                  <div>
                    <div className="flex items-center gap-1 pb-0.5 mb-1.5 border-b border-white/20">
                      <User className="w-3 h-3 text-amber-200" />
                      <h3 className="text-[10.5px] font-black text-white uppercase tracking-wider">
                        Nhóm 1: Thông tin liên hệ
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" className="block text-[10px] font-bold text-white/95 mb-0.5">
                          Họ và tên <span className="text-amber-300 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleFieldChange}
                          onBlur={() => handleBlur('fullName')}
                          placeholder="Nguyễn Văn A"
                          className={`w-full px-2.5 py-1.5 rounded-lg bg-white border text-[11px] text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition-all ${
                            fieldErrors.fullName
                              ? 'border-amber-300 ring-2 ring-amber-300/60'
                              : 'border-white focus:border-white'
                          }`}
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.fullName}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-[10px] font-bold text-white/95 mb-0.5">
                          Điện thoại / Zalo <span className="text-amber-300 font-black">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFieldChange}
                          onBlur={() => handleBlur('phone')}
                          placeholder="0909163821"
                          className={`w-full px-2.5 py-1.5 rounded-lg bg-white border text-[11px] text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition-all ${
                            fieldErrors.phone
                              ? 'border-amber-300 ring-2 ring-amber-300/60'
                              : 'border-white focus:border-white'
                          }`}
                        />
                        {fieldErrors.phone && (
                          <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.phone}</p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label htmlFor="companyName" className="block text-[10px] font-bold text-white/95 mb-0.5">
                          Tên công ty / Brand <span className="text-amber-300 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleFieldChange}
                          onBlur={() => handleBlur('companyName')}
                          placeholder="Công ty ABC"
                          className={`w-full px-2.5 py-1.5 rounded-lg bg-white border text-[11px] text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition-all ${
                            fieldErrors.companyName
                              ? 'border-amber-300 ring-2 ring-amber-300/60'
                              : 'border-white focus:border-white'
                          }`}
                        />
                        {fieldErrors.companyName && (
                          <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.companyName}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* GROUP 2: NHU CẦU WEBSITE */}
                  <div>
                    <div className="flex items-center gap-1 pb-0.5 mb-1.5 border-b border-white/20">
                      <Building2 className="w-3 h-3 text-amber-200" />
                      <h3 className="text-[10.5px] font-black text-white uppercase tracking-wider">
                        Nhóm 2: Nhu cầu website
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                      {/* Industry */}
                      <div>
                        <label htmlFor="industry" className="block text-[10px] font-bold text-white/95 mb-0.5">
                          Ngành nghề <span className="text-amber-300 font-black">*</span>
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleFieldChange}
                          onBlur={() => handleBlur('industry')}
                          className={`w-full px-2.5 py-1.5 rounded-lg bg-white border text-[11px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition-all [&>option]:bg-white [&>option]:text-slate-900 ${
                            fieldErrors.industry
                              ? 'border-amber-300 ring-2 ring-amber-300/60'
                              : 'border-white focus:border-white'
                          }`}
                        >
                          <option value="">-- Chọn ngành --</option>
                          <option value="Sản xuất / Cơ khí / Công nghiệp">Sản xuất / Cơ khí</option>
                          <option value="Dịch vụ Tư vấn / Pháp lý / Kế toán">Tư vấn / Pháp lý</option>
                          <option value="Xây dựng / Kiến trúc / Nội thất">Xây dựng / Nội thất</option>
                          <option value="Thương mại / Bán buôn / Xuất nhập khẩu">Thương mại / XNK</option>
                          <option value="Công nghệ / Phần mềm / Viễn thông">Công nghệ / Phần mềm</option>
                          <option value="Dịch vụ Tiêu dùng / Vệ sinh / Vận tải">Dịch vụ / Vận tải</option>
                          <option value="other">Ngành nghề khác</option>
                        </select>
                        {fieldErrors.industry && (
                          <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.industry}</p>
                        )}

                        {formData.industry === 'other' && (
                          <input
                            type="text"
                            name="customIndustry"
                            value={formData.customIndustry}
                            onChange={handleFieldChange}
                            placeholder="Nhập tên ngành"
                            className="mt-1 w-full px-2.5 py-1 rounded-lg bg-white border border-white text-[10px] text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
                          />
                        )}
                      </div>

                      {/* Package */}
                      <div>
                        <label htmlFor="packageId" className="block text-[10px] font-bold text-white/95 mb-0.5">
                          Gói quan tâm <span className="text-amber-300 font-black">*</span>
                        </label>
                        <select
                          id="packageId"
                          name="packageId"
                          value={formData.packageId}
                          onChange={handleFieldChange}
                          onBlur={() => handleBlur('packageId')}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-white text-[11px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-white shadow-sm transition-all [&>option]:bg-white [&>option]:text-slate-900"
                        >
                          <option value="basic">Cơ bản (từ 3tr)</option>
                          <option value="standard">Tiêu chuẩn (từ 7tr)</option>
                          <option value="premium">Cao cấp (Thỏa thuận)</option>
                          <option value="unknown">Chưa rõ — Cần tư vấn</option>
                        </select>
                        {fieldErrors.packageId && (
                          <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.packageId}</p>
                        )}
                      </div>

                      {/* Estimated Page Count */}
                      <div>
                        <label htmlFor="pageCount" className="block text-[10px] font-bold text-white/95 mb-0.5">
                          Số trang dự kiến
                        </label>
                        <select
                          id="pageCount"
                          name="pageCount"
                          value={formData.pageCount}
                          onChange={handleFieldChange}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-white text-[11px] text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-white shadow-sm transition-all [&>option]:bg-white [&>option]:text-slate-900"
                        >
                          <option value="1-4">1 – 4 trang (Cơ bản)</option>
                          <option value="5-6">5 – 6 trang (Tiêu chuẩn)</option>
                          <option value="7-12">7 – 12 trang (Cao cấp)</option>
                          <option value="unknown">Chưa rõ số trang</option>
                        </select>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-2">
                      <label className="block text-[10px] font-bold text-white/95 mb-1">
                        Tính năng mong muốn:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { id: 'Blog', label: 'Blog/Tin tức' },
                          { id: 'Quản trị CMS', label: 'Quản trị CMS' },
                          { id: 'Dự án', label: 'Showcase Dự án' },
                          { id: 'Form lead', label: 'Form thu lead' },
                          { id: 'Khác', label: 'Khác' }
                        ].map((f) => (
                          <label
                            key={f.id}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10.5px] cursor-pointer transition-all ${
                              formData.features.includes(f.id)
                                ? 'bg-white text-[#C80F1B] border-white font-black shadow-md ring-2 ring-white/60'
                                : 'bg-white/20 border-white/30 text-white hover:bg-white/30 font-semibold'
                            }`}
                          >
                            <input
                              type="checkbox"
                              name="features"
                              value={f.id}
                              checked={formData.features.includes(f.id)}
                              onChange={handleFieldChange}
                              className="rounded bg-white border-slate-300 text-red-600 focus:ring-0 w-3 h-3 accent-red-600"
                            />
                            <span>{f.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-2.5">
                      <label htmlFor="description" className="block text-[10.5px] font-bold text-white/95 mb-1">
                        Mô tả tóm tắt nhu cầu <span className="text-amber-300 font-black">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleFieldChange}
                        onBlur={() => handleBlur('description')}
                        placeholder="Ví dụ: Công ty cần làm website 5 trang giới thiệu dịch vụ, form báo giá..."
                        className={`w-full px-3 py-2 rounded-xl bg-white border text-[11.5px] leading-relaxed text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm transition-all min-h-[76px] sm:min-h-[88px] resize-y ${
                          fieldErrors.description
                            ? 'border-amber-300 ring-2 ring-amber-300/60'
                            : 'border-white focus:border-white'
                        }`}
                      />
                      {fieldErrors.description && (
                        <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.description}</p>
                      )}
                    </div>

                    {/* Consent */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="consent"
                          id="consent"
                          checked={formData.consent}
                          onChange={handleFieldChange}
                          className="rounded bg-white border-white/40 text-red-600 focus:ring-0 w-3.5 h-3.5 shrink-0 accent-red-600"
                        />
                        <span className="text-[10px] text-white/95 font-medium leading-none">
                          Tôi đồng ý để <strong>DUDI Software</strong> liên hệ tư vấn theo thông tin trên.
                        </span>
                      </label>
                      {fieldErrors.consent && (
                        <p className="mt-0.5 text-[9px] font-medium text-amber-200">{fieldErrors.consent}</p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="text-[9.5px] text-white/80 text-center sm:text-left">
                      Phản hồi nhanh qua Zalo / Hotline trong giờ làm việc.
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting' || !formData.consent}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-white hover:bg-slate-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-[#EC1420] font-black text-xs shadow-lg shadow-black/20 hover:shadow-xl transition-all cursor-pointer"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EC1420]" />
                          <span>Đang gửi...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#EC1420]" />
                          <span>Gửi yêu cầu nhận tư vấn</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
