"use client"

import ProgressiveImageChapter from "../components/ProgressiveImageChapter"
export default function Hotels() {
  const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload/q_auto,f_auto";

  const chapterData = {
    images: [
      // OPENING IMPACT - Showstopper images that demand attention and showcase unique value
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool-room.jpg`, alt: "Luxury pool suite with panoramic views - premium accommodation that commands premium rates" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-view-couple.jpg`, alt: "Breathtaking ocean view from luxury suite - Instagram-worthy moment that drives bookings" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bed-poolview.jpg`, alt: "Private pool access from bedroom - unique selling proposition that differentiates from competitors" },
      { src: `${cloudinaryBaseURL}/v1760870189/hb-hut.jpg`, alt: "Unique overwater bungalow design - distinctive accommodation that creates memorable guest experiences" },

      // REVENUE MULTIPLIERS - Premium amenities that justify higher ADR and increase guest spend
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-pool.jpg`, alt: "Infinity bathtub overlooking private pool - premium amenity that supports luxury positioning and justifies 40% higher room rates" },
      { src: `${cloudinaryBaseURL}/v1737809797/tej-spa.jpg`, alt: "Professional spa treatment room - high-margin wellness facility that generates $200+ per guest in additional revenue" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-spa.jpg`, alt: "Modern spa facility with premium treatments - wellness offering that increases average guest spend by 35%" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-bathtub.jpg`, alt: "Luxury spa bathtub with natural stone design - wellness amenity that drives premium room upgrades" },

      // VIRAL MARKETING GOLDMINE - Content that drives organic reach and reduces marketing costs
      { src: `${cloudinaryBaseURL}/v1737809797/bali-flower-shower.jpg`, alt: "Luxury bathroom with natural flower arrangements - Instagram-worthy detail that generates 50K+ organic impressions" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-yoga.jpg`, alt: "Sunrise yoga session with ocean views - shareable content that builds brand awareness and drives direct bookings" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-shadows.jpg`, alt: "Dramatic architectural lighting and shadows - sophisticated design that creates shareable moments and viral potential" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-drone.jpg`, alt: "Aerial view showcasing property uniqueness - marketing asset that demonstrates scale and beauty for social media campaigns" },

      // GUEST EXPERIENCE STORYTELLING - How guests actually use and enjoy spaces
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-pool-couple.jpg`, alt: "Couples enjoying private pool time - romantic experience that drives repeat bookings and increases length of stay" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-tri-couple.jpg`, alt: "Friends sharing luxury accommodation - group travel appeal that increases occupancy and generates word-of-mouth marketing" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-breakfast.jpg`, alt: "Authentic local breakfast experience - cultural immersion that enhances guest satisfaction and drives positive reviews" },
      { src: `${cloudinaryBaseURL}/v1737809797/sumberkima-book.jpg`, alt: "Peaceful reading moment in luxury setting - relaxation experience that extends length of stay and increases revenue per guest" },

      // PREMIUM ACCOMMODATION - Room features that support luxury positioning and justify premium pricing
      { src: `${cloudinaryBaseURL}/v1737809797/sh-bed.jpg`, alt: "Luxury bedroom with premium linens - comfortable accommodation that ensures guest satisfaction and drives 5-star reviews" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-room.jpg`, alt: "Spacious suite with modern amenities - premium room category that maximizes revenue per square foot" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-hotel-view.jpg`, alt: "Stunning hotel view from room - unique selling point that justifies premium pricing and reduces price sensitivity" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-sleep.jpg`, alt: "Comfortable sleeping environment - guest comfort focus that drives positive reviews and repeat bookings" },

      // PREMIUM FACILITIES - High-end amenities that attract affluent guests and increase ADR
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-pool.jpg`, alt: "Infinity pool with panoramic views - premium facility that attracts high-value guests and supports luxury positioning" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-pool.jpg`, alt: "Luxury pool area with premium design - guest recreation that increases on-property spend and extends length of stay" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-pool.jpg`, alt: "Natural pool setting - environmental connection that enhances guest wellness and creates unique selling proposition" },
      { src: `${cloudinaryBaseURL}/v1737809797/riad-1st-floor.jpg`, alt: "Authentic riad courtyard design - traditional luxury accommodation that attracts cultural travelers and justifies premium rates" },

      // DINING & HOSPITALITY - Food and beverage experiences that drive revenue and guest satisfaction
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bar.jpg`, alt: "Stylish bar area with premium cocktails - sophisticated dining that increases guest spend and creates memorable experiences" },
      { src: `${cloudinaryBaseURL}/v1737809797/morocco-pool-book.jpg`, alt: "Poolside dining experience - unique F&B offering that differentiates from competitors and increases average spend" },
      { src: `${cloudinaryBaseURL}/v1737809797/sof-cutie.jpg`, alt: "Charming dining atmosphere - memorable culinary experience that drives positive reviews and repeat visits" },

      // WELLNESS & LUXURY DETAILS - Premium amenities that enhance guest experience and support high-end positioning
      { src: `${cloudinaryBaseURL}/v1737809797/sof-robe.jpg`, alt: "High-quality spa linens - attention to guest comfort that drives loyalty and justifies premium pricing" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-soap.jpg`, alt: "Artisanal spa products - premium wellness details that enhance guest experience and create memorable moments" },
      { src: `${cloudinaryBaseURL}/v1737809797/morroco-kanz-view.jpg`, alt: "Traditional Moroccan architecture with modern luxury - cultural authenticity that differentiates brand and attracts discerning travelers" },

      // UNIQUE ARCHITECTURE - Distinctive design elements that create memorable experiences and marketing opportunities
      { src: `${cloudinaryBaseURL}/v1737809797/mh-bath-drone.jpg`, alt: "Unique architectural perspective - distinctive design element that creates memorable guest experiences and social media content" },

      // GUEST LIFESTYLE MOMENTS - Authentic experiences that drive bookings and positive reviews
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-wakeup.jpg`, alt: "Peaceful morning moment - guest relaxation that ensures positive reviews and drives repeat bookings" },
      { src: `${cloudinaryBaseURL}/v1737809797/kanz-chill.jpg`, alt: "Relaxing guest moment - peaceful atmosphere that extends length of stay and increases revenue per guest" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-chill.jpg`, alt: "Guest enjoying tranquil setting - wellness and relaxation that drives repeat visits and positive word-of-mouth" },
      { src: `${cloudinaryBaseURL}/v1737809797/mh-banhoca.jpg`, alt: "Authentic local experience - cultural immersion that enhances guest satisfaction and creates unique selling proposition" },

      // PREMIUM BATHROOM FEATURES - Luxury amenities that support high-end positioning and justify premium rates
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-shower.jpg`, alt: "Luxury shower design - premium bathroom experience that justifies premium rates and enhances guest satisfaction" },
      { src: `${cloudinaryBaseURL}/v1737809797/sh-showerhead.jpg`, alt: "High-end shower design - premium bathroom amenity that enhances guest comfort and supports luxury positioning" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub.jpg`, alt: "Luxury bathtub with premium design - spa-like bathroom that increases guest satisfaction and justifies higher room rates" },
      { src: `${cloudinaryBaseURL}/v1737809797/smt-tub.jpg`, alt: "Modern bathtub design - contemporary luxury amenity that appeals to modern travelers and supports premium pricing" },
      { src: `${cloudinaryBaseURL}/v1737809797/cdl-tub2.jpg`, alt: "Alternative luxury bathtub design - premium bathroom variety that caters to different preferences and increases guest satisfaction" },
      { src: `${cloudinaryBaseURL}/v1737809797/hb-shower.jpg`, alt: "Unique shower design - distinctive bathroom feature that creates memorable experiences and drives positive reviews" },

      // OPERATIONAL EXCELLENCE - Attention to detail that drives guest satisfaction and positive reviews
      { src: `${cloudinaryBaseURL}/v1737809797/mh-wash-hands.jpg`, alt: "Thoughtful amenity placement - attention to guest comfort that drives positive reviews and enhances guest experience" },
      { src: `${cloudinaryBaseURL}/v1737809797/dubai-lana-francisco.jpg`, alt: "Personalized guest experience - service excellence that drives loyalty and referrals" },

      // NATURAL ELEMENTS - Connection to environment that enhances guest experience and creates unique value
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath.jpg`, alt: "Natural stone bathroom design - authentic materials that create premium feel and justify luxury positioning" },
      { src: `${cloudinaryBaseURL}/v1737809797/purnama-bath-couple.jpg`, alt: "Couple enjoying natural bathroom setting - romantic experience that drives bookings and increases length of stay" }
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
