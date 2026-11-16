import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/learningContent';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b-2 border-[#BCE3FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[#243B53] hover:text-[#166088] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2] focus-visible:ring-offset-2 rounded-lg py-1 whitespace-nowrap shrink-0"
          >
            <span className="relative w-9 h-9 rounded-xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FFD65A] border-2 border-white"
              />
            </span>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight whitespace-nowrap">
              Jom Belajar Ayat Penyata!
            </span>
          </Link>

          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `relative px-2.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-[#243B53] font-semibold bg-[#EAF6FE]'
                      : 'text-[#334E68] hover:text-[#243B53] hover:bg-[#FFF8E9]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-2 -bottom-[11px] h-[3px] bg-[#FF8D85] rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-[#243B53] hover:bg-[#EAF6FE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2]"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi mudah alih"
          className="lg:hidden border-t border-[#BCE3FA] bg-white px-4 py-3 shadow-sm"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2] ${
                      isActive
                        ? 'bg-[#EAF6FE] text-[#243B53] font-semibold'
                        : 'text-[#334E68] hover:bg-[#FFF8E9] hover:text-[#243B53]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="w-2.5 h-2.5 rounded-full bg-[#FF8D85]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
