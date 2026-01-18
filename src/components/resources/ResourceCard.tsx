'use client';

import type { Resource, Locale } from '@/lib/resources-data';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';
import { Eye, Download, FileText } from 'lucide-react';
import { Link } from '@/navigation';

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const currentLocale = useLocale() as Locale;
  const t = useTranslations('ResourcesPage');

  const title = currentLocale === 'tr' ? resource.title_tr : resource.title;
  const summary = currentLocale === 'tr' ? resource.summary_tr : resource.summary;
  const fileDetails = resource.files[currentLocale] || resource.files['en'];

  const dateLocale = currentLocale === 'tr' ? tr : enUS;
  const formattedDate = format(new Date(resource.updatedAt), 'dd MMM yyyy', {
    locale: dateLocale,
  });

  return (
    <Card className="flex flex-col md:flex-row items-start">
      <div className="p-6 pr-0 md:pr-6 flex-shrink-0 flex items-center justify-center">
         <FileText className="h-10 w-10 text-secondary"/>
      </div>
      <div className="p-6 pt-0 md:pt-6 flex-grow border-t md:border-t-0 md:border-l w-full">
        <CardHeader className="p-0">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="pt-1">{summary}</CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <Badge variant="outline">{`${t('doc_type')}: ${resource.docType}`}</Badge>
          <Badge variant="outline">{`${t('version')}: ${resource.version}`}</Badge>
          <Badge variant="outline">{`${t('last_updated')}: ${formattedDate}`}</Badge>
        </CardContent>
      </div>
      <CardFooter className="p-6 pt-0 md:pt-6 flex-shrink-0 w-full md:w-auto border-t md:border-t-0 md:border-l flex flex-row md:flex-col items-center justify-center gap-2">
        {resource.previewEnabled && (
            <Button variant="outline" asChild className="w-full">
              <Link href={fileDetails.url} target="_blank">
                <Eye className="mr-2 h-4 w-4" /> {t('preview')}
              </Link>
            </Button>
        )}
        <Button asChild className="w-full">
          <Link href={fileDetails.url} download>
            <Download className="mr-2 h-4 w-4" /> {t('download')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
