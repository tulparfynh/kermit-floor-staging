
import { Header } from '@/components/showcase/Header';
import { HeroPreload } from '@/components/showcase/HeroPreload';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingModerna100mm } from '@/lib/skirting-moderna-100-mm-data';
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
    title: t('moderna-100-mm.title'),
    description: t('moderna-100-mm.description')
  };
}

export default async function SkirtingModerna100mmPage() {
  const panels = await getSkirtingModerna100mm();

  return (
    <>
      <HeroPreload pageType="skirting-moderna-100-mm" />
      <main className="min-h-screen flex flex-col bg-background">
        <Header pageType="skirting-moderna-100-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-moderna-100-mm" />
      </div>
      <Footer />
      <Chatbox />
      </main>
    </>
  );
}

    