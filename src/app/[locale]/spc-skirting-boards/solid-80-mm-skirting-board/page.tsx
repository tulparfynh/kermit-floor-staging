
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingSolid80mm } from '@/lib/skirting-solid-80-mm-data';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.SkirtingPages as any)['solid-80-mm'] as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function SkirtingSolid80mmPage() {
  const panels = await getSkirtingSolid80mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-solid-80-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-solid-80-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    