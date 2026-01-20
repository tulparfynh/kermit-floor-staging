'use client';

import { Logo } from './Header';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  const productLinks = [
      { href: '/spc-parquet-natural-collection', label: t('productFlooring') },
      { href: '/spc-skirting-boards/optima-60-mm-skirting-board', label: t('productSkirting') },
      { href: '/spc-wall-panels', label: t('productWallPanels') },
      { href: '/spc-3d-wall-panels-model-a', label: t('product3dWallPanels') },
    ];
    
    const supportLinks = [
      { href: '#', label: t('supportCatalogue') },
      { href: '#', label: t('supportInstallation') },
      { href: '#', label: t('supportTechnical') },
    ];

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
                    <a href="tel:+905368338429" className="hover:text-primary transition-colors">+90 (536) 833-8429</a>
                </li>
                <li className="flex items-start">
                    <Mail className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3" />
                    <a href="mailto:info@kermitfloor.com" className="hover:text-primary transition-colors">info@kermitfloor.com</a>
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
                <Link href="#" className="text-xs hover:text-primary transition-colors">
                    {t('privacyPolicy')}
                </Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="#" className="text-xs hover:text-primary transition-colors">
                    {t('termsOfService')}
                </Link>
                </div>
            </div>
            </div>
        </div>
    </footer>
  );
}
