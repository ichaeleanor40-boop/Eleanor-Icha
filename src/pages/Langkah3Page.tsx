import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  ClipboardCheck,
  Eye,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Mic,
  Newspaper,
  Printer,
  Upload,
  X,
} from 'lucide-react';
import wartawanCilikImg from '../assets/images/ilustrasi_wartawan_cilik_1794842776983.jpg';
import unifiedPosterImg from '../assets/images/poster_karnival_4_zon_1794842777615.jpg';
import { ResilientImage } from '../components/ResilientImage';
import {
  LembaranKerjaA4,
  WORKSHEET_TIERS,
  type WorksheetTierConfig,
  type WorksheetTierId,
} from '../components/LembaranKerjaWartawan';
import { RodaWartawanBertuah } from '../components/RodaWartawanBertuah';

const ORIGINAL_POSTER_PATH = '/images/poster-karnival-taman-harmoni.png';

const PRESENTATION_STEPS = [
  'Siapkan skrip berita pada lembaran kerja.',
  'Tunggu pemilihan nama secara rawak.',
  'Murid terpilih tampil ke hadapan.',
  'Pegang mikrofon mainan.',
  'Bacakan skrip dengan sebutan dan intonasi yang jelas.',
];

const TIER_CARD_STYLES: Record<
  WorksheetTierConfig['accent'],
  {
    card: string;
    badge: string;
    kicker: string;
    primaryBtn: string;
  }
> = {
  sky: {
    card: 'bg-[#EAF6FE] border-[#A6DCFA]',
    badge: 'bg-[#57B8F2] text-[#243B53]',
    kicker: 'text-[#166088]',
    primaryBtn: 'bg-[#57B8F2] hover:bg-[#3FA7E8] text-[#243B53]',
  },
  green: {
    card: 'bg-[#EAF9F1] border-[#9BE4BE]',
    badge: 'bg-[#70D6A1] text-[#243B53]',
    kicker: 'text-[#1B6B46]',
    primaryBtn: 'bg-[#70D6A1] hover:bg-[#57C78D] text-[#243B53]',
  },
  yellow: {
    card: 'bg-[#FFF8E1] border-[#FFE082]',
    badge: 'bg-[#FFD65A] text-[#243B53]',
    kicker: 'text-[#7A5900]',
    primaryBtn: 'bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53]',
  },
};

