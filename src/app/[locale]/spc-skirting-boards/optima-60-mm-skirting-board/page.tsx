
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingOptima60mm } from '@/lib/skirting-optima-60-mm-data';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

export default async function SkirtingOptima60mmPage() {
  const panels = await getSkirtingOptima60mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-optima-60-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-optima-60-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
