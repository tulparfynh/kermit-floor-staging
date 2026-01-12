
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Panel } from '@/lib/panel-data';
import { Droplets, ShieldCheck, Zap, Hammer, Star, Volume2, Leaf } from 'lucide-react';

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

export function ProductDetails({ panel }: ProductDetailsProps) {
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden border-none">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto]">
        <div className="hidden lg:flex">
            <FeatureColumn features={leftFeatures} />
        </div>

        <CardContent className="p-0 bg-card">
          <div className="p-4 md:p-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary tracking-wide text-center mb-4">{panel.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start max-w-6xl mx-auto">
              <div className="relative aspect-square w-full">
                <Image
                  src={panel.productImageUrl}
                  alt={panel.name}
                  fill
                  className="object-cover rounded-lg shadow-md"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={panel.productImageHint}
                />
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
