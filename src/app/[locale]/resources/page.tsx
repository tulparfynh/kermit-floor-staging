import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getStarterPacks, getLibraryDocuments } from '@/lib/resources-data';
import ResourcesPageClient from '@/components/resources/ResourcesPageClient';
import { useTranslations } from 'next-intl';

export const revalidate = 60;

export default async function ResourcesPage() {
  const starterPacks = await getStarterPacks();
  const libraryDocs = await getLibraryDocuments();
  const t = useTranslations('ResourcesPage');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-muted border-b">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-primary">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
        
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
