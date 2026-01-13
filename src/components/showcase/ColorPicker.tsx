
'use client';

import Image from 'next/image';
import type { Panel } from '@/lib/panel-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ColorPickerProps = {
  panels: Panel[];
  selectedPanel: Panel;
  onPanelSelect: (panel: Panel) => void;
};

export function ColorPicker({
  panels,
  selectedPanel,
  onPanelSelect,
}: ColorPickerProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const selectedIndex = panels.findIndex(
      (panel) => panel.id === selectedPanel.id
    );
    if (selectedIndex !== -1 && api.selectedScrollSnap() !== selectedIndex) {
      api.scrollTo(selectedIndex);
    }
  }, [api, selectedPanel, panels]);

  const handleCarouselSelect = () => {
    if (!api) return;
    const selectedIndex = api.selectedScrollSnap();
    if (panels[selectedIndex].id !== selectedPanel.id) {
        onPanelSelect(panels[selectedIndex]);
    }
  };

  useEffect(() => {
    if (!api) return;
    api.on('select', handleCarouselSelect);
    return () => {
      api.off('select', handleCarouselSelect);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, onPanelSelect, panels, selectedPanel]);


  return (
    <div className="bg-muted py-6">
      <div className="container mx-auto px-4">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {panels.map((panel) => (
              <CarouselItem
                key={panel.id}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <div className="p-1">
                  <button
                    onClick={() => onPanelSelect(panel)}
                    className={cn(
                      'block w-full text-left rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      selectedPanel.id === panel.id
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : ''
                    )}
                  >
                    <Card
                      className={cn(
                        'overflow-hidden transition-all duration-200 border-2',
                        selectedPanel.id === panel.id
                          ? 'border-primary'
                          : 'border-transparent hover:border-primary/50'
                      )}
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={panel.productImageUrl}
                          alt={`SPC Wall Panel ${panel.name} Color`}
                          fill
                          className="w-full h-full object-cover"
                          data-ai-hint={panel.productImageHint}
                        />
                         <div className="absolute inset-0 flex items-end justify-center p-2">
                           <p className="bg-black/40 px-2 py-1 rounded-md text-white text-sm font-bold text-center" style={{textShadow: '0 1px 2px rgba(0,0,0,0.7)'}}>{panel.name}</p>
                         </div>
                      </div>
                    </Card>
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-10px] sm:left-0 md:left-2 transform -translate-y-1/2 top-1/2 bg-background/50 hover:bg-background" />
          <CarouselNext className="absolute right-[-10px] sm:right-0 md:right-2 transform -translate-y-1/2 top-1/2 bg-background/50 hover:bg-background" />
        </Carousel>
      </div>
    </div>
  );
}
