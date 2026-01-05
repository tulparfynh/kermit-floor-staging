'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo, NavMenu } from './Header';

export function MobileMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
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
  );
}
