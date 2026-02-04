
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { get3dPanelsModelA } from '@/lib/3d-panel-data-model-a';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.Spc3dWallPanelsModelAPage as any).seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
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
