"use client"

import ImageChapter from "../components/ImageChapter"

export default function Restaurants() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/v1737842072/pg-drink.jpg`, alt: "PG Drink" },
      { src: `${cloudinaryBaseURL}/v1737842072/coya-ceviche.jpg`, alt: "Coya Ceviche" },
      { src: `${cloudinaryBaseURL}/v1737842072/coya-port.jpg`, alt: "Coya Port" },
      { src: `${cloudinaryBaseURL}/v1737842072/coya-starter.jpg`, alt: "Coya Starter" },
      { src: `${cloudinaryBaseURL}/v1737842071/coya-table.jpg`, alt: "Coya Table" },

      { src: `${cloudinaryBaseURL}/v1737841788/lb-croissant.jpg`, alt: "LB Croissant" },
      { src: `${cloudinaryBaseURL}/v1737841791/da-fish.jpg`, alt: "Da Fish" },
      { src: `${cloudinaryBaseURL}/v1737841790/da-salad.jpg`, alt: "Da Salad" },
      { src: `${cloudinaryBaseURL}/v1737842072/lana-sandwich.jpg`, alt: "Lana Sandwich" },
      { src: `${cloudinaryBaseURL}/v1737841788/n-kinkali.jpg`, alt: "N Kinkali" },

      { src: `${cloudinaryBaseURL}/v1737841791/cdl-piquenique1.jpg`, alt: "CDL Picnic 1" },
      { src: `${cloudinaryBaseURL}/v1737841793/bisque-menu.jpg`, alt: "Bisque Menu" },
      { src: `${cloudinaryBaseURL}/v1737841783/ocf-fruit1.jpg`, alt: "OCF Fruit 1" },
      { src: `${cloudinaryBaseURL}/v1737841793/bisque-drink.jpg`, alt: "Bisque Drink" },
      { src: `${cloudinaryBaseURL}/v1737841791/cdl-starter.jpg`, alt: "CDL Starter" },

      { src: `${cloudinaryBaseURL}/v1737841793/cdl-piquenique.jpg`, alt: "CDL Picnic" },
      { src: `${cloudinaryBaseURL}/v1737841789/da-pasta.jpg`, alt: "Da Pasta" },
      { src: `${cloudinaryBaseURL}/v1737842072/lana-icecream.jpg`, alt: "Lana Ice Cream" },
      { src: `${cloudinaryBaseURL}/v1737841794/kiko-wine.jpg`, alt: "Kiko Wine" },
      { src: `${cloudinaryBaseURL}/v1737842072/morocco-brekkie.jpg`, alt: "Morocco Breakfast" },

      { src: `${cloudinaryBaseURL}/v1737841782/ocf-flute.jpg`, alt: "OCF Flute" },
      { src: `${cloudinaryBaseURL}/v1737842072/asia-asia.jpg`, alt: "Asia Asia" },
      { src: `${cloudinaryBaseURL}/v1737841785/opus-drink1.jpg`, alt: "Opus Drink 1" },
      { src: `${cloudinaryBaseURL}/v1737841784/ocf-brunch1.jpg`, alt: "OCF Brunch 1" },
      { src: `${cloudinaryBaseURL}/v1737842072/purnama-arancini.jpg`, alt: "Purnama Arancini" },

      { src: `${cloudinaryBaseURL}/v1737841786/ocf-cocktail.jpg`, alt: "OCF Cocktail" },
      { src: `${cloudinaryBaseURL}/v1737842072/tej-lunch.jpg`, alt: "Tej Lunch" },
      { src: `${cloudinaryBaseURL}/v1737841785/rj-gyosa.jpg`, alt: "RJ Gyosa" },
      { src: `${cloudinaryBaseURL}/v1737841784/sg-churros1.jpg`, alt: "SG Churros 1" },
      { src: `${cloudinaryBaseURL}/v1737842072/mh-lunch2.jpg`, alt: "MH Lunch 2" },

      { src: `${cloudinaryBaseURL}/v1737842072/mh-lunch.jpg`, alt: "MH Lunch" },
      { src: `${cloudinaryBaseURL}/v1737841794/karater-dish.jpg`, alt: "Karater Dish" },
    ]
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <ImageChapter images={chapterData.images} />
    </main>
  )
}
