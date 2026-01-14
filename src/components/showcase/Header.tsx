
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import * as React from 'react';

// Dynamically import components that cause hydration issues
const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher').then(mod => mod.LanguageSwitcher), { ssr: false });
const MobileMenu = dynamic(() => import('./MobileMenu').then(mod => mod.MobileMenu), { ssr: false });


export function Logo() {
  const locale = useLocale();
  return (
    <Link href={`/`}>
      <Image
        src="https://www.kermitfloor.com/wp-content/uploads/2022/11/Kermit-Floor-Logo-PNG-2-3-1-1024x347.png"
        alt="Kermit Floor Logo"
        width={140}
        height={48}
        className="object-contain"
      />
    </Link>
  );
}

export function NavMenu({ isMobile = false }) {
  const pathname = usePathname();
  const t = useTranslations('Header');
  
  const navLinks = [
    { href: '/spc-wall-panels', label: t('navWalls') },
    { href: '#', label: t('navFloors') },
    { href: '#', label: t('navSkirtings') },
    { href: '#', label: t('navDownload') },
    { href: '#', label: t('navAbout') },
    { href: '#', label: t('navContact') },
  ];

  return (
    <nav
      className={cn(
        'flex items-center gap-2 md:gap-4 lg:gap-6',
        isMobile ? 'flex-col items-start space-y-4 p-6' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'font-semibold tracking-wider transition-colors hover:text-primary whitespace-nowrap text-sm md:text-base lg:text-lg',
              isActive
                ? 'text-primary'
                : 'text-foreground/70',
              isMobile && 'text-2xl'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

type HeaderProps = {
  pageType?: 'spc-wall-panels' | 'spc-3d-wall-panels' | 'walls';
}

export function Header({ pageType }: HeaderProps) {
  const t = useTranslations('Header');
  
  let pageTitle;
  let heroImage;
  let heroImageHint;

  if (pageType === 'spc-3d-wall-panels') {
    pageTitle = t('heroTitle3d');
    heroImage = '/images/placeholder-3d-hero.jpg';
    heroImageHint = '3d wall panel texture';
  } else if (pageType === 'spc-wall-panels' || pageType === 'walls') {
    pageTitle = t('heroTitleSpc');
    heroImage = '/images/Marble-Statuario-w23138-2-application-photo.jpg';
    heroImageHint = 'modern kitchen with marble panels';
  }


  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-28 items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>
            
            <div className="flex-1 flex justify-end items-center gap-4">
                <NavMenu />
                <div className="hidden md:flex">
                    <LanguageSwitcher />
                </div>
            </div>

            <div className="md:hidden flex flex-1 justify-end">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
      {pageTitle && (
        <div className="relative h-48 lg:h-64 w-full">
          <Image
            src={heroImage || ''}
            alt="Wall panel texture background"
            fill
            className="object-cover"
            data-ai-hint={heroImageHint}
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white text-center">
              {pageTitle}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
