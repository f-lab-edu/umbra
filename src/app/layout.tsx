import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '@/app/components/header';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
