declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __kermitGaInitialized?: boolean;
  }
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function hasGtag(): boolean {
  return isBrowser() && typeof window.gtag === 'function';
}

type ConsentValue = 'granted' | 'denied';

function updateAnalyticsConsent(value: ConsentValue): void {
  if (!hasGtag()) {
    return;
  }
  window.gtag?.('consent', 'update', {analytics_storage: value});
}

export function initializeGtag(gaId: string): void {
  if (!hasGtag() || !gaId) {
    return;
  }
  if (window.__kermitGaInitialized) {
    return;
  }

  window.gtag?.('js', new Date());
  window.gtag?.('config', gaId, {anonymize_ip: true});
  window.__kermitGaInitialized = true;
}

export function grantAnalyticsConsent(gaId: string): void {
  updateAnalyticsConsent('granted');
  initializeGtag(gaId);
}

export function denyAnalyticsConsent(): void {
  updateAnalyticsConsent('denied');
}

