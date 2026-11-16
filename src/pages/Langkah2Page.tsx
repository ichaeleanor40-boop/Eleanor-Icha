import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ClipboardCheck,
  ExternalLink,
  Eye,
  Gamepad2,
  HandHeart,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  X,
} from 'lucide-react';

const EXTERNAL_GAME_URL =
  'https://karnival-ayat-penyata-bahasa-melayu-tahun-4.ai.studio';
const ORIGINAL_POSTER_PATH = '/images/poster-karnival-taman-harmoni.png';

const INSTRUCTIONS = [
  'Bentuk empat kumpulan.',
  'Perhatikan semula poster Karnival Kejiranan Taman Harmoni.',
  'Susun kad perkataan menjadi ayat penyata.',
  'Semak jawapan dan baiki susunan jika perlu.',
];

const GROUP_GUIDES = [
  {
    id: 'kumpulan-1',
    groupName: 'Kumpulan 1',
    activity: 'Gotong-royong',
    description: 'Fokus membina ayat penyata tentang aktiviti membersihkan taman bersama jiran.',
    icon: Sparkles,
    cardStyle: 'bg-[#EAF6FE] border-[#A6DCFA]',
    iconBoxStyle: 'bg-[#57B8F2] text-[#243B53]',
    kickerStyle: 'text-[#166088]',
  },
  {
    id: 'kumpulan-2',
    groupName: 'Kumpulan 2',
    activity: 'Ziarah Kebajikan',
    description: 'Fokus membina ayat penyata tentang amalan menziarahi dan membantu jiran.',
    icon: HandHeart,
    cardStyle: 'bg-[#EAF9F1] border-[#9BE4BE]',
    iconBoxStyle: 'bg-[#70D6A1] text-[#243B53]',
    kickerStyle: 'text-[#1B6B46]',
  },
  {
    id: 'kumpulan-3',
    groupName: 'Kumpulan 3',
    activity: 'Sukaneka Kejiranan',
    description: 'Fokus membina ayat penyata tentang kemeriahan acara sukaneka penduduk.',
    icon: Trophy,
    cardStyle: 'bg-[#FFF8E1] border-[#FFE082]',
    iconBoxStyle: 'bg-[#FFD65A] text-[#243B53]',
    kickerStyle: 'text-[#7A5900]',
  },
  {
    id: 'kumpulan-4',
    groupName: 'Kumpulan 4',
    activity: 'Jamuan Muafakat',
    description: 'Fokus membina ayat penyata tentang jamuan dan perpaduan masyarakat taman.',
    icon: Utensils,
    cardStyle: 'bg-[#FFF0EE] border-[#FFB8B3]',
    iconBoxStyle: 'bg-[#FF8D85] text-[#243B53]',
    kickerStyle: 'text-[#9E2F28]',
  },
];

