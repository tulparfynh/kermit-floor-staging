'use client';

import { useSearchParams } from 'next/navigation';
import type { Resource, ProductLine, DocType } from '@/lib/resources-data';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ResourceCard from './ResourceCard';

type ResourceLibraryProps = {
  documents: Resource[];
};

const productLines: ProductLine[] = ['skirting', 'flooring', 'wall_panels'];
const docTypes: DocType[] = [
  'catalogue', 'tds', 'installation', 'warranty', 'maintenance', 
  'cad', 'textures', 'packaging'
];

export default function ResourceLibrary({ documents }: ResourceLibraryProps) {
  const t = useTranslations('ResourcesPage');
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');

  const defaultTab = productLines.includes(tabFromUrl as any) ? tabFromUrl : 'skirting';

  const getDocumentsByProductLine = (productLine: ProductLine) => {
    return documents.filter(doc => doc.productLine === productLine || (doc.productLine === 'general' && productLine !== 'general'));
  };

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto">
        {productLines.map(pl => (
          <TabsTrigger key={pl} value={pl} className="py-3 text-lg font-semibold">
            {t(`productLineTabs_${pl}` as any)}
          </TabsTrigger>
        ))}
      </TabsList>

      {productLines.map(pl => (
        <TabsContent key={pl} value={pl}>
          <Accordion type="multiple" className="w-full space-y-4 pt-6">
            {docTypes.map((docType, index) => {
              const filteredDocs = getDocumentsByProductLine(pl).filter(
                doc => doc.docType === docType
              );

              return (
                <AccordionItem key={docType} value={`item-${index}`} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline bg-muted/50 px-6 py-4">
                    {t(`accordion_${docType}` as any)}
                  </AccordionTrigger>
                  <AccordionContent className="bg-background p-4 rounded-b-lg border border-t-0">
                    {filteredDocs.length > 0 ? (
                      <div className="space-y-4">
                        {filteredDocs.map(doc => (
                          <ResourceCard key={doc.id} resource={doc} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <p>{t('comingSoon')}</p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
