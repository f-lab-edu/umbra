import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainLayout from './app/layout';
import SearchPage from './app/search/page';
import LoginPage from './app/login/page';
import LoginFallbackPage from './app/login/fallback/page';
import { ModalProvider } from './components/modal-provider';
import { MovieDetailPage } from './app/movieDetail/page';
import { MovieRecommendPage } from './app/movieRecommend/page';
import { BookmarksPage } from './app/bookmarks/page';

// TODO: 타입 설정 방법 찾기
// @ts-ignore
const MoviePage = React.lazy(() => import('movie/movie'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/movie" replace />} />
              <Route path="/movie" element={<MoviePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/loginfallback" element={<LoginFallbackPage />} />
              <Route path="/movie/:id" element={<MovieDetailPage />} />
              <Route path="/movie-recommend" element={<MovieRecommendPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>

      {/* 개발환경에서만 노출 */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