export function Langkah3Page() {
  const [hasStaticPoster, setHasStaticPoster] = useState(false);
  const [uploadedPosterUrl, setUploadedPosterUrl] = useState<string | null>(null);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const [printTierId, setPrintTierId] = useState<WorksheetTierId>('mb');
  const [previewTierId, setPreviewTierId] = useState<WorksheetTierId | null>(null);

  const posterInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedPosterUrl) {
        URL.revokeObjectURL(uploadedPosterUrl);
      }
    };
  }, [uploadedPosterUrl]);

  const activePosterSrc =
    uploadedPosterUrl ||
    (hasStaticPoster ? ORIGINAL_POSTER_PATH : unifiedPosterImg);

  const isCustomOriginalPoster = Boolean(uploadedPosterUrl || hasStaticPoster);

  const activePrintTier =
    WORKSHEET_TIERS.find((t) => t.id === printTierId) ?? WORKSHEET_TIERS[0];

  const activePreviewTier = previewTierId
    ? WORKSHEET_TIERS.find((t) => t.id === previewTierId) ?? null
    : null;

  function handlePosterUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (uploadedPosterUrl) {
      URL.revokeObjectURL(uploadedPosterUrl);
    }
    setUploadedPosterUrl(URL.createObjectURL(file));
  }

  function handlePrintTier(tierId: WorksheetTierId) {
    setPrintTierId(tierId);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.print();
      });
    });
  }

  return (
    <div>
      {/* Pengesan automatik kewujudan fail poster asal */}
      <img
        src={ORIGINAL_POSTER_PATH}
        alt=""
        aria-hidden="true"
        onLoad={() => setHasStaticPoster(true)}
        onError={() => setHasStaticPoster(false)}
        className="hidden"
      />

      {/* Kawasan Cetakan A4 Sahaja (Tersembunyi di skrin, dipaparkan semasa cetak) */}
      <div id="printable-worksheet-area" className="hidden print:block">
        <LembaranKerjaA4 tier={activePrintTier} />
      </div>

      {/* Kandungan Laman Web (Disembunyikan semasa mencetak lembaran kerja) */}
      <div className="print:hidden">
        {/* 1. Banner "Misi Wartawan Cilik" */}
        <section
          aria-labelledby="langkah3-heading"
          className="bg-gradient-to-br from-[#FFF0EE] via-[#FFF8E9] to-[#EAF6FE] border-b-2 border-[#FFB8B3]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-bold text-[#9E2F28] mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Newspaper className="w-4 h-4" aria-hidden="true" />
                    <span>Langkah 3</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>Tempoh: 15 minit</span>
                  </span>
                </div>

                <h1
                  id="langkah3-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#243B53] leading-tight"
                >
                  Misi Wartawan Cilik
                </h1>

                <p className="mt-2.5 text-base text-[#334E68] max-w-2xl leading-relaxed">
                  Penulisan skrip laporan berita secara individu mengikut tahap
                  penguasaan murid, diikuti pembentangan lisan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/langkah-2"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Kembali ke Langkah 2</span>
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
                >
                  <span>Halaman Utama</span>
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white/95 border border-[#FFB8B3] p-4 sm:p-5">
              <p className="text-xs font-bold text-[#9E2F28] mb-1">
                Objektif Pembelajaran
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#243B53]">
                Murid membina ayat penyata berdasarkan poster Karnival Kejiranan
                Taman Harmoni dengan betul dan gramatis.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
          {/* 2. Pengenalan Aktiviti & Ilustrasi Wartawan Cilik */}
          <section
            aria-labelledby="arahan-wartawan-heading"
            className="bg-white rounded-2xl border-2 border-[#A6DCFA] shadow-xs p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <div className="flex items-center gap-2 text-xs font-bold text-[#166088] mb-2">
                  <Mic className="w-4 h-4" aria-hidden="true" />
                  <span>Penerangan Tugasan</span>
                </div>
                <h2
                  id="arahan-wartawan-heading"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
                >
                  Ayuh Jadi Wartawan Cilik Taman Harmoni!
                </h2>
                <p className="mt-3 text-base sm:text-lg text-[#243B53] leading-relaxed">
                  Hari ini, kamu akan menjadi wartawan cilik! Perhatikan poster
                  Karnival Kejiranan Taman Harmoni dan tulis laporan berita
                  menggunakan ayat penyata.
                </p>
              </div>

              <div className="md:col-span-4 flex justify-center md:justify-end">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#FFD65A] bg-[#FFF8E1] shadow-xs">
                  <ResilientImage
                    src={wartawanCilikImg}
                    alt="Ilustrasi murid Tahun 4 sebagai wartawan cilik memegang mikrofon dan buku nota."
                    fallbackTitle="Wartawan Cilik"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3. Poster Rujukan Lengkap (Satu Imej Lengkap Mengandungi Empat Zon) */}
          <section aria-labelledby="poster-rujukan-heading">
            <div className="bg-white rounded-2xl border-2 border-[#57B8F2] shadow-xs overflow-hidden">
              <div className="bg-[#EAF6FE] border-b border-[#BCE3FA] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
                    Poster Rujukan Lengkap
                  </p>
                  <h2
                    id="poster-rujukan-heading"
                    className="font-display text-xl sm:text-2xl font-bold text-[#243B53]"
                  >
                    Karnival Kejiranan Taman Harmoni
                  </h2>
                  <p className="text-xs sm:text-sm text-[#334E68] mt-1">
                    {isCustomOriginalPoster
                      ? 'Paparan fail poster asal yang dimuatkan.'
                      : 'Satu imej poster lengkap yang menghimpunkan keempat-empat zon aktiviti kejiranan.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <input
                    ref={posterInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    className="sr-only"
                    id="langkah3-poster-upload"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPosterModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>Lihat Poster</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => posterInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                  >
                    <Upload className="w-4 h-4" aria-hidden="true" />
                    <span>Ganti Fail Poster Asal</span>
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-8 bg-[#FFF8E9]/50">
                <div className="rounded-2xl overflow-hidden border-2 border-[#BCE3FA] bg-white">
                  <img
                    src={activePosterSrc}
                    alt="Poster lengkap Karnival Kejiranan Taman Harmoni yang memaparkan aktiviti gotong-royong, ziarah kebajikan, sukaneka kejiranan dan jamuan muafakat."
                    className="w-full max-h-[500px] object-contain mx-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 4. Pedagogi Terbeza (3 Kad Bahan Mengikut Tahap & Lembaran Kerja) */}
          <section aria-labelledby="terbeza-heading">
            <div>
              <p className="text-xs font-bold text-[#1B6B46] tracking-wide mb-1">
                Pedagogi Terbeza · Penulisan Individu
              </p>
              <h2
                id="terbeza-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                Pilih Bahan Mengikut Tahap Penguasaan
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334E68]">
                Guru boleh melihat atau mencetak lembaran kerja format A4 hitam
                putih bagi setiap kumpulan murid.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {WORKSHEET_TIERS.map((tier) => {
                const style = TIER_CARD_STYLES[tier.accent];
                return (
                  <article
                    key={tier.id}
                    className={`rounded-2xl border-2 shadow-xs p-6 flex flex-col justify-between gap-5 ${style.card}`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${style.kicker}`}>
                          {tier.groupLabel}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-md tabular-nums ${style.badge}`}
                        >
                          {tier.sentenceCount} Ayat
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-bold text-[#243B53]">
                          {tier.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#243B53] leading-relaxed">
                          {tier.instruction}
                        </p>
                      </div>

                      {/* Kata Kunci untuk MS */}
                      {tier.keywords && (
                        <div className="rounded-xl bg-white border border-black/10 p-3.5">
                          <p className="text-xs font-bold text-[#1B6B46] mb-2">
                            Kata Kunci Disediakan:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {tier.keywords.map((kw) => (
                              <span
                                key={kw}
                                className="px-2.5 py-1 rounded-lg bg-[#EAF9F1] border border-[#9BE4BE] text-xs font-bold text-[#243B53]"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Latihan Frasa Berpandu untuk MA */}
                      {tier.guidedExercises && (
                        <div className="rounded-xl bg-white border border-black/10 p-3.5 space-y-3">
                          <p className="text-xs font-bold text-[#7A5900]">
                            Latihan Frasa Berpandu (Tulis Semula dengan Huruf
                            Besar &amp; Noktah):
                          </p>
                          {tier.guidedExercises.map((ex) => (
                            <div
                              key={ex.id}
                              className="rounded-lg bg-[#FFF8E9] border border-[#FFE082] p-2.5"
                            >
                              <p className="text-xs font-bold text-[#243B53] mb-1.5">
                                {ex.label}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {ex.phrases.map((phrase) => (
                                  <span
                                    key={phrase}
                                    className="px-2 py-0.5 rounded bg-white border border-[#F5E1B0] text-xs font-semibold text-[#243B53]"
                                  >
                                    {phrase}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Butang Lihat & Cetak Lembaran Kerja */}
                    <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPreviewTierId(tier.id)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-black/15 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                      >
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        <span>Lihat Lembaran Kerja</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePrintTier(tier.id)}
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs ${style.primaryBtn}`}
                      >
                        <Printer className="w-4 h-4" aria-hidden="true" />
                        <span>Cetak Lembaran Kerja</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* 5. Pembentangan Wartawan Cilik ("Berita Terkini dari Taman Harmoni!") */}
          <section aria-labelledby="pembentangan-heading">
            <div className="bg-[#EAF6FE] rounded-2xl border-2 border-[#A6DCFA] shadow-xs p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-bold text-[#166088] mb-2">
                <Mic className="w-4 h-4" aria-hidden="true" />
                <span>Aktiviti Pembentangan Lisan</span>
              </div>

              <h2
                id="pembentangan-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                Berita Terkini dari Taman Harmoni!
              </h2>

              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
                {PRESENTATION_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="bg-white rounded-xl border border-[#BCE3FA] p-4 flex flex-col gap-2.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-[#57B8F2] text-[#243B53] font-bold text-sm flex items-center justify-center tabular-nums">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-[#243B53] leading-snug">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl bg-white border border-[#A6DCFA] p-4 flex items-start gap-3">
                <ClipboardCheck
                  className="w-5 h-5 text-[#166088] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-sm sm:text-base font-medium text-[#243B53]">
                  Nota Pentaksiran: Guru membuat penilaian lisan formatif dan
                  memberikan maklum balas terhadap sebutan, intonasi, dan
                  ketepatan ayat penyata murid.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Roda Pemilihan Nama Rawak */}
          <section aria-label="Roda Pemilihan Nama Rawak">
            <RodaWartawanBertuah />
          </section>

          {/* 7. Peranan Guru dan Murid */}
          <section
            aria-label="Peranan Guru dan Murid"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-[#F3EEFE] rounded-2xl border-2 border-[#CFC0FA] shadow-xs p-6 flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-[#B8A0F5] text-[#243B53] flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#4D348C] mb-1">
                  Peranan Guru
                </p>
                <p className="text-sm sm:text-base font-medium text-[#243B53] leading-relaxed">
                  Guru mengedarkan lembaran kerja mengikut tahap penguasaan,
                  membimbing penulisan, memilih pembentang secara rawak dan
                  menilai hasil penulisan serta penyampaian lisan.
                </p>
              </div>
            </div>

            <div className="bg-[#EAF9F1] rounded-2xl border-2 border-[#9BE4BE] shadow-xs p-6 flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-[#70D6A1] text-[#243B53] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#1B6B46] mb-1">
                  Pesanan Untuk Murid
                </p>
                <p className="text-sm sm:text-base font-medium text-[#243B53] leading-relaxed">
                  Tulis ayat penyata dengan kemas dan sampaikan laporan berita
                  dengan yakin.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Butang Navigasi */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              to="/langkah-2"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#EAF6FE] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Kembali ke Langkah 2</span>
            </Link>

            <Link
              to="/penutup"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
            >
              <span>Teruskan ke Penutup</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Paparan Besar Poster */}
      {isPosterModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-poster-l3-title"
          className="fixed inset-0 z-50 bg-[#102A43]/75 flex items-center justify-center p-4 print:hidden"
        >
          <div className="bg-white rounded-2xl border-2 border-[#57B8F2] shadow-xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#BCE3FA] bg-[#EAF6FE]">
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-5 h-5 text-[#166088]" aria-hidden="true" />
                <h2
                  id="modal-poster-l3-title"
                  className="font-display text-lg font-bold text-[#243B53]"
                >
                  Poster Karnival Kejiranan Taman Harmoni
                </h2>
              </div>
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
                src={activePosterSrc}
                alt="Paparan besar poster Karnival Kejiranan Taman Harmoni dengan empat zon aktiviti"
                className="max-w-full max-h-[75vh] object-contain rounded-xl bg-white border border-[#F5E1B0]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal Pratonton Lembaran Kerja A4 */}
      {activePreviewTier && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-worksheet-title"
          className="fixed inset-0 z-50 bg-[#102A43]/75 flex items-center justify-center p-4 print:hidden"
        >
          <div className="bg-white rounded-2xl border-2 border-[#57B8F2] shadow-xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-[#BCE3FA] bg-[#EAF6FE]">
              <div>
                <p className="text-xs font-bold text-[#166088]">
                  Pratonton Lembaran Kerja Format A4
                </p>
                <h2
                  id="modal-worksheet-title"
                  className="font-display text-lg font-bold text-[#243B53]"
                >
                  {activePreviewTier.groupLabel} — {activePreviewTier.title}
                </h2>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handlePrintTier(activePreviewTier.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Cetak Sekarang</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTierId(null)}
                  aria-label="Tutup pratonton lembaran kerja"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-[#FFF0EE] text-[#243B53] border border-[#A6DCFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-auto bg-slate-100">
              <LembaranKerjaA4 tier={activePreviewTier} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
