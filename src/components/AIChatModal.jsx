import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCcw, 
  Send, 
  Sparkles, 
  CheckCheck, 
  ChevronRight,
  MessageSquare,
  Phone
} from 'lucide-react';

const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'https://dudi-ai.onrender.com/api/chat';

const QUICK_SUGGESTIONS = [
  { id: 'pricing', label: '💰 Chi phí & Báo giá chi tiết', query: 'Chi phí thiết kế website tại DUDI khoảng bao nhiêu?' },
  { id: 'services', label: '💡 DUDI cung cấp những dịch vụ gì?', query: 'DUDI cung cấp những giải pháp và dịch vụ gì?' },
  { id: 'process', label: '⚡ Quy trình triển khai dự án', query: 'Quy trình thiết kế và bàn giao website tại DUDI như thế nào?' },
  { id: 'deliverables', label: '📦 Hạng mục bàn giao gồm những gì?', query: 'Khi hoàn thành website tôi sẽ nhận được những gì?' },
  { id: 'contact', label: '📞 Kết nối chuyên viên tư vấn', query: 'Tôi muốn gặp chuyên viên tư vấn trực tiếp' }
];

const BOT_WELCOME_TEXT = `Xin chào! 👋\nTôi là DU - Trợ lý ảo AI của DUDI SOFTWARE.\nTôi có thể hỗ trợ gì cho bạn hôm nay?`;

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: BOT_WELCOME_TEXT,
    time: '10:30',
    type: 'text'
  }
];

/**
 * Format markdown text safely:
 * - Parses **bold text** into <strong>
 * - Parses *italic text* into <em>
 * - Parses bullet lists (- or • or *) into neat bullet rows
 * - Parses numbered lists (1. 2. ...)
 * - Parses line breaks
 */
