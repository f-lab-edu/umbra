import React, { useState } from 'react';
import { useMovieReviews } from '@/app/movieDetail/hooks/use-movie-reviews';

interface Review {
  author: string;
  authorDetails: {
    name: string;
    username: string;
    avatarPath: string | null;
    rating: number | null;
  };
  content: string;
  createdAt: string;
  id: string;
  updatedAt: string;
  url: string;
}

export const ReviewSection = ({ movieId }: { movieId: string }) => {
  const { data } = useMovieReviews(movieId);

  if (!data || data.results.length === 0) {
    return <div className="text-gray-500">아직 작성된 리뷰가 없습니다.</div>;
  }

  return (
    <section className="bg-white rounded-lg p-8 shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">리뷰</h2>
      <div className="space-y-6">
        {data.results.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
};

const ReviewCard = ({ review }: { review: Review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg p-6 space-y-4 border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
          {review.authorDetails.avatarPath ? (
            <img
              src={`https://image.tmdb.org/t/p/w45${review.authorDetails.avatarPath}`}
              alt={review.author}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500 bg-gray-200">
              {review.author[0].toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{review.author}</h3>
          <p className="text-gray-600 text-sm">
            {new Date(review.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        {review.authorDetails.rating && (
          <div className="ml-auto">
            <span className="bg-blue-500 text-white px-2 py-1 rounded">★ {review.authorDetails.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="text-gray-700">
        <div className={isExpanded ? '' : 'line-clamp-3'}>{review.content}</div>
      </div>

      {review.content.length > 300 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          {isExpanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
};
