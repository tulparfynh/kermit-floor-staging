
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Panel } from '@/lib/panel-data';
import { Droplets, ShieldCheck, Zap, Hammer, Star, Volume2, Leaf, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useTranslations } from 'next-intl';

type ProductDetailsProps = {
  panel: Panel;
  panels: Panel[];
  onPanelSelect: (panel: Panel) => void;
};

function FeatureColumn({ features }: { features: {icon: React.ElementType, text: string}[] }) {
    return (
        <div className="flex flex-col justify-center items-center gap-3 py-4 px-1 lg:px-4 bg-muted h-full">
            {features.map((feature) => (
                <div key={feature.text} className="flex flex-col items-center gap-1.5 text-center w-20 lg:w-24">
                    <feature.icon className="h-6 w-6 lg:h-7 lg:w-7 text-secondary" />
                    <span className="text-xs font-medium text-foreground/80 leading-tight">{feature.text}</span>
                </div>
            ))}
        </div>
    )
}

export function ProductDetails({ panel, panels, onPanelSelect }: ProductDetailsProps) {
  const t = useTranslations('ProductDetails');
  const [api, setApi] = useState<CarouselApi>();

  const specs = [
    { label: t('specThickness'), value: '4 mm' },
    { label: t('specWearLayer'), value: '0,30 mm' },
    { label: t('specDimensions'), value: '960mm X 2800mm' },
    { label: t('specEdge'), value: 'Micro Bevel' },
    { label: t('specInstallation'), value: 'Glue Down' },
    { label: t('specUtilityClass'), value: '23 / 31' },
    { label: t('specUsageArea'), value: 'Interior Wall & Floor' },
    { label: t('specMaterial'), value: 'SPC (Stone Polymer Composite)' },
  ];

  const allFeatures = [
    { icon: Droplets, text: t('featureWaterProof') },
    { icon: ShieldCheck, text: t('featureAntiBacterial') },
    { icon: Zap, text: t('featureQuickInstallation') },
    { icon: Hammer, text: t('featureImpactResistant') },
    { icon: Star, text: t('featureUltimateShield') },
    { icon: Volume2, text: t('featureSoundAbsorbtion') },
    { icon: Leaf, text: t('featurePhthalateFree') },
  ];
  
  const leftFeatures = allFeatures.slice(0, 4);
  const rightFeatures = allFeatures.slice(4);

  useEffect(() => {
    if (!api) {
      return;
    }
    const selectedIndex = panels.findIndex((p) => p.id === panel.id);
    if (selectedIndex !== -1 && selectedIndex !== api.selectedScrollSnap()) {
      api.scrollTo(selectedIndex);
    }
  }, [api, panel, panels]);

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const newSelectedPanel = panels[selectedIndex];
      if (newSelectedPanel.id !== panel.id) {
        onPanelSelect(newSelectedPanel);
      }
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, panel, panels, onPanelSelect]);

  const handleNext = () => {
    api?.scrollNext();
  };

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  return (
    <Card className="shadow-lg rounded-xl overflow-hidden border-none">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto]">
        <div className="hidden lg:flex">
            <FeatureColumn features={leftFeatures} />
        </div>

        <CardContent className="p-0 bg-card">
          <div className="p-4 md:p-4 md:pb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary tracking-wide text-center mb-4">{panel.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-w-6xl mx-auto">
              <div className="relative group">
                <Carousel setApi={setApi} opts={{loop: true}}>
                    <CarouselContent>
                        {panels.map((p) => (
                            <CarouselItem key={p.id}>
                                <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative aspect-[1920/1298] w-full group cursor-pointer">
                                        <Image
                                        src={p.productImageUrl}
                                        alt={`SPC Wall Panel ${p.name} Color`}
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        data-ai-hint={p.productImageHint}
                                        />
                                        <div className="absolute inset-0 flex items-start justify-end p-2 rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                            <ZoomIn className="h-12 w-12 text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                                    <DialogTitle className="sr-only">{`Enlarged view of ${p.name} product photo`}</DialogTitle>
                                    <div className="relative aspect-[1920/1298]">
                                    <Image
                                        src={p.productImageUrl}
                                        alt={`Enlarged view of SPC Wall Panel ${p.name} Color`}
                                        fill
                                        className="object-contain rounded-lg"
                                        data-ai-hint={p.productImageHint}
                                    />
                                    </div>
                                    <DialogClose asChild>
                                        <Button variant="ghost" size="icon" className="absolute top-[-1rem] right-[-1rem] bg-black/50 hover:bg-black/70 rounded-full h-9 w-9 text-white">
                                            <X className="h-5 w-5" />
                                            <span className="sr-only">Close</span>
                                        </Button>
                                    </DialogClose>
                                </DialogContent>
                                </Dialog>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-black/30 hover:bg-black/50 text-white border-white/50 hover:border-white transition-opacity"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-black/30 hover:bg-black/50 text-white border-white/50 hover:border-white transition-opacity"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-col h-full">
                  <ul className="h-full flex flex-col justify-center space-y-2 lg:space-y-2">
                      {specs.map((spec) => (
                          <li key={spec.label} className="flex justify-between items-center border-b border-border/70 pb-1.5">
                              <span className="font-semibold text-foreground text-xs md:text-sm tracking-wide">{spec.label}:</span>
                              <span className="font-medium text-foreground/90 text-sm md:text-base text-right">{spec.value}</span>
                          </li>
                      ))}
                  </ul>
              </div>
            </div>
          </div>
        </CardContent>
        
        <div className="hidden lg:flex">
            <FeatureColumn features={rightFeatures} />
        </div>

        <div className="lg:hidden col-span-1 bg-muted px-4 py-4 border-t">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
              {allFeatures.map((feature) => (
                <div key={feature.text} className="flex flex-col items-center gap-2">
                  <feature.icon className="h-6 w-6 text-secondary" />
                  <span className="text-xs font-medium text-foreground/80 leading-tight">{feature.text}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </Card>
  );
}

    

    
