
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[60vh] lg:h-[80vh] w-full">
          <Image
            src="https://picsum.photos/seed/mainhero/1920/1080"
            alt="Elegant modern interior with stylish wall and floor finishes"
            fill
            className="object-cover"
            data-ai-hint="modern interior living room"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight text-white">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-white/90 max-w-2xl">
              {t('heroSubtitle')}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/spc-wall-panels">
                {t('collectionsTitle')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
