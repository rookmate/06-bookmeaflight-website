import ImageChapter from "../components/ImageChapter"

export default function Brands() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload";

  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-mustard-purse.jpg`, alt: "Mustard purse" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-mustard-purse2.jpg`, alt: "Mustard purse" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-travel-bag.jpg`, alt: "Travel bag" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-travel-bag-wallet.jpg`, alt: "Travel bag and wallet" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-travel-bag-wallet2.jpg`, alt: "Travel bag and wallet" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-wallet.jpg`, alt: "Wallet" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-red-purse.jpg`, alt: "Red purse" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-red-purse2.jpg`, alt: "Red purse" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737806061/mp-red-purse3.jpg`, alt: "Red purse" },
    ],
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <ImageChapter images={chapterData.images} />
    </main>
  )
}
