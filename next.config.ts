import type {NextConfig} from 'next';

const config: NextConfig = {
  output: process.env.NEXT_STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default config;
