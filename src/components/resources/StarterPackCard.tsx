'use client';

import type { Resource, Locale } from '@/lib/resources-data';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Download, Package, FileText, X } from 'lucide-react';
import { Link } from '@/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type StarterPackCardProps = {
  pack: Resource;
  libraryDocs: Resource[];
};

export default function StarterPackCard({ pack, libraryDocs }: StarterPackCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('ResourcesPage');

  const title = locale === 'tr' ? pack.title_tr : pack.title;
  const summary = locale === 'tr' ? pack.summary_tr : pack.summary;
  const bullets = locale === 'tr' ? pack.bullets_tr : pack.bullets;
  const downloadUrl = pack.files[locale]?.url || pack.files['en'].url;
  
  const packAudience = pack.audience[0];
  const packContents = libraryDocs.filter(
    doc => doc.audience.includes(packAudience) || doc.audience.includes('all')
  );

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
                <Package className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </div>
        <CardDescription className="pt-2">{summary}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {bullets?.map((item, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button asChild className="w-full sm:flex-1 whitespace-normal h-auto">
            <Link href={downloadUrl}>
                <Download className="mr-2 h-4 w-4" />
                {t('downloadZip')}
            </Link>
        </Button>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:flex-1 whitespace-normal h-auto">
                {t('viewContents')}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl">{t('viewContentsTitle', { packName: title })}</DialogTitle>
                    <DialogDescription>
                        {t('viewContentsDescription')}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] border-y">
                    <div className="space-y-3 p-6">
                        {packContents.length > 0 ? packContents.map(doc => {
                            const docTitle = locale === 'tr' ? doc.title_tr : doc.title;
                            return (
                                <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <FileText className="h-5 w-5 text-secondary flex-shrink-0"/>
                                        <span className="font-medium text-sm truncate" title={docTitle}>{docTitle}</span>
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-muted-foreground text-center py-8">{t('noResults')}</p>
                        )}
                    </div>
                </ScrollArea>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="absolute top-3 right-3 rounded-full">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
