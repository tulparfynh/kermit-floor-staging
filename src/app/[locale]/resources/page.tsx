import { Suspense } from 'react';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getStarterPacks, getLibraryDocuments } from '@/lib/resources-data';
import ResourcesPageClient from '@/components/resources/ResourcesPageClient';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAlternatesForRoute, getCanonicalForRoute } from '@/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResourcesPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: getAlternatesForRoute('/resources', locale),
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: getCanonicalForRoute('/resources', locale),
    },
  };
}

export default async function ResourcesPage() {
  const starterPacks = await getStarterPacks();
  const libraryDocs = await getLibraryDocuments();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="container mx-auto px-4 py-8 animate-pulse bg-muted/30 min-h-[40vh] rounded-lg" />}>
          <ResourcesPageClient
            starterPacks={starterPacks}
            libraryDocs={libraryDocs}
          />
        </Suspense>
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}

    
