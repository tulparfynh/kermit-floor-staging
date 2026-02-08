import type {ConsentDecision, ConsentState} from '@/lib/consent/types';

const CONSENT_VERSION = 1;
const CONSENT_KEY = `kf_consent_v${CONSENT_VERSION}`;
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function parseState(raw: string): ConsentState | null {
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (
      parsed &&
      (parsed.decision === 'accepted' || parsed.decision === 'rejected') &&
      typeof parsed.decidedAt === 'string' &&
      parsed.version === CONSENT_VERSION
    ) {
      return {
        decision: parsed.decision,
        decidedAt: parsed.decidedAt,
        version: parsed.version,
      };
    }
  } catch {
    return null;
  }
  return null;
}

function getCookieValue(name: string): string | null {
  if (!isBrowser()) {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split('; ') : [];
  for (const cookie of cookies) {
    const separatorIndex = cookie.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }
    const key = cookie.slice(0, separatorIndex);
    if (key === name) {
      return decodeURIComponent(cookie.slice(separatorIndex + 1));
    }
  }

  return null;
}

function setCookieValue(name: string, value: string): void {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;
}

export function getConsentState(): ConsentState | null {
  if (!isBrowser()) {
    return null;
  }

  const cookieValue = getCookieValue(CONSENT_KEY);
  if (cookieValue) {
    const parsed = parseState(cookieValue);
    if (parsed) {
      return parsed;
    }
  }

  const localValue = window.localStorage.getItem(CONSENT_KEY);
  if (!localValue) {
    return null;
  }

  return parseState(localValue);
}

export function persistConsentDecision(decision: ConsentDecision): ConsentState {
  const state: ConsentState = {
    decision,
    decidedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  const serialized = JSON.stringify(state);

  if (isBrowser()) {
    setCookieValue(CONSENT_KEY, serialized);
    window.localStorage.setItem(CONSENT_KEY, serialized);
  }

  return state;
}

export function getConsentStorageKey(): string {
  return CONSENT_KEY;
}

