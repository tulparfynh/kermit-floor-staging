
import { Header } from '@/components/showcase/Header';
import { HeroPreload } from '@/components/showcase/HeroPreload';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getFloorStone } from '@/lib/floor-stone-data';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SpcParquetStoneCollectionPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export default async function SpcParquetStoneCollectionPage() {
  const panels = await getFloorStone();

  return (
    <>
      <HeroPreload pageType="spc-parquet-stone-collection" />
      <main className="min-h-screen flex flex-col bg-background">
        <Header pageType="spc-parquet-stone-collection" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-parquet-stone-collection" />
      </div>
      <Footer />
      <Chatbox />
      </main>
    </>
  );
}

    