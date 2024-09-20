"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from '@/components/homePage';

const queryClient = new QueryClient();
export default function Home() {
  

  return (
    <QueryClientProvider client={queryClient}>

      <HomePage/>
    </QueryClientProvider>
    
  );
}
