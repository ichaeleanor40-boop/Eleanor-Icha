import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8E9] text-[#243B53] antialiased">
      <a
        href="#kandungan-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#57B8F2] focus:text-[#243B53] focus:font-semibold focus:rounded-lg focus:text-sm"
      >
        Langkau ke kandungan utama
      </a>
      <div className="print:hidden">
        <Navbar />
      </div>
      <main id="kandungan-utama" className="flex-1">
        {children}
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
