'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';

const GBFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="!w-7 !h-auto rounded-sm" aria-hidden="true">
        <rect width="5" height="3" fill="#00247d" />
        <path d="M0,0L5,3M5,0L0,3" stroke="#fff" strokeWidth=".6" />
        <path d="M0,0L5,3M5,0L0,3" stroke="#cf142b" strokeWidth=".4" />
        <path d="M2.5,0V3M0,1.5H5" stroke="#fff" strokeWidth="1" />
        <path d="M2.5,0V3M0,1.5H5" stroke="#cf142b" strokeWidth=".6" />
    </svg>
);

const TRFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className="!w-7 !h-auto rounded-sm" aria-hidden="true">
        <rect width="30" height="20" fill="#e30a17" />
        <circle cx="10" cy="10" r="5" fill="#fff" />
        <circle cx="11.5" cy="10" r="4" fill="#e30a17" />
        <path d="M15.5 10l4.33-2.5-1.65 4.04.01-3.08-1.66 4.04L20 10z" fill="#fff" />
    </svg>
);

const languages = [
    { code: 'en', name: 'English', flag: <GBFlag /> },
    { code: 'tr', name: 'Türkçe', flag: <TRFlag /> },
];

type LanguageSwitcherProps = {
  alternateHrefs?: Partial<Record<'en' | 'tr', string>>;
};

export function LanguageSwitcher({ alternateHrefs }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const overrideHref = alternateHrefs?.[newLocale as 'en' | 'tr'];
    if (overrideHref) {
      router.replace(overrideHref as any, { locale: newLocale });
      return;
    }
    router.replace(pathname as any, {locale: newLocale});
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          {currentLanguage?.flag}
          <span className="sr-only">Change language, current: {currentLanguage?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between px-3 py-2 text-base"
            disabled={locale === lang.code}
          >
            <span className="flex items-center gap-3">
              {lang.flag}
              <span className="font-medium">{lang.name}</span>
            </span>
            {locale === lang.code && <Check className="!h-5 !w-5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
