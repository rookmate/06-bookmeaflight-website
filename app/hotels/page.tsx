"use client"

import ProgressiveImageChapter from "../components/ProgressiveImageChapter"
export default function Hotels() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

  const chapterData = {
    images: [
      // OPENING IMPACT - Showstopper images that demand attention and showcase unique value
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool-room.jpg`, alt: "Luxury pool suite with panoramic views" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-view-couple.jpg`, alt: "Breathtaking ocean view from luxury suite" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bed-poolview.jpg`, alt: "Private pool access from bedroom" },
      { src: `${cloudinaryBaseURL}/v1760870189/hb-hut.jpg`, alt: "Unique overwater bungalow design" },

      // REVENUE MULTIPLIERS - Premium amenities that justify higher ADR and increase guest spend
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-pool.jpg`, alt: "Infinity bathtub overlooking private pool" },
      { src: `${cloudinaryBaseURL}/v1737809797/tej-spa.jpg`, alt: "Professional spa treatment room" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-spa.jpg`, alt: "Modern spa facility with premium treatments" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-bathtub.jpg`, alt: "Luxury spa bathtub with natural stone design" },

      // VIRAL MARKETING GOLDMINE - Content that drives organic reach and reduces marketing costs
      { src: `${cloudinaryBaseURL}/v1737809797/bali-flower-shower.jpg`, alt: "Luxury bathroom with natural flower arrangements" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-yoga.jpg`, alt: "Sunrise yoga session with ocean views" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-shadows.jpg`, alt: "Dramatic architectural lighting and shadows" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-drone.jpg`, alt: "Aerial view showcasing property uniqueness" },

      // GUEST EXPERIENCE STORYTELLING - How guests actually use and enjoy spaces
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-pool-couple.jpg`, alt: "Couples enjoying private pool time" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-tri-couple.jpg`, alt: "Friends sharing luxury accommodation" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-breakfast.jpg`, alt: "Authentic local breakfast experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-book.jpg`, alt: "Peaceful reading moment in luxury setting" },

      // PREMIUM ACCOMMODATION - Room features that support luxury positioning and justify premium pricing
      { src: `${cloudinaryBaseURL}/v1737809797/sh-bed.jpg`, alt: "Luxury bedroom with premium linens" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-room.jpg`, alt: "Spacious suite with modern amenities" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-hotel-view.jpg`, alt: "Stunning hotel view from room" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-sleep.jpg`, alt: "Comfortable sleeping environment" },

      // PREMIUM FACILITIES - High-end amenities that attract affluent guests and increase ADR
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool.jpg`, alt: "Infinity pool with panoramic views" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-pool.jpg`, alt: "Luxury pool area with premium design" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-pool.jpg`, alt: "Natural pool setting" },
      { src: `${cloudinaryBaseURL}/v1737809797/riad-1st-floor.jpg`, alt: "Authentic riad courtyard design" },

      // DINING & HOSPITALITY - Food and beverage experiences that drive revenue and guest satisfaction
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bar.jpg`, alt: "Stylish bar area with premium cocktails" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-pool-book.jpg`, alt: "Poolside dining experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-cutie.jpg`, alt: "Charming dining atmosphere" },

      // WELLNESS & LUXURY DETAILS - Premium amenities that enhance guest experience and support high-end positioning
      { src: `${cloudinaryBaseURL}/v1737809797/sof-robe.jpg`, alt: "High-quality spa linens" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-soap.jpg`, alt: "Artisanal spa products" },
      { src: `${cloudinaryBaseURL}/v1737809797/morroco-kanz-view.jpg`, alt: "Traditional Moroccan architecture with modern luxury" },

      // UNIQUE ARCHITECTURE - Distinctive design elements that create memorable experiences and marketing opportunities
      { src: `${cloudinaryBaseURL}/v1737809797/mh-bath-drone.jpg`, alt: "Unique architectural perspective" },

      // GUEST LIFESTYLE MOMENTS - Authentic experiences that drive bookings and positive reviews
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-wakeup.jpg`, alt: "Peaceful morning moment" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-chill.jpg`, alt: "Relaxing guest moment" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-chill.jpg`, alt: "Guest enjoying tranquil setting" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-banhoca.jpg`, alt: "Authentic local experience" },

      // PREMIUM BATHROOM FEATURES - Luxury amenities that support high-end positioning and justify premium rates
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-shower.jpg`, alt: "Luxury shower design" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-showerhead.jpg`, alt: "High-end shower design" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub.jpg`, alt: "Luxury bathtub with premium design" },
      { src: `${cloudinaryBaseURL}/v1737809797/smt-tub.jpg`, alt: "Modern bathtub design" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub2.jpg`, alt: "Alternative luxury bathtub design" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-shower.jpg`, alt: "Unique shower design" },

      // OPERATIONAL EXCELLENCE - Attention to detail that drives guest satisfaction and positive reviews
      { src: `${cloudinaryBaseURL}/v1737809797/mh-wash-hands.jpg`, alt: "Thoughtful amenity placement" },
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-lana-francisco.jpg`, alt: "Personalized guest experience" },

      // NATURAL ELEMENTS - Connection to environment that enhances guest experience and creates unique value
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath.jpg`, alt: "Natural stone bathroom design" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-couple.jpg`, alt: "Couple enjoying natural bathroom setting" }
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
