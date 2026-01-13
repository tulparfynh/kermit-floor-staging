import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    name: 'SPC Wall Panels',
    description: 'Explore our premium collection of Stone Polymer Composite wall panels.',
    href: '/spc-wall-panels',
    imageUrl: '/images/Marble-Statuario-w23138-2-application-photo.jpg',
    imageHint: 'modern kitchen with marble panels'
  },
  {
    name: 'SPC Flooring',
    description: 'Durable and stylish flooring solutions for any space.',
    href: '#',
    imageUrl: 'https://picsum.photos/seed/floor1/800/600',
    imageHint: 'stylish modern flooring'
  },
    {
    name: 'SPC 3D Wall Panels',
    description: 'Add depth and texture with our innovative 3D wall panels.',
    href: '#',
    imageUrl: 'https://picsum.photos/seed/3dpanel/800/600',
    imageHint: 'textured 3d wall panels'
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-64 lg:h-80 w-full">
          <Image
            src="https://picsum.photos/seed/hero/1920/1080"
            alt="Modern interior design"
            fill
            className="object-cover"
            data-ai-hint="modern interior"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight text-white">
              Innovative Wall & Floor Solutions
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-white/90 max-w-2xl">
              Discover premium SPC products that redefine your space with elegance and durability.
            </p>
          </div>
        </div>

        {/* Collections Section */}
        <div className="py-12 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary tracking-wide text-center mb-10 lg:mb-12">
              Our Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link href={collection.href} key={collection.name} className="group">
                  <Card className="overflow-hidden h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <div className="relative aspect-video">
                      <Image
                        src={collection.imageUrl}
                        alt={collection.name}
                        fill
                        className="object-cover"
                        data-ai-hint={collection.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardHeader className="relative -mt-16 z-10">
                      <CardTitle className="font-headline text-2xl text-white">{collection.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{collection.description}</CardDescription>
                       <div className="mt-4 flex items-center text-primary font-semibold">
                         <span>View Collection</span>
                         <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                       </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
