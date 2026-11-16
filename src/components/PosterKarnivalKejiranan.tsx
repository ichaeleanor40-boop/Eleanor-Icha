import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  RotateCcw,
  Upload,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import gotongRoyongImg from '../assets/images/contoh_gotong_royong_1794840939245.jpg';
import ziarahImg from '../assets/images/zon_ziarah_kebajikan_1794841615693.jpg';
import sukanekaImg from '../assets/images/zon_sukaneka_kejiranan_1794841615757.jpg';
import jamuanImg from '../assets/images/zon_jamuan_muafakat_1794841621018.jpg';
import { ResilientImage } from './ResilientImage';

const DEFAULT_POSTER_SRC =
  '/media/Poster%20Karnival%20Kejiranan%20Taman%20Harmoni%20%281%29.png';

interface PosterZone {
  id: string;
  zoneNumber: string;
  label: string;
  shortHint: string;
  imageSrc: string;
  imageAlt: string;
  firstChar: string;
  restOfSubject: string;
  subject: string;
  predicateBody: string;
  predicate: string;
  punctuation: string;
  fullSentence: string;
  explanation: string;
  accent: 'sky' | 'green' | 'yellow' | 'coral';
}

const POSTER_ZONES: PosterZone[] = [
  {
    id: 'zon-gotong-royong',
    zoneNumber: 'Zon 1',
    label: 'Gotong-royong',
    shortHint: 'Membersihkan kawasan taman bersama jiran',
    imageSrc: gotongRoyongImg,
    imageAlt:
      'Ilustrasi aktiviti gotong-royong penduduk pelbagai kaum menyapu daun dan membersihkan taman kejiranan.',
    firstChar: 'P',
    restOfSubject: 'enduduk Taman Harmoni',
    subject: 'Penduduk Taman Harmoni',
    predicateBody: 'bergotong-royong membersihkan kawasan taman',
    predicate: 'bergotong-royong membersihkan kawasan taman.',
    punctuation: '.',
    fullSentence:
      'Penduduk Taman Harmoni bergotong-royong membersihkan kawasan taman.',
    explanation:
      'Ayat ini menyatakan maklumat tentang penduduk Taman Harmoni (Subjek) yang sedang bergotong-royong membersihkan kawasan taman (Predikat). Ayat dimulakan dengan huruf besar P dan diakhiri dengan tanda noktah (.).',
    accent: 'sky',
  },
  {
    id: 'zon-ziarah',
    zoneNumber: 'Zon 2',
    label: 'Ziarah kebajikan',
    shortHint: 'Menziarahi dan membantu jiran yang memerlukan',
    imageSrc: ziarahImg,
    imageAlt:
      'Ilustrasi penduduk pelbagai kaum menziarahi jiran warga emas sambil membawa buah tangan.',
    firstChar: 'J',
    restOfSubject: 'iran tetangga',
    subject: 'Jiran tetangga',
    predicateBody: 'menziarahi warga emas sambil membawa buah tangan',
    predicate: 'menziarahi warga emas sambil membawa buah tangan.',
    punctuation: '.',
    fullSentence:
      'Jiran tetangga menziarahi warga emas sambil membawa buah tangan.',
    explanation:
      'Ayat ini menceritakan tentang jiran tetangga (Subjek) dan perbuatan baik mereka menziarahi warga emas (Predikat). Huruf J ditulis dengan huruf besar dan ayat tamat dengan tanda noktah (.).',
    accent: 'green',
  },
  {
    id: 'zon-sukaneka',
    zoneNumber: 'Zon 3',
    label: 'Sukaneka kejiranan',
    shortHint: 'Menyertai acara sukan rakyat bersama-sama',
    imageSrc: sukanekaImg,
    imageAlt:
      'Ilustrasi kanak-kanak dan penduduk menyertai acara sukaneka kejiranan seperti lari dalam guni.',
    firstChar: 'K',
    restOfSubject: 'anak-kanak',
    subject: 'Kanak-kanak',
    predicateBody: 'menyertai acara sukaneka kejiranan dengan gembira',
    predicate: 'menyertai acara sukaneka kejiranan dengan gembira.',
    punctuation: '.',
    fullSentence:
      'Kanak-kanak menyertai acara sukaneka kejiranan dengan gembira.',
    explanation:
      'Ayat ini menyatakan maklumat tentang kanak-kanak (Subjek) yang menyertai acara sukaneka kejiranan (Predikat). Ayat bermula dengan huruf besar K dan berakhir dengan tanda noktah (.).',
    accent: 'yellow',
  },
  {
    id: 'zon-jamuan',
    zoneNumber: 'Zon 4',
    label: 'Jamuan muafakat',
    shortHint: 'Menjamu selera dan mengeratkan silaturahim',
    imageSrc: jamuanImg,
    imageAlt:
      'Ilustrasi penduduk menikmati pelbagai hidangan bersama-sama semasa jamuan muafakat kejiranan.',
    firstChar: 'P',
    restOfSubject: 'ara penduduk',
    subject: 'Para penduduk',
    predicateBody: 'menikmati pelbagai hidangan di jamuan muafakat',
    predicate: 'menikmati pelbagai hidangan di jamuan muafakat.',
    punctuation: '.',
    fullSentence:
      'Para penduduk menikmati pelbagai hidangan di jamuan muafakat.',
    explanation:
      'Ayat ini memberitahu pembaca tentang para penduduk (Subjek) dan aktiviti mereka menikmati hidangan di jamuan muafakat (Predikat). Dimulakan dengan huruf besar P dan diakhiri dengan tanda noktah (.).',
    accent: 'coral',
  },
];

