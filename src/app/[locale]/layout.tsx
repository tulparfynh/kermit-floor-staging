import type {Metadata} from 'next';
import Script from 'next/script';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import {getMessages} from 'next-intl/server';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import { inter, montserrat } from '@/app/fonts';
 
export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const messages = await getMessages({locale});
  const t = (key: string) => (messages.Metadata as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/images/icons/favicon.32x32.png',
      apple: '/images/icons/favicon.180x180.png',
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'tr' }];
}

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = useMessages();
  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </body>
    </html>
  );
}
