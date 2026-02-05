
import { Header } from '@/components/showcase/Header';
import { HeroPreload } from '@/components/showcase/HeroPreload';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { get3dPanelsModelB } from '@/lib/3d-panel-data-model-b';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Spc3dWallPanelsModelBPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export default async function Spc3dWallPanelsModelBPage() {
  const panels = await get3dPanelsModelB();

  return (
    <>
      <HeroPreload pageType="spc-3d-wall-panels-model-b" />
      <main className="min-h-screen flex flex-col bg-background">
        <Header pageType="spc-3d-wall-panels-model-b" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-3d-wall-panels-model-b" />
      </div>
      <Footer />
      <Chatbox />
      </main>
    </>
  );
}
