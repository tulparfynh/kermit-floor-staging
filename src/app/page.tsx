import { Header } from '@/components/showcase/Header';
import { Showcase } from '@/components/showcase/Showcase';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Showcase />
      </div>
      <footer className="py-8 mt-12 lg:mt-16 bg-muted">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Kermit Wall Panels. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
