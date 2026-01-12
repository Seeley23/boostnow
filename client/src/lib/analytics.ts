/**
 * Google Tag Manager Analytics Helper
 * 
 * This file provides helper functions to send events to GTM dataLayer.
 * All events are sent to GTM, which then forwards them to GA4, Facebook Pixel, etc.
 */

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Send event to GTM dataLayer
 * @param event Event name (e.g., 'form_submit', 'cta_click')
 * @param params Additional event parameters
 */
export function trackEvent(event: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...params,
    });
    console.log('[GTM] Event tracked:', event, params);
  }
}

/**
 * Track form submission
 * @param formName Name of the form (e.g., 'contact_form')
 * @param formData Form data (optional)
 */
export function trackFormSubmit(formName: string, formData?: Record<string, any>) {
  trackEvent('lead_form_submit', {
    form_name: formName,
    form_data: formData,
  });
}

/**
 * Track CTA button click
 * @param ctaName Name of the CTA button (e.g., 'hero_cta', 'contact_cta')
 * @param ctaText Text of the CTA button
 * @param ctaUrl URL of the CTA button (optional)
 */
export function trackCTAClick(ctaName: string, ctaText: string, ctaUrl?: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_text: ctaText,
    cta_url: ctaUrl,
  });
}

/**
 * Track scroll depth
 * @param percentage Scroll depth percentage (25, 50, 75, 100)
 */
export function trackScrollDepth(percentage: number) {
  trackEvent('scroll_depth', {
    scroll_percentage: percentage,
  });
}

/**
 * Track section view
 * @param sectionName Name of the section (e.g., 'hero', 'services', 'contact')
 */
export function trackSectionView(sectionName: string) {
  trackEvent('section_view', {
    section_name: sectionName,
  });
}

/**
 * Track page view (automatically tracked by GTM, but can be used for SPA routing)
 * @param pagePath Page path (e.g., '/about', '/contact')
 * @param pageTitle Page title
 */
export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}
