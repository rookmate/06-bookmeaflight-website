"use client"

import ImageChapter from "../components/ImageChapter"

export default function Restaurants() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload";
  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737842072/lana-icecream.jpg`, alt: "Lana Ice Cream" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737842072/lana-sandwich.jpg`, alt: "Lana Sandwich" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737842071/coya-table.jpg`, alt: "Coya Table" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841794/karater-dish.jpg`, alt: "Karater Dish" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841794/kiko-wine.jpg`, alt: "Kiko Wine" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841793/bisque-menu.jpg`, alt: "Bisque Menu" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841793/cdl-piquenique.jpg`, alt: "CDL Picnic" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841793/bisque-drink.jpg`, alt: "Bisque Drink" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841791/cdl-starter.jpg`, alt: "CDL Starter" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841791/cdl-soup.jpg`, alt: "CDL Soup" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841791/cdl-piquenique1.jpg`, alt: "CDL Picnic 1" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841791/da-fish.jpg`, alt: "Da Fish" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841790/da-salad.jpg`, alt: "Da Salad" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841790/spoon.jpg`, alt: "Spoon" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841789/karater-table.jpg`, alt: "Karater Table" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841789/cdl-wine.jpg`, alt: "CDL Wine" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841789/da-pasta.jpg`, alt: "Da Pasta" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841789/1894-sangines.jpg`, alt: "1894 Sangines" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841788/lb-croissant.jpg`, alt: "LB Croissant" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841788/bisque-drinks.jpg`, alt: "Bisque Drinks" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841788/lb-salmon.jpg`, alt: "LB Salmon" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841788/n-kinkali.jpg`, alt: "N Kinkali" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841787/kiko-wine1.jpg`, alt: "Kiko Wine 1" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841786/opus-drink.jpg`, alt: "Opus Drink" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841786/ocf-cocktail.jpg`, alt: "OCF Cocktail" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841785/opus-drink1.jpg`, alt: "Opus Drink 1" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841785/rj-gyosa.jpg`, alt: "RJ Gyosa" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841785/c-pizza.jpg`, alt: "C Pizza" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841784/ocf-brunch.jpg`, alt: "OCF Brunch" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841784/sg-churros.jpg`, alt: "SG Churros" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841784/sg-churros1.jpg`, alt: "SG Churros 1" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841784/ocf-brunch1.jpg`, alt: "OCF Brunch 1" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841784/sg-cutie.jpg`, alt: "SG Cutie" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841783/ocf-fruit.jpg`, alt: "OCF Fruit" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841783/ocf-fruit1.jpg`, alt: "OCF Fruit 1" },
      { src: `${cloudinaryBaseURL}/q_auto,f_auto/v1737841782/ocf-flute.jpg`, alt: "OCF Flute" },
    ]
  }
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <ImageChapter images={chapterData.images} />
    </main>
  )
}
