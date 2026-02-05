
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingBerlin100mm } from '@/lib/skirting-berlin-100-mm-data';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SkirtingPages' });
 
  return {
    title: t('berlin-100-mm.title'),
    description: t('berlin-100-mm.description')
  };
}

export default async function SkirtingBerlin100mmPage() {
  const panels = await getSkirtingBerlin100mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-berlin-100-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-berlin-100-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    