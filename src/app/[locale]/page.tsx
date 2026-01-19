
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Factory, DraftingCompass, Layers, ChevronDown, Package, Download, BookOpen, FileText, Wrench, ShieldCheck, Zap, Palette, Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getStarterPacks } from '@/lib/resources-data';
import type { Resource, Locale } from '@/lib/resources-data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const StarterPackPill = ({ pack, locale }: { pack: Resource; locale: Locale }) => {
  const title = locale === 'tr' ? pack.title_tr : pack.title;
  const downloadUrl = pack.files[locale]?.url || pack.files['en'].url;

  return (
    <Button asChild variant="secondary" className="h-auto py-2 px-4 bg-background/20 hover:bg-background/40 backdrop-blur-sm border border-white/20 text-white hover:text-white">
      <a href={downloadUrl} download>
        <Download className="mr-2 h-4 w-4" />
        <span className="text-sm font-semibold">{title}</span>
      </a>
    </Button>
  );
};

const ProductLineCard = ({ title, description, benefits, href, imageUrl, imageHint, ctaText }: { title: string, description: string, benefits: {text: string, icon: React.ElementType}[], href: any, imageUrl: string, imageHint: string, ctaText: string }) => (
  <Card className="flex flex-col overflow-hidden text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative aspect-[4/3] w-full">
      <Image src={imageUrl} alt={title} fill className="object-cover" data-ai-hint={imageHint} />
    </div>
    <CardHeader>
      <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow space-y-3">
        {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
                <benefit.icon className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-sm font-medium">{benefit.text}</span>
            </div>
        ))}
    </CardContent>
    <div className="p-6 pt-4">
      <Button asChild variant="outline" className="w-full">
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

const ResourceTeaserCard = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
    <Card className="p-6 flex flex-col items-center justify-center text-center">
        <Icon className="h-10 w-10 text-secondary mb-3" />
        <h3 className="font-headline font-semibold text-lg">{title}</h3>
    </Card>
);

