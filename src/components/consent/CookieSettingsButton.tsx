'use client';

import {useConsent} from '@/components/consent/ConsentProvider';

type CookieSettingsButtonProps = {
  label: string;
};

export function CookieSettingsButton({label}: CookieSettingsButtonProps) {
  const {openPreferences} = useConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className="text-xs hover:text-primary transition-colors"
    >
      {label}
    </button>
  );
}

