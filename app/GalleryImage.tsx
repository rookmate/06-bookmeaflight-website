import Image from 'next/image';

const cloudinaryBaseURL = 'https://res.cloudinary.com/dnwbkkjpo/image/upload';

interface GalleryImageProps {
  src: string;
  width: number;
  height: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ src, width, height }) => {
  return (
    <div className="overflow-hidden rounded-lg">
      <Image
        src={`${cloudinaryBaseURL}/${src}`}
        width={width}
        height={height}
        alt="by Bookmeaflight"
      />
    </div>
  );
};

export default GalleryImage;
