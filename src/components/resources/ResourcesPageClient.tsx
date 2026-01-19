'use client';

import type { Resource } from '@/lib/resources-data';
import { useLocale, useTranslations } from 'next-intl';
import StarterPackCard from './StarterPackCard';
import ResourceLibrary from './ResourceLibrary';
import { Separator } from '../ui/separator';
import Image from 'next/image';

type ResourcesPageClientProps = {
  starterPacks: Resource[];
  libraryDocs: Resource[];
};

export default function ResourcesPageClient({
  starterPacks,
  libraryDocs,
}: ResourcesPageClientProps) {
  const t = useTranslations('ResourcesPage');
  const locale = useLocale();

  const installerPack = starterPacks.find(p => p.id === 'pack-installer');
  const dealerPack = starterPacks.find(p => p.id === 'pack-dealer');
  const architectPack = starterPacks.find(p => p.id === 'pack-architect');

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-48 lg:h-64 w-full">
        <Image
            src="/images/hero-images/resources-download-hero-image.jpg"
            alt={t('heroTitle')}
            fill
            className="object-cover"
            data-ai-hint="technical documents blueprints"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Starter Packs Section */}
        <section>
          <h2 className="text-3xl font-bold font-headline text-center mb-8">
            {t('starterPacksTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installerPack && <StarterPackCard pack={installerPack} libraryDocs={libraryDocs} />}
            {dealerPack && <StarterPackCard pack={dealerPack} libraryDocs={libraryDocs} />}
            {architectPack && <StarterPackCard pack={architectPack} libraryDocs={libraryDocs} />}
          </div>
        </section>

        <Separator />

        {/* Resource Library Section */}
        <section>
          <ResourceLibrary documents={libraryDocs} />
        </section>
      </div>
    </>
  );
}
