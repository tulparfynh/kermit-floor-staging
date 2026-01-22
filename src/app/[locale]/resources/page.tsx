import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getStarterPacks, getLibraryDocuments } from '@/lib/resources-data';
import ResourcesPageClient from '@/components/resources/ResourcesPageClient';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.ResourcesPage as any).seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export const revalidate = 60;

export default async function ResourcesPage() {
  const starterPacks = await getStarterPacks();
  const libraryDocs = await getLibraryDocuments();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ResourcesPageClient
          starterPacks={starterPacks}
          libraryDocs={libraryDocs}
        />
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}

    