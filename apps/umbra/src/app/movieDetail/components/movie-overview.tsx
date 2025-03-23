import React from 'react';
import { useMovieKeywords } from '../hooks/use-movie-keywords';
import { useMovieBasicInfo } from '../hooks/use-movie-basic-Info';

const MovieOverview = ({ movieId }: { movieId: string }) => {
  const { data: movieDetail } = useMovieBasicInfo(movieId);
  const { data: keywordsData } = useMovieKeywords(movieId);

  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">개요</h2>
      <p className="text-gray-700 leading-relaxed">{movieDetail.overview}</p>
      {keywordsData?.keywords && keywordsData.keywords.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">키워드</h3>
          <div className="flex flex-wrap gap-2">
            {keywordsData.keywords.map((keyword) => (
              <span key={keyword.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {keyword.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export { MovieOverview };
