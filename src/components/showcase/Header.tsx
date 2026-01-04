'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'About' },
  { href: '#', label: 'SPC Skirting Boards' },
  { href: '#', label: 'SPC Flooring' },
  { href: '#', label: 'SPC Wall Panels', active: true },
  { href: '#', label: 'SPC 3D Wall Panels' },
  { href: '#', label: 'Downloads' },
  { href: '#', label: 'Contact' },
];

function Logo() {
  return (
    <div className="text-2xl font-bold tracking-tighter text-primary">
      <span className="font-headline">KERMIT</span>
      <span className="text-xs font-light tracking-widest text-foreground/80 block -mt-1">FLOOR</span>
    </div>
  );
}

function NavMenu({ isMobile = false }) {
  return (
    <nav
      className={cn(
        'flex items-center gap-4 lg:gap-6',
        isMobile ? 'flex-col items-start space-y-4 p-6' : 'hidden md:flex'
      )}
    >
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            link.active
              ? 'text-primary border-b-2 border-primary pb-1'
              : 'text-foreground/70',
            isMobile && 'text-lg'
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
    <header className="relative bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <NavMenu />
          </div>
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
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
      <div className="relative h-64 lg:h-80 w-full">
        <Image
          src="https://images.unsplash.com/photo-1551554781-c46200ea959d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYXJibGUlMjB0ZXh0dXJlfGVufDB8fHx8MTc2NzUzMzg0NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Marble texture background"
          fill
          className="object-cover"
          data-ai-hint="black marble"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold tracking-tight text-white">
            SPC WALL PANEL COLLECTION
          </h1>
        </div>
      </div>
    </header>
  );
}