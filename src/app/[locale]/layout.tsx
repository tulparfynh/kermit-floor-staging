import type {Metadata} from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import {getMessages} from 'next-intl/server';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import Script from 'next/script';
import { inter, montserrat } from '@/app/fonts';
 
export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => (messages.Metadata as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
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
        <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
