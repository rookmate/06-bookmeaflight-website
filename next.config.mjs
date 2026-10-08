/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./app/cloudinary.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1536],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
    qualities: [75],
  },
  poweredByHeader: false,
  // Each category used to have its own page. Old links land on its gallery on the one page.
  async redirects() {
    return [
      ["/hospitality", "hospitality"],
      ["/hotels", "hospitality"],
      ["/fashion", "fashion"],
      ["/brands", "fashion"],
      ["/dining", "dining"],
      ["/restaurants", "dining"],
    ].map(([source, id]) => ({
      source,
      destination: `/#${id}`,
      permanent: true,
    }))
  },
}

export default nextConfig
