import Image from "next/image";
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';
import React, { useState, useEffect } from 'react';

const cloudinaryBaseURL = 'https://res.cloudinary.com/dnwbkkjpo/image/upload';

export function pick(arr: number[]): number {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface ReusableMasonryProps {
  images: string[];
}


export default function ReusableMasonry({ images }: ReusableMasonryProps) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -mx-2 md:-mx-4"
        columnClassName="px-2"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="relative mb-4"
            style={{
              height: getDynamicHeight(),
            }}
          >
            <Image
              src={`${cloudinaryBaseURL}/${src}`}
              alt={`by Bookmeaflight`}
              fill
              style={{ objectFit: 'cover' }}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

ReusableMasonry.propTypes = {
  images: PropTypes.array.isRequired,
};
