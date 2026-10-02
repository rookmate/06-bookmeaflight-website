import { diningImages, fashionImages, hospitalityImages } from "./galleryImages"

export const portfolioSections = [
  { title: "Hospitality", id: "hospitality", images: hospitalityImages },
  { title: "Fashion", id: "fashion", images: fashionImages },
  { title: "Dining", id: "dining", images: diningImages },
] as const
