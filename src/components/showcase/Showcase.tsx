'use client';

import Image from 'next/image';
import { useState } from 'react';
import { panels, type Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { PanelSpecs } from './PanelSpecs';
import { MaterialInfo } from './MaterialInfo';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from './ColorPicker';

export function Showcase() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(panels[0]);

  return (
    <div className="space-y-12 lg:space-y-16">
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
      />
      
      <div className="container mx-auto px-4 pt-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6 lg:sticky lg:top-8">
              <h2 className="font-headline text-3xl lg:text-4xl font-bold lg:hidden">{selectedPanel.name}</h2>
              <Card className="overflow-hidden shadow-xl rounded-lg border-2 border-transparent hover:border-secondary transition-all">
                  <Image
                      src={selectedPanel.applicationImageUrl}
                      alt={`Application photo for ${selectedPanel.name}`}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover aspect-[4/3]"
                      data-ai-hint={selectedPanel.applicationImageHint}
                      priority
                  />
                   <div className="p-3 bg-secondary/20 text-center text-sm font-semibold text-secondary-foreground">Application View</div>
              </Card>
              <Card className="overflow-hidden shadow-xl rounded-lg border-2 border-transparent hover:border-secondary transition-all">
                  <Image
                      src={selectedPanel.productImageUrl}
                      alt={`Product photo for ${selectedPanel.name}`}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover aspect-[3/4]"
                      data-ai-hint={selectedPanel.productImageHint}
                  />
                   <div className="p-3 bg-secondary/20 text-center text-sm font-semibold text-secondary-foreground">Product Detail</div>
              </Card>
          </div>

          <div className="space-y-8 lg:pt-4">
              <div className="hidden lg:block space-y-2">
                  <h2 className="font-headline text-3xl lg:text-4xl font-bold">{selectedPanel.name}</h2>
                  <p className="text-lg text-foreground/80">{selectedPanel.description}</p>
              </div>
               <p className="text-lg text-foreground/80 lg:hidden">{selectedPanel.description}</p>
              <PanelSpecs />
              <MaterialInfo />
          </div>
        </div>
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
