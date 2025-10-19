"use client"

import ProgressiveImageChapter from "../components/ProgressiveImageChapter"

export default function Restaurants() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

  const chapterData = {
    images: [
      // OPENING IMPACT - Showstopper images that demand attention and showcase premium positioning
      { src: `${cloudinaryBaseURL}/v1737842072/coya-ceviche.jpg`, alt: "Artisanal ceviche with premium presentation - signature dish that commands premium pricing and drives social media engagement" },
      { src: `${cloudinaryBaseURL}/v1737842072/asia-asia.jpg`, alt: "Sophisticated Asian fusion presentation - elevated dining experience that justifies 30% higher menu prices" },
      { src: `${cloudinaryBaseURL}/v1737842071/coya-table.jpg`, alt: "Elegant table setting with premium ambiance - restaurant atmosphere that attracts high-value customers and increases average spend" },
      { src: `${cloudinaryBaseURL}/v1737841794/kiko-wine.jpg`, alt: "Premium wine selection with expert curation - beverage program that increases profit margins by 40% and attracts wine enthusiasts" },

      // REVENUE MULTIPLIERS - Premium dishes and experiences that justify higher prices
      { src: `${cloudinaryBaseURL}/v1737842072/purnama-arancini.jpg`, alt: "Gourmet arancini with artisanal presentation - premium appetizer that increases average order value by $15" },
      { src: `${cloudinaryBaseURL}/v1737841791/da-fish.jpg`, alt: "Fresh seafood with professional plating - signature main course that drives repeat visits and justifies premium pricing" },
      { src: `${cloudinaryBaseURL}/v1737841789/da-pasta.jpg`, alt: "Handcrafted pasta with authentic technique - artisanal preparation that differentiates from competitors and supports higher margins" },
      { src: `${cloudinaryBaseURL}/v1737842072/lana-icecream.jpg`, alt: "Artisanal dessert with premium presentation - high-margin dessert that increases guest satisfaction and average spend" },

      // VIRAL MARKETING GOLDMINE - Instagram-worthy content that drives organic reach
      { src: `${cloudinaryBaseURL}/v1737841784/ocf-brunch1.jpg`, alt: "Instagram-worthy brunch presentation - shareable content that generates 25K+ organic impressions and drives weekend bookings" },
      { src: `${cloudinaryBaseURL}/v1737841783/ocf-fruit1.jpg`, alt: "Vibrant fruit presentation with artistic plating - social media content that builds brand awareness and attracts health-conscious diners" },
      { src: `${cloudinaryBaseURL}/v1737841782/ocf-flute.jpg`, alt: "Elegant champagne presentation - celebratory moment that drives special occasion bookings and increases average spend" },
      { src: `${cloudinaryBaseURL}/v1737841784/sg-churros1.jpg`, alt: "Artisanal churros with premium presentation - dessert content that drives social engagement and attracts dessert enthusiasts" },

      // PREMIUM BEVERAGE PROGRAM - High-margin drinks that increase profitability
      { src: `${cloudinaryBaseURL}/v1737842072/pg-drink.jpg`, alt: "Craft cocktail with premium presentation - signature drink that increases beverage revenue by 35% and attracts cocktail enthusiasts" },
      { src: `${cloudinaryBaseURL}/v1760871063/opus-drink1.jpg`, alt: "Sophisticated cocktail with artisanal garnishes - premium beverage that justifies higher prices and creates memorable experiences" },
      { src: `${cloudinaryBaseURL}/v1760871063/opus-drink.jpg`, alt: "Professional cocktail presentation - beverage program that differentiates brand and increases profit margins" },
      { src: `${cloudinaryBaseURL}/v1737841793/bisque-drink.jpg`, alt: "Premium beverage with elegant presentation - drink menu that attracts upscale clientele and increases average spend" },

      // AUTHENTIC CULINARY EXPERIENCES - Cultural authenticity that drives customer loyalty
      { src: `${cloudinaryBaseURL}/v1737841788/n-kinkali.jpg`, alt: "Authentic Georgian dumplings with traditional presentation - cultural authenticity that attracts food enthusiasts and drives word-of-mouth marketing" },
      { src: `${cloudinaryBaseURL}/v1737841785/rj-gyosa.jpg`, alt: "Traditional Japanese gyoza with authentic technique - cultural dining experience that differentiates from competitors and attracts discerning diners" },
      { src: `${cloudinaryBaseURL}/v1737842072/morocco-brekkie.jpg`, alt: "Authentic Moroccan breakfast with cultural presentation - unique dining experience that attracts cultural travelers and drives positive reviews" },
      { src: `${cloudinaryBaseURL}/v1760871063/karater-dish.jpg`, alt: "Traditional dish with authentic preparation - cultural authenticity that enhances guest experience and drives repeat visits" },

      // OPERATIONAL EXCELLENCE - Behind-the-scenes quality that builds trust
      { src: `${cloudinaryBaseURL}/v1737841793/bisque-menu.jpg`, alt: "Professional menu design with premium presentation - operational excellence that communicates quality and justifies premium pricing" },
      { src: `${cloudinaryBaseURL}/v1737841791/cdl-starter.jpg`, alt: "Professional kitchen preparation with attention to detail - operational quality that ensures consistent guest satisfaction and positive reviews" },
      { src: `${cloudinaryBaseURL}/v1737841791/cdl-piquenique1.jpg`, alt: "Artisanal picnic presentation with premium ingredients - unique dining concept that differentiates brand and attracts food enthusiasts" },
      { src: `${cloudinaryBaseURL}/v1737841793/cdl-piquenique.jpg`, alt: "Professional outdoor dining setup - unique service concept that creates memorable experiences and drives social media engagement" },

      // PREMIUM INGREDIENTS & TECHNIQUE - Quality that justifies higher prices
      { src: `${cloudinaryBaseURL}/v1737841788/lb-croissant.jpg`, alt: "Artisanal croissant with premium ingredients - breakfast program that attracts morning customers and increases early revenue" },
      { src: `${cloudinaryBaseURL}/v1737841790/da-salad.jpg`, alt: "Fresh ingredients with professional presentation - healthy dining option that attracts health-conscious customers and supports premium positioning" },
      { src: `${cloudinaryBaseURL}/v1737842072/lana-sandwich.jpg`, alt: "Gourmet sandwich with artisanal preparation - lunch program that drives midday revenue and attracts office workers" },
      { src: `${cloudinaryBaseURL}/v1737842072/tej-lunch.jpg`, alt: "Premium lunch presentation with quality ingredients - midday dining that increases revenue and attracts business clientele" },

      // SIGNATURE PRESENTATIONS - Unique plating that creates memorable experiences
      { src: `${cloudinaryBaseURL}/v1737842072/coya-port.jpg`, alt: "Signature dish with distinctive presentation - unique plating that creates memorable experiences and drives social media sharing" },
      { src: `${cloudinaryBaseURL}/v1737842072/coya-starter.jpg`, alt: "Professional appetizer presentation - quality plating that enhances guest experience and justifies premium pricing" }
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
