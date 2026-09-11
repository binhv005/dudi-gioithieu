// Helper functions to dispatch custom events to dataLayer (GA4 / GTM compliant)
// Tuyệt đối không gửi thông tin cá nhân (PII) như Tên, SĐT vào analytics

export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      const eventPayload = {
        event: eventName,
        timestamp: new Date().toISOString(),
        ...params
      };
      window.dataLayer.push(eventPayload);
      
      // Development console log for verification
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DataLayer Event] ${eventName}:`, eventPayload);
      }
    }
  } catch (err) {
    console.error('[DataLayer Error]:', err);
  }
}

// 1. CTA Click tracking
export function trackCtaClick(position, label, target) {
  trackEvent('cta_click', {
    position,
    label,
    target
  });
}

// 2. Package selection tracking
export function trackPackageSelect(packageName, displayPrice) {
  trackEvent('package_select', {
    package_name: packageName,
    display_price: displayPrice
  });
}

// 3. Zalo click tracking
export function trackZaloClick(position) {
  trackEvent('zalo_click', {
    position,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '/'
  });
}

// 4. Phone click tracking
export function trackPhoneClick(position) {
  trackEvent('phone_click', {
    position,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '/'
  });
}

// 5. Form start tracking
export function trackFormStart(firstField, source) {
  trackEvent('form_start', {
    first_field: firstField,
    source
  });
}

// 6. Form submit tracking
export function trackFormSubmit(packageName, pageCountRange) {
  trackEvent('form_submit', {
    package_name: packageName,
    page_count_range: pageCountRange
  });
}

// 7. Form success tracking
export function trackFormSuccess(leadId, source) {
  trackEvent('form_success', {
    lead_id: leadId,
    source
  });
}

// 8. Form error tracking
export function trackFormError(errorType) {
  trackEvent('form_error', {
    error_type: errorType
  });
}
