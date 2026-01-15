
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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { ZoomIn, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';


function WallCollectionNav() {
  const t = useTranslations('HomePage');
  const pathname = usePathname();
  const collections = [
    { 
      name: t('spcWallPanelsTitle'), 
      href: '/spc-wall-panels', 
      imageUrl: '/images/spc-wall-panels/23048-6/application.jpg',
      imageHint: 'travertine texture'
    },
    { 
      name: t('spc3dWallPanelsModelATitle'), 
      href: '/spc-3d-wall-panels-model-a', 
      imageUrl: '/images/spc-3d-panels-model-a/3D-29115-18/application.jpg',
      imageHint: 'geometric 3d texture'
    },
    { 
      name: t('spc3dWallPanelsModelBTitle'), 
      href: '/spc-3d-wall-panels-model-b', 
      imageUrl: '/images/spc-3d-panels-model-b/3D-23138-2/application.jpg',
      imageHint: 'wavy 3d texture'
    },
  ];

  return (
    <div className="bg-muted py-4 border-b">
        <div className="container mx-auto px-4">
            <div className="flex items-start justify-center gap-4 md:gap-8">
                {collections.map((collection, index) => (
                    <React.Fragment key={collection.name}>
                        <Link 
                            href={collection.href} 
                            className={cn(
                                "flex flex-col items-center gap-2 group",
                            )}
                        >
                            <div className={cn(
                                "relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 transition-all duration-300",
                                pathname === collection.href ? "border-primary" : "border-transparent group-hover:border-primary/50"
                            )}
                            >
                                <Image 
                                    src={collection.imageUrl}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    data-ai-hint={collection.imageHint}
                                />
                            </div>
                            <span className={cn(
                                "text-xs md:text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors text-center",
                                pathname === collection.href && "text-primary"
                            )}>
                                {collection.name}
                            </span>
                        </Link>
                        {index < collections.length - 1 && (
                            <Separator orientation="vertical" className="h-24 self-center" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
  );
}

function FlooringCollectionNav() {
  const t = useTranslations('HomePage');
  const pathname = usePathname();
  const collections = [
    { 
      name: t('spcParquetNaturalCollectionTitle'), 
      href: '/spc-parquet-natural-collection', 
      imageUrl: '/images/spc-parquet-natural-collection/29098-2/product.jpg',
      imageHint: 'natural oak flooring'
    },
    { 
      name: t('spcParquetStoneCollectionTitle'), 
      href: '/spc-parquet-stone-collection', 
      imageUrl: '/images/spc-parquet-stone-collection/23054-2/product.jpg',
      imageHint: 'stone look flooring'
    },
    { 
      name: t('fullNaturalCollectionTitle'), 
      href: '/full-natural-collection', 
      imageUrl: '/images/full-natural-collection/29074-1/product.jpg',
      imageHint: 'wide plank flooring'
    },
  ];

  return (
    <div className="bg-muted py-4 border-b">
        <div className="container mx-auto px-4">
            <div className="flex items-start justify-center gap-4 md:gap-8">
                {collections.map((collection, index) => (
                    <React.Fragment key={collection.name}>
                        <Link 
                            href={collection.href} 
                            className={cn(
                                "flex flex-col items-center gap-2 group",
                            )}
                        >
                            <div className={cn(
                                "relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 transition-all duration-300",
                                pathname === collection.href ? "border-primary" : "border-transparent group-hover:border-primary/50"
                            )}
                            >
                                <Image 
                                    src={collection.imageUrl}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    data-ai-hint={collection.imageHint}
                                />
                            </div>
                            <span className={cn(
                                "text-xs md:text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors text-center",
                                pathname === collection.href && "text-primary"
                            )}>
                                {collection.name}
                            </span>
                        </Link>
                        {index < collections.length - 1 && (
                            <Separator orientation="vertical" className="h-24 self-center" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </div>
  );
}


type ShowcaseProps = {
  initialPanels: Panel[];
  collectionType: 'spc-wall-panels' | 'spc-3d-wall-panels-model-a' | 'spc-3d-wall-panels-model-b' | 'spc-parquet-natural-collection' | 'spc-parquet-stone-collection' | 'full-natural-collection';
}

export function Showcase({ initialPanels, collectionType }: ShowcaseProps) {
  const [panels, setPanels] = useState<Panel[]>(initialPanels);
  const [selectedPanel, setSelectedPanel] = useState<Panel | null>(initialPanels[0] || null);
  const tSpcPanelNames = useTranslations('PanelNames');
  const t3dModelAPanelNames = useTranslations('3DModelAPanelNames');
  const t3dModelBPanelNames = useTranslations('3DModelBPanelNames');
  const tSpcParquetNaturalCollectionPanelNames = useTranslations('SpcParquetNaturalCollectionPanelNames');
  const tSpcParquetStoneCollectionPanelNames = useTranslations('SpcParquetStoneCollectionPanelNames');
  const tFullNaturalCollectionPanelNames = useTranslations('FullNaturalCollectionPanelNames');

  const tPanelNames = (key: string) => {
    switch (collectionType) {
      case 'spc-3d-wall-panels-model-a':
        return t3dModelAPanelNames(key);
      case 'spc-3d-wall-panels-model-b':
        return t3dModelBPanelNames(key);
      case 'spc-parquet-natural-collection':
        return tSpcParquetNaturalCollectionPanelNames(key);
      case 'spc-parquet-stone-collection':
        return tSpcParquetStoneCollectionPanelNames(key);
      case 'full-natural-collection':
        return tFullNaturalCollectionPanelNames(key);
      default:
        return tSpcPanelNames(key);
    }
  };

  useEffect(() => {
    setPanels(initialPanels);
    if (initialPanels.length > 0) {
      setSelectedPanel(initialPanels[0]);
    } else {
      setSelectedPanel(null);
    }
  }, [initialPanels]);

  const isFlooring = ['spc-parquet-natural-collection', 'spc-parquet-stone-collection', 'full-natural-collection'].includes(collectionType);

  if (!selectedPanel) {
    return (
      <div className="space-y-6 lg:space-y-8">
        {isFlooring ? <FlooringCollectionNav /> : <WallCollectionNav />}
        <div className="container mx-auto px-4 mt-6 lg:mt-8">
          <Skeleton className="h-[60vh] w-full" />
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">There are currently no products in this collection.</p>
            <p className="text-sm text-muted-foreground mt-2">Please add product folders with images to the corresponding directory in `public/images`.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {isFlooring ? <FlooringCollectionNav /> : <WallCollectionNav />}
      <div className="container mx-auto px-4 mt-6 lg:mt-8">
        <ProductDetails 
          panel={selectedPanel} 
          panels={panels} 
          onPanelSelect={setSelectedPanel}
          collectionType={collectionType}
          tPanelNames={tPanelNames}
        />
      </div>
      
      <ColorPicker
        panels={panels}
        selectedPanel={selectedPanel}
        onPanelSelect={setSelectedPanel}
        collectionType={collectionType}
        tPanelNames={tPanelNames}
      />

      <div className="container mx-auto px-4">
         <section id="application-photo" className="scroll-mt-20">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group overflow-hidden shadow-lg border-none bg-background/50 relative aspect-[16/9] cursor-pointer">
                    <Image
                      src={selectedPanel.applicationImageUrl}
                      alt={`Application of SPC Wall Panel ${tPanelNames(selectedPanel.nameKey)}`}
                      fill
                      className="object-cover"
                      data-ai-hint={selectedPanel.applicationImageHint}
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="h-16 w-16 text-white drop-shadow-lg" />
                    </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                <DialogTitle className="sr-only">{`Enlarged application view of SPC Wall Panel ${tPanelNames(selectedPanel.nameKey)}`}</DialogTitle>
                <div className="relative aspect-[16/9]">
                   <Image
                    src={selectedPanel.applicationImageUrl}
                    alt={`Enlarged application view of SPC Wall Panel ${tPanelNames(selectedPanel.nameKey)}`}
                    fill
                    className="object-contain rounded-lg"
                    data-ai-hint={selectedPanel.applicationImageHint}
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
        </section>
      </div>
      
      <div className="container mx-auto px-4">
        <section id="application-video" className="scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary tracking-wide text-center mb-4">Exemplary Application Video</h2>
            <Card className="overflow-hidden shadow-lg border-none bg-background/50 relative aspect-video">
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/LLy_k_s2Yso" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </Card>
        </section>
      </div>

      <div className="container mx-auto px-4 pb-6 lg:pb-8">
        <Separator className="my-6 lg:my-8" />

        <section id="inquiry" className="scroll-mt-20">
          <InquiryForm panel={selectedPanel} collectionType={collectionType} tPanelNames={tPanelNames} />
        </section>
      </div>
    </div>
  );
}

    
