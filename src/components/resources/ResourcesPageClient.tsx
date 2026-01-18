'use client';

import type { Resource } from '@/lib/resources-data';
import { useLocale, useTranslations } from 'next-intl';
import StarterPackCard from './StarterPackCard';
import ResourceLibrary from './ResourceLibrary';
import { Separator } from '../ui/separator';

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
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      {/* Starter Packs Section */}
      <section>
        <h2 className="text-3xl font-bold font-headline text-center mb-8">
          {t('starterPacksTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {installerPack && <StarterPackCard pack={installerPack} />}
          {dealerPack && <StarterPackCard pack={dealerPack} />}
          {architectPack && <StarterPackCard pack={architectPack} />}
        </div>
      </section>

      <Separator />
      
      {/* Resource Library Section */}
      <section>
        <ResourceLibrary documents={libraryDocs} />
      </section>
    </div>
  );
}
