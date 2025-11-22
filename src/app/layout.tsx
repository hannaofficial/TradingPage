// app/layout.tsx
import './globals.css';
import React from 'react';
import { Providers } from '@/providers/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileNav } from '@/components/ui/MobileNav';
import HeaderStrip from '@/components/HeaderStrip';

// Optional: import project metadata from metadata.json if present at project root
// (You can copy /mnt/data/metadata.json to ./metadata.json in project root and uncomment below)
// import projectMeta from '../metadata.json';

export const metadata = {
  title: 'Axiom Pulse Replica',
  description: 'Realtime token pulse dashboard (Axiom Pulse clone)',
  // ...optionally spread your metadata.json values
  // ...projectMeta
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-zinc-200 font-sans selection:bg-primary/30">
        {/* Providers is a client component that injects Redux + React Query */}
        <Providers>
          <div className="flex flex-col h-screen w-full overflow-hidden">
            <Header />

            {/* main content area — PulseBoard will be rendered via app/page.tsx */}
            <main className="flex-1 min-h-0 w-full relative">
              <HeaderStrip />
              {children}
            </main>

            {/* Desktop Footer */}
            <div className="hidden md:block">
              <Footer />
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
