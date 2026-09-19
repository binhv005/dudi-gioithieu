// Backend simulation / Client-side service for POST /api/leads endpoint
import { validateLeadForm, sanitizeText } from '../utils/validation';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const DUPLICATE_WINDOW_MS = 1 * 60 * 1000;

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
  // 1. Honeypot check
  if (formData.website_company_fax && formData.website_company_fax.trim() !== '') {
    return {
      success: false,
      status: 400,
      message: 'Yêu cầu bị từ chối do vi phạm tiêu chuẩn bot.'
    };
  }

  // 2. Validate payload
  const validation = validateLeadForm(formData);
  if (!validation.isValid) {
    return {
      success: false,
      status: 422,
      errors: validation.errors,
      message: 'Dữ liệu nhập vào chưa hợp lệ. Vui lòng kiểm tra lại các trường.'
    };
  }

  const now = Date.now();
  const history = getLeadHistory();

  // 3. Duplicate prevention (1 min)
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
      message: 'Hệ thống đã nhận yêu cầu tương tự của bạn. DUDI đang chuẩn bị liên hệ lại với bạn ngay.'
    };
  }

  // 4. Metadata
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const referrer = typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct';
  const landingUrl = typeof window !== 'undefined' ? window.location.href : 'https://dudisoftware.com';

  // 5. Generate unique Lead ID
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const lead_id = 'DUDI-' + randomSuffix;

  // 6. Clean sanitized payload
  const fullName = sanitizeText(formData.fullName || 'Khách hàng');
  const phone = sanitizeText(formData.phone || '');
  const companyName = sanitizeText(formData.companyName || 'Khách cá nhân');
  const industry = sanitizeText(formData.industry || 'Chưa chọn');
  const packageId = sanitizeText(formData.packageId || 'Website Doanh Nghiệp');
  const pageCount = sanitizeText(formData.pageCount || 'Tiêu chuẩn');
  const features = Array.isArray(formData.features) ? formData.features.map(sanitizeText).join(', ') : '';
  const description = sanitizeText(formData.description || 'Yêu cầu tư vấn website doanh nghiệp');
  const createdAt = new Date().toISOString();

  const sanitizedLead = {
    lead_id,
    createdAt,
    fullName,
    phone,
    companyName,
    industry,
    packageId,
    pageCount,
    features,
    description,
    landingUrl,
    referrer
  };

  // Record into history
  history.push({
    lead_id,
    phone: formData.phone,
    description: formData.description,
    timestamp: now
  });
  saveLeadHistory(history);

  // =========================================================================
  // ⚡ 7. GỬI TRỰC TIẾP VÀO FIREBASE FIRESTORE (DASHBOARD REALTIME)
  // =========================================================================
  const FIREBASE_PROJECT_ID = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_PROJECT_ID) || 'dudi-leads';
  const FIREBASE_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FIREBASE_API_KEY) || 'AIzaSyBv2l4OH6dtaBqCx5D_rxtDT2HkMPfZ3kA';

  try {
    const firebaseUrl = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_PROJECT_ID + '/databases/(default)/documents/leads/' + lead_id + '?key=' + FIREBASE_API_KEY;
    
    const requirementsText = 'Ngành: ' + industry + ' | Quy mô: ' + pageCount + ' | Tính năng: ' + (features || 'Cơ bản') + ' | Ghi chú: ' + description;

    const firestorePayload = {
      fields: {
        id: { stringValue: lead_id },
        customerName: { stringValue: fullName },
        phone: { stringValue: phone },
        email: { stringValue: formData.email || 'Chưa cung cấp' },
        company: { stringValue: companyName },
        serviceId: { stringValue: 'dudi-gioithieu' },
        serviceName: { stringValue: 'Website Giới Thiệu Doanh Nghiệp' },
        budget: { stringValue: packageId },
        source: { stringValue: 'Website Giới Thiệu' },
        sourceUrl: { stringValue: landingUrl },
        status: { stringValue: 'new' },
        priority: { stringValue: 'high' },
        createdAt: { stringValue: createdAt },
        requirements: { stringValue: requirementsText }
      }
    };

    fetch(firebaseUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(firestorePayload)
    }).then(res => {
      console.log('🔥 [Firebase Live] Lead synced directly to Dashboard:', lead_id, res.status);
    }).catch(fbErr => {
      console.error('Firebase Direct Sync Error:', fbErr);
    });
  } catch (err) {
    console.error('Lỗi khởi tạo Firebase Request:', err);
  }

  // =========================================================================
  // ✉️ 8. GỬI SANG GOOGLE APPS SCRIPT ĐỂ GỬI GMAIL CHO ADMIN
  // =========================================================================
  const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXebGSlwFUgoIc-tlEx7uE_qcwbOTFspy3oqdSk4Rw21gDCORXj_dvCqpP2wf0NHVFgg/exec';
  const googleScriptUrl =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_SCRIPT_URL) ||
    DEFAULT_GOOGLE_SCRIPT_URL;

  if (googleScriptUrl) {
    try {
      fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(sanitizedLead)
      }).catch(err => console.warn('Apps Script dispatch notice:', err));
    } catch (sendErr) {
      console.warn('Webhook dispatch failed:', sendErr);
    }
  }

  return {
    success: true,
    status: 200,
    lead_id,
    message: 'Gửi yêu cầu thành công! DUDI sẽ liên hệ lại với bạn sớm nhất.',
    data: sanitizedLead
  };
}