export function Langkah2Page() {
  const [hasOriginalPoster, setHasOriginalPoster] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  return (
    <div>
      {/* Pengesan automatik kewujudan fail poster asal */}
      <img
        src={ORIGINAL_POSTER_PATH}
        alt=""
        aria-hidden="true"
        onLoad={() => setHasOriginalPoster(true)}
        onError={() => setHasOriginalPoster(false)}
        className="hidden"
      />

      {/* 1. Banner & Maklumat Pembelajaran Langkah 2 */}
      <section
        aria-labelledby="langkah2-heading"
        className="bg-gradient-to-br from-[#FFF8E1] via-[#FFF8E9] to-[#EAF6FE] border-b-2 border-[#FFE082]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-[#7A5900] mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4" aria-hidden="true" />
                  <span>Langkah 2</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Tempoh: 10 minit</span>
                </span>
              </div>

              <h1
                id="langkah2-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#243B53] leading-tight"
              >
                Misi Susun Ayat Kejiranan
              </h1>

              <p className="mt-2.5 text-base sm:text-lg text-[#334E68] max-w-2xl leading-relaxed">
                Jom bekerjasama menyusun perkataan menjadi ayat penyata yang betul!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/langkah-1"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Kembali ke Langkah 1</span>
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
              >
                <span>Halaman Utama</span>
              </Link>
            </div>
          </div>

          {/* Ringkasan Maklumat Pembelajaran */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
            <div className="bg-white rounded-xl border border-[#FFE082] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Kaedah</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Pembelajaran Berasaskan Permainan (Game-Based Learning)
              </dd>
            </div>
            <div className="bg-white rounded-xl border border-[#FFE082] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Kemahiran</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Membina ayat penyata yang gramatis.
              </dd>
            </div>
            <div className="bg-white rounded-xl border border-[#FFE082] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Tempoh</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">10 minit</dd>
            </div>
            <div className="bg-white rounded-xl border border-[#FFE082] p-4">
              <dt className="text-xs font-semibold text-[#486581]">Pelaksanaan</dt>
              <dd className="mt-1 text-sm font-bold text-[#243B53]">
                Secara berkumpulan menggunakan tablet atau komputer.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* 2. Arahan Aktiviti & 3. Sepadukan Permainan Sedia Ada */}
        <section
          aria-labelledby="arahan-misi-heading"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Arahan 4 Langkah */}
          <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
                Panduan Murid
              </p>
              <h2
                id="arahan-misi-heading"
                className="font-display text-2xl font-bold text-[#243B53]"
              >
                Arahan Aktiviti Kumpulan
              </h2>

              <ol className="mt-5 space-y-3">
                {INSTRUCTIONS.map((step, index) => (
                  <li
                    key={step}
                    className="rounded-xl bg-[#EAF6FE] border border-[#A6DCFA] p-4 flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#57B8F2] text-[#243B53] font-bold text-sm flex items-center justify-center shrink-0 tabular-nums">
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-[#243B53] leading-snug">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Kad Permainan Sedia Ada: Karnival Ayat Penyata! */}
          <div className="lg:col-span-6 bg-[#EAF9F1] rounded-2xl border-2 border-[#70D6A1] shadow-xs p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-[#70D6A1] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
                  <Gamepad2 className="w-6 h-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-bold text-[#1B6B46]">
                    Permainan Interaktif Utama
                  </p>
                  <h2 className="font-display text-2xl font-bold text-[#243B53]">
                    Karnival Ayat Penyata!
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#243B53] leading-relaxed">
                Klik butang di bawah untuk membuka permainan{' '}
                <strong className="font-bold">Karnival Ayat Penyata!</strong>{' '}
                pada tab pelayar baharu. Laman permainan dibuka terus melalui
                pautan rasmi supaya paparan berfungsi lancar pada komputer dan
                tablet tanpa sekatan bingkai terbenam.
              </p>

              <div className="mt-5 rounded-xl bg-white border border-[#9BE4BE] p-4 text-xs sm:text-sm text-[#334E68] break-all">
                <span className="font-semibold text-[#1B6B46] block mb-1">
                  Pautan Permainan:
                </span>
                <span>{EXTERNAL_GAME_URL}</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#9BE4BE] flex flex-wrap items-center gap-3">
              <a
                href={EXTERNAL_GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-base px-6 py-3.5 rounded-xl border-2 border-[#EFC034] shadow-xs transition-all hover:-translate-y-0.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 whitespace-nowrap"
              >
                <span>Mulakan Misi Susun Ayat</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <span className="text-xs font-medium text-[#1B6B46]">
                Dibuka pada tab baharu
              </span>
            </div>
          </div>
        </section>

        {/* 4. Penyusunan Empat Kumpulan */}
        <section aria-labelledby="kumpulan-heading">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#166088] tracking-wide mb-1">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span>Panduan Pembahagian Kumpulan</span>
            </div>
            <h2
              id="kumpulan-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
            >
              Penyusunan Empat Kumpulan
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#334E68]">
              Panduan visual untuk guru dan murid berdasarkan empat aktiviti dalam
              poster Karnival Kejiranan Taman Harmoni.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {GROUP_GUIDES.map((group) => {
              const IconComponent = group.icon;
              return (
                <article
                  key={group.id}
                  className={`rounded-2xl border-2 shadow-xs p-5 flex flex-col gap-3 ${group.cardStyle}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${group.iconBoxStyle}`}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className={`text-xs font-bold ${group.kickerStyle}`}>
                      {group.groupName}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#243B53]">
                    {group.activity}
                  </h3>
                  <p className="text-sm text-[#334E68] leading-relaxed">
                    {group.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* 5. Hubungan Dengan Poster & 6. Peranan Guru */}
        <section
          aria-label="Rujukan Poster dan Peranan Guru"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Peringatan Hubungan Dengan Poster */}
          <div className="bg-[#FFF8E1] rounded-2xl border-2 border-[#FFE082] shadow-xs p-6 flex flex-col justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-[#FFD65A] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
                <Layers className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#7A5900] mb-1">
                  Peringatan Rujukan Poster
                </p>
                <p className="text-base font-bold text-[#243B53] leading-relaxed">
                  Rujuk semula poster Karnival Kejiranan Taman Harmoni untuk
                  mendapatkan idea.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {hasOriginalPoster && (
                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#57B8F2] hover:bg-[#3FA7E8] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>Lihat Poster</span>
                </button>
              )}

              <Link
                to="/langkah-1"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#FFE082] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <ImageIcon className="w-4 h-4" aria-hidden="true" />
                <span>Buka Poster di Langkah 1</span>
              </Link>
            </div>
          </div>

          {/* Peranan Guru */}
          <div className="bg-[#F3EEFE] rounded-2xl border-2 border-[#CFC0FA] shadow-xs p-6 flex items-start gap-4">
            <span className="w-11 h-11 rounded-xl bg-[#B8A0F5] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
              <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold text-[#4D348C] mb-1">
                Peranan Guru
              </p>
              <p className="text-base font-medium text-[#243B53] leading-relaxed">
                Guru membimbing perbincangan kumpulan dan memerhatikan kerjasama
                murid semasa menyusun ayat.
              </p>
            </div>
          </div>
        </section>

        {/* Navigasi Bawah */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <Link
            to="/langkah-1"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Langkah 1</span>
          </Link>

          <Link
            to="/langkah-3"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
          >
            <span>Teruskan ke Langkah 3</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Modal Paparan Poster Lengkap (Apabila Fail Poster Asal Tersedia) */}
      {isPosterModalOpen && hasOriginalPoster && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-poster-title"
          className="fixed inset-0 z-50 bg-[#102A43]/70 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border-2 border-[#57B8F2] shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#BCE3FA] bg-[#EAF6FE]">
              <h2
                id="modal-poster-title"
                className="font-display text-lg font-bold text-[#243B53]"
              >
                Poster Karnival Kejiranan Taman Harmoni
              </h2>
              <button
                type="button"
                onClick={() => setIsPosterModalOpen(false)}
                aria-label="Tutup paparan poster"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-[#FFF0EE] text-[#243B53] border border-[#A6DCFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-auto bg-[#FFF8E9] flex items-center justify-center">
              <img
                src={ORIGINAL_POSTER_PATH}
                alt="Poster lengkap Karnival Kejiranan Taman Harmoni"
                className="max-w-full max-h-[72vh] object-contain rounded-xl bg-white border border-[#F5E1B0]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
