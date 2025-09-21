const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  distDir: 'build',
  images: {
    domains: ['raw.githubusercontent.com'],
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
