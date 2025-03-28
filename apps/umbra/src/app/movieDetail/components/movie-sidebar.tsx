import React from 'react';
import { useMovieBasicInfo } from '../hooks/use-movie-basic-Info';
import { useMovieCredits } from '../hooks/use-movie-credits';

const MovieSidebar = ({ movieId }: { movieId: string }) => {
  const { data: movieDetail } = useMovieBasicInfo(movieId);
  const { data: credits } = useMovieCredits(movieId);

  const director = credits.crew.find((person) => person.job === 'Director');

  return (
    <div className="bg-white rounded-lg p-8 shadow-md">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">감독</h3>
        <p>{director?.name || '정보 없음'}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">원제</h3>
        <p>{movieDetail.originalTitle}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">상태</h3>
        <p>{movieDetail.status}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">제작비</h3>
        <p>{movieDetail.budget.toLocaleString()} USD</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">수익</h3>
        <p>{movieDetail.revenue.toLocaleString()} USD</p>
      </div>

      {movieDetail.homepage && (
        <div>
          <h3 className="text-lg font-semibold mb-2">홈페이지</h3>
          <a
            href={movieDetail.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            방문하기
          </a>
        </div>
      )}
    </div>
  );
};

export { MovieSidebar };
