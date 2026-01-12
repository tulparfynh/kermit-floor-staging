
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

const specs = [
  { label: 'THICKNESS', value: '4 mm' },
  { label: 'WEAR LAYER', value: '0,30 mm' },
  { label: 'DIMENSIONS', value: '960mm X 2800mm' },
  { label: 'EDGE', value: 'Micro Bevel' },
  { label: 'INSTALLATION', value: 'Glue Down' },
  { label: 'UTILITY CLASS', value: '23 / 31' },
  { label: 'USAGE AREA', value: 'Interior Wall & Floor' },
  { label: 'MATERIAL', value: 'SPC (Stone Polymer Composite)' },
];

const allFeatures = [
  { icon: Droplets, text: 'Water Proof' },
  { icon: ShieldCheck, text: 'Anti Bacterial' },
  { icon: Zap, text: 'Quick Installation' },
  { icon: Hammer, text: 'Impact Resistant' },
  { icon: Star, text: 'Ultimate Shield Coating' },
  { icon: Volume2, text: 'Sound Absorbtion' },
  { icon: Leaf, text: 'Phthalate Free' },
];

const leftFeatures = allFeatures.slice(0, 4);
const rightFeatures = allFeatures.slice(4);


type ProductDetailsProps = {
  panel: Panel;
  panels: Panel[];
  onPanelSelect: (panel: Panel) => void;
};

function FeatureColumn({ features }: { features: typeof allFeatures }) {
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
  const currentIndex = panels.findIndex((p) => p.id === panel.id);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % panels.length;
    onPanelSelect(panels[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + panels.length) % panels.length;
    onPanelSelect(panels[prevIndex]);
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
                <Dialog>
                  <DialogTrigger asChild>
                      <div className="relative aspect-[1920/1298] w-full group cursor-pointer">
                          <Image
                          src={panel.productImageUrl}
                          alt={panel.name}
                          fill
                          className="object-cover rounded-lg shadow-md group-hover:opacity-90 transition-opacity"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          data-ai-hint={panel.productImageHint}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                              <ZoomIn className="h-16 w-16 text-white" />
                          </div>
                      </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                      <DialogTitle className="sr-only">{`Enlarged view of ${panel.name} product photo`}</DialogTitle>
                      <div className="relative aspect-[1920/1298]">
                      <Image
                          src={panel.productImageUrl}
                          alt={`Enlarged view of ${panel.name}`}
                          fill
                          className="object-contain rounded-lg"
                          data-ai-hint={panel.productImageHint}
                      />
                      </div>
                      <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="absolute top-[-1rem] right-[-1rem] bg-black/20 hover:bg-black/40 rounded-full h-9 w-9 text-white">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </Button>
                      </DialogClose>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
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
