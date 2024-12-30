import React, { useEffect } from 'react';
import { umbraApi } from '@/lib/umbraApi';
import { BrowserRouter, Routes, Route } from 'react-router';
import MainPage from '@/app/page';

const App = () => {
  useEffect(() => {
    // tmdb api 연결 테스트
    const testApi = async () => {
      const response = await umbraApi.get('/movie/changes?page=1');
    };

    testApi();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
