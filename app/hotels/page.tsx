"use client"

import ProgressiveImageChapter from "../components/ProgressiveImageChapter"
export default function Hotels() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-book.jpg`, alt: "Sumberkima Book" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-pool-couple.jpg`, alt: "Purnama Pool Couple" },
      { src: `${cloudinaryBaseURL}/v1737809797/bali-flower-shower.jpg`, alt: "Bali Flower Shower" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-soap.jpg`, alt: "HB Soap" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-showerhead.jpg`, alt: "SH Showerhead" },

      { src: `${cloudinaryBaseURL}/v1737809797/purnama-shower.jpg`, alt: "Purnama Shower" },
      { src: `${cloudinaryBaseURL}/v1737809795/cdl-tub2.jpg`, alt: "CDL Tub 2" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-room.jpg`, alt: "SOF Room" },
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-wakeup.jpg`, alt: "Dubai Wakeup" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-vibes.jpg`, alt: "SH Vibes" },

      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-couple.jpg`, alt: "Purnama Bath Couple" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-shadows.jpg`, alt: "Kanz Shadows" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool-room.jpg`, alt: "Kanz Pool Room" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-chill.jpg`, alt: "HB Chill" },
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-lana-francisco.jpg`, alt: "Dubai Lana Francisco" },




      { src: `${cloudinaryBaseURL}/v1737809797/hb-tri-read.jpg`, alt: "HB Tri Read" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath.jpg`, alt: "Purnama Bath" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-yoga.jpg`, alt: "Purnama Yoga" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bar.jpg`, alt: "Purnama Bar" },
      { src: `${cloudinaryBaseURL}/v1737809797/morroco-kanz-view.jpg`, alt: "Morocco Kanz View" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool.jpg`, alt: "Kanz Pool" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-bed.jpg`, alt: "SH Bed" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-bathtub.jpg`, alt: "Sumberkima Bathtub" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-pool.jpg`, alt: "Purnama Bath Pool" },
      { src: `${cloudinaryBaseURL}/v1737809797/tej-spa.jpg`, alt: "Tej Spa" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-chill.jpg`, alt: "Kanz Chill" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-view-couple.jpg`, alt: "SH View Couple" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-breakfast.jpg`, alt: "Morocco Breakfast" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-pool.jpg`, alt: "SH Pool" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-banhoca.jpg`, alt: "MH Banhoca" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-wash-hands.jpg`, alt: "MH Wash Hands" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-drone.jpg`, alt: "MH Drone" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-shower.jpg`, alt: "HB Shower" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-tri-couple.jpg`, alt: "HB Tri Couple" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-bath-drone.jpg`, alt: "MH Bath Drone" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub.jpg`, alt: "CDL Tub" },
      { src: `${cloudinaryBaseURL}/v1737809793/smt-tub.jpg`, alt: "SMT Tub" },
      { src: `${cloudinaryBaseURL}/v1737809793/sof-robe.jpg`, alt: "SOF Robe" },
      { src: `${cloudinaryBaseURL}/v1737809789/sof-spa.jpg`, alt: "SOF Spa" },
      { src: `${cloudinaryBaseURL}/v1737809786/sof-sleep.jpg`, alt: "SOF Sleep" },
      { src: `${cloudinaryBaseURL}/v1737809793/riad-1st-floor.jpg`, alt: "Riad 1st Floor" },
      { src: `${cloudinaryBaseURL}/v1737809793/hb-hut.jpg`, alt: "HB Hut" },
    ]
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <ProgressiveImageChapter
        images={chapterData.images}
        criticalImageCount={12}
        batchSize={15}
      />
    </main>
  )
}
