/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only ignore TypeScript errors in development for faster iterations
  typescript: {
    // Don't ignore in production, but can be enabled in development
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  // Ignore ESLint errors during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    }
    return config
  }
};

module.exports = nextConfig;