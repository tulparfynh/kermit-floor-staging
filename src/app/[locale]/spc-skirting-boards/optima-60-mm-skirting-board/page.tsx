
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingOptima60mm } from '@/lib/skirting-optima-60-mm-data';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.SkirtingPages as any)['optima-60-mm'] as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function SkirtingOptima60mmPage() {
  const panels = await getSkirtingOptima60mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-optima-60-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-optima-60-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    