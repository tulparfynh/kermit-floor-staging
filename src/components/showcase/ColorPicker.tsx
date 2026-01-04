'use client';

import Image from 'next/image';
import type { Panel } from '@/lib/panel-data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
  return (
    <div className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <h3 className="font-headline text-2xl font-bold text-center mb-6">
          Choose a Finish
        </h3>
        <Carousel
          opts={{
            align: 'start',
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
                      <div className="relative">
                        <Image
                          src={panel.thumbnailUrl}
                          alt={panel.name}
                          width={200}
                          height={200}
                          className="w-full h-auto object-cover aspect-square"
                          data-ai-hint={panel.thumbnailHint}
                        />
                         <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                           <p className="text-white text-xs font-semibold truncate">{panel.name}</p>
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
