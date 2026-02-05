'use client';

import { Logo } from './Header';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  const productLinks: { href: Parameters<typeof Link>[0]['href']; label: string }[] = [
      { href: '/spc-parquet-natural-collection', label: t('productFlooring') },
      { href: '/spc-wall-panels', label: t('productWallPanels') },
      { href: '/spc-skirting-boards/optima-90-mm-skirting-board', label: t('productSkirting') },
    ];
    
    const supportLinks: { href: Parameters<typeof Link>[0]['href']; label: string }[] = [
      { href: '/resources', label: t('supportCatalogue') },
      { href: '/resources', label: t('supportInstallation') },
      { href: '/resources', label: t('supportTechnical') },
    ];

    const phoneRaw = t('phone').replace(/[^0-9+]/g, '');
    const emailAddress = t('email');

  return (
    <footer className="bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="space-y-4">
                <Logo />
                <p className="text-sm leading-relaxed">
                  {t('tagline')}
                </p>
            </div>
            
            {/* Products */}
            <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-foreground">{t('productsTitle')}</h3>
                <ul className="space-y-2">
                {productLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                          {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
            </div>
            
            {/* Support */}
            <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-foreground">{t('supportTitle')}</h3>
                <ul className="space-y-2">
                {supportLinks.map((link) => (
                    <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                        {link.label}
                    </Link>
                    </li>
                ))}
                </ul>
            </div>
            
            {/* Contact */}
            <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-foreground">{t('contactTitle')}</h3>
                <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                    <MapPin className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3" />
                    <span>{t('address')}</span>
                </li>
                <li className="flex items-start">
                    <Phone className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3" />
                    <a href={`tel:${phoneRaw}`} className="hover:text-primary transition-colors">{t('phone')}</a>
                </li>
                <li className="flex items-start">
                    <Mail className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3" />
                    <a href={`mailto:${emailAddress}`} className="hover:text-primary transition-colors">{emailAddress}</a>
                </li>
                </ul>
            </div>
            
            </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-background/50">
            <div className="container mx-auto px-4 py-4">
            <Separator className="mb-4 bg-border/50" />
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                <p className="text-xs text-muted-foreground">
                {t('copyright', {year: new Date().getFullYear()})}
                </p>
                <div className="flex items-center gap-4">
                <Link href="/privacy-policy" className="text-xs hover:text-primary transition-colors">
                    {t('privacyPolicy')}
                </Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="/terms-of-service" className="text-xs hover:text-primary transition-colors">
                    {t('termsOfService')}
                </Link>
                </div>
            </div>
            </div>
        </div>
    </footer>
  );
}
