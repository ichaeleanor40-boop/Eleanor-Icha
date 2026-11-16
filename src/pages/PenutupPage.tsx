import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ClipboardCheck,
  Home,
  MessageSquareQuote,
} from 'lucide-react';
import { KuizPantasAyatPenyata } from '../components/KuizPantasAyatPenyata';

export function PenutupPage() {
  return (
    <div>
      {/* 1. Banner & Konteks Pengajaran Penutup */}
      <section
        aria-labelledby="penutup-heading"
        className="bg-gradient-to-br from-[#F3EEFE] via-[#FFF8E9] to-[#EAF6FE] border-b-2 border-[#CFC0FA]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-[#4D348C] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Penutup &amp; e-Pentaksiran</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Tempoh: 5 minit</span>
                </span>
              </div>

              <h1
                id="penutup-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#243B53] leading-tight"
              >
                Uji Kefahaman: Kuiz Pantas Ayat Penyata
              </h1>

              <p className="mt-2.5 text-base text-[#334E68] max-w-2xl leading-relaxed">
                Aktiviti pengukuhan bersemuka bersama kelas melalui paparan
                Smart TV dan soal jawab lisan yang dibimbing oleh guru.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/langkah-3"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Kembali ke Langkah 3</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Halaman Utama</span>
              </Link>
            </div>
          </div>

          {/* Konteks Pengajaran */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-7">
            <div className="bg-white rounded-xl border border-[#CFC0FA] p-4">
              <dt className="text-xs font-semibold text-[#486581]">
                Mata Pelajaran
              </dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Bahasa Melayu
              </dd>
            </div>
            <div className="bg-white rounded-xl border border-[#CFC0FA] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Tahun</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">4</dd>
            </div>
            <div className="bg-white rounded-xl border border-[#CFC0FA] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Topik</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Ayat Penyata
              </dd>
            </div>
            <div className="bg-white rounded-xl border border-[#CFC0FA] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Aktiviti</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Kuiz Pantas Ayat Penyata
              </dd>
            </div>
            <div className="bg-white rounded-xl border border-[#CFC0FA] p-4">
              <dt className="text-xs font-semibold text-[#486581]">
                Mod Pelaksanaan
              </dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Bersama-sama di Smart TV (Lisan Kelas)
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* 2. Kuiz Interaktif Natif */}
        <section aria-label="Kuiz Pantas Ayat Penyata">
          <KuizPantasAyatPenyata />
        </section>

        {/* 3. Aktiviti Rumusan: "Jom Rumuskan!" */}
        <section aria-labelledby="rumusan-heading">
          <div className="bg-[#EAF9F1] rounded-2xl border-2 border-[#70D6A1] shadow-xs p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#1B6B46]">
              <MessageSquareQuote className="w-4 h-4" aria-hidden="true" />
              <span>Penutup Pengajaran</span>
            </div>

            <h2
              id="rumusan-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
            >
              Jom Rumuskan!
            </h2>

            <div className="rounded-xl bg-white border border-[#9BE4BE] p-5">
              <p className="text-xs font-bold text-[#1B6B46] mb-1.5">
                Aktiviti Lisan Penutup:
              </p>
              <p className="text-base font-semibold text-[#243B53] leading-relaxed">
                Guru memilih seorang murid secara rawak untuk menyebut satu ayat
                penyata yang mudah.
              </p>
            </div>

            <div className="rounded-xl bg-[#FFF8E9] border-2 border-[#FFD65A] p-5 flex items-start gap-3.5">
              <span className="w-10 h-10 rounded-xl bg-[#FFD65A] text-[#243B53] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#7A5900] mb-1">
                  Rumusan Pembelajaran Hari Ini
                </p>
                <p className="text-base sm:text-lg font-bold text-[#243B53] leading-relaxed">
                  Ayat penyata digunakan untuk menyatakan maklumat atau berita.
                  Ayat penyata lazimnya diakhiri dengan tanda noktah (.).
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-base px-6 py-3 rounded-xl border-2 border-[#EFC034] shadow-xs transition-all hover:-translate-y-0.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] whitespace-nowrap"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>Kembali ke Halaman Utama</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
