/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/hotels',
        destination: '/hospitality',
        permanent: true,
      },
      {
        source: '/brands',
        destination: '/fashion',
        permanent: true,
      },
      {
        source: '/restaurants',
        destination: '/dining',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
