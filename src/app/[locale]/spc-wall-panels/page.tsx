
import { Header } from '@/components/showcase/Header';
import { HeroPreload } from '@/components/showcase/HeroPreload';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getPanels } from '@/lib/panel-data';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SpcWallPanelsPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

export default async function SpcWallPanelsPage() {
  const panels = await getPanels();

  return (
    <>
      <HeroPreload pageType="spc-wall-panels" />
      <main className="min-h-screen flex flex-col bg-background">
        <Header pageType="spc-wall-panels" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-wall-panels" />
      </div>
      <Footer />
      <Chatbox />
      </main>
    </>
  );
}
