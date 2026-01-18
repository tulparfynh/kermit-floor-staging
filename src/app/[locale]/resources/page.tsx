import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getStarterPacks, getLibraryDocuments } from '@/lib/resources-data';
import ResourcesPageClient from '@/components/resources/ResourcesPageClient';

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
