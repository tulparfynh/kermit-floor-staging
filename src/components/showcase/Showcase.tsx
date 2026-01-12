
'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import type { Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from './ColorPicker';
import { ProductDetails } from './ProductDetails';
import { Skeleton } from '@/components/ui/skeleton';

type ShowcaseProps = {
  initialPanels: Panel[];
};

export function Showcase({ initialPanels }: ShowcaseProps) {
  const [panels, setPanels] = useState<Panel[]>(initialPanels);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(initialPanels.length > 0 ? initialPanels[0] : null);

  useEffect(() => {
    setPanels(initialPanels);
    if (!selectedPanel && initialPanels.length > 0) {
      setSelectedPanel(initialPanels[0]);
    }
  }, [initialPanels, selectedPanel]);

  if (!selectedPanel) {
    return (
      <div className="container mx-auto px-4 mt-12 lg:mt-16 space-y-8">
        <Skeleton className="h-[50vh] w-full" />
        <Skeleton className="h-[20vh] w-full" />
        <p className="text-center text-lg text-muted-foreground">Loading panel data... If this persists, please check the 'public/panels' directory for product folders.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="container mx-auto px-4 mt-12 lg:mt-16">
        <ProductDetails panel={selectedPanel} />
      </div>
      
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
      />

      <div className="container mx-auto px-4">
         <section id="application-photo" className="scroll-mt-20">
            <Card className="overflow-hidden shadow-lg border-none bg-background/50 relative aspect-[16/9]">
                <Image
                  src={selectedPanel.applicationImageUrl}
                  alt={`Application photo for ${selectedPanel.name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={selectedPanel.applicationImageHint}
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
            </Card>
        </section>
      </div>
      
      <div className="container mx-auto px-4 pb-12 lg:pb-16">
        <Separator className="my-12 lg:my-16" />

        <section id="inquiry" className="scroll-mt-20">
          <InquiryForm panel={selectedPanel} />
        </section>
      </div>
    </div>
  );
}
