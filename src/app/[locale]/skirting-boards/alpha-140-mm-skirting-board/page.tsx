
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingAlpha140mm } from '@/lib/skirting-alpha-140-mm-data';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

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
