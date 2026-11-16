import { Link } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import type { NavItem } from '../data/learningContent';

interface PlaceholderPageProps {
  page: NavItem;
}

export function PlaceholderPage({ page }: PlaceholderPageProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-8 sm:p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center mx-auto mb-5 shadow-xs">
          <Layers className="w-7 h-7" aria-hidden="true" />
        </div>

        <p className="text-xs font-bold text-[#166088] tracking-wide mb-2">
          {page.label}
        </p>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#243B53] text-balance">
          {page.pageTitle}
        </h1>

        <p className="mt-3 text-base text-[#334E68] max-w-xl mx-auto leading-relaxed">
          {page.subtitle}
        </p>

        <div className="mt-8 rounded-xl bg-[#FFF8E9] border-2 border-[#FFD65A] px-6 py-5 max-w-lg mx-auto">
          <p className="text-sm sm:text-base font-semibold text-[#243B53]">
            Kandungan akan dibangunkan dalam fasa seterusnya
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
