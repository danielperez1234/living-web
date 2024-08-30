/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:'/web',
  images: {
    domains: ['livingphotos.blob.core.windows.net'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '143.198.158.94',
      },
    ],
  },
};

export default nextConfig;
