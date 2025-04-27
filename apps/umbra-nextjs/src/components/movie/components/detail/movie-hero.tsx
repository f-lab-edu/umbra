import { BookmarkButton } from '@/components/bookmarks/components/bookmark-button';
import { MovieDetailsApiResponse } from '@/components/movie/movie-detail-repository';
import Image from 'next/image';

const MovieHero: React.FC<{ movieDetail: MovieDetailsApiResponse }> = ({ movieDetail }) => {
  return (
    <div
      className="relative h-[60vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdropPath})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 h-full flex items-end pb-16">
          <div className="flex gap-8">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movieDetail.posterPath}`}
              alt={movieDetail.title}
              className="w-64 rounded-lg shadow-xl"
              width={500}
              height={500}
            />
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">{movieDetail.title}</h1>
              <p className="text-lg mb-4">{movieDetail.tagline}</p>
              <div className="flex items-center gap-4 mb-4">
                <span>{new Date(movieDetail.releaseDate).getFullYear()}</span>
                <span>•</span>
                <span>{movieDetail.runtime}분</span>
                <span>•</span>
                <span>{movieDetail.genres.map((genre) => genre.name).join(', ')}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded font-bold">TMDb</div>
                  <span className="text-xl font-bold">{movieDetail.voteAverage.toFixed(1)}</span>
                </div>
                {/* TODO: 현재 영화 상세페이지가 SSR 인데 해당 컴포넌트만 CSR 로 하고싶다면.. 방법을 찾아야함 */}
                {/* <BookmarkButton movie={movieDetail} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MovieHero };
