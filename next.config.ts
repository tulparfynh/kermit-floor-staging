import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { legacyRedirects } from './src/redirects/legacyRedirects';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyRedirects];
  },
};

export default withNextIntl(nextConfig);
