
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getFloorFullNatural } from '@/lib/floor-full-natural-data';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.FullNaturalCollectionPage as any).seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export default async function FullNaturalCollectionPage() {
  const panels = await getFloorFullNatural();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="full-natural-collection" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="full-natural-collection" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    