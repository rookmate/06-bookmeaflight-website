import Image from "next/image";
import Masonry from "react-masonry-css";
import React, { useState, useEffect, useRef, useCallback } from "react";

const cloudinaryBaseURL = "https://res.cloudinary.com/dnwbkkjpo/image/upload";

export function pick(arr: number[]): number {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface ReusableMasonryProps {
  images: string[];
}

const ReusableMasonry: React.FC<ReusableMasonryProps> = ({ images }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [visibleImages, setVisibleImages] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setVisibleImages(images.slice(0, 8));
  }, [images]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  const getDynamicHeight = () => {
    if (windowWidth >= 1100) return pick([500, 600, 700]);
    if (windowWidth >= 700) return pick([400, 500, 600]);
    return pick([300, 350, 400]);
  };

  const loadMoreImages = useCallback(() => {
    setVisibleImages((prevVisibleImages) => {
      const nextVisibleImages = images.slice(
        prevVisibleImages.length,
        prevVisibleImages.length + 8
      );
      return [...prevVisibleImages, ...nextVisibleImages];
    });
  }, [images]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleImages.length < images.length) {
        loadMoreImages();
      }
    });

    const currentObserver = observer.current;

    if (lastImageRef.current) {
      currentObserver.observe(lastImageRef.current);
    }

    return () => {
      currentObserver.disconnect();
    };
  }, [loadMoreImages, visibleImages.length, images.length]);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -mx-2 md:-mx-4"
        columnClassName="px-2"
      >
        {visibleImages.map((src, index) => {
          const isLastImage = index === visibleImages.length - 1;
          return (
            <div
              key={index}
              className="relative mb-4"
              style={{
                height: getDynamicHeight(),
              }}
              ref={isLastImage ? lastImageRef : null}
            >
              <Image
                src={`${cloudinaryBaseURL}/${src}`}
                alt={`Image by Bookmeaflight`}
                fill
                style={{ objectFit: 'cover' }}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
};

export default ReusableMasonry;