
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getFloorNatural } from '@/lib/floor-natural-data';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternatesForRoute, getCanonicalForRoute } from '@/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SpcParquetNaturalCollectionPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: getAlternatesForRoute('/spc-parquet-natural-collection', locale),
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: getCanonicalForRoute('/spc-parquet-natural-collection', locale),
    },
  };
}

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export default async function SpcParquetNaturalCollectionPage() {
  const panels = await getFloorNatural();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="spc-parquet-natural-collection" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-parquet-natural-collection" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    
