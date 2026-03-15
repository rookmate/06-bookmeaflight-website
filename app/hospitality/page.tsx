import ProgressiveImageChapter from "../components/ProgressiveImageChapter"

export default function Hospitality() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto"

  const chapterData = {
    images: [
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool-room.jpg`, alt: "Luxury pool suite with panoramic views" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-view-couple.jpg`, alt: "Breathtaking ocean view from luxury suite" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bed-poolview.jpg`, alt: "Private pool access from bedroom" },
      { src: `${cloudinaryBaseURL}/v1760870189/hb-hut.jpg`, alt: "Unique overwater bungalow design" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-pool.jpg`, alt: "Infinity bathtub overlooking private pool" },
      { src: `${cloudinaryBaseURL}/v1737809797/tej-spa.jpg`, alt: "Professional spa treatment room" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-spa.jpg`, alt: "Modern spa facility with premium treatments" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-bathtub.jpg`, alt: "Luxury spa bathtub with natural stone design" },
      { src: `${cloudinaryBaseURL}/v1737809797/bali-flower-shower.jpg`, alt: "Luxury bathroom with natural flower arrangements" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-yoga.jpg`, alt: "Sunrise yoga session with ocean views" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-shadows.jpg`, alt: "Dramatic architectural lighting and shadows" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-drone.jpg`, alt: "Aerial view showcasing property uniqueness" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-pool-couple.jpg`, alt: "Couples enjoying private pool time" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-tri-couple.jpg`, alt: "Friends sharing luxury accommodation" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-breakfast.jpg`, alt: "Authentic local breakfast experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-book.jpg`, alt: "Peaceful reading moment in luxury setting" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-bed.jpg`, alt: "Luxury bedroom with premium linens" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-room.jpg`, alt: "Spacious suite with modern amenities" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-hotel-view.jpg`, alt: "Stunning hotel view from room" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-sleep.jpg`, alt: "Comfortable sleeping environment" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool.jpg`, alt: "Infinity pool with panoramic views" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-pool.jpg`, alt: "Luxury pool area with premium design" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-pool.jpg`, alt: "Natural pool setting" },
      { src: `${cloudinaryBaseURL}/v1737809797/riad-1st-floor.jpg`, alt: "Authentic riad courtyard design" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bar.jpg`, alt: "Stylish bar area with premium cocktails" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-pool-book.jpg`, alt: "Poolside dining experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-cutie.jpg`, alt: "Charming dining atmosphere" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-robe.jpg`, alt: "High-quality spa linens" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-soap.jpg`, alt: "Artisanal spa products" },
      { src: `${cloudinaryBaseURL}/v1737809797/morroco-kanz-view.jpg`, alt: "Traditional Moroccan architecture with modern luxury" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-bath-drone.jpg`, alt: "Unique architectural perspective" },
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-wakeup.jpg`, alt: "Peaceful morning moment" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-chill.jpg`, alt: "Relaxing guest moment" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-chill.jpg`, alt: "Guest enjoying tranquil setting" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-banhoca.jpg`, alt: "Authentic local experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-shower.jpg`, alt: "Luxury shower design" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-showerhead.jpg`, alt: "High-end shower design" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub.jpg`, alt: "Luxury bathtub with premium design" },
      { src: `${cloudinaryBaseURL}/v1737809797/smt-tub.jpg`, alt: "Modern bathtub design" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub2.jpg`, alt: "Alternative luxury bathtub design" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-shower.jpg`, alt: "Unique shower design" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-wash-hands.jpg`, alt: "Thoughtful amenity placement" },
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-lana-francisco.jpg`, alt: "Personalized guest experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath.jpg`, alt: "Natural stone bathroom design" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-couple.jpg`, alt: "Couple enjoying natural bathroom setting" }
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
