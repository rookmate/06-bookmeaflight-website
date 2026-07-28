/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dnwbkkjpo/image/upload/**",
        search: "",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1536],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
    qualities: [75],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/hotels",
        destination: "/hospitality",
        permanent: true,
      },
      {
        source: "/brands",
        destination: "/fashion",
        permanent: true,
      },
      {
        source: "/restaurants",
        destination: "/dining",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
