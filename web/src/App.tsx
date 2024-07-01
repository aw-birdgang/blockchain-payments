import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Router from './Router.tsx';

function App() {
    const queryClient = new QueryClient();

    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <Router />
                {/* <ReactQueryDevtools /> 리액트 쿼리 툴 off */}
            </QueryClientProvider>
        </React.StrictMode>
    );
}
export default App;
