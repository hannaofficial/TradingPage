// src/providers/Providers.tsx
'use client';

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store'; // adjust path if your store is elsewhere

// create a single QueryClient instance
const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ReduxProvider>
    );
}
