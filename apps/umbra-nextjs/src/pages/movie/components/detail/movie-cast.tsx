import { MovieCreditsApiResponse } from '../../movie-detail-repository';
import Image from 'next/image';

const MovieCast: React.FC<{ credits: MovieCreditsApiResponse }> = ({ credits }) => {
  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">주요 출연진</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {credits.cast.slice(0, 8).map((person) => (
          <div key={person.id} className="text-center">
            <div className="aspect-[2/3] mb-2">
              <Image
                src={`https://image.tmdb.org/t/p/w185${person.profilePath}`}
                alt={person.name}
                className="w-full h-full object-cover rounded"
                width={185}
                height={278}
              />
            </div>
            <h3 className="font-semibold">{person.name}</h3>
            <p className="text-sm text-gray-600">{person.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { MovieCast };
