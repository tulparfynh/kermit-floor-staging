import { MetadataRoute } from 'next';
import { locales, pathnames, defaultLocale } from '@/navigation';
 
const domain = 'https://www.kermitfloor.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  function getUrl(locale: string, path: string) {
    const fullPath = path === '/' ? '' : path;
    return locale === defaultLocale ? `${domain}${fullPath}` : `${domain}/${locale}${fullPath}`;
  }

  // Add the homepage route
  const routes: MetadataRoute.Sitemap = [{
    url: getUrl(defaultLocale, '/'),
    lastModified,
    alternates: {
      languages: Object.fromEntries(locales.map(locale => [locale, getUrl(locale, '/')]))
    },
  }];

  // Add other routes from pathnames
  (Object.keys(pathnames) as Array<keyof typeof pathnames>).forEach((pathname) => {
    
    const languageAlternates = Object.fromEntries(
      locales.map(locale => {
        const path = pathnames[pathname][locale];
        return [locale, getUrl(locale, path)];
      })
    );

    routes.push({
      url: languageAlternates[defaultLocale],
      lastModified,
      alternates: {
        languages: languageAlternates,
      },
    });
  });

  return routes;
}
