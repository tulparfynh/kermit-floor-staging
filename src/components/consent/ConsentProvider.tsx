'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import Script from 'next/script';
import type {ConsentDecision} from '@/lib/consent/types';
import {getConsentState, persistConsentDecision} from '@/lib/consent/storage';
import {denyAnalyticsConsent, grantAnalyticsConsent} from '@/lib/consent/gtag';
import {ConsentBanner} from '@/components/consent/ConsentBanner';
import {ConsentPreferencesDialog} from '@/components/consent/ConsentPreferencesDialog';

type ConsentContextValue = {
  decision: ConsentDecision | null;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

type ConsentProviderProps = {
  children: React.ReactNode;
  gaId: string;
  enabled: boolean;
};

export function ConsentProvider({children, gaId, enabled}: ConsentProviderProps) {
  const [decision, setDecision] = useState<ConsentDecision | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [gaScriptLoaded, setGaScriptLoaded] = useState(false);

  useEffect(() => {
    if (!enabled || !gaId) {
      return;
    }

    const savedState = getConsentState();
    if (savedState) {
      setDecision(savedState.decision);
      return;
    }

    setBannerOpen(true);
  }, [enabled, gaId]);

  useEffect(() => {
    if (!gaScriptLoaded) {
      return;
    }

    if (decision === 'accepted') {
      grantAnalyticsConsent(gaId);
      return;
    }

    if (decision === 'rejected') {
      denyAnalyticsConsent();
    }
  }, [decision, gaId, gaScriptLoaded]);

  const accept = useCallback(() => {
    persistConsentDecision('accepted');
    setDecision('accepted');
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const reject = useCallback(() => {
    persistConsentDecision('rejected');
    setDecision('rejected');
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      decision,
      accept,
      reject,
      openPreferences,
    }),
    [accept, decision, openPreferences, reject]
  );

  const shouldLoadGa = gaId.length > 0 && (decision === 'accepted' || !enabled);
  const shouldRenderConsentUi = enabled && gaId.length > 0;

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {shouldLoadGa ? (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          onLoad={() => {
            setGaScriptLoaded(true);
            if (!enabled) {
              grantAnalyticsConsent(gaId);
            }
          }}
        />
      ) : null}
      {shouldRenderConsentUi ? (
        <>
          <ConsentBanner
            open={bannerOpen}
            onAccept={accept}
            onReject={reject}
            onManage={() => {
              setBannerOpen(false);
              setPreferencesOpen(true);
            }}
          />
          <ConsentPreferencesDialog
            open={preferencesOpen}
            onOpenChange={setPreferencesOpen}
            decision={decision}
            onAccept={accept}
            onReject={reject}
          />
        </>
      ) : null}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}
