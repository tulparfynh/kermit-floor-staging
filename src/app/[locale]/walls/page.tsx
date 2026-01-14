
import { Link } from '@/navigation';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WallsPage() {
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
      <Header pageType="walls" />
      <main className="flex-grow">
        {/* Collections Section */}
        <div className="py-12 lg:py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold font-headline text-primary tracking-wide text-center mb-10 lg:mb-12">
              {t('collectionsTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link href={collection.href} key={collection.name} className="group">
                  <Card className="overflow-hidden h-full flex flex-col transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <div className="relative aspect-video">
                      <Image
                        src={collection.imageUrl}
                        alt={collection.name}
                        fill
                        className="object-cover"
                        data-ai-hint={collection.imageHint}
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <CardTitle className="font-headline text-2xl text-primary">{collection.name}</CardTitle>
                      <CardDescription className="text-base mt-2">{collection.description}</CardDescription>
                       <div className="mt-auto pt-4 flex items-center text-primary font-semibold">
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
