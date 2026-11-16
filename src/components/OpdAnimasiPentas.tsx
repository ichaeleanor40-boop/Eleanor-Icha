import type { RefObject } from 'react';
import { Check, X } from 'lucide-react';
import mascotHarmoniImg from '../assets/images/mascot_harmoni_1794839891901.jpg';
import posterKarnivalImg from '../assets/images/poster_karnival_4_zon_1794842777615.jpg';
import type { OpdScene } from '../data/opdHarmoniData';
import { ResilientImage } from './ResilientImage';

interface OpdAnimasiPentasProps {
  scene: OpdScene;
  isPlaying: boolean;
  isTalking: boolean;
  hasStarted: boolean;
  showSubtitles: boolean;
  isQuestionActive: boolean;
  mp4Src: string | null;
  videoRef: RefObject<HTMLVideoElement | null>;
  onMp4LoadedMetadata: (duration: number) => void;
  onMp4TimeUpdate: (currentTime: number) => void;
  onMp4PlayChange: (playing: boolean) => void;
  onMp4Ended: () => void;
  onMp4Error: () => void;
}

export function OpdAnimasiPentas({
  scene,
  isPlaying,
  isTalking,
  hasStarted,
  showSubtitles,
  isQuestionActive,
  mp4Src,
  videoRef,
  onMp4LoadedMetadata,
  onMp4TimeUpdate,
  onMp4PlayChange,
  onMp4Ended,
  onMp4Error,
}: OpdAnimasiPentasProps) {
  if (mp4Src) {
    return (
      <div className="relative w-full h-full bg-[#102A43] flex items-center justify-center">
        <video
          ref={videoRef}
          src={mp4Src}
          playsInline
          preload="metadata"
          aria-label="Video Kenali Ayat Penyata Bersama Harmoni"
          onLoadedMetadata={(e) =>
            onMp4LoadedMetadata(e.currentTarget.duration || 0)
          }
          onTimeUpdate={(e) => onMp4TimeUpdate(e.currentTarget.currentTime)}
          onPlay={() => onMp4PlayChange(true)}
          onPause={() => onMp4PlayChange(false)}
          onEnded={onMp4Ended}
          onError={onMp4Error}
          className="w-full h-full object-contain"
        />

        {showSubtitles && !isQuestionActive && (
          <div className="pointer-events-none absolute inset-x-3 sm:inset-x-8 bottom-3 sm:bottom-4 flex justify-center">
            <p className="bg-[#102A43]/90 text-white text-xs sm:text-base font-semibold px-4 py-2 rounded-xl border border-white/20 text-center max-w-3xl leading-snug shadow-sm">
              {scene.subtitleText}
            </p>
          </div>
        )}
      </div>
    );
  }

  const stagePausedClass = isPlaying ? '' : 'opd-stage-paused';

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-b from-[#BCE3FA] via-[#EAF6FE] to-[#EAF9F1] ${stagePausedClass}`}
    >
      {/* Latar Belakang Awan & Matahari Bergaya 2D */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 450"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Matahari lembut */}
        <circle cx="710" cy="70" r="38" fill="#FFD65A" opacity="0.9" />
        <circle cx="710" cy="70" r="52" fill="#FFD65A" opacity="0.25" />

        {/* Awan bergerak */}
        <g className="opd-animate-cloud">
          <g fill="#FFFFFF" opacity="0.9">
            <circle cx="130" cy="74" r="24" />
            <circle cx="158" cy="64" r="30" />
            <circle cx="188" cy="76" r="22" />
            <rect x="125" y="72" width="68" height="24" rx="12" />
          </g>
          <g fill="#FFFFFF" opacity="0.82">
            <circle cx="470" cy="90" r="20" />
            <circle cx="495" cy="80" r="26" />
            <circle cx="520" cy="92" r="18" />
            <rect x="466" y="88" width="58" height="20" rx="10" />
          </g>
        </g>

        {/* Rumput / Padang Taman Harmoni */}
        <path
          d="M0 365 Q200 340 420 362 T800 355 L800 450 L0 450 Z"
          fill="#A9ECC9"
        />
        <path
          d="M0 390 Q240 375 520 392 T800 382 L800 450 L0 450 Z"
          fill="#70D6A1"
        />
      </svg>

      {/* Penunjuk Babak di Penjuru Atas */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4">
        <div className="inline-flex items-center gap-2 bg-white/95 border border-[#A6DCFA] rounded-xl px-3 py-1.5 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#57B8F2]" />
          <span className="text-xs sm:text-sm font-bold text-[#243B53]">
            {scene.label}: {scene.title}
          </span>
        </div>

        <span className="hidden sm:inline-flex items-center bg-[#FFF8E9]/95 border border-[#FFD65A] rounded-xl px-3 py-1 text-xs font-bold text-[#243B53]">
          Prototaip Animasi 2D
        </span>
      </div>

      {/* Pentas Mengikut Babak */}
      <div className="relative z-10 h-[calc(100%-56px)] px-4 sm:px-8 pb-14 sm:pb-16 flex items-center justify-center">
        {/* BABAK 1 — PENGENALAN */}
        {scene.sceneNumber === 1 && (
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="relative opd-animate-float">
                <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-[#FFD65A] bg-white shadow-md">
                  <ResilientImage
                    src={mascotHarmoniImg}
                    alt="Maskot Harmoni melambai mesra"
                    fallbackTitle="Harmoni"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="opd-animate-wave absolute -right-3 -top-2 w-10 h-10 rounded-full bg-[#FFD65A] border-2 border-white flex items-center justify-center text-lg shadow-xs"
                >
                  👋
                </div>
              </div>
              {isTalking && (
                <div
                  aria-hidden="true"
                  className="mt-2 flex items-end gap-1 h-4 bg-white/85 px-3 py-1 rounded-lg border border-[#A6DCFA]"
                >
                  <span className="w-1.5 h-3 rounded-full bg-[#57B8F2] animate-harmoni-wave" />
                  <span
                    className="w-1.5 h-4 rounded-full bg-[#FF8D85] animate-harmoni-wave"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-1.5 h-2.5 rounded-full bg-[#70D6A1] animate-harmoni-wave"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              )}
            </div>

            <div className="sm:col-span-7 bg-white/95 rounded-2xl border-2 border-[#57B8F2] p-4 sm:p-6 shadow-md text-center sm:text-left">
              <p className="text-xs font-bold text-[#166088] uppercase tracking-wide">
                Topik Pembelajaran
              </p>
              <h3 className="mt-1 font-display text-2xl sm:text-4xl font-bold text-[#243B53]">
                Ayat Penyata
              </h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-[#334E68] font-medium leading-relaxed">
                Ayat yang digunakan untuk{' '}
                <strong className="text-[#243B53] bg-[#FFF8E9] px-1.5 py-0.5 rounded border border-[#FFD65A]">
                  menyatakan sesuatu maklumat atau berita
                </strong>
                .
              </p>
            </div>
          </div>
        )}

        {/* BABAK 2 — CONTOH (IBU MEMASAK DI DAPUR) */}
        {scene.sceneNumber === 2 && (
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="sm:col-span-6 bg-[#FFF8E9] rounded-2xl border-2 border-[#FFD65A] p-3 sm:p-4 shadow-md">
              <svg
                viewBox="0 0 320 200"
                className="w-full h-36 sm:h-48"
                role="img"
                aria-label="Ilustrasi 2D ibu memasak di dapur dengan wap periuk yang naik"
              >
                {/* Tingkap dapur */}
                <rect
                  x="210"
                  y="20"
                  width="82"
                  height="64"
                  rx="8"
                  fill="#BCE3FA"
                  stroke="#57B8F2"
                  strokeWidth="4"
                />
                <line
                  x1="251"
                  y1="20"
                  x2="251"
                  y2="84"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
                <line
                  x1="210"
                  y1="52"
                  x2="292"
                  y2="52"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />

                {/* Kabinet & Dapur */}
                <rect x="20" y="128" width="280" height="58" rx="8" fill="#F6D58E" />
                <rect x="185" y="122" width="90" height="10" rx="4" fill="#334E68" />

                {/* Wap periuk bergerak */}
                <g className="opd-animate-steam" stroke="#57B8F2" strokeWidth="3" fill="none" strokeLinecap="round">
                  <path d="M214 88 Q208 76 216 64" />
                  <path d="M230 85 Q224 72 232 60" />
                  <path d="M246 88 Q240 76 248 64" />
                </g>

                {/* Periuk */}
                <rect x="202" y="92" width="56" height="30" rx="6" fill="#FF8D85" />
                <rect x="194" y="96" width="10" height="6" rx="3" fill="#243B53" />
                <rect x="256" y="96" width="10" height="6" rx="3" fill="#243B53" />

                {/* Ibu (animasi ringan) */}
                <g className="opd-animate-float">
                  {/* Tudung / Kepala */}
                  <circle cx="115" cy="64" r="24" fill="#B8A0F5" />
                  <circle cx="118" cy="67" r="16" fill="#FAD4B8" />
                  <circle cx="122" cy="65" r="2.2" fill="#243B53" />
                  <path
                    d="M115 73 Q120 77 125 73"
                    stroke="#243B53"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Badan & Apron */}
                  <path d="M92 92 Q115 84 138 92 L144 132 L86 132 Z" fill="#57B8F2" />
                  <rect x="102" y="98" width="28" height="32" rx="6" fill="#FFFFFF" />
                  {/* Lengan memegang senduk */}
                  <g className="opd-animate-wave">
                    <path
                      d="M134 102 L195 96"
                      stroke="#FAD4B8"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <line
                      x1="190"
                      y1="96"
                      x2="224"
                      y2="104"
                      stroke="#8D5B4C"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="sm:col-span-6 bg-white/95 rounded-2xl border-2 border-[#70D6A1] p-4 sm:p-6 shadow-md">
              <p className="text-xs font-bold text-[#1B6B46] uppercase tracking-wide">
                Contoh Ayat Penyata
              </p>
              <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#243B53] bg-[#EAF9F1] border border-[#70D6A1] rounded-xl px-4 py-3">
                Ibu memasak di dapur.
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#334E68] leading-relaxed">
                Memberitahu kita maklumat tentang perkara yang sedang dilakukan
                oleh ibu.
              </p>
            </div>
          </div>
        )}

        {/* BABAK 3 — CIRI AYAT PENYATA */}
        {scene.sceneNumber === 3 && (
          <div className="w-full max-w-3xl bg-white/95 rounded-2xl border-2 border-[#B8A0F5] p-5 sm:p-7 shadow-md">
            <p className="text-xs font-bold text-[#4D348C] uppercase tracking-wide text-center">
              Dua Ciri Utama Ayat Penyata
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-1 sm:gap-2 font-display text-2xl sm:text-4xl font-bold text-[#243B53] bg-[#FFF8E9] border-2 border-[#FFD65A] rounded-2xl py-4 px-4">
              <span className="opd-animate-pop inline-flex items-center justify-center px-2.5 py-1 rounded-xl bg-[#FFD65A] border-2 border-[#E5B832] text-[#243B53]">
                I
              </span>
              <span>bu memasak di dapur</span>
              <span className="opd-animate-pop inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#FF8D85] border-2 border-[#E05348] text-[#243B53]">
                .
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#EAF6FE] border-2 border-[#57B8F2] p-3.5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#FFD65A] text-[#243B53] font-bold flex items-center justify-center shrink-0">
                  A
                </span>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#243B53]">
                    Huruf Besar di Awal
                  </p>
                  <p className="text-xs sm:text-sm text-[#334E68]">
                    Kata pertama bermula dengan huruf besar.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#EAF9F1] border-2 border-[#70D6A1] p-3.5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#FF8D85] text-[#243B53] font-bold text-xl flex items-center justify-center shrink-0">
                  .
                </span>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#243B53]">
                    Tanda Noktah (.) di Akhir
                  </p>
                  <p className="text-xs sm:text-sm text-[#334E68]">
                    Menyampaikan maklumat, bukan bertanya.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-bold">
              <span className="inline-flex items-center gap-1.5 text-[#1B6B46] bg-[#EAF9F1] px-3 py-1 rounded-lg border border-[#70D6A1]">
                <Check className="w-4 h-4" aria-hidden="true" />
                <span>Menyampaikan maklumat (.)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#9E2F28] bg-[#FFF0EE] px-3 py-1 rounded-lg border border-[#FF8D85]">
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Bukan ayat tanya (?)</span>
              </span>
            </div>
          </div>
        )}

        {/* BABAK 4 — SITUASI KEJIRANAN */}
        {scene.sceneNumber === 4 && (
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="sm:col-span-6 bg-[#EAF9F1] rounded-2xl border-2 border-[#70D6A1] p-3 sm:p-4 shadow-md">
              <svg
                viewBox="0 0 320 200"
                className="w-full h-36 sm:h-48"
                role="img"
                aria-label="Ilustrasi 2D jiran-jiran bekerjasama membersihkan taman kejiranan"
              >
                {/* Pokok taman */}
                <rect x="262" y="96" width="16" height="58" rx="4" fill="#8D5B4C" />
                <circle cx="270" cy="74" r="34" fill="#4DB884" />
                <circle cx="248" cy="86" r="22" fill="#70D6A1" />

                {/* Tong sampah kitar semula */}
                <rect x="22" y="114" width="38" height="44" rx="6" fill="#57B8F2" />
                <rect x="18" y="108" width="46" height="9" rx="4" fill="#243B53" />

                {/* Jiran 1 menyapu */}
                <g className="opd-animate-float">
                  <circle cx="110" cy="70" r="18" fill="#FAD4B8" />
                  <path d="M92 64 Q110 44 128 64 Z" fill="#243B53" />
                  <rect x="94" y="90" width="32" height="42" rx="10" fill="#FFD65A" />
                  <rect x="97" y="132" width="10" height="28" rx="4" fill="#334E68" />
                  <rect x="113" y="132" width="10" height="28" rx="4" fill="#334E68" />
                  {/* Penyapu bergerak */}
                  <g className="opd-animate-sweep">
                    <line
                      x1="128"
                      y1="102"
                      x2="152"
                      y2="156"
                      stroke="#8D5B4C"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                    />
                    <path d="M142 154 L164 150 L166 164 L144 166 Z" fill="#FF8D85" />
                  </g>
                </g>

                {/* Jiran 2 memegang beg sampah */}
                <g className="opd-animate-float" style={{ animationDelay: '0.4s' }}>
                  <circle cx="204" cy="74" r="18" fill="#B8A0F5" />
                  <circle cx="202" cy="76" r="13" fill="#FAD4B8" />
                  <rect x="188" y="94" width="32" height="40" rx="10" fill="#FF8D85" />
                  <rect x="191" y="134" width="10" height="26" rx="4" fill="#334E68" />
                  <rect x="207" y="134" width="10" height="26" rx="4" fill="#334E68" />
                  <circle cx="176" cy="142" r="14" fill="#334E68" />
                </g>
              </svg>
            </div>

            <div className="sm:col-span-6 bg-white/95 rounded-2xl border-2 border-[#57B8F2] p-4 sm:p-6 shadow-md">
              <p className="text-xs font-bold text-[#166088] uppercase tracking-wide">
                Situasi Kejiranan Harmoni
              </p>
              <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-[#243B53] bg-[#EAF6FE] border border-[#A6DCFA] rounded-xl px-4 py-3 leading-snug">
                Jiran-jiran bekerjasama membersihkan taman.
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#334E68] leading-relaxed">
                Menyampaikan maklumat tentang aktiviti gotong-royong yang
                dilakukan oleh jiran-jiran.
              </p>
            </div>
          </div>
        )}

        {/* BABAK 5 — RUMUSAN */}
        {scene.sceneNumber === 5 && (
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-center">
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="relative opd-animate-float">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-[#70D6A1] bg-white shadow-md">
                  <ResilientImage
                    src={mascotHarmoniImg}
                    alt="Harmoni mengajak murid meneroka poster karnival"
                    fallbackTitle="Harmoni"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="opd-animate-wave absolute -right-3 -top-2 w-10 h-10 rounded-full bg-[#FFD65A] border-2 border-white flex items-center justify-center text-lg shadow-xs"
                >
                  🌟
                </div>
              </div>
            </div>

            <div className="sm:col-span-7 bg-white/95 rounded-2xl border-2 border-[#FFD65A] p-4 sm:p-5 shadow-md flex items-center gap-4">
              <div className="w-24 sm:w-28 aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#A6DCFA] shrink-0 bg-[#FFF8E9]">
                <ResilientImage
                  src={posterKarnivalImg}
                  alt="Pratonton Poster Karnival Kejiranan Taman Harmoni"
                  fallbackTitle="Poster Karnival"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1B6B46] uppercase tracking-wide">
                  Misi Seterusnya
                </p>
                <h3 className="mt-1 font-display text-lg sm:text-2xl font-bold text-[#243B53] leading-snug">
                  Mari cari ayat penyata dalam poster Karnival Kejiranan Taman
                  Harmoni!
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sarikata Segerak di Bahagian Bawah Pentas */}
      {showSubtitles && !isQuestionActive && (
        <div className="pointer-events-none absolute inset-x-3 sm:inset-x-8 bottom-3 sm:bottom-4 z-10 flex justify-center">
          <p className="bg-[#102A43]/90 text-white text-xs sm:text-base font-semibold px-4 py-2 rounded-xl border border-white/20 text-center max-w-3xl leading-snug shadow-sm">
            {hasStarted
              ? scene.subtitleText
              : 'Tekan butang "Main" untuk memulakan animasi interaktif bersama suara AI Harmoni.'}
          </p>
        </div>
      )}
    </div>
  );
}
