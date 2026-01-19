
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Factory, DraftingCompass, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CollectionCard = ({ title, description, href, imageUrl, imageHint, ctaText }: { title: string, description: string, href: any, imageUrl: string, imageHint: string, ctaText: string }) => (
  <Card className="flex flex-col overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative aspect-video w-full">
      <Image src={imageUrl} alt={title} fill className="object-cover" data-ai-hint={imageHint} />
    </div>
    <CardHeader>
      <CardTitle className="font-headline text-2xl">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
    <div className="p-6 pt-0">
      <Button asChild>
        <Link href={href}>
          {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </Card>
);

const WhyKermitCard = ({ icon: Icon, title, text }: { icon: React.ElementType, title: string, text: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg h-full">
    <div className="bg-background p-3 rounded-full mb-4 border">
        <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="font-headline text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm mt-2">{text}</p>
  </div>
);


export default function Home() {
  const t = useTranslations('HomePage');

  const collections = [
    { name: 'flooring', href: '/spc-parquet-natural-collection', imageUrl: 'https://picsum.photos/seed/flooring/800/600', imageHint: 'wood flooring' },
    { name: 'walls', href: '/spc-wall-panels', imageUrl: 'https://picsum.photos/seed/wallpanels/800/600', imageHint: 'marble wall panels' },
    { name: 'skirting', href: '/skirting-boards/optima-60-mm-skirting-board', imageUrl: 'https://picsum.photos/seed/skirting/800/600', imageHint: 'skirting board closeup' },
  ];
  
  const whyKermitItems = [
    { icon: Factory, title: t('whyKermit.manufacturer.title'), text: t('whyKermit.manufacturer.text') },
    { icon: DraftingCompass, title: t('whyKermit.design.title'), text: t('whyKermit.design.text') },
    { icon: Layers, title: t('whyKermit.system.title'), text: t('whyKermit.system.text') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] lg:h-[80vh] w-full">
          <Image
            src="https://picsum.photos/seed/mainhero/1920/1080"
            alt="Elegant modern interior with stylish wall and floor finishes"
            fill
            className="object-cover"
            data-ai-hint="modern interior living room"
            priority
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-4">
            <h1 className="font-headline text-4xl lg:text-6xl font-bold tracking-tight text-white">
              {t('heroTitle')}
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-white/90 max-w-2xl">
              {t('heroSubtitle')}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/spc-wall-panels">
                {t('exploreProducts')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <div className="space-y-16 md:space-y-24 py-16 md:py-24">
          {/* Collections Section */}
          <section className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center text-foreground mb-10">{t('collectionsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map(col => (
                <CollectionCard 
                  key={col.name}
                  title={t(`${col.name}Title` as any)}
                  description={t(`${col.name}Description` as any)}
                  href={col.href}
                  imageUrl={col.imageUrl}
                  imageHint={col.imageHint}
                  ctaText={t(`view${col.name.charAt(0).toUpperCase() + col.name.slice(1)}` as any)}
                />
              ))}
            </div>
          </section>

          {/* Why Kermit Section */}
          <section className="container mx-auto px-4">
              <h2 className="font-headline text-3xl font-bold text-foreground text-center mb-10">{t('whyKermitTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {whyKermitItems.map(item => (
                      <WhyKermitCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
                  ))}
              </div>
          </section>
        </div>

        {/* Final CTA Section */}
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="font-headline text-3xl font-bold text-primary max-w-3xl mx-auto">{t('finalCta.title')}</h2>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/spc-wall-panels">{t('finalCta.ctaPrimary')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/contact">{t('finalCta.ctaSecondary')}</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
