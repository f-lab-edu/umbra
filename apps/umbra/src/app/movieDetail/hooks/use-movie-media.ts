import { useSuspenseQuery } from '@tanstack/react-query';
import { movieDetailRepository } from '../movie-detail-repository';
import { MovieVideosApiResponse, MovieImagesResponse } from '../movie-detail-repository';

const useMovieVideos = (movieId: string) => {
  return useSuspenseQuery<MovieVideosApiResponse>({
    queryKey: ['movie', movieId, 'videos'],
    queryFn: () => movieDetailRepository.getMovieVideos({ id: movieId }),
  });
};

const useMovieImages = (movieId: string) => {
  return useSuspenseQuery<MovieImagesResponse>({
    queryKey: ['movie', movieId, 'images'],
    queryFn: () => movieDetailRepository.getMovieImages({ id: movieId }),
  });
};

export { useMovieVideos, useMovieImages };