const ZONE_STYLE_MAP: Record<
  PosterZone['accent'],
  {
    tileIdle: string;
    tileActive: string;
    badge: string;
    kicker: string;
  }
> = {
  sky: {
    tileIdle: 'bg-[#EAF6FE] border-[#A6DCFA] hover:border-[#57B8F2]',
    tileActive: 'bg-[#DDF1FD] border-[#243B53] ring-2 ring-[#57B8F2]',
    badge: 'bg-[#57B8F2] text-[#243B53]',
    kicker: 'text-[#166088]',
  },
  green: {
    tileIdle: 'bg-[#EAF9F1] border-[#9BE4BE] hover:border-[#70D6A1]',
    tileActive: 'bg-[#D6F5E5] border-[#243B53] ring-2 ring-[#70D6A1]',
    badge: 'bg-[#70D6A1] text-[#243B53]',
    kicker: 'text-[#1B6B46]',
  },
  yellow: {
    tileIdle: 'bg-[#FFF8E1] border-[#FFE082] hover:border-[#FFD65A]',
    tileActive: 'bg-[#FFF3C4] border-[#243B53] ring-2 ring-[#FFD65A]',
    badge: 'bg-[#FFD65A] text-[#243B53]',
    kicker: 'text-[#7A5900]',
  },
  coral: {
    tileIdle: 'bg-[#FFF0EE] border-[#FFB8B3] hover:border-[#FF8D85]',
    tileActive: 'bg-[#FFE2DF] border-[#243B53] ring-2 ring-[#FF8D85]',
    badge: 'bg-[#FF8D85] text-[#243B53]',
    kicker: 'text-[#9E2F28]',
  },
};

