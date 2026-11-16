import { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Dot,
  Info,
  Sparkles,
  Type,
  ArrowRight,
} from 'lucide-react';
import gotongRoyongImg from '../assets/images/contoh_gotong_royong_1794840939245.jpg';
import bantuJiranImg from '../assets/images/contoh_bantu_jiran_1794840939452.jpg';
import tamanPermainanImg from '../assets/images/contoh_taman_permainan_1794840939658.jpg';
import { ResilientImage } from './ResilientImage';

interface CharacteristicItem {
  id: string;
  number: string;
  title: string;
  detail: string;
  examplePrefix: string;
  exampleHighlight: string;
  exampleSuffix: string;
  accent: 'sky' | 'yellow' | 'coral';
}

interface ExampleSentenceItem {
  id: string;
  label: string;
  firstChar: string;
  restOfSubject: string;
  subject: string;
  predicateBody: string;
  predicate: string;
  punctuation: string;
  fullSentence: string;
  imageSrc: string;
  imageAlt: string;
}

const CHARACTERISTICS: CharacteristicItem[] = [
  {
    id: 'ciri-1',
    number: 'Ciri 1',
    title: 'Menyatakan maklumat atau berita.',
    detail:
      'Ayat penyata menyampaikan cerita, fakta atau keadaan sebenar kepada pembaca tanpa menyoal atau memberi arahan.',
    examplePrefix: 'Contoh: ',
    exampleHighlight: 'Keluarga Encik Ali menziarahi jiran baharu pada waktu petang.',
    exampleSuffix: '',
    accent: 'sky',
  },
  {
    id: 'ciri-2',
    number: 'Ciri 2',
    title: 'Dimulakan dengan huruf besar.',
    detail:
      'Huruf pertama pada awal setiap ayat penyata mesti ditulis dengan huruf besar.',
    examplePrefix: 'Contoh: ',
    exampleHighlight: 'P',
    exampleSuffix: 'enduduk taman berkumpul di balai raya.',
    accent: 'yellow',
  },
  {
    id: 'ciri-3',
    number: 'Ciri 3',
    title: 'Diakhiri dengan tanda noktah.',
    detail:
      'Setiap ayat penyata diakhiri dengan tanda noktah (.) untuk menandakan ayat sudah lengkap.',
    examplePrefix: 'Contoh: Ruphinee menyiram pokok bunga di halaman rumah',
    exampleHighlight: '.',
    exampleSuffix: '',
    accent: 'coral',
  },
];

const EXAMPLE_SENTENCES: ExampleSentenceItem[] = [
  {
    id: 'ex-1',
    label: 'Contoh 1',
    firstChar: 'P',
    restOfSubject: 'enduduk taman',
    subject: 'Penduduk taman',
    predicateBody: 'bergotong-royong membersihkan kawasan perumahan',
    predicate: 'bergotong-royong membersihkan kawasan perumahan.',
    punctuation: '.',
    fullSentence:
      'Penduduk taman bergotong-royong membersihkan kawasan perumahan.',
    imageSrc: gotongRoyongImg,
    imageAlt:
      'Ilustrasi 2D penduduk taman pelbagai kaum bergotong-royong menyapu daun, mengutip sampah dan menanam bunga.',
  },
  {
    id: 'ex-2',
    label: 'Contoh 2',
    firstChar: 'M',
    restOfSubject: 'ei Lin',
    subject: 'Mei Lin',
    predicateBody: 'membantu jirannya membawa barang',
    predicate: 'membantu jirannya membawa barang.',
    punctuation: '.',
    fullSentence: 'Mei Lin membantu jirannya membawa barang.',
    imageSrc: bantuJiranImg,
    imageAlt:
      'Ilustrasi 2D Mei Lin membantu jirannya yang lebih berusia membawa beg barang keperluan.',
  },
  {
    id: 'ex-3',
    label: 'Contoh 3',
    firstChar: 'K',
    restOfSubject: 'anak-kanak',
    subject: 'Kanak-kanak',
    predicateBody: 'bermain di taman permainan',
    predicate: 'bermain di taman permainan.',
    punctuation: '.',
    fullSentence: 'Kanak-kanak bermain di taman permainan.',
    imageSrc: tamanPermainanImg,
    imageAlt:
      'Ilustrasi 2D kanak-kanak pelbagai kaum bermain buaian dan gelongsor di taman permainan.',
  },
];

