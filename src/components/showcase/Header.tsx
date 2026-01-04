'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '#', label: 'FLOORS' },
  { href: '#', label: 'WALLS', active: true },
  { href: '#', label: 'SKIRTINGS' },
  { href: '#', label: 'DOWNLOAD' },
  { href: '#', label: 'ABOUT' },
  { href: '#', label: 'CONTACT' },
];

function Logo() {
  return (
    <svg
      className="h-24 w-auto"
      viewBox="0 0 160 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="22"
        fontFamily="Montserrat, sans-serif"
        fontSize="24"
        fontWeight="bold"
        className="fill-primary"
      >
        KERMIT
      </text>
      <text
        x="0"
        y="36"
        fontFamily="Inter, sans-serif"
        fontSize="10"
        letterSpacing="0.2em"
        className="fill-foreground/80"
      >
        FLOOR
      </text>
    </svg>
  );
}

function NavMenu({ isMobile = false }) {
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
  const [isMenuOpen, setMenuOpen] = useState(false);

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
              <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                       <Logo />
                       <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                          <X className="h-6 w-6" />
                       </Button>
                    </div>
                    <NavMenu isMobile />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <div className="relative h-48 lg:h-64 w-full">
        <Image
          src="https://images.unsplash.com/photo-1594499699929-c884a29a3493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0cmF2ZXJ0aW5lJTIwdGV4dHVyZXxlbnwwfHx8fDE3NjgxNTMyODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Ivory travertine texture background"
          fill
          className="object-cover"
          data-ai-hint="travertine texture"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white">
            SPC WALL PANEL COLLECTION
          </h1>
        </div>
      </div>
    </>
  );
}
