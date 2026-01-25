
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import ContactPageClient from '@/components/contact/ContactPageClient';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { Chatbox } from '@/components/showcase/Chatbox';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => (messages.ContactPage.seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
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
