// Utility functions for validation & data sanitization

// Vietnam phone number regex: accepts 0 or +84 prefix, 9-12 digits
export const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

// Standard URL regex
export const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;

// Sanitize string to prevent basic XSS
export function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

// Validate lead form fields
export function validateLeadForm(formData) {
  const errors = {};

  // 1. Full Name (2 - 80 chars)
  if (!formData.fullName || formData.fullName.trim().length < 2) {
    errors.fullName = "Vui lòng nhập họ và tên (tối thiểu 2 ký tự).";
  } else if (formData.fullName.trim().length > 80) {
    errors.fullName = "Họ và tên không được vượt quá 80 ký tự.";
  }

  // 2. Phone / Zalo (9 - 12 digits, valid VN format)
  const cleanPhone = formData.phone ? formData.phone.replace(/[\s\.-]/g, '') : '';
  if (!cleanPhone) {
    errors.phone = "Vui lòng nhập số điện thoại hoặc Zalo liên hệ.";
  } else if (!VN_PHONE_REGEX.test(cleanPhone)) {
    errors.phone = "Số điện thoại không hợp lệ (Ví dụ: 0909163821 hoặc +84909163821).";
  }

  // 3. Company Name (2 - 120 chars)
  if (!formData.companyName || formData.companyName.trim().length < 2) {
    errors.companyName = "Vui lòng nhập tên công ty hoặc thương hiệu (tối thiểu 2 ký tự).";
  } else if (formData.companyName.trim().length > 120) {
    errors.companyName = "Tên công ty không được vượt quá 120 ký tự.";
  }

  // 4. Industry (Required)
  if (!formData.industry || formData.industry === "") {
    errors.industry = "Vui lòng chọn hoặc nhập ngành nghề kinh doanh.";
  }

  // 5. Package (Required)
  if (!formData.packageId || formData.packageId === "") {
    errors.packageId = "Vui lòng chọn gói website bạn đang quan tâm.";
  }

  // 6. Reference URL (Optional, but must be valid URL if provided)
  if (formData.referenceUrl && formData.referenceUrl.trim() !== '') {
    if (!URL_REGEX.test(formData.referenceUrl.trim())) {
      errors.referenceUrl = "Định dạng đường link website tham khảo chưa hợp lệ (Ví dụ: https://domain.com).";
    }
  }

  // 7. Description (10 - 1000 chars)
  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = "Vui lòng mô tả tóm tắt nhu cầu website (tối thiểu 10 ký tự).";
  } else if (formData.description.trim().length > 1000) {
    errors.description = "Mô tả không được vượt quá 1.000 ký tự.";
  }

  // 8. Consent (Required)
  if (!formData.consent) {
    errors.consent = "Bạn cần tích đồng ý để DUDI Software liên hệ tư vấn.";
  }

  // 9. Honeypot check
  if (formData.website_company_fax && formData.website_company_fax.trim() !== '') {
    errors.honeypot = "Yêu cầu của bạn bị từ chối do vi phạm quy tắc bảo mật.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
