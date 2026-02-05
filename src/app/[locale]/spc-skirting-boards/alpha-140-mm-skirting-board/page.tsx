
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingAlpha140mm } from '@/lib/skirting-alpha-140-mm-data';
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
    title: t('alpha-140-mm.title'),
    description: t('alpha-140-mm.description')
  };
}

export default async function SkirtingAlpha140mmPage() {
  const panels = await getSkirtingAlpha140mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-alpha-140-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-alpha-140-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    