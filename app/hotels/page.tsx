"use client"

import ImageChapter from "../components/ImageChapter"
export default function Hotels() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub.jpg`, alt: "CDL Tub" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-room.jpg`, alt: "SOF Room" },
      { src: `${cloudinaryBaseURL}/v1737809795/cdl-drink.jpg`, alt: "CDL Drink" },
      { src: `${cloudinaryBaseURL}/v1737809795/cdl-tub2.jpg`, alt: "CDL Tub 2" },
      { src: `${cloudinaryBaseURL}/v1737809794/cdl-shower.jpg`, alt: "CDL Shower" },
      { src: `${cloudinaryBaseURL}/v1737809794/cdl-tub3.jpg`, alt: "CDL Tub 3" },
      { src: `${cloudinaryBaseURL}/v1737809794/cdl-teapot.jpg`, alt: "CDL Teapot" },
      { src: `${cloudinaryBaseURL}/v1737809793/hi-restaurant.jpg`, alt: "HI Restaurant" },
      { src: `${cloudinaryBaseURL}/v1737809793/ghh-room.jpg`, alt: "GHH Room" },
      { src: `${cloudinaryBaseURL}/v1737809793/smt-tub.jpg`, alt: "SMT Tub" },
      { src: `${cloudinaryBaseURL}/v1737809793/ghh-pool.jpg`, alt: "GHH Pool" },
      { src: `${cloudinaryBaseURL}/v1737809793/sof-robe.jpg`, alt: "SOF Robe" },
      { src: `${cloudinaryBaseURL}/v1737809792/smt-entrance.jpg`, alt: "SMT Entrance" },
      { src: `${cloudinaryBaseURL}/v1737809791/sof-room1.jpg`, alt: "SOF Room 1" },
      { src: `${cloudinaryBaseURL}/v1737809791/cdl-pool-indoor.jpg`, alt: "CDL Indoor Pool" },
      { src: `${cloudinaryBaseURL}/v1737809791/smt-table.jpg`, alt: "SMT Table" },
      { src: `${cloudinaryBaseURL}/v1737809791/ghh-bed.jpg`, alt: "GHH Bed" },
      { src: `${cloudinaryBaseURL}/v1737809791/cdl-chair.jpg`, alt: "CDL Chair" },
      { src: `${cloudinaryBaseURL}/v1737809790/cdl-spa.jpg`, alt: "CDL Spa" },
      { src: `${cloudinaryBaseURL}/v1737809789/smh-pool.jpg`, alt: "SMH Pool" },
      { src: `${cloudinaryBaseURL}/v1737809789/sof-spa.jpg`, alt: "SOF Spa" },
      { src: `${cloudinaryBaseURL}/v1737809789/sof-restaurant.jpg`, alt: "SOF Restaurant" },
      { src: `${cloudinaryBaseURL}/v1737809789/sof-logo.jpg`, alt: "SOF Logo" },
      { src: `${cloudinaryBaseURL}/v1737809788/sof-pool.jpg`, alt: "SOF Pool" },
      { src: `${cloudinaryBaseURL}/v1737809788/sof-fruits.jpg`, alt: "SOF Fruits" },
      { src: `${cloudinaryBaseURL}/v1737809788/sof-balcony.jpg`, alt: "SOF Balcony" },
      { src: `${cloudinaryBaseURL}/v1737809787/ghh-room1.jpg`, alt: "GHH Room 1" },
      { src: `${cloudinaryBaseURL}/v1737809787/ghh-book.jpg`, alt: "GHH Book" },
      { src: `${cloudinaryBaseURL}/v1737809787/ghh-stairs.jpg`, alt: "GHH Stairs" },
      { src: `${cloudinaryBaseURL}/v1737809786/sof-cutie.jpg`, alt: "SOF Cutie" },
      { src: `${cloudinaryBaseURL}/v1737809786/ghh-pool1.jpg`, alt: "GHH Pool 1" },
      { src: `${cloudinaryBaseURL}/v1737809786/sof-sleep.jpg`, alt: "SOF Sleep" },
    ]
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <ImageChapter images={chapterData.images} />
    </main>
  )
}
