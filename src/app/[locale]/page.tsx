import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  const collections = [
    {
      name: t('spcWallPanelsTitle'),
      description: t('spcWallPanelsDescription'),
      href: '/spc-wall-panels',
      imageUrl: '/images/Marble-Statuario-w23138-2-application-photo.jpg',
      imageHint: 'modern kitchen with marble panels'
    },
    {
      name: t('spcFlooringTitle'),
      description: t('spcFlooringDescription'),
      href: '#',
      imageUrl: 'https://picsum.photos/seed/floor1/800/600',
      imageHint: 'stylish modern flooring'
    },
      {
      name: t('spc3dWallPanelsTitle'),
      description: t('spc3dWallPanelsDescription'),
      href: '#',
      imageUrl: 'https://picsum.photos/seed/3dpanel/800/600',
      imageHint: 'textured 3d wall panels'
    },
  ];

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
              {t('heroTitle')}
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-white/90 max-w-2xl">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>

        {/* Collections Section */}
        <div className="py-12 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary tracking-wide text-center mb-10 lg:mb-12">
              {t('collectionsTitle')}
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
                         <span>{t('viewCollection')}</span>
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