export default async function Home({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations('HomePage');
  const starterPacks = await getStarterPacks();

  const productLines = [
    { name: 'flooring', href: '/spc-parquet-natural-collection', imageUrl: '/images/spc-parquet-natural-collection/29098-2/application.jpg', imageHint: 'elegant room flooring', benefits: [{text: t('flooringBenefits.b1'), icon: ShieldCheck}, {text: t('flooringBenefits.b2'), icon: Zap}, {text: t('flooringBenefits.b3'), icon: Palette}] },
    { name: 'walls', href: '/spc-wall-panels', imageUrl: '/images/spc-wall-panels/23048-6/application.jpg', imageHint: 'modern kitchen panels', benefits: [{text: t('wallsBenefits.b1'), icon: ShieldCheck}, {text: t('wallsBenefits.b2'), icon: Zap}, {text: t('wallsBenefits.b3'), icon: Palette}] },
    { name: 'skirting', href: '/skirting-boards/optima-60-mm-skirting-board', imageUrl: '/images/skirting-boards/alpha-140-mm-skirting-board/14005031/application.jpg', imageHint: 'living room skirting', benefits: [{text: t('skirtingBenefits.b1'), icon: ShieldCheck}, {text: t('skirtingBenefits.b2'), icon: Zap}, {text: t('skirtingBenefits.b3'), icon: Palette}] },
  ];
  
  const whyKermitItems = [
    { icon: Factory, title: t('whyKermit.manufacturer.title'), text: t('whyKermit.manufacturer.text') },
    { icon: DraftingCompass, title: t('whyKermit.design.title'), text: t('whyKermit.design.text') },
    { icon: Layers, title: t('whyKermit.system.title'), text: t('whyKermit.system.text') },
  ];

  const resourceTeasers = [
      { title: t('resourcesCardCatalogue'), icon: BookOpen },
      { title: t('resourcesCardTds'), icon: FileText },
      { title: t('resourcesCardInstall'), icon: Wrench },
  ];
  
  const instagramPlaceholders = Array.from({ length: 8 }, (_, i) => i + 1);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <section className="relative h-[75vh] md:h-[85vh] w-full">
          <Image
            src="/images/spc-wall-panels/23048-6/application.jpg"
            alt="Modern kitchen with elegant SPC wall panels"
            fill
            className="object-cover"
            data-ai-hint="modern kitchen wall"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
            <div className="max-w-4xl text-white">
                <h1 className="font-headline text-3xl lg:text-5xl font-bold tracking-tight">
                    {t('heroTitle')}
                </h1>
                <p className="mt-4 text-md lg:text-lg text-white/90">
                    {t('heroSubtitle')}
                </p>
            </div>
            
            <div className="absolute bottom-20 md:bottom-16 left-6 right-6">
              <div className="space-y-3 w-full max-w-4xl mx-auto">
                  <p className="text-white/80 text-sm font-semibold">{t('heroStarterPacksTitle')}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                      {starterPacks.map(pack => (
                          <StarterPackPill key={pack.id} pack={pack} locale={params.locale} />
                      ))}
                  </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 animate-bounce">
                <ChevronDown className="h-8 w-8 text-white/50" />
            </div>
          </div>
        </section>

        <div className="space-y-16 md:space-y-24 py-16 md:py-24">
          
          {/* 2. Product Lines Section */}
          <section className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-center text-foreground mb-4">{t('productLinesTitle')}</h2>
            <p className="text-center max-w-2xl mx-auto text-muted-foreground mb-12">{t('productLinesSubtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productLines.map(line => (
                <ProductLineCard 
                  key={line.name}
                  title={t(`${line.name}Title` as any)}
                  description={t(`${line.name}Description` as any)}
                  benefits={line.benefits}
                  href={line.href}
                  imageUrl={line.imageUrl}
                  imageHint={line.imageHint}
                  ctaText={t(`view${line.name.charAt(0).toUpperCase() + line.name.slice(1)}` as any)}
                />
              ))}
            </div>
          </section>

          {/* 3. Why Kermit Floor Section */}
          <section className="container mx-auto px-4">
              <h2 className="font-headline text-3xl font-bold text-foreground text-center mb-10">{t('whyKermitTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {whyKermitItems.map(item => (
                      <WhyKermitCard key={item.title} icon={item.icon} title={item.title} text={item.text} />
                  ))}
              </div>
              <div className="text-center mt-12">
                  <Button asChild size="lg">
                    <Link href="/about">{t('viewAboutUs')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
              </div>
          </section>

          {/* Separator */}
          <div className="container mx-auto px-4">
             <Separator />
          </div>

          {/* 4. News Section */}
          <section className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground mb-4">{t('newsTitle')}</h2>
            <div className="bg-muted/50 rounded-lg py-16">
              <p className="text-muted-foreground font-semibold">{t('comingSoon')}</p>
            </div>
          </section>

          {/* 5. Resources Teaser */}
          <section className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground mb-4">{t('resourcesTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {resourceTeasers.map(teaser => (
                    <ResourceTeaserCard key={teaser.title} title={teaser.title} icon={teaser.icon} />
                ))}
            </div>
            <div className="mt-10">
                <Button asChild size="lg" variant="outline">
                    <Link href="/resources">{t('viewResources')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </section>
          
          {/* 6. Instagram ("From Us") Section */}
          <section className="container mx-auto px-4 text-center">
             <h2 className="font-headline text-3xl font-bold text-foreground mb-2">{t('instagramTitle')}</h2>
             <p className="text-muted-foreground mb-10">{t('instagramSubtitle')}</p>
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 max-w-5xl mx-auto">
                {instagramPlaceholders.map(i => (
                    <div key={i} className="aspect-square relative group overflow-hidden rounded-md">
                        <Image
                            src={`https://picsum.photos/seed/${100+i}/400/400`}
                            alt={`Instagram post placeholder ${i}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            data-ai-hint="interior design"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Instagram className="h-8 w-8 text-white" />
                        </div>
                    </div>
                ))}
             </div>
             <div className="mt-10">
                <Button asChild>
                    <a href="https://www.instagram.com/kermitfloor" target="_blank" rel="noopener noreferrer">
                       <Instagram className="mr-2 h-5 w-5" /> {t('followInstagram')}
                    </a>
                </Button>
             </div>
          </section>

        </div>

        {/* 7. Final CTA Section */}
        <section className="bg-muted">
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary max-w-3xl mx-auto">{t('contactCtaTitle')}</h2>
                <div className="mt-8">
                    <Button asChild size="lg">
                        <Link href="/contact">{t('contactCtaButton')}</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
