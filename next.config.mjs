/** @type {import('next').NextConfig} */
import path from 'path';

const includePaths = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  'styles',
);
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  sassOptions: {
    includePaths: [includePaths],
    prependData: `@import "src/styles/colors.scss";`,
  },
};

export default nextConfig;
