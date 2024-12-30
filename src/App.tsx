import React, { useEffect } from 'react';
import { umbraApi } from '@/lib/umbraApi';

const App = () => {
  useEffect(() => {
    // tmdb api 연결 테스트
    const testApi = async () => {
      const response = await umbraApi.get('/movie/changes?page=1');
    };

    testApi();
  }, []);

  return (
    <div className="bg-red-300 text-xl text-blue-100">
      <h1>Hello, World! </h1>
    </div>
  );
};

export default App;
