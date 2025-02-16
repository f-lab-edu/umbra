import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MainLayout from './app/layout';
import MoviePage from './app/movie/page';
import SearchPage from './app/search/page';
import LoginPage from './app/login/page';
import LoginFallbackPage from './app/login/fallback/page';
import { ModalProvider } from './components/modal-provider';

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
