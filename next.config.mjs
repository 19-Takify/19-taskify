/** @type {import('next').NextConfig} */
import path from "path";

// path.join(__dirname, "styles") 코드와 동일
const includePaths = [
  path.join(path.dirname(new URL(import.meta.url).pathname), "styles"),
];

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [includePaths],
    prependData: `@import "src/styles/colors.scss";`,
  },
};

export default nextConfig;
