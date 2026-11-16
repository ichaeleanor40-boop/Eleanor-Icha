import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../data/learningContent';

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-[#BCE3FA] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display font-semibold text-base text-[#243B53]">
              Jom Belajar Ayat Penyata! | Bahasa Melayu Tahun 4
            </p>
            <p className="text-sm text-[#486581] mt-1">
              Tema Kemasyarakatan · Semangat Kejiranan Memupuk Keharmonian
            </p>
          </div>

          <nav aria-label="Pautan navigasi footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm font-medium text-[#334E68] hover:text-[#166088] hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2] rounded-sm whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
