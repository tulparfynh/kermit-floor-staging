
'use client';

import { Logo } from './Header';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const productLinks = [
    { href: '#', label: 'SPC Flooring' },
    { href: '#', label: 'SPC Skirting Boards' },
    { href: '#', label: 'SPC Wall Panels' },
    { href: '#', label: 'SPC 3D Wall Panels' },
  ];
  
  const supportLinks = [
    { href: '#', label: 'Download Catalogue' },
    { href: '#', label: 'Installation Guide' },
    { href: '#', label: 'Technical Data Sheets' },
  ];

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="space-y-4">
                <Logo />
                <p className="text-sm leading-relaxed">
                Premium SPC flooring and wall panel solutions for modern interiors.
                </p>
            </div>
            
            {/* Products */}
            <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold text-foreground">Products</h3>
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
                <h3 className="font-headline text-lg font-semibold text-foreground">Support</h3>
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
                <h3 className="font-headline text-lg font-semibold text-foreground">Contact</h3>
                <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                    <MapPin className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3 -ml-8" />
                    <span>123 Kermit Street, Floor City, 16000, Turkey</span>
                </li>
                <li className="flex items-start">
                    <Phone className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3 -ml-8" />
                    <a href="tel:+905368338429" className="hover:text-primary transition-colors">+90 (536) 833-8429</a>
                </li>
                <li className="flex items-start">
                    <Mail className="h-5 w-5 mt-0.5 text-secondary flex-shrink-0 mr-3 -ml-8" />
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
                &copy; {new Date().getFullYear()} Kermit Floor. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                <Link href="#" className="text-xs hover:text-primary transition-colors">
                    Privacy Policy
                </Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="#" className="text-xs hover:text-primary transition-colors">
                    Terms of Service
                </Link>
                </div>
            </div>
            </div>
        </div>
    </footer>
  );
}
