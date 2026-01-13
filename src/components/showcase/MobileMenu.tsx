
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo, NavMenu } from './Header';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Separator } from '../ui/separator';

export function MobileMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-auto w-auto p-2">
          <Menu className="h-8 w-8" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm p-0">
        <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <Link href={`/`} onClick={() => setMenuOpen(false)}>
              <Logo />
            </Link>
          </div>
          <div className="p-6 flex-grow">
            <NavMenu isMobile />
          </div>
          <Separator />
          <div className="p-6">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
