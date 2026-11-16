import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Users,
} from 'lucide-react';
import { PosterKarnivalKejiranan } from '../components/PosterKarnivalKejiranan';
import { OpdKonsepAyatPenyata } from '../components/OpdKonsepAyatPenyata';
import { OpdHarmoniPlayer } from '../components/OpdHarmoniPlayer';

const PADLET_URL =
  'https://padlet.com/ichaeleanor2806/ayat-penyata-4-zon-harmoni-s024eeu1ehm00wmu2hjf';

const THINK_PAIR_SHARE_STEPS = [
  'Pilih satu zon dalam poster.',
  'Fikirkan satu ayat penyata berdasarkan aktiviti yang dilihat.',
  'Bincangkan ayat dengan pasangan.',
  'Kongsi ayat melalui Padlet.',
];

export function Langkah1Page() {
  const { hash } = useLocation();
  const [showOpdPanel, setShowOpdPanel] = useState<boolean>(false);

  useEffect(() => {
    if (hash === '#konsep-ayat-penyata') {
      setShowOpdPanel(true);
      requestAnimationFrame(() => {
        const target = document.getElementById('konsep-ayat-penyata');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }, [hash]);

  return (
    <div>
      {/* 1. Banner Langkah 1 */}
      <section
        aria-labelledby="langkah1-heading"
        className="bg-gradient-to-br from-[#DDF1FD] via-[#EAF6FE] to-[#FFF8E9] border-b-2 border-[#A6DCFA]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-[#166088] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  <span>Langkah 1</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Tempoh: 15 minit</span>
                </span>
              </div>

              <h1
                id="langkah1-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#243B53] leading-tight"
              >
                Poster Digital: Karnival Kejiranan Taman Harmoni
              </h1>

              <p className="mt-2.5 text-base text-[#334E68] max-w-2xl leading-relaxed">
                Terokai empat zon aktiviti dalam poster kejiranan untuk mengenal
                pasti subjek, predikat, huruf besar dan tanda noktah dalam ayat
                penyata.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/set-induksi"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Kembali ke Set Induksi</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
              >
                <span>Halaman Utama</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* 2. OPD Video Animasi Interaktif: Kenali Ayat Penyata Bersama Harmoni! (SEBELUM poster) */}
        <OpdHarmoniPlayer />

        {/* 3. Pengenalan Ringkas Penerokaan Poster */}
        <section
          aria-labelledby="pengenalan-langkah1-heading"
          className="bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-6 sm:p-7"
        >
          <h2
            id="pengenalan-langkah1-heading"
            className="font-display text-xl sm:text-2xl font-bold text-[#243B53]"
          >
            Cara Meneroka Poster Kejiranan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#334E68] leading-relaxed max-w-3xl">
            Tekan setiap zon aktiviti pada poster digital di bawah untuk melihat
            ilustrasi aktiviti, contoh ayat penyata yang gramatis, serta bahagian{' '}
            <strong className="font-bold text-[#243B53]">Subjek</strong> dan{' '}
            <strong className="font-bold text-[#243B53]">Predikat</strong>.
          </p>
        </section>

        {/* 4. Poster Digital Empat Zon + Penerangan Ayat Penyata Zon */}
        <PosterKarnivalKejiranan />

        {/* Rujukan OPD Penerangan Konsep (dikekalkan & boleh dibuka apabila diperlukan) */}
        <section aria-labelledby="opd-rujukan-heading">
          <div className="bg-white rounded-2xl border-2 border-[#CFC0FA] shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={() => setShowOpdPanel((prev) => !prev)}
              aria-expanded={showOpdPanel}
              className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F3EEFE]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] min-h-[52px]"
            >
              <div>
                <p className="text-xs font-bold text-[#4D348C]">
                  Nota Konsep Tambahan (OPD)
                </p>
                <h2
                  id="opd-rujukan-heading"
                  className="font-display text-lg sm:text-xl font-bold text-[#243B53]"
                >
                  Rujukan Penerangan Konsep Ayat Penyata
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F3EEFE] border border-[#CFC0FA] text-xs font-bold text-[#243B53] shrink-0">
                <span>{showOpdPanel ? 'Tutup Nota' : 'Buka Nota'}</span>
                {showOpdPanel ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </span>
            </button>

            {showOpdPanel && (
              <div className="p-6 sm:p-8 border-t border-[#E0D5FC] bg-[#FFF8E9]/40">
                <OpdKonsepAyatPenyata />
              </div>
            )}
          </div>
        </section>

        {/* 5. Aktiviti Think-Pair-Share: "Fikir, Bincang dan Kongsi!" */}
        <section aria-labelledby="tps-heading">
          <div className="bg-[#EAF9F1] rounded-2xl border-2 border-[#70D6A1] shadow-xs p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 text-xs font-bold text-[#1B6B46] mb-2">
                  <Users className="w-4 h-4" aria-hidden="true" />
                  <span>Aktiviti Berpasangan (Think-Pair-Share)</span>
                </div>

                <h2
                  id="tps-heading"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
                >
                  Fikir, Bincang dan Kongsi!
                </h2>

                <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {THINK_PAIR_SHARE_STEPS.map((step, index) => (
                    <li
                      key={step}
                      className="bg-white rounded-xl border border-[#9BE4BE] p-4 flex items-start gap-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#70D6A1] text-[#243B53] font-bold text-sm flex items-center justify-center shrink-0 tabular-nums">
                        {index + 1}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-[#243B53] leading-snug">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <p className="mt-4 text-xs sm:text-sm text-[#1B6B46] font-medium">
                  Aktiviti ini dijalankan secara berpasangan dan dibimbing oleh
                  guru.
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-start lg:items-end gap-2">
                <a
                  href={PADLET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#FF8D85] hover:bg-[#FA776E] text-[#243B53] font-bold text-base px-6 py-3.5 rounded-xl border-2 border-[#F47269] shadow-xs transition-all hover:-translate-y-0.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  <span>Kongsi Ayat di Padlet</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
                <span className="text-xs text-[#334E68]">
                  Dibuka pada tab pelayar baharu
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Butang Navigasi Bawah */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <Link
            to="/set-induksi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Set Induksi</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
          >
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
