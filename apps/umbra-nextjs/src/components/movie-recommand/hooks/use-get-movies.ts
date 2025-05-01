import { useQuery } from '@tanstack/react-query';
import { movieRecommendRepository } from '../movie-recommend-repository';
import { Step } from '../constants';
import { STEPS } from '../constants';
import { MovieDiscoverParams } from '../types';

const useGetMovies = (params: MovieDiscoverParams, currentStep: number) => {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: () => movieRecommendRepository.getMovies(params),
    enabled: currentStep === STEPS[Step.RESULTS],
  });
};

export { useGetMovies };
