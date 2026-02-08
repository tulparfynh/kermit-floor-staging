
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import ContactPageClient from '@/components/contact/ContactPageClient';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Chatbox } from '@/components/showcase/Chatbox';
import { getAlternatesForRoute, getCanonicalForRoute } from '@/lib/seo/canonical';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
 
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    alternates: getAlternatesForRoute('/contact', locale),
    openGraph: {
      title: t('seo.title'),
      description: t('seo.description'),
      url: getCanonicalForRoute('/contact', locale),
    },
  };
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <ContactPageClient />
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}
