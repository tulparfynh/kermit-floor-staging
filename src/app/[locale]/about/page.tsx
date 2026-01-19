
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/navigation';
import { Factory, DraftingCompass, Layers, Recycle } from 'lucide-react';
import { getMessages, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => (messages.AboutPage.seo as any)[key] as string;
 
  return {
    title: t('metaTitle'),
    description: t('metaDescription')
  };
}


const WhyKermitCard = ({ icon: Icon, title, text }: { icon: React.ElementType, title: string, text: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg">
    <div className="bg-background p-3 rounded-full mb-4 border">
        <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="font-headline text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm mt-2">{text}</p>
  </div>
);

const WhatWeMakeCard = ({ title, text, image, imageHint }: { title: string, text: string, image: string, imageHint: string }) => (
    <Card className="flex flex-col overflow-hidden text-center">
        <div className="relative aspect-video w-full">
            <Image src={image} alt={title} fill className="object-cover" data-ai-hint={imageHint} />
        </div>
        <CardHeader>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-muted-foreground">{text}</p>
        </CardContent>
    </Card>
);

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  const whyKermitItems = [
    { icon: Factory, title: t('whyKermit.manufacturer.title'), text: t('whyKermit.manufacturer.text') },
    { icon: DraftingCompass, title: t('whyKermit.design.title'), text: t('whyKermit.design.text') },
    { icon: Layers, title: t('whyKermit.system.title'), text: t('whyKermit.system.text') },
    { icon: Recycle, title: t('whyKermit.sustainability.title'), text: t('whyKermit.sustainability.text') },
  ];
  
  const whatWeMakeItems = [
      { title: t('whatWeMake.flooring.title'), text: t('whatWeMake.flooring.text'), image: 'https://www.kermitfloor.com/wp-content/uploads/2022/11/Screenshot-2022-11-23-at-13.43.32.jpg', imageHint: 'SPC flooring layers' },
      { title: t('whatWeMake.skirting.title'), text: t('whatWeMake.skirting.text'), image: 'https://www.kermitfloor.com/wp-content/uploads/2023/12/3-1.jpg', imageHint: 'SPC skirting boards' },
      { title: t('whatWeMake.wallPanels.title'), text: t('whatWeMake.wallPanels.text'), image: 'https://www.kermitfloor.com/wp-content/uploads/2022/11/Screenshot-2022-11-23-at-13.42.06-2.jpg', imageHint: 'SPC wall panels' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        
        {/* 1. Hero */}
        <section className="bg-muted py-16 text-center">
          <div className="container px-4">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold text-primary">{t('hero.title')}</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{t('hero.subtitle')}</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/spc-wall-panels">{t('hero.ctaPrimary')}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/resources">{t('hero.ctaSecondary')}</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container px-4 mx-auto space-y-16 md:space-y-24 py-16 md:py-24">
            {/* 2. Who We Are */}
            <section className="max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-3xl font-bold text-foreground">{t('whoWeAre.title')}</h2>
                <div className="mt-6 space-y-4 text-muted-foreground text-lg">
                    <p>{t('whoWeAre.p1')}</p>
                    <p>{t('whoWeAre.p2')}</p>
                </div>
            </section>

            <Separator />

            {/* 3. What We Make */}
            <section className="max-w-6xl mx-auto">
                <h2 className="font-headline text-3xl font-bold text-foreground text-center">{t('whatWeMake.title')}</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whatWeMakeItems.map(item => (
                        <WhatWeMakeCard key={item.title} {...item} />
                    ))}
                </div>
            </section>

            <Separator />

            {/* 4. Why Kermit Floor */}
            <section>
                <h2 className="font-headline text-3xl font-bold text-foreground text-center">{t('whyKermit.title')}</h2>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {whyKermitItems.map(item => (
                        <WhyKermitCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
                    ))}
                </div>
            </section>
            
            <Separator />

            {/* 5. Manufacturing & Supply Footprint */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1581092918056-0c9c4e579346?q=80&w=1974&auto=format&fit=crop" alt="Manufacturing facility" fill className="object-cover" data-ai-hint="manufacturing facility" />
                </div>
                <div>
                    <h2 className="font-headline text-3xl font-bold text-foreground">{t('footprint.title')}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{t('footprint.p1')}</p>
                    <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                        <h3 className="font-headline text-xl font-semibold">{t('footprint.ctaTitle')}</h3>
                        <p className="mt-2 text-muted-foreground">{t('footprint.ctaText')}</p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                            <Button asChild>
                                <a href="mailto:info@kermitfloor.com">{t('footprint.ctaButton1')}</a>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/resources">{t('footprint.ctaButton2')}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            
            <Separator />

            {/* 6. Sustainability & Responsibility */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2 relative aspect-square lg:aspect-[4/3] rounded-lg overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1542601906-8b6a35da7601?q=80&w=2070&auto=format&fit=crop" alt="Hands holding a green sprout" fill className="object-cover" data-ai-hint="sustainability responsibility" />
                </div>
                <div className="lg:order-1">
                    <h2 className="font-headline text-3xl font-bold text-foreground">{t('sustainability.title')}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">{t('sustainability.p1')}</p>
                </div>
            </section>
        </div>

        {/* 7. Final CTA Band */}
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="font-headline text-3xl font-bold text-primary max-w-3xl mx-auto">{t('finalCta.title')}</h2>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/spc-wall-panels">{t('finalCta.ctaPrimary')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/resources?tab=wall_panels">{t('finalCta.ctaSecondary')}</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
