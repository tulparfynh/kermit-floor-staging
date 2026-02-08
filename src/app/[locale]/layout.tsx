import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import { inter, montserrat } from '@/app/fonts';
import {ConsentProvider} from '@/components/consent/ConsentProvider';
 
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
 
  return {
    metadataBase: new URL('https://kermitfloor.com'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: '/',
    },
    icons: {
      icon: '/images/icons/favicon.32x32.png',
      apple: '/images/icons/favicon.180x180.png',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? '';
  const consentModeEnabled = process.env.NEXT_PUBLIC_CONSENT_MODE_ENABLED !== 'false';
  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConsentProvider gaId={gaId} enabled={consentModeEnabled}>
            {children}
            <Toaster />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
