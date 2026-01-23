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
        src="/images/kermit-floor-logo.png"
        alt="Kermit Floor Logo"
        width={140}
        height={48}
        className="object-contain"
        unoptimized
      />
    </Link>
  );
}

export function NavMenu({ isMobile = false }) {
  const pathname = usePathname();
  const t = useTranslations('Header');
  
  const getResourcesLink = () => {
    if (pathname.includes('/spc-skirting-boards')) return '/resources?tab=skirting';
    if (pathname.includes('/spc-parquet') || pathname.includes('/full-natural-collection')) return '/resources?tab=flooring';
    if (pathname.includes('/spc-wall-panels') || pathname.includes('/spc-3d-wall-panels')) return '/resources?tab=wall_panels';
    return '/resources';
  }
  
  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/spc-wall-panels', label: t('navWalls') },
    { href: '/spc-parquet-natural-collection', label: t('navFloors') },
    { href: '/spc-skirting-boards/optima-60-mm-skirting-board', label: t('navSkirtings') },
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
        if (link.href === '/') {
            isActive = pathname === '/';
        } else if (link.href.includes('spc-skirting-boards')) {
            isActive = pathname.startsWith('/spc-skirting-boards');
        } else if (link.href.includes('spc-parquet-natural-collection')) {
            isActive = pathname.startsWith('/spc-parquet-') || pathname.startsWith('/full-natural-collection');
        } else if (link.href.includes('spc-wall-panels')) {
            isActive = pathname.startsWith('/spc-wall-panels') || pathname.startsWith('/spc-3d-wall-panels');
        } else if (link.href.startsWith('/resources')) {
            isActive = pathname.startsWith('/resources');
        } else {
            isActive = pathname.startsWith(link.href);
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
  
  let pageTitle;
  let heroImage;
  let heroImageHint;

  if (pageType === 'spc-3d-wall-panels-model-a') {
    pageTitle = t('heroTitle3dModelA');
    heroImage = '/images/spc-3d-panels-model-a/3D-29115-18/application.jpg';
    heroImageHint = 'living room with geometric panels';
  } else if (pageType === 'spc-3d-wall-panels-model-b') {
    pageTitle = t('heroTitle3dModelB');
    heroImage = '/images/spc-3d-panels-model-b/3D-23138-2/application.jpg';
    heroImageHint = 'modern interior with wavy panels';
  } else if (pageType === 'spc-wall-panels') {
    pageTitle = t('heroTitleSpc');
    heroImage = '/images/spc-wall-panels/23048-6/application.jpg';
    heroImageHint = 'modern kitchen with marble panels';
  } else if (pageType === 'spc-parquet-natural-collection') {
    pageTitle = t('heroTitleSpcParquetNaturalCollection');
    heroImage = '/images/spc-parquet-natural-collection/29098-2/application.jpg';
    heroImageHint = 'modern living room with natural oak flooring';
  } else if (pageType === 'spc-parquet-stone-collection') {
    pageTitle = t('heroTitleSpcParquetStoneCollection');
    heroImage = '/images/spc-parquet-stone-collection/23054-2/application.jpg';
    heroImageHint = 'stylish interior with stone look flooring';
  } else if (pageType === 'full-natural-collection') {
    pageTitle = t('heroTitleFullNaturalCollection');
    heroImage = '/images/full-natural-collection/29074-1/application.jpg';
    heroImageHint = 'elegant room with wide plank natural flooring';
  } else if (pageType === 'skirting-alpha-140-mm') {
    pageTitle = t('heroTitleSkirtingAlpha140mm');
    heroImage = '/images/skirting-boards/alpha-140-mm-skirting-board/1404031/application.jpg';
    heroImageHint = 'living room with tall skirting';
  } else if (pageType === 'skirting-berlin-100-mm') {
    pageTitle = t('heroTitleSkirtingBerlin100mm');
    heroImage = '/images/skirting-boards/berlin-100-mm-skirting-board/1100031/application.jpg';
    heroImageHint = 'interior with modern skirting';
  } else if (pageType === 'skirting-elite-100-mm') {
    pageTitle = t('heroTitleSkirtingElite100mm');
    heroImage = '/images/skirting-boards/elite-100-mm-skirting-board/E1004031/application.jpg';
    heroImageHint = 'room with decorative skirting';
  } else if (pageType === 'skirting-moderna-100-mm') {
    pageTitle = t('heroTitleSkirtingModerna100mm');
    heroImage = '/images/skirting-boards/moderna-100-mm-skirting-board/1004031/application.jpg';
    heroImageHint = 'hallway with stylish skirting';
  } else if (pageType === 'skirting-optima-60-mm') {
    pageTitle = t('heroTitleSkirtingOptima60mm');
    heroImage = '/images/skirting-boards/optima-60-mm-skirting-board/0603031/application.jpg';
    heroImageHint = 'room with minimal skirting';
  } else if (pageType === 'skirting-optima-90-mm') {
    pageTitle = t('heroTitleSkirtingOptima90mm');
    heroImage = '/images/skirting-boards/optima-90-mm-skirting-board/0704031/application.jpg';
    heroImageHint = 'bedroom with medium height skirting';
  } else if (pageType === 'skirting-solid-80-mm') {
    pageTitle = t('heroTitleSkirtingSolid80mm');
    heroImage = '/images/skirting-boards/solid-80-mm-skirting-board/0904031/application.jpg';
    heroImageHint = 'office with solid skirting';
  } else if (pageType === 'skirting-x-line-100-mm') {
    pageTitle = t('heroTitleSkirtingXLine100mm');
    heroImage = '/images/skirting-boards/x-line-100-mm-skirting-board/X1004031/application.jpg';
    heroImageHint = 'modern room with x-line skirting';
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