function FormattedMessageText({ text, isBot }) {
  if (!text) return null;

  const lines = text.split('\n');

  const parseInline = (str) => {
    const regex = /(\*\*.*?\*\*|\*[^*]+?\*)/g;
    const parts = str.split(regex);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong 
            key={idx} 
            className={`font-bold ${isBot ? 'text-slate-900' : 'text-white'}`}
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return (
          <em key={idx} className="italic opacity-90">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-1.5 leading-relaxed text-[13.5px] sm:text-[14px]">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} className="h-1.5" />;
        }

        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('• ') || (trimmed.startsWith('* ') && !trimmed.startsWith('**'));
        const isNumbered = /^\d+\.\s/.test(trimmed);

        if (isBullet) {
          const bulletContent = trimmed.replace(/^[-•*]\s+/, '');
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-0.5">
              <span className={`select-none mt-1 text-xs font-bold ${isBot ? 'text-[#D60F1A]' : 'text-red-100'}`}>•</span>
              <span className="flex-1">{parseInline(bulletContent)}</span>
            </div>
          );
        }

        if (isNumbered) {
          const numMatch = trimmed.match(/^(\d+)\./);
          const num = numMatch ? numMatch[1] : '•';
          const numberedContent = trimmed.replace(/^\d+\.\s+/, '');
          return (
            <div key={lIdx} className="flex items-start gap-2 pl-0.5">
              <span className={`select-none mt-0.5 text-xs font-bold ${isBot ? 'text-[#D60F1A]' : 'text-red-100'}`}>{num}.</span>
              <span className="flex-1">{parseInline(numberedContent)}</span>
            </div>
          );
        }

        return (
          <div key={lIdx}>
            {parseInline(line)}
          </div>
        );
      })}
    </div>
  );
}

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
        text: BOT_WELCOME_TEXT,
        time: timeStr,
        type: 'text'
      }
    ]);
  };

  // Scroll to section in DUDI_gioithieu
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  // Handle sending a message to AI Backend
  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

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

    // Prepare history payload for API
    const historyPayload = messages
      .filter((m) => !m.isError)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

    try {
      // 35s timeout to handle Render cold start
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000);

      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi: ${response.status}`);
      }

      let botReplyText = '';
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        botReplyText = data.reply || data.response || data.message || data.text || data.answer || JSON.stringify(data);
      } else {
        botReplyText = await response.text();
      }

      if (!botReplyText || !botReplyText.trim()) {
        botReplyText = 'DUDI đã nhận được thông tin từ bạn. Nếu cần giải đáp nhanh hoặc tư vấn chuyên sâu, quý khách có thể liên hệ trực tiếp hotline để được hỗ trợ tức thì!';
      }

      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;

      // Smart action detection
      let actionType = null;
      const lowerReply = botReplyText.toLowerCase();
      if (lowerReply.includes('hotline') || lowerReply.includes('zalo') || lowerReply.includes('liên hệ')) {
        actionType = 'contact';
      } else if (lowerReply.includes('báo giá') || lowerReply.includes('chi phí') || lowerReply.includes('gói') || lowerReply.includes('bảng giá')) {
        actionType = 'pricing';
      } else if (lowerReply.includes('hạng mục') || lowerReply.includes('bàn giao') || lowerReply.includes('deliverable')) {
        actionType = 'deliverables';
      } else if (lowerReply.includes('quy trình') || lowerReply.includes('bước')) {
        actionType = 'process';
      }

      const newBotMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText.trim(),
        time: botTimeStr,
        actionType: actionType
      };

      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error) {
      console.error('Lỗi kết nối AI Backend:', error);
      const botTime = new Date();
      const botTimeStr = `${String(botTime.getHours()).padStart(2, '0')}:${String(botTime.getMinutes()).padStart(2, '0')}`;

      const isTimeout = error.name === 'AbortError';
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: isTimeout
          ? '⚠️ Kết nối tới máy chủ AI đang bị trễ do server đang khởi động. Bạn vui lòng thử lại sau giây lát hoặc liên hệ trực tiếp đội ngũ DUDI để được hỗ trợ ngay!'
          : '⚠️ Không thể kết nối tới máy chủ AI DUDI. Bạn vui lòng kiểm tra kết nối mạng hoặc liên hệ trực tiếp chuyên viên tư vấn qua Hotline/Zalo.',
        time: botTimeStr,
        actionType: 'contact',
        isError: true,
        retryText: text
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-22 md:right-24 z-50 flex items-end sm:items-auto justify-center sm:justify-end p-2 sm:p-0 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Cửa sổ trò chuyện với Trợ lý AI DU - DUDI SOFTWARE"
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
        className="w-full sm:w-[390px] md:w-[420px] h-[520px] sm:h-[550px] max-h-[calc(100dvh-4.5rem)] bg-white rounded-3xl sm:rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-slate-100 flex flex-col overflow-hidden text-slate-800 transition-all font-sans"
      >
        
        {/* 1. Header */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {/* Robot Mascot Avatar */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-red-50 to-orange-100 p-1 flex items-center justify-center border border-red-100 shadow-xs">
              <img 
                src="/robot-mascot.webp" 
                alt="DU Trợ lý AI" 
                className="w-full h-full object-contain drop-shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
            </div>

            <div>
              <h3 className="font-bold text-[16px] sm:text-[17px] leading-tight text-slate-900 flex items-center gap-1.5 font-heading">
                <span>DU - Trợ lý AI DUDI</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D60F1A] animate-pulse" />
              </h3>
              <p className="text-[12px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping opacity-75" />
                <span>Trực tuyến 24/7 • DUDI AI Backend</span>
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleReset}
              title="Làm mới cuộc trò chuyện"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Đóng cửa sổ chat"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Messages Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 space-y-4 scroll-smooth bg-[#FAFBFD]">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                <div className={`flex gap-2.5 max-w-[90%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  {isBot && (
                    <div className="w-7 h-7 rounded-xl bg-red-50 p-0.5 flex-shrink-0 flex items-center justify-center border border-red-100 mt-1 shadow-2xs">
                      <img 
                        src="/robot-mascot.webp" 
                        alt="DU Bot" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  <div>
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        isBot
                          ? msg.isError
                            ? 'bg-amber-50 text-amber-900 rounded-tl-sm border border-amber-200 shadow-xs'
                            : 'bg-white text-slate-800 rounded-tl-sm border border-slate-200/80 shadow-xs'
                          : 'bg-gradient-to-r from-[#D60F1A] to-[#EC1420] !text-white rounded-tr-sm shadow-md font-medium'
                      }`}
                    >
                      {/* Formatted Text */}
                      <FormattedMessageText text={msg.text} isBot={isBot} />

                      {/* Retry Button if Network Error */}
                      {msg.isError && msg.retryText && (
                        <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center gap-2">
                          <button
                            onClick={() => handleSendMessage(msg.retryText)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Thử gửi lại</span>
                          </button>
                        </div>
                      )}

                      {/* Bot Quick Actions / Shortcuts */}
                      {isBot && !msg.isError && msg.actionType && (
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
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0068FF] hover:bg-[#0057D9] text-white text-xs font-bold transition-colors shadow-xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Nhắn Zalo</span>
                              </a>
                              <a
                                href="tel:0909163821"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-xs"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Gọi Hotline</span>
                              </a>
                              <button
                                onClick={() => scrollToSection('lead-form')}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                              >
                                <span>Điền Form</span>
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Timestamp */}
                    <div className={`text-[11px] text-slate-400 mt-1 flex items-center gap-1 ${isBot ? 'ml-1' : 'justify-end mr-1'}`}>
                      <span>{msg.time}</span>
                      {!isBot && <CheckCheck className="w-3.5 h-3.5 text-[#D60F1A]" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex items-start gap-2.5 animate-in fade-in duration-150">
              <div className="w-7 h-7 rounded-xl bg-red-50 p-0.5 flex-shrink-0 flex items-center justify-center border border-red-100 shadow-2xs">
                <img 
                  src="/robot-mascot.webp" 
                  alt="Bot" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-4 py-3 bg-white text-slate-500 rounded-2xl rounded-tl-sm border border-slate-200/80 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D60F1A] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#D60F1A] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#D60F1A] animate-bounce" />
                <span className="text-xs text-slate-400 ml-1.5">DU đang soạn câu trả lời...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. Quick Suggestions Chips */}
        <div className="px-3.5 py-2.5 bg-white border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-nowrap">
            {QUICK_SUGGESTIONS.map((chip) => (
              <button
                key={chip.id}
                disabled={isTyping}
                onClick={() => handleSendMessage(chip.query)}
                className="text-[12px] font-medium px-3 py-1.5 rounded-full bg-white text-slate-700 border border-slate-200 hover:border-red-400 hover:text-[#D60F1A] hover:bg-red-50/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-2xs cursor-pointer"
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
              disabled={isTyping}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTyping ? "Trợ lý AI đang phản hồi..." : "Nhập tin nhắn của bạn..."}
              className="flex-1 bg-transparent text-[13.5px] sm:text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none py-1.5 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Gửi tin nhắn"
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                inputValue.trim() && !isTyping
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
