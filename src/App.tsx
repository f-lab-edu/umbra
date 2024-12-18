import React, { useEffect } from 'react';
import './style.css';
import { umbraApi } from './lib/umbraApi';

const App = () => {
  useEffect(() => {
    // tmdb api 연결 테스트
    const testApi = async () => {
      const response = await umbraApi.get('/movie/changes?page=1');
    };

    testApi();
  }, []);

  return (
    <div className="app-container">
      <h1>Hello, World! </h1>
    </div>
  );
};

export default App;
