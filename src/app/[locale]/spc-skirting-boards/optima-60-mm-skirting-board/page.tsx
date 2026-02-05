
import { Header } from '@/components/showcase/Header';
import { HeroPreload } from '@/components/showcase/HeroPreload';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingOptima60mm } from '@/lib/skirting-optima-60-mm-data';
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
    title: t('optima-60-mm.title'),
    description: t('optima-60-mm.description')
  };
}

export default async function SkirtingOptima60mmPage() {
  const panels = await getSkirtingOptima60mm();

  return (
    <>
      <HeroPreload pageType="skirting-optima-60-mm" />
      <main className="min-h-screen flex flex-col bg-background">
        <Header pageType="skirting-optima-60-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-optima-60-mm" />
      </div>
      <Footer />
      <Chatbox />
      </main>
    </>
  );
}

    