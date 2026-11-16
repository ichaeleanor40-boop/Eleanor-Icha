import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GraduationCap, Layers } from 'lucide-react';

const WORDWALL_ORIGINAL_URL =
  'https://wordwall.net/resource/121088838?wwmethod=link';

export function RuangGuruPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center mx-auto mb-5 shadow-xs">
          <GraduationCap className="w-7 h-7" aria-hidden="true" />
        </div>

        <p className="text-xs font-bold text-[#166088] tracking-wide mb-2">
          Ruang Guru
        </p>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#243B53] text-balance">
          Ruang Guru
        </h1>

        <p className="mt-3 text-base text-[#334E68] max-w-xl mx-auto leading-relaxed">
          Panduan pengajaran dan bahan sokongan alternatif untuk guru Bahasa
          Melayu Tahun 4.
        </p>

        {/* Pautan Alternatif Wordwall Asal */}
        <div className="mt-8 rounded-2xl bg-[#EAF6FE] border-2 border-[#A6DCFA] p-6 text-left max-w-xl mx-auto">
          <p className="text-xs font-bold text-[#166088] mb-1">
            Bahan Alternatif Penutup
          </p>
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#243B53]">
            Kuiz Wordwall Asal — Rujukan Guru
          </h2>
          <p className="mt-2 text-sm text-[#334E68] leading-relaxed">
            Pautan kuiz Wordwall asal disediakan sebagai alternatif rujukan guru
            selain kuiz natif pada halaman Penutup.
          </p>
          <div className="mt-4">
            <a
              href={WORDWALL_ORIGINAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-sm px-5 py-2.5 rounded-xl border-2 border-[#EFC034] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
            >
              <span>Kuiz Wordwall Asal — Rujukan Guru</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-[#FFF8E9] border-2 border-[#FFD65A] px-6 py-4 max-w-xl mx-auto flex items-center justify-center gap-2.5">
          <Layers className="w-4 h-4 text-[#7A5900] shrink-0" aria-hidden="true" />
          <p className="text-sm font-semibold text-[#243B53]">
            Bahan tambahan Ruang Guru yang lain akan dibangunkan dalam fasa
            seterusnya.
          </p>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#BCE3FA] font-bold text-sm sm:text-base px-5 py-2.5 rounded-xl transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
