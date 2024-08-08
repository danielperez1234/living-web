/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '143.198.158.94',
      },
    ],
  },
};

export default nextConfig;
