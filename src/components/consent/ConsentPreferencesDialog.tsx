'use client';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type {ConsentDecision} from '@/lib/consent/types';
import {useTranslations} from 'next-intl';

type ConsentPreferencesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  decision: ConsentDecision | null;
  onAccept: () => void;
  onReject: () => void;
};

export function ConsentPreferencesDialog({
  open,
  onOpenChange,
  decision,
  onAccept,
  onReject,
}: ConsentPreferencesDialogProps) {
  const t = useTranslations('ConsentBanner');
  const statusKey = decision === 'accepted' ? 'statusAccepted' : decision === 'rejected' ? 'statusRejected' : 'statusUnset';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{t('preferencesTitle')}</DialogTitle>
          <DialogDescription>{t('preferencesDescription')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 rounded-lg border border-border bg-muted/40 p-4">
          <p className="text-sm font-medium text-foreground">{t('analyticsTitle')}</p>
          <p className="text-sm text-muted-foreground">{t('analyticsDescription')}</p>
          <p className="text-xs text-muted-foreground">{t(statusKey)}</p>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onReject}>
            {t('reject')}
          </Button>
          <Button onClick={onAccept}>{t('accept')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

