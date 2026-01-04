import { Layers, Scaling, ShieldCheck, Waves } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Layers,
    label: '4mm Thickness',
    description: 'Durable and robust construction.',
  },
  {
    icon: Scaling,
    label: '960x2800mm Size',
    description: 'Large format for seamless walls.',
  },
  {
    icon: Waves,
    label: 'Waterproof',
    description: 'Ideal for bathrooms and kitchens.',
  },
  {
    icon: ShieldCheck,
    label: 'Anti-Bacterial',
    description: 'Hygienic and easy to clean.',
  },
];

export function PanelSpecs() {
  return (
    <div>
      <h3 className="font-headline text-xl font-bold mb-4">Core Features</h3>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <Card key={feature.label} className="bg-background/50 border-border/50 hover:bg-card transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <feature.icon className="w-8 h-8 text-secondary" />
              <p className="font-semibold text-sm text-foreground">{feature.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