export function OpdKonsepAyatPenyata() {
  // 1. Kad konsep utama (buka/tutup penerangan tambahan)
  const [isIntroExpanded, setIsIntroExpanded] = useState<boolean>(false);

  // 2. Ciri-ciri ayat penyata (kad interaktif terbuka/tutup)
  const [selectedCharacteristicId, setSelectedCharacteristicId] = useState<
    string | null
  >('ciri-1');

  // 3. Subjek & Predikat (interaktif + langkah berperingkat)
  const [selectedClause, setSelectedClause] = useState<
    'none' | 'subjek' | 'predikat' | 'both'
  >('none');

  // 4. Contoh ayat penyata (pilihan 3 contoh dengan ilustrasi 2D)
  const [selectedExampleId, setSelectedExampleId] = useState<string>('ex-1');
  const activeExample =
    EXAMPLE_SENTENCES.find((item) => item.id === selectedExampleId) ??
    EXAMPLE_SENTENCES[0];

  function toggleCharacteristic(id: string) {
    setSelectedCharacteristicId((prev) => (prev === id ? null : id));
  }

  function advanceClauseStep() {
    setSelectedClause((prev) => {
      if (prev === 'none') return 'subjek';
      if (prev === 'subjek') return 'predikat';
      if (prev === 'predikat') return 'both';
      return 'none';
    });
  }

  return (
    <div id="konsep-ayat-penyata" className="space-y-10 sm:space-y-12">
      {/* Bahagian 1: Pengenalan Konsep ("Apa Itu Ayat Penyata?") */}
      <section aria-labelledby="konsep-intro-heading">
        <div className="bg-white rounded-2xl border-2 border-[#A6DCFA] shadow-xs p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
                Pengenalan Konsep
              </p>
              <h2
                id="konsep-intro-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                Apa Itu Ayat Penyata?
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#243B53] leading-relaxed max-w-3xl">
                Ayat penyata ialah ayat yang digunakan untuk menyatakan sesuatu
                maklumat atau berita.
              </p>

              {/* Kad Konsep Interaktif */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsIntroExpanded((prev) => !prev)}
                  aria-expanded={isIntroExpanded}
                  className="w-full text-left rounded-2xl bg-[#EAF6FE] hover:bg-[#DDF1FD] border-2 border-[#A6DCFA] p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-[#FFD65A] text-[#243B53] flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-bold text-[#243B53]">
                          Tekan untuk Penerangan &amp; Contoh Mudah
                        </p>
                        <p className="text-xs sm:text-sm text-[#334E68]">
                          Ketahui kegunaan ayat penyata dalam kehidupan berjiran
                        </p>
                      </div>
                    </div>
                    <span className="w-9 h-9 rounded-xl bg-white border border-[#BCE3FA] text-[#243B53] flex items-center justify-center shrink-0">
                      {isIntroExpanded ? (
                        <ChevronUp className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5" aria-hidden="true" />
                      )}
                    </span>
                  </div>
                </button>

                {isIntroExpanded && (
                  <div className="mt-3 rounded-2xl bg-[#FFF8E9] border-2 border-[#FFD65A] p-5 sm:p-6 transition-all duration-200">
                    <p className="text-sm sm:text-base text-[#243B53] leading-relaxed">
                      Apabila kamu bercerita tentang perkara yang berlaku di kawasan
                      kejiranan — seperti jiran bergotong-royong atau membantu jiran
                      yang sakit — kamu sebenarnya menggunakan{' '}
                      <strong className="font-bold">ayat penyata</strong>. Ayat ini
                      bukan ayat tanya dan bukan ayat perintah.
                    </p>
                    <div className="mt-4 rounded-xl bg-white border border-[#F5E1B0] p-4">
                      <p className="text-xs font-bold text-[#7A5900] mb-1">
                        Contoh Ayat Penyata
                      </p>
                      <p className="text-base font-semibold text-[#243B53]">
                        “Mei Lin dan Ruphinee membawa buah-buahan untuk jiran
                        mereka.”
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bahagian 2: Ciri-ciri Ayat Penyata (3 Kad Interaktif) */}
      <section aria-labelledby="ciri-heading">
        <div>
          <p className="text-xs font-bold text-[#1B6B46] tracking-wide mb-1">
            Kenal Pasti Ciri Utama
          </p>
          <h2
            id="ciri-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
          >
            Ciri-ciri Ayat Penyata
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#334E68]">
            Tekan setiap kad di bawah untuk melihat penerangan dan contoh ringkas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {CHARACTERISTICS.map((item) => {
            const isSelected = selectedCharacteristicId === item.id;
            const palette =
              item.accent === 'sky'
                ? {
                    card: isSelected
                      ? 'bg-[#DDF1FD] border-[#57B8F2] shadow-sm -translate-y-0.5'
                      : 'bg-[#EAF6FE] border-[#A6DCFA] hover:border-[#57B8F2]',
                    iconBox: 'bg-[#57B8F2] text-[#243B53]',
                    kicker: 'text-[#166088]',
                    highlight: 'bg-[#FFD65A] text-[#243B53] px-1 rounded',
                  }
                : item.accent === 'yellow'
                  ? {
                      card: isSelected
                        ? 'bg-[#FFF3C4] border-[#F0B429] shadow-sm -translate-y-0.5'
                        : 'bg-[#FFF8E1] border-[#FFE082] hover:border-[#FFD65A]',
                      iconBox: 'bg-[#FFD65A] text-[#243B53]',
                      kicker: 'text-[#7A5900]',
                      highlight:
                        'bg-[#57B8F2] text-[#243B53] font-bold px-1.5 py-0.5 rounded',
                    }
                  : {
                      card: isSelected
                        ? 'bg-[#FFE2DF] border-[#FF8D85] shadow-sm -translate-y-0.5'
                        : 'bg-[#FFF0EE] border-[#FFB8B3] hover:border-[#FF8D85]',
                      iconBox: 'bg-[#FF8D85] text-[#243B53]',
                      kicker: 'text-[#9E2F28]',
                      highlight:
                        'bg-[#FF8D85] text-[#243B53] font-bold px-1.5 rounded',
                    };

            const IconComponent =
              item.accent === 'sky'
                ? Info
                : item.accent === 'yellow'
                  ? Type
                  : Dot;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border-2 transition-all duration-200 flex flex-col ${palette.card}`}
              >
                <button
                  type="button"
                  onClick={() => toggleCharacteristic(item.id)}
                  aria-expanded={isSelected}
                  className="w-full text-left p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-inset rounded-2xl flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${palette.iconBox}`}
                      >
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <span className={`text-xs font-bold ${palette.kicker}`}>
                        {item.number}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#243B53] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-xs font-bold text-[#243B53]">
                    <span>
                      {isSelected ? 'Tutup Penerangan' : 'Lihat Contoh'}
                    </span>
                    {isSelected ? (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </button>

                {isSelected && (
                  <div className="px-6 pb-6 pt-1 space-y-3">
                    <p className="text-sm text-[#243B53] leading-relaxed">
                      {item.detail}
                    </p>
                    <div className="rounded-xl bg-white border border-black/10 p-3.5 text-sm text-[#243B53] leading-relaxed">
                      <span>{item.examplePrefix}</span>
                      <span className={palette.highlight}>
                        {item.exampleHighlight}
                      </span>
                      <span>{item.exampleSuffix}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bahagian 3: Kenali Subjek dan Predikat */}
      <section aria-labelledby="subjek-predikat-heading">
        <div className="bg-white rounded-2xl border-2 border-[#CFC0FA] shadow-xs p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-[#4D348C] tracking-wide mb-1">
                Binaan Ayat Penyata
              </p>
              <h2
                id="subjek-predikat-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                Kenali Subjek dan Predikat
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334E68]">
                Tekan bahagian <strong className="font-bold">Subjek</strong> atau{' '}
                <strong className="font-bold">Predikat</strong> pada ayat di bawah
                untuk melihat penerangannya.
              </p>
            </div>

            <button
              type="button"
              onClick={advanceClauseStep}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-[#B8A0F5] hover:bg-[#A68BF0] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 shrink-0 whitespace-nowrap shadow-xs"
            >
              <span>
                {selectedClause === 'none'
                  ? 'Lihat Langkah 1: Subjek'
                  : selectedClause === 'subjek'
                    ? 'Lihat Langkah 2: Predikat'
                    : selectedClause === 'predikat'
                      ? 'Lihat Gabungan Lengkap'
                      : 'Set Semula Paparan'}
              </span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Paparan Ayat Interaktif */}
          <div className="mt-6 rounded-2xl bg-[#FFF8E9] border-2 border-[#FFE082] p-5 sm:p-7">
            <p className="text-xs font-bold text-[#7A5900] mb-3">
              Ayat Contoh (Tekan mana-mana bahagian ayat):
            </p>

            <div className="flex flex-wrap items-center gap-2.5 text-lg sm:text-2xl font-display font-bold leading-relaxed">
              <button
                type="button"
                onClick={() => setSelectedClause('subjek')}
                aria-pressed={
                  selectedClause === 'subjek' || selectedClause === 'both'
                }
                className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] min-h-[44px] ${
                  selectedClause === 'subjek' || selectedClause === 'both'
                    ? 'bg-[#57B8F2] text-[#243B53] border-[#166088] shadow-xs scale-[1.02]'
                    : 'bg-[#EAF6FE] hover:bg-[#DDF1FD] text-[#243B53] border-[#A6DCFA]'
                }`}
              >
                Penduduk taman
              </button>

              <button
                type="button"
                onClick={() => setSelectedClause('predikat')}
                aria-pressed={
                  selectedClause === 'predikat' || selectedClause === 'both'
                }
                className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] min-h-[44px] text-left ${
                  selectedClause === 'predikat' || selectedClause === 'both'
                    ? 'bg-[#70D6A1] text-[#243B53] border-[#1B6B46] shadow-xs scale-[1.02]'
                    : 'bg-[#EAF9F1] hover:bg-[#D6F5E5] text-[#243B53] border-[#9BE4BE]'
                }`}
              >
                membersihkan kawasan perumahan.
              </button>
            </div>

            {/* Petunjuk Warna + Label Teks */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#334E68]">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-3.5 h-3.5 rounded bg-[#57B8F2] border border-[#166088]"
                />
                <span>Subjek (Biru Langit)</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="w-3.5 h-3.5 rounded bg-[#70D6A1] border border-[#1B6B46]"
                />
                <span>Predikat (Hijau Segar)</span>
              </span>
            </div>
          </div>

          {/* Kad Penerangan Subjek & Predikat Berperingkat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div
              className={`rounded-2xl border-2 p-5 transition-all duration-200 ${
                selectedClause === 'subjek' || selectedClause === 'both'
                  ? 'bg-[#EAF6FE] border-[#57B8F2] shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#166088]">
                  Bahagian 1 · Subjek
                </span>
                <span className="text-xs font-bold text-[#243B53] bg-[#57B8F2] px-2.5 py-0.5 rounded-md">
                  Penduduk taman
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#243B53] leading-relaxed">
                {selectedClause === 'subjek' || selectedClause === 'both'
                  ? 'Subjek ialah bahagian ayat yang menerangkan perkara yang diperkatakan.'
                  : 'Tekan "Penduduk taman" di atas untuk melihat penerangan Subjek.'}
              </p>
            </div>

            <div
              className={`rounded-2xl border-2 p-5 transition-all duration-200 ${
                selectedClause === 'predikat' || selectedClause === 'both'
                  ? 'bg-[#EAF9F1] border-[#70D6A1] shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#1B6B46]">
                  Bahagian 2 · Predikat
                </span>
                <span className="text-xs font-bold text-[#243B53] bg-[#70D6A1] px-2.5 py-0.5 rounded-md">
                  membersihkan kawasan perumahan.
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#243B53] leading-relaxed">
                {selectedClause === 'predikat' || selectedClause === 'both'
                  ? 'Predikat ialah bahagian ayat yang menerangkan sesuatu tentang subjek.'
                  : 'Tekan "membersihkan kawasan perumahan." di atas untuk melihat penerangan Predikat.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bahagian 4: Contoh Ayat Penyata (3 Kad Boleh Ditekan + Ilustrasi 2D) */}
      <section aria-labelledby="contoh-heading">
        <div>
          <p className="text-xs font-bold text-[#9E2F28] tracking-wide mb-1">
            Penerokaan Contoh Bergambar
          </p>
          <h2
            id="contoh-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
          >
            Contoh Ayat Penyata
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#334E68]">
            Pilih salah satu contoh di bawah untuk melihat huruf besar, tanda
            noktah, subjek dan predikat.
          </p>
        </div>

        {/* 3 Kad Pilihan Contoh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {EXAMPLE_SENTENCES.map((example) => {
            const isSelected = example.id === activeExample.id;
            return (
              <button
                key={example.id}
                type="button"
                onClick={() => setSelectedExampleId(example.id)}
                aria-pressed={isSelected}
                className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#FFF0EE] border-[#FF8D85] shadow-sm -translate-y-0.5'
                    : 'bg-white border-[#BCE3FA] hover:border-[#57B8F2]'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    isSelected ? 'text-[#9E2F28]' : 'text-[#166088]'
                  }`}
                >
                  {example.label}
                </span>
                <p className="mt-2 text-sm sm:text-base font-bold text-[#243B53] leading-snug">
                  “{example.fullSentence}”
                </p>
              </button>
            );
          })}
        </div>

        {/* Paparan Terperinci Contoh Dipilih (Prinsip Spatial Contiguity + Signaling) */}
        <div className="mt-6 bg-white rounded-2xl border-2 border-[#FFB8B3] shadow-xs p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-[#FFE082] bg-[#FFF8E9] aspect-[4/3]">
                <ResilientImage
                  src={activeExample.imageSrc}
                  alt={activeExample.imageAlt}
                  fallbackTitle={activeExample.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-bold text-[#9E2F28] mb-2">
                  {activeExample.label} · Analisis Ayat Penyata
                </p>
                <div className="rounded-2xl bg-[#FFF8E9] border-2 border-[#FFD65A] p-5">
                  <p className="font-display text-xl sm:text-2xl font-bold text-[#243B53] leading-relaxed">
                    <span
                      title="Huruf besar pada awal ayat"
                      className="inline-block bg-[#FFD65A] text-[#243B53] px-1.5 rounded border border-[#EFC034] mr-0.5"
                    >
                      {activeExample.firstChar}
                    </span>
                    <span className="bg-[#DDF1FD] text-[#243B53] px-1.5 py-0.5 rounded-r">
                      {activeExample.restOfSubject}
                    </span>{' '}
                    <span className="bg-[#D6F5E5] text-[#243B53] px-2 py-0.5 rounded">
                      {activeExample.predicateBody}
                    </span>
                    <span
                      title="Tanda noktah pada akhir ayat"
                      className="inline-block bg-[#FF8D85] text-[#243B53] px-2 rounded border border-[#F47269] ml-0.5"
                    >
                      {activeExample.punctuation}
                    </span>
                  </p>

                  {/* Petunjuk Penandaan Jelas */}
                  <div className="mt-4 pt-3 border-t border-[#F5E1B0] flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#243B53]">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        aria-hidden="true"
                        className="w-3.5 h-3.5 rounded bg-[#FFD65A] border border-[#EFC034]"
                      />
                      <span>Huruf Besar ({activeExample.firstChar})</span>
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
                      <span>Tanda Noktah ({activeExample.punctuation})</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Jadual Ringkas Pembahagian Subjek & Predikat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#EAF6FE] border-2 border-[#A6DCFA] p-4">
                  <p className="text-xs font-bold text-[#166088] mb-1">
                    Subjek (Perkara yang Diperkatakan)
                  </p>
                  <p className="text-base font-bold text-[#243B53]">
                    {activeExample.subject}
                  </p>
                </div>
                <div className="rounded-xl bg-[#EAF9F1] border-2 border-[#9BE4BE] p-4">
                  <p className="text-xs font-bold text-[#1B6B46] mb-1">
                    Predikat (Penerangan tentang Subjek)
                  </p>
                  <p className="text-base font-bold text-[#243B53]">
                    {activeExample.predicate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
