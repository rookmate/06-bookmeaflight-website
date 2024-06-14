import GalleryImage from '../GalleryImage.tsx';

export default function Restaurants() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={600}
          height={400}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={400}
          height={300}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={400}
          height={500}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={350}
          height={350}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={400}
          height={400}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={600}
          height={500}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={450}
          height={300}
        />
        <GalleryImage
          src={`v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
