import type { GetServerSideProps } from 'next';
import {
  MovieCreditsApiResponse,
  movieDetailRepository,
  MovieDetailsApiResponse,
  MovieImagesResponse,
  MovieKeywordsResponse,
  MovieListResponse,
  MovieReviewsResponse,
  MovieVideosApiResponse,
} from './movie-detail-repository';
import { MovieHero } from './components/detail/movie-hero';
import { MovieOverview } from './components/detail/movie-overview';
import { MovieCast } from './components/detail/movie-cast';
import { MovieTrailer } from './components/detail/movie-trailer';
import { ReviewSection } from './components/detail/review-section';
import { MovieGallery } from './components/detail/movie-gallery';
import { MovieList } from './components/detail/movie-list';
import { MovieSidebar } from './components/detail/movie-sidebar';

const MovieDetailPage = ({
  movieDetail,
  keywordsData,
  creditsData,
  videosData,
  reviewInfo,
  movieImages,
  similarMovies,
  recommendations,
}: {
  movieDetail: MovieDetailsApiResponse;
  keywordsData: MovieKeywordsResponse;
  creditsData: MovieCreditsApiResponse;
  videosData: MovieVideosApiResponse;
  reviewInfo: MovieReviewsResponse;
  movieImages: MovieImagesResponse;
  similarMovies: MovieListResponse;
  recommendations: MovieListResponse;
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MovieHero movieDetail={movieDetail} />
      <div className="mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <MovieOverview movieDetail={movieDetail} keywordsData={keywordsData} />
            <MovieCast credits={creditsData} />
            <MovieTrailer videos={videosData} />
            <ReviewSection reviewInfo={reviewInfo} />
            <MovieGallery movieImages={movieImages} />
            <MovieList title="비슷한 영화" movieList={similarMovies} />
            <MovieList title="추천 영화" movieList={recommendations} />
          </div>
          <div className="col-span-1">
            <MovieSidebar movieDetail={movieDetail} credits={creditsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: 애러 및 로딩 처리 방법... app router 인 경우는 loading.tsx, error.tsx 를 사용하는데 이 경우는 어떻게 해야할지 고민중
export const getServerSideProps: GetServerSideProps<{
  movieDetail: MovieDetailsApiResponse;
  keywordsData: MovieKeywordsResponse;
  creditsData: MovieCreditsApiResponse;
  videosData: MovieVideosApiResponse;
  reviewInfo: MovieReviewsResponse;
  movieImages: MovieImagesResponse;
  similarMovies: MovieListResponse;
  recommendations: MovieListResponse;
}> = async (context) => {
  const id: string = String(context.params?.id ?? '');

  const movieDetail = await movieDetailRepository.getMovieDetail({ id: id });
  const keywordsData = await movieDetailRepository.getMovieKeywords({ id: id });
  const creditsData = await movieDetailRepository.getMovieCredits({ id: id });
  const videosData = await movieDetailRepository.getMovieVideos({ id: id });
  const reviewInfo = await movieDetailRepository.getMovieReviews({ id: id });
  const movieImages = await movieDetailRepository.getMovieImages({ id: id });
  const similarMovies = await movieDetailRepository.getSimilarMovies({ id: id });
  const recommendations = await movieDetailRepository.getMovieRecommendations({ id: id });

  return {
    props: {
      movieDetail,
      keywordsData,
      creditsData,
      videosData,
      reviewInfo,
      movieImages,
      similarMovies,
      recommendations,
    },
  };
};

export default MovieDetailPage;
