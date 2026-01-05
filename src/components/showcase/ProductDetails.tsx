
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

const leftFeatures = allFeatures.slice(0, 3);
const rightFeatures = allFeatures.slice(3);


type ProductDetailsProps = {
  panel: Panel;
};

function FeatureColumn({ features }: { features: typeof allFeatures }) {
    return (
        <div className="flex flex-col justify-center items-center gap-4 py-4 px-1 bg-muted h-full">
            {features.map((feature) => (
                <div key={feature.text} className="flex flex-col items-center gap-1.5 text-center w-20">
                    <feature.icon className="h-6 w-6 text-secondary" />
                    <span className="text-[11px] font-medium text-foreground/80 leading-tight">{feature.text}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative p-8">
              <Badge variant="outline" className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm">{panel.name}</Badge>
              <Image
                src={panel.productImageUrl}
                alt={panel.name}
                width={600}
                height={600}
                className="w-full h-auto object-cover aspect-square rounded-lg shadow-md"
                data-ai-hint={panel.productImageHint}
              />
            </div>
            <div className="p-8 bg-background/50 flex flex-col justify-center">
              <ul className="space-y-4">
                {specs.map((spec) => (
                  <li key={spec.label} className="flex justify-between items-center border-b border-border/70 pb-3">
                    <span className="font-bold text-foreground text-sm tracking-wide">{spec.label}:</span>
                    <span className="font-medium text-foreground text-base">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <div className="hidden lg:flex">
            <FeatureColumn features={rightFeatures} />
        </div>

        <div className="lg:hidden col-span-1 bg-muted px-4 py-6 border-t">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
              {allFeatures.map((feature) => (
                <div key={feature.text} className="flex flex-col items-center gap-2">
                  <feature.icon className="h-6 w-6 text-secondary" />
                  <span className="text-[10px] font-medium text-foreground/80 leading-tight">{feature.text}</span>
                </div>
              ))}
            </div>
        </div>
      </div>
    </Card>
  );
}
