'use client';

import Image from 'next/image';
import { useState } from 'react';
import { panels, type Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from './ColorPicker';
import { ProductDetails } from './ProductDetails';

export function Showcase() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(panels[0]);

  return (
    <div className="space-y-12 lg:space-y-16">
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
      />
      
      <div className="container mx-auto px-4">
        <ProductDetails panel={selectedPanel} />
      </div>

      <div className="container mx-auto px-4">
         <section id="application-photo" className="scroll-mt-20">
            <h2 className="font-headline text-3xl font-bold text-center mb-6">See It in Action</h2>
            <Card className="overflow-hidden shadow-lg border-none">
              <div className="relative aspect-[16/9]">
                <Image
                  src={selectedPanel.applicationImageUrl}
                  alt={`Application photo for ${selectedPanel.name}`}
                  fill
                  className="object-cover"
                  data-ai-hint={selectedPanel.applicationImageHint}
                />
              </div>
            </Card>
        </section>
      </div>
      
      <div className="container mx-auto px-4">
        <Separator className="my-12 lg:my-16" />

        <section id="inquiry" className="scroll-mt-20">
          <InquiryForm panel={selectedPanel} />
        </section>
      </div>
    </div>
  );
}
