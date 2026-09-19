import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Send, 
  Sparkles, 
  CheckCheck, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const QUICK_SUGGESTIONS = [
  { id: 'pricing', label: '💰 Chi phí & Báo giá chi tiết', query: 'Chi phí thiết kế website tại DUDI khoảng bao nhiêu?' },
  { id: 'services', label: '💡 DUDI cung cấp những dịch vụ gì?', query: 'DUDI cung cấp những giải pháp và dịch vụ gì?' },
  { id: 'process', label: '⚡ Quy trình triển khai dự án', query: 'Quy trình thiết kế và bàn giao website tại DUDI như thế nào?' },
  { id: 'deliverables', label: '📦 Hạng mục bàn giao gồm những gì?', query: 'Khi hoàn thành website tôi sẽ nhận được những gì?' },
  { id: 'contact', label: '📞 Kết nối chuyên viên tư vấn', query: 'Tôi muốn gặp chuyên viên tư vấn trực tiếp' }
];

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: `Xin chào! 👋\nTôi là trợ lý ảo AI của DUDI Software.\nTôi có thể hỗ trợ gì cho dự án website của bạn hôm nay?`,
    time: '10:30',
    type: 'text'
  }
];

export default function AIChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [messages, isTyping, isOpen]);

  // Click outside and Escape key handler to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      const isToggleBtn = event.target.closest('[data-chat-toggle="true"]');
      if (isToggleBtn) return;

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset conversation
  const handleReset = () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Xin chào! 👋\nTôi là trợ lý ảo AI của DUDI Software.\nTôi có thể hỗ trợ gì cho dự án website của bạn hôm nay?`,
        time: timeStr,
        type: 'text'
      }
    ]);
  };

  // Smart Response Engine for DUDI Software
  const generateBotResponse = (userText) => {
    const query = userText.toLowerCase().trim();

    if (query.includes('giá') || query.includes('chi phí') || query.includes('bao nhiêu') || query.includes('gói') || query.includes('báo giá')) {
      return {
        text: `DUDI cung cấp 3 gói thiết kế website linh hoạt, thanh toán một lần minh bạch:\n\n` +
          `• **Gói Cơ bản (3.000.000đ)**: Tối đa 4 trang, giao diện mẫu chuẩn SEO, 100% Mobile Responsive, bàn giao mã nguồn.\n` +
          `• **Gói Tiêu chuẩn (7.000.000đ)**: ⭐ Được chọn nhiều nhất — 6 trang hoàn chỉnh, UI tinh chỉnh theo ngành, tích hợp CMS tự sửa bài viết, chuẩn SEO & GA4.\n` +
          `• **Gói Cao cấp (May đo)**: 8 - 12 trang sitemap riêng, thiết kế UI độc quyền theo Brand Guidelines, quản trị đa nội dung.\n\n` +
          `💡 Bạn có thể bấm nút bên dưới để xem bảng so sánh chi tiết!`,
        actionType: 'pricing'
      };
    }

    if (query.includes('dịch vụ') || query.includes('cung cấp') || query.includes('làm gì') || query.includes('giải pháp')) {
      return {
        text: `DUDI Software chuyên sâu các giải pháp phát triển website doanh nghiệp hiện đại:\n\n` +
          `1. **Thiết kế Website Doanh nghiệp**: Định hình nhận diện thương hiệu chuyên nghiệp, chuyển đổi lead cao.\n` +
          `2. **Tối ưu Tốc độ & Hiệu năng**: Tải trang cực nhanh dưới 2s, đạt điểm chuẩn Core Web Vitals.\n` +
          `3. **Hệ thống Quản trị Nội dung (CMS)**: Giao diện trực quan, dễ dàng thêm/sửa bài viết và dịch vụ.\n` +
          `4. **Bàn giao trọn gói Mã nguồn**: Khách hàng sở hữu 100% source code, không bị khóa nền tảng.`,
        actionType: 'deliverables'
      };
    }

    if (query.includes('quy trình') || query.includes('bước') || query.includes('thời gian') || query.includes('bao lâu')) {
      return {
        text: `Quy trình triển khai tinh gọn 4 bước tại DUDI giúp dự án hoàn thành đúng tiến độ:\n\n` +
          `1. **Tư vấn & Chốt Sitemap**: Thấu hiểu mục tiêu kinh doanh, tư vấn cấu trúc trang tối ưu.\n` +
          `2. **Thiết kế UI/UX**: Lên giao diện trực quan, demo tương tác người dùng thực tế.\n` +
          `3. **Lập trình & Tối ưu SEO**: Viết code sạch, tối ưu Responsive mọi màn hình và tốc độ load.\n` +
          `4. **Nghiệm thu & Bàn giao**: Đào tạo hướng dẫn sử dụng CMS và bàn giao toàn bộ mã nguồn.`,
        actionType: 'process'
      };
    }

    if (query.includes('bàn giao') || query.includes('nhận được') || query.includes('hạng mục') || query.includes('source code')) {
      return {
        text: `Khi hoàn thành dự án, DUDI bàn giao trọn vẹn:\n\n` +
          `✅ Toàn bộ **Mã nguồn (Source Code)** sạch chuẩn công nghệ mới\n` +
          `✅ Hệ thống quản trị nội dung CMS phân quyền rõ ràng\n` +
          `✅ Tài liệu và video hướng dẫn quản trị chi tiết\n` +
          `✅ Cấu hình đầy đủ SEO On-page & kết nối Google Analytics (GA4)`,
        actionType: 'deliverables'
      };
    }

    if (query.includes('liên hệ') || query.includes('tư vấn') || query.includes('số điện thoại') || query.includes('gặp') || query.includes('hotline') || query.includes('zalo')) {
      return {
        text: `Đội ngũ DUDI luôn sẵn sàng lắng nghe và tư vấn giải pháp phù hợp nhất cho bạn:\n\n` +
          `📞 Hotline: **0909 163 821**\n` +
          `💬 Zalo Official: Nhấn nút bên dưới để trao đổi trực tiếp\n` +
          `📝 Hoặc để lại thông tin tại Form Đăng ký để nhận báo giá chi tiết trong vòng 15 phút!`,
        actionType: 'contact'
      };
    }

    // Default response
    return {
      text: `Cảm ơn bạn đã quan tâm đến DUDI Software! DUDI có thể hỗ trợ bạn tư vấn thiết kế website trọn gói, báo giá chi tiết các gói hoặc giải đáp quy trình triển khai.\n\n` +
        `Bạn muốn tìm hiểu thêm về **Bảng giá**, **Hạng mục bàn giao** hay cần **Kết nối chuyên viên tư vấn**?`,
      actionType: 'general'
    };
  };

  // Send message
  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: timeStr,
      type: 'text'
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = generateBotResponse(text);
      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;

      const newBotMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply.text,
        time: botTimeStr,
        actionType: botReply.actionType
      };

      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 sm:inset-auto sm:bottom-6 md:bottom-7 sm:right-20 md:right-22 z-50 flex items-end sm:items-auto justify-center sm:justify-end p-2 sm:p-0 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Cửa sổ trò chuyện với Trợ lý AI DUDI"
    >
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs sm:hidden -z-10" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Chatbox Window */}
      <div 
        ref={modalRef}
        className="w-full sm:w-[385px] md:w-[410px] h-[510px] sm:h-[540px] max-h-[calc(100dvh-4.5rem)] bg-white rounded-3xl sm:rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-200/80 flex flex-col overflow-hidden text-[#0F172A] transition-all"
      >
        
        {/* 1. Header */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Robot Mascot Avatar */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-50 to-red-100 p-1 flex items-center justify-center border border-red-100 shadow-xs">
              <img 
                src="/robot-mascot.webp" 
                alt="Trợ lý AI DUDI" 
                className="w-full h-full object-contain drop-shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </div>

            <div>
              <h3 className="font-bold text-[16px] sm:text-[17px] leading-tight text-slate-900 flex items-center gap-1.5">
                <span>Trợ lý AI DUDI</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              </h3>
              <p className="text-[12px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping opacity-75" />
                <span>Luôn sẵn sàng hỗ trợ bạn</span>
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Làm mới cuộc trò chuyện"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Đóng cửa sổ chat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Messages List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 space-y-4 scroll-smooth bg-slate-50/40">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                <div className={`flex gap-2.5 max-w-[88%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  {isBot && (
                    <div className="w-7 h-7 rounded-xl bg-red-50 p-0.5 flex-shrink-0 flex items-center justify-center border border-red-100 mt-1">
                      <img 
                        src="/robot-mascot.webp" 
                        alt="Bot" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div>
                    {/* Bubble */}
                    <div
                      className={`px-4 py-3 text-[13.5px] sm:text-[14px] leading-relaxed rounded-2xl ${
                        isBot
                          ? 'bg-white text-slate-800 rounded-tl-sm border border-slate-200/80 shadow-xs'
                          : 'bg-gradient-to-r from-[#D60F1A] to-[#EC1420] text-white rounded-tr-sm shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-line select-text">
                        {msg.text.split('\n').map((line, i) => {
                          const parts = line.split(/(\*\*.*?\*\*)/g);
                          return (
                            <React.Fragment key={i}>
                              {parts.map((part, pIdx) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                              {i < msg.text.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          );
                        })}
                      </p>

                      {/* Bot Quick Actions / Shortcuts */}
                      {isBot && msg.actionType && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                          {msg.actionType === 'pricing' && (
                            <button
                              onClick={() => scrollToSection('pricing')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#D60F1A] text-xs font-bold transition-colors cursor-pointer"
                            >
                              <span>Xem Bảng giá chi tiết</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {msg.actionType === 'deliverables' && (
                            <button
                              onClick={() => scrollToSection('deliverables')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#D60F1A] text-xs font-bold transition-colors cursor-pointer"
                            >
                              <span>Xem Hạng mục bàn giao</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {msg.actionType === 'process' && (
                            <button
                              onClick={() => scrollToSection('process')}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#D60F1A] text-xs font-bold transition-colors cursor-pointer"
                            >
                              <span>Xem Quy trình 4 bước</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {msg.actionType === 'contact' && (
                            <>
                              <a
                                href="https://zalo.me/0909163821"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0068FF] hover:bg-[#0057D9] text-white text-xs font-bold transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Nhắn Zalo</span>
                              </a>
                              <button
                                onClick={() => scrollToSection('lead-form')}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                              >
                                <span>Điền Form nhận tư vấn</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className={`text-[11px] text-slate-400 mt-1 flex items-center gap-1 ${isBot ? 'ml-1' : 'justify-end mr-1'}`}>
                      <span>{msg.time}</span>
                      {!isBot && <CheckCheck className="w-3.5 h-3.5 text-red-500" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5 animate-in fade-in duration-150">
              <div className="w-7 h-7 rounded-xl bg-red-50 p-0.5 flex-shrink-0 flex items-center justify-center border border-red-100">
                <img 
                  src="/robot-mascot.webp" 
                  alt="Bot" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-4 py-3 bg-white text-slate-500 rounded-2xl rounded-tl-sm border border-slate-200/80 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. Quick Suggestions Chips */}
        <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-nowrap">
            {QUICK_SUGGESTIONS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleSendMessage(chip.query)}
                className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:border-red-400 hover:text-red-600 hover:bg-red-50/40 transition-all flex-shrink-0 shadow-2xs cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Footer Input Container */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 relative bg-slate-100 rounded-full border border-slate-200 px-3.5 py-1.5 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500 transition-all"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn của bạn..."
              className="flex-1 bg-transparent text-[13.5px] sm:text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none py-1.5"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Gửi tin nhắn"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                inputValue.trim()
                  ? 'bg-gradient-to-tr from-[#D60F1A] to-[#EC1420] text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}