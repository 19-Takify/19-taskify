/** @type {import('next').NextConfig} */
import path from 'path';

const includePaths = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'styles',
);
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  sassOptions: {
    includePaths: [includePaths],
    prependData: `@import "src/styles/globals.scss";`,
  },
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
