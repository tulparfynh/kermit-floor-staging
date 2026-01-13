
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/navigation';

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
    { href: '#', label: t('navFloors') },
    { href: '/spc-wall-panels', label: t('navWalls') },
    { href: '#', label: t('navSkirtings') },
    { href: '#', label: t('navDownload') },
    { href: '#', label: t('navAbout') },
    { href: '#', label: t('navContact') },
  ];

  return (
    <nav
      className={cn(
        'flex items-center gap-4 lg:gap-8',
        isMobile ? 'flex-col items-start space-y-4 p-6' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => {
        const localizedHref = link.href; // The Link component from next-intl will handle localization
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={localizedHref}
            className={cn(
              'text-lg font-semibold tracking-wider transition-colors hover:text-primary whitespace-nowrap',
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

export function Header() {
  const pathname = usePathname();
  const t = useTranslations('Header');
  
  // Check if the current path corresponds to the wall panels page
  const isWallPanelPage = pathname.endsWith('/spc-wall-panels') || pathname.endsWith('/spc-duvar-panelleri');
  
  const is3DPage = pathname.includes('/spc-3d-wall-panels');

  let pageTitle;
  let heroImage;
  let heroImageHint;

  if (is3DPage) {
    pageTitle = t('heroTitle3d');
    heroImage = '/images/placeholder-3d-hero.jpg';
    heroImageHint = '3d wall panel texture';
  } else if (isWallPanelPage) {
    pageTitle = t('heroTitleSpc');
    heroImage = '/images/Marble-Statuario-w23138-product-image.png';
    heroImageHint = 'marble texture';
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-28 items-center justify-between">
            <div className="flex-1 flex justify-start">
                <Logo />
            </div>
            
            <div className="hidden md:flex flex-2 justify-center">
              <NavMenu />
            </div>
            
            <div className="flex-1 flex justify-end items-center">
              <div className="hidden md:flex">
                <LanguageSwitcher />
              </div>
              <div className="md:hidden">
                <MobileMenu />
              </div>
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
