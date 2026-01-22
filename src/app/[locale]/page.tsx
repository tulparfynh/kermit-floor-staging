
import * as React from 'react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/showcase/Header';
import { Footer } from '@/components/showcase/Footer';
import Image from 'next/image';
import { getMessages, getTranslations } from 'next-intl/server';
import { ArrowRight, Factory, DraftingCompass, Layers, ChevronDown, Package, Download, BookOpen, FileText, Wrench, ShieldCheck, Zap, Palette, Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { getStarterPacks } from '@/lib/resources-data';
import type { Resource, Locale } from '@/lib/resources-data';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Chatbox } from '@/components/showcase/Chatbox';
import type { Metadata } from 'next';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const messages = await getMessages({locale});
  const t = (key: string) => ((messages.HomePage as any).seo as any)[key] as string;
 
  return {
    title: t('title'),
    description: t('description')
  };
}


const StarterPackPill = ({ pack, locale }: { pack: Resource, locale: Locale }) => {
  const title = locale === 'tr' ? pack.title_tr : pack.title;
  const downloadUrl = pack.files[locale]?.url || pack.files['en'].url;

  return (
    <Button asChild size="sm" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm h-auto px-4 py-2">
      <a href={downloadUrl} download>
        <Download className="mr-2 h-4 w-4" />
        {title}
      </a>
    </Button>
  );
};

const ProductLineCard = ({ title, description, benefits, href, imageUrl, imageHint, ctaText }: { title: string, description: string, benefits: {text: string, icon: React.ElementType}[], href: string, imageUrl: string, imageHint: string, ctaText: string }) => (
    <Card className="flex flex-col overflow-hidden text-center group">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={imageHint} sizes="(max-width: 768px) 100vw, 33vw"/>
        </div>
        <CardHeader>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <p className="text-muted-foreground">{description}</p>
            <ul className="text-left space-y-2">
                {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                        <benefit.icon className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{benefit.text}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href={href}>{ctaText} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </CardFooter>
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
    <Card className="p-6 flex flex-col items-center justify-center text-center bg-muted/50 hover:bg-muted transition-colors duration-200">
        <Icon className="h-10 w-10 text-secondary mb-3" />
        <h3 className="font-semibold text-lg text-foreground">{title}</h3>
    </Card>
);

export default async function Home({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations('HomePage');
  const starterPacks = await getStarterPacks();

  const productLines = [
    { name: 'flooring', href: '/spc-parquet-natural-collection', imageUrl: '/images/spc-parquet-natural-collection/29098-2/application.jpg', imageHint: 'elegant room flooring', benefits: [{text: t('flooringBenefits.b1'), icon: ShieldCheck}, {text: t('flooringBenefits.b2'), icon: Zap}, {text: t('flooringBenefits.b3'), icon: Palette}] },
    { name: 'walls', href: '/spc-wall-panels', imageUrl: '/images/spc-wall-panels/23048-6/application.jpg', imageHint: 'modern kitchen panels', benefits: [{text: t('wallsBenefits.b1'), icon: ShieldCheck}, {text: t('wallsBenefits.b2'), icon: Zap}, {text: t('wallsBenefits.b3'), icon: Palette}] },
    { name: 'skirting', href: '/spc-skirting-boards/elite-100-mm-skirting-board', imageUrl: '/images/skirting-boards/elite-100-mm-skirting-board/E1004031/application.jpg', imageHint: 'room with decorative skirting', benefits: [{text: t('skirtingBenefits.b1'), icon: ShieldCheck}, {text: t('skirtingBenefits.b2'), icon: Zap}, {text: t('skirtingBenefits.b3'), icon: Palette}] },
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
  
  const instagramEmbeds = [
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DQGvo2HDQOM/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DQGvo2HDQOM/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DQGvo2HDQOM/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Kermit Floor (@kermitfloor)</a></p></div></blockquote>`,
    `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DQGmbQnDS8o/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DQGmbQnDS8o/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DQGmbQnDS8o/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Kermit Floor (@kermitfloor)</a></p></div></blockquote>`,
  ];


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
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
            <div className="flex-grow flex items-center justify-center">
              <div className="max-w-4xl text-white">
                  <h1 className="font-headline text-3xl lg:text-5xl font-bold tracking-tight">
                      {t('heroTitle')}
                  </h1>
                  <p className="mt-4 text-md lg:text-lg text-white/90 hidden sm:block">
                      {t('heroSubtitle')}
                  </p>
              </div>
            </div>
            <div className="w-full pb-4">
              <div className="space-y-3 w-full max-w-4xl mx-auto">
                  <p className="text-white/80 text-sm font-semibold">{t('heroStarterPacksTitle')}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                      {starterPacks.map(pack => (
                          <StarterPackPill key={pack.id} pack={pack} locale={params?.locale || 'en'} />
                      ))}
                  </div>
              </div>
              <div className="mt-8 animate-bounce">
                  <ChevronDown className="h-8 w-8 text-white/50 mx-auto" />
              </div>
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
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
                {instagramEmbeds.map((embed, i) => (
                  <div key={i} className="flex justify-center" dangerouslySetInnerHTML={{ __html: embed }} />
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
      <Chatbox />
    </div>
  );
}
