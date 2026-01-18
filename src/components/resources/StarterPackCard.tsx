'use client';

import type { Resource, Locale } from '@/lib/resources-data';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Download, Package } from 'lucide-react';
import { Link } from '@/navigation';

type StarterPackCardProps = {
  pack: Resource;
};

export default function StarterPackCard({ pack }: StarterPackCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('ResourcesPage');

  const title = locale === 'tr' ? pack.title_tr : pack.title;
  const summary = locale === 'tr' ? pack.summary_tr : pack.summary;
  const bullets = locale === 'tr' ? pack.bullets_tr : pack.bullets;
  const downloadUrl = pack.files[locale]?.url || pack.files['en'].url;

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
        <Button asChild className="w-full sm:flex-1">
            <Link href={downloadUrl}>
                <Download className="mr-2 h-4 w-4" />
                {t('downloadZip')}
            </Link>
        </Button>
        <Button variant="outline" className="w-full sm:flex-1">
          {t('viewContents')}
        </Button>
      </CardFooter>
    </Card>
  );
}
