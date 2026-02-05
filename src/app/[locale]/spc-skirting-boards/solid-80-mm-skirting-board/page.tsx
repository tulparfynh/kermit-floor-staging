
import { Header } from '@/components/showcase/Header';
import { HeroPreload } from '@/components/showcase/HeroPreload';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingSolid80mm } from '@/lib/skirting-solid-80-mm-data';
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
    title: t('solid-80-mm.title'),
    description: t('solid-80-mm.description')
  };
}

export default async function SkirtingSolid80mmPage() {
  const panels = await getSkirtingSolid80mm();

  return (
    <>
      <HeroPreload pageType="skirting-solid-80-mm" />
      <main className="min-h-screen flex flex-col bg-background">
        <Header pageType="skirting-solid-80-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-solid-80-mm" />
      </div>
      <Footer />
      <Chatbox />
      </main>
    </>
  );
}

    