
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingSolid80mm } from '@/lib/skirting-solid-80-mm-data';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

export default async function SkirtingSolid80mmPage() {
  const panels = await getSkirtingSolid80mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-solid-80-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-solid-80-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
