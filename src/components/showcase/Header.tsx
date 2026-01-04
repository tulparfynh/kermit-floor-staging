import { Gem } from 'lucide-react';

export function Header() {
  return (
    <header className="py-12 lg:py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gem className="h-7 w-7 text-secondary" />
          <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-primary">
            Kermit Wall Panels
          </h1>
        </div>
        <p className="max-w-3xl mx-auto text-lg text-foreground/80">
          Discover our premium SPC (Stone Polymer Composite) wall panels. Waterproof, anti-bacterial, and beautifully designed for any space.
        </p>
      </div>
    </header>
  );
}
