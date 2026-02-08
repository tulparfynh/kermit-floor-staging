
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingOptima90mm } from '@/lib/skirting-optima-90-mm-data';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternatesForRoute, getCanonicalForRoute } from '@/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SkirtingPages' });
 
  return {
    title: t('optima-90-mm.title'),
    description: t('optima-90-mm.description'),
    alternates: getAlternatesForRoute('/spc-skirting-boards/optima-90-mm-skirting-board', locale),
    openGraph: {
      title: t('optima-90-mm.title'),
      description: t('optima-90-mm.description'),
      url: getCanonicalForRoute('/spc-skirting-boards/optima-90-mm-skirting-board', locale),
    },
  };
}

export default async function SkirtingOptima90mmPage() {
  const panels = await getSkirtingOptima90mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-optima-90-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-optima-90-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}

    
