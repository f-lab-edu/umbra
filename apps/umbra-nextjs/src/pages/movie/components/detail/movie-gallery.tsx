import { MovieImagesResponse } from '../../movie-detail-repository';
import Image from 'next/image';

export const MovieGallery: React.FC<{ movieImages: MovieImagesResponse }> = ({ movieImages }) => {
  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">갤러리</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movieImages.backdrops.slice(0, 8).map((image) => (
          <div key={image.filePath} className="aspect-video">
            <Image
              src={`https://image.tmdb.org/t/p/w500${image.filePath}`}
              alt="Movie still"
              className="w-full h-full object-cover rounded"
              width={500}
              height={300}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
