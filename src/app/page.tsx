import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';
import { Chatbox } from '@/components/showcase/Chatbox';
import { Footer } from '@/components/showcase/Footer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-grow">
        <Showcase />
      </div>
      <Footer />
      <Chatbox />
    </main>
  );
}
