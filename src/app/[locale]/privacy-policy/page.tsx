import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { getAlternatesForRoute, getCanonicalForRoute } from '@/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicyPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: getAlternatesForRoute('/privacy-policy', locale),
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: getCanonicalForRoute('/privacy-policy', locale),
    },
  };
}

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="space-y-3">
        <h2 className="text-2xl font-bold font-headline text-primary">{title}</h2>
        <div className="space-y-4 text-foreground/80">
            {children}
        </div>
    </section>
);

const RichTextComponents = {
  p: (chunks: React.ReactNode) => <p>{chunks}</p>,
  ul: (chunks: React.ReactNode) => <ul className="list-outside space-y-2 pl-6 list-disc">{chunks}</ul>,
  ol: (chunks: React.ReactNode) => <ol className="list-outside space-y-2 pl-6 list-decimal">{chunks}</ol>,
  li: (chunks: React.ReactNode) => <li>{chunks}</li>,
  strong: (chunks: React.ReactNode) => <strong className="font-semibold text-foreground">{chunks}</strong>,
  em: (chunks: React.ReactNode) => <em className="italic">{chunks}</em>,
  h3: (chunks: React.ReactNode) => <h3 className="text-lg font-semibold text-foreground mt-4">{chunks}</h3>,
};

export default async function PrivacyPolicyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('PrivacyPolicyPage');
    const sections = Array.from({ length: 14 }, (_, i) => i + 1);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold font-headline text-center mb-4">{t('title')}</h1>
                    <p className="text-center text-muted-foreground mb-10">{t('lastUpdated')}</p>
                    <Separator />
                    <div className="max-w-4xl mx-auto space-y-10 mt-10">
                        {sections.map(num => (
                          <Section key={num} title={t(`section${num}.title`)}>
                            {t.rich(`section${num}.content`, RichTextComponents)}
                          </Section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <Chatbox />
        </div>
    );
}
