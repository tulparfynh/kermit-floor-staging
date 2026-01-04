'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { panels, type Panel } from '@/lib/panel-data';
import { Card } from '@/components/ui/card';
import { PanelSpecs } from './PanelSpecs';
import { MaterialInfo } from './MaterialInfo';
import { InquiryForm } from './InquiryForm';
import { Separator } from '@/components/ui/separator';

export function Showcase() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>(panels[0]);

  return (
    <div className="container mx-auto px-4 space-y-12 lg:space-y-20">
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
      
      <div>
        <h3 className="font-headline text-2xl font-bold text-center mb-8">Explore Our Finishes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {panels.map((panel) => (
            <button
                key={panel.id}
                onClick={() => setSelectedPanel(panel)}
                className={cn(
                'text-left rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                selectedPanel.id === panel.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                )}
            >
              <Card
                  className={cn(
                  'cursor-pointer overflow-hidden transition-all duration-300 h-full w-full',
                  selectedPanel.id !== panel.id ? 'hover:shadow-xl hover:-translate-y-1' : 'shadow-lg'
                  )}
              >
                  <Image
                  src={panel.thumbnailUrl}
                  alt={panel.name}
                  width={200}
                  height={150}
                  className="w-full h-auto object-cover aspect-video"
                  data-ai-hint={panel.thumbnailHint}
                  />
                  <div className="p-3 text-center">
                  <p className="font-semibold text-sm text-foreground">{panel.name}</p>
                  </div>
              </Card>
            </button>
            ))}
        </div>
      </div>
      
      <Separator className="my-12 lg:my-16" />

      <section id="inquiry" className="scroll-mt-20">
        <InquiryForm panel={selectedPanel} />
      </section>
    </div>
  );
}
