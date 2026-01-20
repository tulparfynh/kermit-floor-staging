
import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';
import { getSkirtingXLine100mm } from '@/lib/skirting-x-line-100-mm-data';

// This tells Next.js to re-validate the page (check for new data)
// at most once every 60 seconds.
export const revalidate = 60; 

export default async function SkirtingXLine100mmPage() {
  const panels = await getSkirtingXLine100mm();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header pageType="skirting-x-line-100-mm" />
      <div className="flex-grow">
        <Showcase initialPanels={panels} collectionType="skirting-x-line-100-mm" />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
