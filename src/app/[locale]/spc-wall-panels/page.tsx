
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getPanels } from '@/lib/panel-data';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.SpcWallPanelsPage as any).seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function SpcWallPanelsPage() {
  const panels = await getPanels();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="spc-wall-panels" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-wall-panels" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