export function PosterKarnivalKejiranan() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(POSTER_ZONES[0].id);
  const [isExplanationOpen, setIsExplanationOpen] = useState<boolean>(true);
  const [uploadedPosterUrl, setUploadedPosterUrl] = useState<string | null>(null);
  const [posterError, setPosterError] = useState<boolean>(false);
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeZone =
    POSTER_ZONES.find((zone) => zone.id === selectedZoneId) ?? POSTER_ZONES[0];

  const activePosterSrc = uploadedPosterUrl || DEFAULT_POSTER_SRC;

  useEffect(() => {
    return () => {
      if (uploadedPosterUrl) {
        URL.revokeObjectURL(uploadedPosterUrl);
      }
    };
  }, [uploadedPosterUrl]);

  function handlePosterUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (uploadedPosterUrl) {
      URL.revokeObjectURL(uploadedPosterUrl);
    }
    setPosterError(false);
    setZoomPercent(100);
    setUploadedPosterUrl(URL.createObjectURL(file));
  }

  function handleClearUploadedPoster() {
    if (uploadedPosterUrl) {
      URL.revokeObjectURL(uploadedPosterUrl);
    }
    setUploadedPosterUrl(null);
    setPosterError(false);
    setZoomPercent(100);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleZoomIn() {
    setZoomPercent((prev) => Math.min(200, prev + 25));
  }

  function handleZoomOut() {
    setZoomPercent((prev) => Math.max(100, prev - 25));
  }

  function handleResetZoom() {
    setZoomPercent(100);
  }

  return (
    <div className="space-y-8">
      {/* Bingkai Utama Poster Karnival Lengkap + 4 Zon Interaktif */}
      <div className="bg-white rounded-3xl border-2 border-[#57B8F2] shadow-sm overflow-hidden">
        {/* Kepala Poster Karnival */}
        <div className="bg-gradient-to-r from-[#DDF1FD] via-[#FFF8E9] to-[#EAF9F1] border-b-2 border-[#A6DCFA] px-6 py-6 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
                Poster Lengkap · 4 Zon Aktiviti
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]">
                Karnival Kejiranan Taman Harmoni
              </h2>
              <p className="mt-1.5 text-sm text-[#334E68]">
                Perhatikan poster lengkap di bawah dan tekan mana-mana zon
                aktiviti untuk meneroka contoh ayat penyata.
              </p>
            </div>

            {!posterError && (
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomPercent <= 100}
                  aria-label="Zum keluar poster"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <ZoomOut className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Zum Keluar</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  disabled={zoomPercent === 100}
                  aria-label="Kembali ke saiz asal poster"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] disabled:opacity-60 transition-colors min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] tabular-nums"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{zoomPercent}%</span>
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomPercent >= 200}
                  aria-label="Zum masuk poster"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] border-2 border-[#EFC034] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <ZoomIn className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Zum Masuk</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-5 sm:p-8 space-y-6">
          {/* Paparan Automatik Poster Asal (Satu Imej Lengkap) */}
          {!posterError ? (
            <div className="rounded-2xl border-2 border-[#BCE3FA] bg-[#FFF8E9] p-3 sm:p-4 overflow-auto max-h-[660px]">
              <div
                className="mx-auto transition-[width] duration-200"
                style={{ width: `${zoomPercent}%`, minWidth: '100%' }}
              >
                <img
                  src={activePosterSrc}
                  alt="Poster lengkap Karnival Kejiranan Taman Harmoni yang mengandungi empat zon aktiviti kejiranan."
                  onLoad={() => setPosterError(false)}
                  onError={() => setPosterError(true)}
                  className={`w-full object-contain mx-auto rounded-xl bg-white ${
                    zoomPercent === 100 ? 'max-h-[620px]' : ''
                  }`}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#FFF8E9] border-2 border-[#FFE082] p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFD65A] text-[#243B53] flex items-center justify-center mx-auto">
                <ImageIcon className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#243B53]">
                Poster asal tidak ditemui pada laluan pelayan semasa.
              </p>
              <p className="text-xs sm:text-sm text-[#486581] max-w-lg mx-auto">
                Pastikan fail disimpan di{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border border-[#F5E1B0] font-mono text-xs text-[#243B53]">
                  public/media/Poster Karnival Kejiranan Taman Harmoni (1).png
                </code>
                .
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <Upload className="w-4 h-4" aria-hidden="true" />
                  <span>Pilihan Alternatif: Muat Naik Poster Tempatan</span>
                </button>
              </div>
            </div>
          )}

          {/* Pilihan alternatif guru (disembunyikan daripada paparan biasa) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePosterUpload}
            className="sr-only"
            id="poster-upload-input"
          />
          <details className="text-xs text-[#486581]">
            <summary className="cursor-pointer font-semibold text-[#166088] hover:text-[#243B53] select-none w-fit">
              Pilihan alternatif guru (ganti imej poster tempatan)
            </summary>
            <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#A6DCFA] transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Pilih Fail Poster Tempatan</span>
              </button>

              {uploadedPosterUrl && (
                <button
                  type="button"
                  onClick={handleClearUploadedPoster}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FFF8E9] hover:bg-[#FFD65A] text-[#243B53] border border-[#EFC034] transition-colors min-h-[36px]"
                >
                  <span>Guna Poster Asal Semula</span>
                </button>
              )}
            </div>
          </details>

          {/* Grid 4 Zon Interaktif dalam Poster Digital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POSTER_ZONES.map((zone) => {
              const isSelected = zone.id === activeZone.id;
              const style = ZONE_STYLE_MAP[zone.accent];

              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZoneId(zone.id)}
                  aria-pressed={isSelected}
                  className={`group text-left rounded-2xl border-2 p-3.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 flex flex-col ${
                    isSelected ? `${style.tileActive} shadow-sm -translate-y-0.5` : style.tileIdle
                  }`}
                >
                  <div className="rounded-xl overflow-hidden border border-black/10 bg-white aspect-[4/3] w-full mb-3">
                    <ResilientImage
                      src={zone.imageSrc}
                      alt={zone.imageAlt}
                      fallbackTitle={zone.label}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs font-bold ${style.kicker}`}>
                      {zone.zoneNumber}
                    </span>
                    {isSelected && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${style.badge}`}
                      >
                        Dipilih
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-[#243B53]">
                    {zone.label}
                  </h3>
                  <p className="mt-1 text-xs text-[#334E68] leading-snug">
                    {zone.shortHint}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Paparan Penerangan Ayat Penyata Bagi Zon yang Dipilih */}
      <section
        aria-live="polite"
        aria-labelledby="zon-aktif-heading"
        className="bg-white rounded-2xl border-2 border-[#A6DCFA] shadow-xs p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          {/* Ilustrasi Aktiviti Dipilih */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-[#FFE082] bg-[#FFF8E9] aspect-[4/3]">
              <ResilientImage
                src={activeZone.imageSrc}
                alt={activeZone.imageAlt}
                fallbackTitle={activeZone.label}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Label Aktiviti, Ayat Penyata, Penyerlahan Subjek/Predikat & Penerangan Boleh Buka/Tutup */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
                {activeZone.zoneNumber} · Penerokaan Ayat Penyata
              </p>
              <h3
                id="zon-aktif-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                {activeZone.label}
              </h3>
            </div>

            {/* Ayat Penyata dengan Penyerlahan Lengkap */}
            <div className="rounded-2xl bg-[#FFF8E9] border-2 border-[#FFD65A] p-5">
              <p className="text-xs font-bold text-[#7A5900] mb-2">
                Ayat Penyata Berkaitan Zon:
              </p>
              <p className="font-display text-xl sm:text-2xl font-bold text-[#243B53] leading-relaxed">
                <span
                  title="Huruf besar pada awal ayat"
                  className="inline-block bg-[#FFD65A] text-[#243B53] px-1.5 rounded border border-[#EFC034] mr-0.5"
                >
                  {activeZone.firstChar}
                </span>
                <span className="bg-[#DDF1FD] text-[#243B53] px-1.5 py-0.5 rounded-r">
                  {activeZone.restOfSubject}
                </span>{' '}
                <span className="bg-[#D6F5E5] text-[#243B53] px-2 py-0.5 rounded">
                  {activeZone.predicateBody}
                </span>
                <span
                  title="Tanda noktah pada akhir ayat"
                  className="inline-block bg-[#FF8D85] text-[#243B53] px-2 rounded border border-[#F47269] ml-0.5"
                >
                  {activeZone.punctuation}
                </span>
              </p>

              {/* Petunjuk Penandaan Berlabel */}
              <div className="mt-4 pt-3 border-t border-[#F5E1B0] flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#243B53]">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="w-3.5 h-3.5 rounded bg-[#FFD65A] border border-[#EFC034]"
                  />
                  <span>Huruf Besar ({activeZone.firstChar})</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="w-3.5 h-3.5 rounded bg-[#DDF1FD] border border-[#57B8F2]"
                  />
                  <span>Subjek</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="w-3.5 h-3.5 rounded bg-[#D6F5E5] border border-[#70D6A1]"
                  />
                  <span>Predikat</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden="true"
                    className="w-3.5 h-3.5 rounded bg-[#FF8D85] border border-[#F47269]"
                  />
                  <span>Tanda Noktah ({activeZone.punctuation})</span>
                </span>
              </div>
            </div>

            {/* Pecahan Subjek & Predikat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#EAF6FE] border-2 border-[#A6DCFA] p-4">
                <p className="text-xs font-bold text-[#166088] mb-1">
                  Subjek (Perkara yang Diperkatakan)
                </p>
                <p className="text-base font-bold text-[#243B53]">
                  {activeZone.subject}
                </p>
              </div>
              <div className="rounded-xl bg-[#EAF9F1] border-2 border-[#9BE4BE] p-4">
                <p className="text-xs font-bold text-[#1B6B46] mb-1">
                  Predikat (Penerangan tentang Subjek)
                </p>
                <p className="text-base font-bold text-[#243B53]">
                  {activeZone.predicate}
                </p>
              </div>
            </div>

            {/* Penerangan Ringkas Boleh Buka atau Tutup */}
            <div className="rounded-xl border-2 border-[#CFC0FA] bg-[#F3EEFE] overflow-hidden">
              <button
                type="button"
                onClick={() => setIsExplanationOpen((prev) => !prev)}
                aria-expanded={isExplanationOpen}
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left text-sm font-bold text-[#243B53] hover:bg-[#EAE1FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] min-h-[44px]"
              >
                <span>Penerangan Ringkas Ayat Zon Ini</span>
                {isExplanationOpen ? (
                  <ChevronUp className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
              </button>

              {isExplanationOpen && (
                <div className="px-4 pb-4 pt-1 text-sm text-[#243B53] leading-relaxed">
                  {activeZone.explanation}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
