import ProgressiveImageChapter from "../components/ProgressiveImageChapter"

export default function Dining() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto"

  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/v1737842072/coya-ceviche.jpg`, alt: "Artisanal ceviche with premium presentation" },
      { src: `${cloudinaryBaseURL}/v1737842072/asia-asia.jpg`, alt: "Sophisticated Asian fusion presentation" },
      { src: `${cloudinaryBaseURL}/v1737842071/coya-table.jpg`, alt: "Elegant table setting with premium ambiance" },
      { src: `${cloudinaryBaseURL}/v1737841794/kiko-wine.jpg`, alt: "Premium wine selection with expert curation" },
      { src: `${cloudinaryBaseURL}/v1737842072/purnama-arancini.jpg`, alt: "Gourmet arancini with artisanal presentation" },
      { src: `${cloudinaryBaseURL}/v1737841791/da-fish.jpg`, alt: "Fresh seafood with professional plating" },
      { src: `${cloudinaryBaseURL}/v1737841789/da-pasta.jpg`, alt: "Handcrafted pasta with authentic technique" },
      { src: `${cloudinaryBaseURL}/v1737842072/lana-icecream.jpg`, alt: "Artisanal dessert with premium presentation" },
      { src: `${cloudinaryBaseURL}/v1737841784/ocf-brunch1.jpg`, alt: "Instagram-worthy brunch presentation" },
      { src: `${cloudinaryBaseURL}/v1737841783/ocf-fruit1.jpg`, alt: "Vibrant fruit presentation with artistic plating" },
      { src: `${cloudinaryBaseURL}/v1737841782/ocf-flute.jpg`, alt: "Elegant champagne presentation" },
      { src: `${cloudinaryBaseURL}/v1737841784/sg-churros1.jpg`, alt: "Artisanal churros with premium presentation" },
      { src: `${cloudinaryBaseURL}/v1737842072/pg-drink.jpg`, alt: "Craft cocktail with premium presentation" },
      { src: `${cloudinaryBaseURL}/v1760871063/opus-drink1.jpg`, alt: "Sophisticated cocktail with artisanal garnishes" },
      { src: `${cloudinaryBaseURL}/v1760871063/opus-drink.jpg`, alt: "Professional cocktail presentation" },
      { src: `${cloudinaryBaseURL}/v1737841793/bisque-drink.jpg`, alt: "Premium beverage with elegant presentation" },
      { src: `${cloudinaryBaseURL}/v1737841788/n-kinkali.jpg`, alt: "Authentic Georgian dumplings with traditional presentation" },
      { src: `${cloudinaryBaseURL}/v1737841785/rj-gyosa.jpg`, alt: "Traditional Japanese gyoza with authentic technique" },
      { src: `${cloudinaryBaseURL}/v1737842072/morocco-brekkie.jpg`, alt: "Authentic Moroccan breakfast with cultural presentation" },
      { src: `${cloudinaryBaseURL}/v1760871063/karater-dish.jpg`, alt: "Traditional dish with authentic preparation" },
      { src: `${cloudinaryBaseURL}/v1737841793/bisque-menu.jpg`, alt: "Professional menu design with premium presentation" },
      { src: `${cloudinaryBaseURL}/v1737841791/cdl-starter.jpg`, alt: "Professional kitchen preparation with attention to detail" },
      { src: `${cloudinaryBaseURL}/v1737841791/cdl-piquenique1.jpg`, alt: "Artisanal picnic presentation with premium ingredients" },
      { src: `${cloudinaryBaseURL}/v1737841793/cdl-piquenique.jpg`, alt: "Professional outdoor dining setup" },
      { src: `${cloudinaryBaseURL}/v1737841788/lb-croissant.jpg`, alt: "Artisanal croissant with premium ingredients" },
      { src: `${cloudinaryBaseURL}/v1737841790/da-salad.jpg`, alt: "Fresh ingredients with professional presentation" },
      { src: `${cloudinaryBaseURL}/v1737842072/lana-sandwich.jpg`, alt: "Gourmet sandwich with artisanal preparation" },
      { src: `${cloudinaryBaseURL}/v1737842072/tej-lunch.jpg`, alt: "Premium lunch presentation with quality ingredients" },
      { src: `${cloudinaryBaseURL}/v1737842072/coya-port.jpg`, alt: "Signature dish with distinctive presentation" },
      { src: `${cloudinaryBaseURL}/v1737842072/coya-starter.jpg`, alt: "Professional appetizer presentation" }
    ]
  }

  return (
    <main className="min-h-screen bg-stone-100 py-12">
      <ProgressiveImageChapter
        images={chapterData.images}
        criticalImageCount={12}
        batchSize={15}
      />
    </main>
  )
}
