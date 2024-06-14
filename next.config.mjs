/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Match both http and https
        hostname: 'res.cloudinary.com', // Replace with your domain
      },
    ],
  },
};

export default nextConfig;
