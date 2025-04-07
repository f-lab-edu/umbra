import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from '../components/layout/main-layout';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
