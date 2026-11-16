export type WorksheetTierId = 'mb' | 'ms' | 'ma';

export interface WorksheetTierConfig {
  id: WorksheetTierId;
  groupCode: string;
  groupLabel: string;
  title: string;
  instruction: string;
  sentenceCount: number;
  keywords?: string[];
  guidedExercises?: {
    id: string;
    label: string;
    phrases: [string, string];
    hint: string;
  }[];
  accent: 'sky' | 'green' | 'yellow';
}

export const WORKSHEET_TIERS: WorksheetTierConfig[] = [
  {
    id: 'mb',
    groupCode: 'MB',
    groupLabel: 'Kumpulan Baik (MB)',
    title: 'Wartawan Mahir',
    instruction:
      'Bina empat ayat penyata yang kreatif berdasarkan poster untuk menghasilkan skrip laporan berita yang lengkap.',
    sentenceCount: 4,
    accent: 'sky',
  },
  {
    id: 'ms',
    groupCode: 'MS',
    groupLabel: 'Kumpulan Sederhana (MS)',
    title: 'Wartawan Berkembang',
    instruction:
      'Bina tiga ayat penyata berdasarkan poster dengan menggunakan kata kunci yang disediakan.',
    sentenceCount: 3,
    keywords: ['Penduduk', 'Bekerjasama', 'Gembira'],
    accent: 'green',
  },
  {
    id: 'ma',
    groupCode: 'MA',
    groupLabel: 'Kumpulan Asas (MA)',
    title: 'Wartawan Muda',
    instruction:
      'Bina dua ayat penyata mudah dengan menyusun frasa subjek dan predikat yang disediakan.',
    sentenceCount: 2,
    guidedExercises: [
      {
        id: 'ma-1',
        label: 'Latihan 1 (Aktiviti Gotong-royong)',
        phrases: ['membersihkan kawasan taman.', 'Penduduk taman'],
        hint: 'Susun frasa subjek dan predikat, kemudian tulis semula ayat menggunakan huruf besar di awal ayat dan tanda noktah (.) di akhir ayat.',
      },
      {
        id: 'ma-2',
        label: 'Latihan 2 (Aktiviti Ziarah Kebajikan)',
        phrases: ['menziarahi warga emas.', 'Jiran tetangga'],
        hint: 'Susun frasa subjek dan predikat, kemudian tulis semula ayat menggunakan huruf besar di awal ayat dan tanda noktah (.) di akhir ayat.',
      },
    ],
    accent: 'yellow',
  },
];

export function LembaranKerjaA4({ tier }: { tier: WorksheetTierConfig }) {
  return (
    <div className="bg-white text-black p-6 sm:p-8 border border-black max-w-[210mm] mx-auto font-sans">
      {/* Kepala Lembaran Kerja A4 Hitam Putih */}
      <div className="border-b-2 border-black pb-4 mb-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider">
            Bahasa Melayu Tahun 4 · Langkah 3: Misi Wartawan Cilik
          </p>
          <p className="text-xs font-bold border border-black px-2 py-0.5">
            {tier.groupLabel}
          </p>
        </div>

        <h2 className="text-xl font-bold mt-2">
          Lembaran Kerja: {tier.title}
        </h2>
        <p className="text-xs mt-1">
          Tema: Kemasyarakatan · Tajuk: Semangat Kejiranan Memupuk Keharmonian
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-3 border-t border-black/40 text-sm">
          <div className="flex items-end gap-2">
            <span className="font-bold shrink-0">Nama:</span>
            <span className="flex-1 border-b border-black h-5" />
          </div>
          <div className="flex items-end gap-2">
            <span className="font-bold shrink-0">Tarikh:</span>
            <span className="flex-1 border-b border-black h-5" />
          </div>
        </div>
      </div>

      {/* Arahan Tugasan */}
      <div className="border border-black p-3.5 mb-5 text-sm">
        <p className="font-bold mb-1">Arahan:</p>
        <p className="leading-relaxed">{tier.instruction}</p>
        <p className="text-xs mt-2">
          Peringatan: Mulakan setiap ayat dengan huruf besar dan akhiri dengan
          tanda noktah (.).
        </p>
      </div>

      {/* Kata Kunci (Untuk Kumpulan Sederhana MS) */}
      {tier.keywords && tier.keywords.length > 0 && (
        <div className="border border-black p-3.5 mb-5">
          <p className="text-sm font-bold mb-2">Kata Kunci yang Disediakan:</p>
          <div className="flex flex-wrap gap-3">
            {tier.keywords.map((keyword) => (
              <span
                key={keyword}
                className="border border-black px-3 py-1 text-sm font-bold"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Ruang Penulisan Mengikut Tahap */}
      {tier.guidedExercises ? (
        <div className="space-y-6">
          {tier.guidedExercises.map((exercise, idx) => (
            <div key={exercise.id} className="border border-black p-4">
              <p className="text-sm font-bold mb-2">
                {idx + 1}. {exercise.label}
              </p>
              <p className="text-xs mb-3">{exercise.hint}</p>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-xs font-bold">Frasa Disediakan:</span>
                {exercise.phrases.map((phrase) => (
                  <span
                    key={phrase}
                    className="border border-black px-3 py-1.5 text-sm font-semibold"
                  >
                    {phrase}
                  </span>
                ))}
              </div>

              <div className="space-y-6 pt-2">
                <div className="border-b border-black h-7" />
                <div className="border-b border-black h-7" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-sm font-bold">
            Skrip Laporan Berita ({tier.sentenceCount} Ayat Penyata):
          </p>
          {Array.from({ length: tier.sentenceCount }).map((_, index) => (
            <div key={index} className="pt-1">
              <div className="flex items-end gap-2 mb-5">
                <span className="text-sm font-bold w-6">{index + 1}.</span>
                <span className="flex-1 border-b border-black h-6" />
              </div>
              <div className="pl-8">
                <div className="border-b border-black h-6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nota Pengesahan Guru (Hitam Putih) */}
      <div className="mt-8 pt-4 border-t border-black/40 flex flex-wrap items-center justify-between gap-4 text-xs">
        <span>Disemak oleh guru: ___________________________</span>
        <span>Catatan: ___________________________</span>
      </div>
    </div>
  );
}
