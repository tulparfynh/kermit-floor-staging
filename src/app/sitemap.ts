import { MetadataRoute } from 'next';
import { locales, pathnames } from '@/navigation';
 
const domain = 'https://www.kermitfloor.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Add the homepage route
  const routes: MetadataRoute.Sitemap = [{
    url: `${domain}/en`,
    lastModified,
    alternates: {
      languages: {
        en: `${domain}/en`,
        tr: `${domain}/tr`,
      },
    },
  }];

  // Add other routes from pathnames
  (Object.keys(pathnames) as Array<keyof typeof pathnames>).forEach((pathname) => {
    routes.push({
      url: `${domain}/en${pathnames[pathname].en}`,
      lastModified,
      alternates: {
        languages: {
          en: `${domain}/en${pathnames[pathname].en}`,
          tr: `${domain}/tr${pathnames[pathname].tr}`,
        },
      },
    });
  });

  return routes;
}
