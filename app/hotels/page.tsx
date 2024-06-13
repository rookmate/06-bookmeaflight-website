import Image from 'next/image';

const cloudinaryBaseURL = 'https://res.cloudinary.com/dnwbkkjpo/image/upload';

export default function Hotels() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="row-span-2 overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={600}
            height={400}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={400}
            height={300}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="row-span-2 overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={400}
            height={500}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={350}
            height={350}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={400}
            height={400}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="row-span-2 overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={600}
            height={500}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={450}
            height={300}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
        <div className="overflow-hidden rounded-lg">
          <Image
            src={`${cloudinaryBaseURL}/v1718299505/ld-export-9dddc056-06132024_jlqaft.jpg`}
            alt="Gallery Image"
            width={400}
            height={400}
            className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
