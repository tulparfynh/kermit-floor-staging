'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { href: '#', label: 'FLOORS' },
  { href: '#', label: 'WALLS', active: true },
  { href: '#', label: 'SKIRTINGS' },
  { href: '#', label: 'DOWNLOAD' },
  { href: '#', label: 'ABOUT' },
  { href: '#', label: 'CONTACT' },
];

export function Logo() {
  return (
    <Image
      src="https://www.kermitfloor.com/wp-content/uploads/2022/11/Kermit-Floor-Logo-PNG-2-3-1-1024x347.png"
      alt="Kermit Floor Logo"
      width={140}
      height={48}
      className="object-contain"
    />
  );
}

export function NavMenu({ isMobile = false }) {
  return (
    <nav
      className={cn(
        'flex items-center gap-4 lg:gap-8',
        isMobile ? 'flex-col items-start space-y-4 p-6' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={cn(
            'text-lg font-semibold tracking-wider transition-colors hover:text-primary whitespace-nowrap',
            link.active
              ? 'text-primary'
              : 'text-foreground/70',
            isMobile && 'text-2xl'
          )}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-28 items-center justify-between">
            <div className="flex items-center gap-8">
                <Logo />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <NavMenu />
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
      <div className="relative h-48 lg:h-64 w-full">
        <Image
          src="/images/Marble-Statuario-w23138-product-image.png"
          alt="Marble wall panel texture background"
          fill
          className="object-cover"
          data-ai-hint="marble texture"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white">
            SPC WALL PANEL COLLECTION
          </h1>
        </div>
      </div>
    </>
  );
}
