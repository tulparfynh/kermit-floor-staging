'use client';

import {Button} from '@/components/ui/button';
import {Link} from '@/navigation';
import {useTranslations} from 'next-intl';

type ConsentBannerProps = {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
  onManage: () => void;
};

export function ConsentBanner({open, onAccept, onReject, onManage}: ConsentBannerProps) {
  const t = useTranslations('ConsentBanner');

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-4 shadow-xl md:p-6">
        <div className="space-y-3">
          <p className="font-headline text-lg font-semibold text-foreground">{t('title')}</p>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button size="sm" onClick={onAccept}>
              {t('accept')}
            </Button>
            <Button size="sm" variant="outline" onClick={onReject}>
              {t('reject')}
            </Button>
            <Button size="sm" variant="ghost" onClick={onManage}>
              {t('manage')}
            </Button>
            <Button asChild size="sm" variant="link" className="px-0">
              <Link href="/privacy-policy">{t('privacyLink')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

