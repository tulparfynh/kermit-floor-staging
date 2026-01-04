
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
  { label: 'MATERIAL', value: 'SPC ( Stone Polymer Composite )' },
];

const features = [
  { icon: Droplets, text: 'Water Proof' },
  { icon: ShieldCheck, text: 'Anti Bacterial' },
  { icon: Zap, text: 'Quick Installation' },
  { icon: Hammer, text: 'Impact Resistant' },
  { icon: Star, text: 'Ultimate Shield Coating' },
  { icon: Volume2, text: 'Sound Absorbtion' },
  { icon: Leaf, text: 'Phthalate Free' },
];

type ProductDetailsProps = {
  panel: Panel;
};

export function ProductDetails({ panel }: ProductDetailsProps) {
  return (
    <Card className="shadow-lg rounded-xl overflow-hidden border">
      <CardContent className="p-0">
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
            <ul className="space-y-3 text-sm">
              {specs.map((spec, index) => (
                <li key={spec.label} className="flex justify-between items-center border-b border-border/70 pb-3">
                  <span className="font-semibold text-foreground/70">{spec.label}:</span>
                  <span className="font-medium text-foreground">{spec.value}</span>
                </li>
              ))}
            </ul>

            <Separator className="my-6" />

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
              {features.map((feature) => (
                <div key={feature.text} className="flex flex-col items-center gap-2">
                  <feature.icon className="h-6 w-6 text-secondary" />
                  <span className="text-xs font-medium text-foreground/80">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
