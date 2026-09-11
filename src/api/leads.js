// Backend simulation / Client-side mock for POST /api/leads endpoint
// Đảm bảo đầy đủ: Validation, Sanitization, Honeypot, Rate limiting, Duplicate check, Metadata payload

import { validateLeadForm, sanitizeText } from '../utils/validation';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// In-memory / LocalStorage cache for rate-limiting & duplicate checking
function getLeadHistory() {
  try {
    const raw = localStorage.getItem('dudi_lead_history');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLeadHistory(history) {
  try {
    localStorage.setItem('dudi_lead_history', JSON.stringify(history));
  } catch (err) {
    console.error('Failed to save lead history:', err);
  }
}

export async function submitLeadApi(formData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 1. Honeypot check
  if (formData.website_company_fax && formData.website_company_fax.trim() !== '') {
    return {
      success: false,
      status: 400,
      message: "Yêu cầu bị từ chối do vi phạm quy chuẩn bảo mật bot."
    };
  }

  // 2. Validate payload
  const validation = validateLeadForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      status: 422,
      errors: validation.errors,
      message: "Dữ liệu nhập vào chưa hợp lệ. Vui lòng kiểm tra lại các trường được đánh dấu đỏ."
    };
  }

  const now = Date.now();
  const history = getLeadHistory();

  // 3. Rate limiting check (max 5 requests / 10 mins)
  const recentRequests = history.filter((item) => now - item.timestamp < RATE_LIMIT_WINDOW_MS);
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      success: false,
      status: 429,
      message: "Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng thử lại sau 10 phút hoặc gọi trực tiếp Hotline 0909 163 821."
    };
  }

  // 4. Duplicate prevention (same phone and description within 5 mins)
  const isDuplicate = history.some(
    (item) =>
      item.phone === formData.phone &&
      item.description === formData.description &&
      now - item.timestamp < DUPLICATE_WINDOW_MS
  );

  if (isDuplicate) {
    return {
      success: false,
      status: 409,
      message: "Hệ thống đã nhận yêu cầu tương tự của bạn trước đó ít phút. Chuyên viên DUDI đang chuẩn bị liên hệ lại với bạn ngay."
    };
  }

  // 5. Parse UTM & URL metadata
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const utm_source = urlParams.get('utm_source') || 'direct';
  const utm_medium = urlParams.get('utm_medium') || 'none';
  const utm_campaign = urlParams.get('utm_campaign') || 'none';
  const utm_content = urlParams.get('utm_content') || 'none';
  const referrer = typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct';
  const landingUrl = typeof window !== 'undefined' ? window.location.href : 'https://dudisoftware.com';

  // 6. Generate random Unique Lead ID (UUID style or DUDI-XXXXX)
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const lead_id = `DUDI-${new Date().getFullYear()}-${randomSuffix}`;

  // 7. Assemble Clean Sanitized Lead Payload
  const sanitizedLead = {
    lead_id,
    createdAt: new Date().toISOString(),
    fullName: sanitizeText(formData.fullName),
    phone: sanitizeText(formData.phone),
    companyName: sanitizeText(formData.companyName),
    industry: sanitizeText(formData.industry),
    packageId: sanitizeText(formData.packageId),
    pageCount: sanitizeText(formData.pageCount || 'Chưa rõ'),
    features: Array.isArray(formData.features) ? formData.features.map(sanitizeText) : [],
    referenceUrl: sanitizeText(formData.referenceUrl || ''),
    description: sanitizeText(formData.description),
    landingUrl,
    referrer,
    utm: {
      source: utm_source,
      medium: utm_medium,
      campaign: utm_campaign,
      content: utm_content
    }
  };

  // Record into history
  history.push({
    lead_id,
    phone: formData.phone,
    description: formData.description,
    timestamp: now
  });
  saveLeadHistory(history);

  // Store lead in client storage for review
  try {
    const storedLeads = JSON.parse(localStorage.getItem('dudi_submitted_leads') || '[]');
    storedLeads.unshift(sanitizedLead);
    localStorage.setItem('dudi_submitted_leads', JSON.stringify(storedLeads));
  } catch (err) {
    console.error('Failed to store lead:', err);
  }

  // 8. Send to Google Apps Script Webhook / Email Service (if configured)
  const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxora3D7d7ujt3BY1FyGXcFB8L9lBRvffXVpf3lcvH030qH2gD4ggx4aNOjEl0wvcf/exec';
  const googleScriptUrl =
    import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    localStorage.getItem('dudi_google_script_url') ||
    DEFAULT_GOOGLE_SCRIPT_URL;

  if (googleScriptUrl) {
    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors on client side
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(sanitizedLead)
      });
    } catch (sendErr) {
      console.warn('Webhook dispatch failed, but lead was recorded locally:', sendErr);
    }
  }

  return {
    success: true,
    status: 200,
    lead_id,
    message: "Gửi yêu cầu thành công!",
    data: sanitizedLead
  };
}
