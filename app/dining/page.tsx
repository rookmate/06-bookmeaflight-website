import PortfolioPage from "../components/PortfolioPage"
import { diningImages } from "../galleryImages"
import { pageMetadata } from "../siteMetadata"

const description = "Food, drinks and restaurant photography."

export const metadata = pageMetadata("Dining | Bookmeaflight", description, "/dining")

export default function Dining() {
  return <PortfolioPage title="Dining" description={description} images={diningImages} />
}
