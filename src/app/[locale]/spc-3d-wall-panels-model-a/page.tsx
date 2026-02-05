
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { get3dPanelsModelA } from '@/lib/3d-panel-data-model-a';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Spc3dWallPanelsModelAPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description')
  };
}

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export default async function Spc3dWallPanelsModelAPage() {
  const panels = await get3dPanelsModelA();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="spc-3d-wall-panels-model-a" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="spc-3d-wall-panels-model-a" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
