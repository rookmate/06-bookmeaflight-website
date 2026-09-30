import { diningImages, fashionImages, hospitalityImages } from "./galleryImages"

export const portfolioSections = [
  {
    title: "Hospitality",
    href: "/hospitality",
    description: "Hotels, retreats and spas.",
    images: hospitalityImages,
  },
  {
    title: "Fashion",
    href: "/fashion",
    description: "Bags, leather goods and jewellery.",
    images: fashionImages,
  },
  {
    title: "Dining",
    href: "/dining",
    description: "Restaurants, food and drinks.",
    images: diningImages,
  },
] as const
