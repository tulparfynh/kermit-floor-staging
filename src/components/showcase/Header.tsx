'use client';

import { cn } from '@/lib/utils';
import { getHeroImageUrl, getHeroImageHint } from '@/lib/hero-images';
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
    <Link href="/">
      <Image
        src="/images/kermit-floor-logo.png"
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
  const pathnameValue = typeof pathname === 'string' ? pathname : '';
  const t = useTranslations('Header');
  
  const getResourcesLink = (): Parameters<typeof Link>[0]['href'] => {
    if (pathnameValue.includes('/spc-skirting-boards')) {
      return { pathname: '/resources', query: { tab: 'skirting' } };
    }
    if (pathnameValue.includes('/spc-parquet') || pathnameValue.includes('/full-natural-collection')) {
      return { pathname: '/resources', query: { tab: 'flooring' } };
    }
    if (pathnameValue.includes('/spc-wall-panels') || pathnameValue.includes('/spc-3d-wall-panels')) {
      return { pathname: '/resources', query: { tab: 'wall_panels' } };
    }
    return '/resources';
  };
  
  const navLinks: { href: Parameters<typeof Link>[0]['href']; label: string }[] = [
    { href: '/', label: t('navHome') },
    { href: '/spc-parquet-natural-collection', label: t('navFloors') },
    { href: '/spc-wall-panels', label: t('navWalls') },
    { href: '/spc-skirting-boards/optima-90-mm-skirting-board', label: t('navSkirtings') },
    { href: getResourcesLink(), label: t('navDownload') },
    { href: '/about', label: t('navAbout') },
    { href: '/contact', label: t('navContact') },
  ];

  return (
    <nav
      className={cn(
        'flex items-center gap-2 md:gap-4 lg:gap-6',
        isMobile ? 'flex-col items-start space-y-4 p-6' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => {
        let isActive = false;
        const hrefPath =
          typeof link.href === 'string'
            ? link.href
            : typeof link.href === 'object' && link.href !== null && 'pathname' in link.href
              ? String(link.href.pathname ?? '')
              : '';
        if (hrefPath === '/') {
            isActive = pathnameValue === '/';
        } else if (hrefPath.includes('spc-skirting-boards')) {
            isActive = pathnameValue.startsWith('/spc-skirting-boards');
        } else if (hrefPath.includes('spc-parquet-natural-collection')) {
            isActive = pathnameValue.startsWith('/spc-parquet-') || pathnameValue.startsWith('/full-natural-collection');
        } else if (hrefPath.includes('spc-wall-panels')) {
            isActive = pathnameValue.startsWith('/spc-wall-panels') || pathnameValue.startsWith('/spc-3d-wall-panels');
        } else if (hrefPath.startsWith('/resources')) {
            isActive = pathnameValue.startsWith('/resources');
        } else {
            isActive = pathnameValue.startsWith(hrefPath);
        }
        
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              'relative font-semibold tracking-wider transition-colors hover:text-primary whitespace-nowrap text-sm md:text-base lg:text-lg',
              'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:origin-center after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100',
              isActive
                ? 'text-primary after:scale-x-100'
                : 'text-foreground/70',
              isMobile && 'text-2xl after:bottom-[-2px]'
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
  pageType?: 'spc-wall-panels' | 'spc-3d-wall-panels-model-a' | 'spc-3d-wall-panels-model-b' | 'spc-parquet-natural-collection' | 'spc-parquet-stone-collection' | 'full-natural-collection' | 'skirting-alpha-140-mm' | 'skirting-berlin-100-mm' | 'skirting-elite-100-mm' | 'skirting-moderna-100-mm' | 'skirting-optima-60-mm' | 'skirting-optima-90-mm' | 'skirting-solid-80-mm' | 'skirting-x-line-100-mm';
}

export function Header({ pageType }: HeaderProps) {
  const t = useTranslations('Header');
  const heroImage = getHeroImageUrl(pageType);
  const heroImageHint = getHeroImageHint(pageType);

  let pageTitle: string | undefined;
  if (pageType === 'spc-3d-wall-panels-model-a') pageTitle = t('heroTitle3dModelA');
  else if (pageType === 'spc-3d-wall-panels-model-b') pageTitle = t('heroTitle3dModelB');
  else if (pageType === 'spc-wall-panels') pageTitle = t('heroTitleSpc');
  else if (pageType === 'spc-parquet-natural-collection') pageTitle = t('heroTitleSpcParquetNaturalCollection');
  else if (pageType === 'spc-parquet-stone-collection') pageTitle = t('heroTitleSpcParquetStoneCollection');
  else if (pageType === 'full-natural-collection') pageTitle = t('heroTitleFullNaturalCollection');
  else if (pageType === 'skirting-alpha-140-mm') pageTitle = t('heroTitleSkirtingAlpha140mm');
  else if (pageType === 'skirting-berlin-100-mm') pageTitle = t('heroTitleSkirtingBerlin100mm');
  else if (pageType === 'skirting-elite-100-mm') pageTitle = t('heroTitleSkirtingElite100mm');
  else if (pageType === 'skirting-moderna-100-mm') pageTitle = t('heroTitleSkirtingModerna100mm');
  else if (pageType === 'skirting-optima-60-mm') pageTitle = t('heroTitleSkirtingOptima60mm');
  else if (pageType === 'skirting-optima-90-mm') pageTitle = t('heroTitleSkirtingOptima90mm');
  else if (pageType === 'skirting-solid-80-mm') pageTitle = t('heroTitleSkirtingSolid80mm');
  else if (pageType === 'skirting-x-line-100-mm') pageTitle = t('heroTitleSkirtingXLine100mm');

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
      {pageTitle && heroImage && (
        <div className="relative h-48 lg:h-64 w-full">
          <Image
            src={heroImage}
            alt="Wall panel texture background"
            fill
            className="object-cover"
            data-ai-hint={heroImageHint}
            priority
            sizes="100vw"
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
