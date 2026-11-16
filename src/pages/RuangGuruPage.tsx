import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  ExternalLink,
  Gamepad2,
  GraduationCap,
  Laptop,
  MessageSquareText,
  MonitorPlay,
  Newspaper,
  Presentation,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';

const WORDWALL_ORIGINAL_URL =
  'https://wordwall.net/resource/121088838?wwmethod=link';
const PADLET_URL =
  'https://padlet.com/ichaeleanor2806/ayat-penyata-4-zon-harmoni-s024eeu1ehm00wmu2hjf';
const EXTERNAL_GAME_URL =
  'https://karnival-ayat-penyata-bahasa-melayu-tahun-4.ai.studio';

const TEACHING_INFO_ITEMS = [
  { label: 'Mata Pelajaran', value: 'Bahasa Melayu' },
  { label: 'Tahun', value: '4' },
  { label: 'Tema', value: 'Kemasyarakatan' },
  { label: 'Tajuk', value: 'Semangat Kejiranan Memupuk Keharmonian' },
  { label: 'Fokus', value: 'Tatabahasa — Ayat Penyata' },
  { label: 'Tempoh PdP', value: '60 minit' },
  {
    label: 'Standard Kandungan',
    value: '5.3 Memahami dan membina ayat mengikut konteks.',
    wide: true,
  },
  {
    label: 'Standard Pembelajaran',
    value: '5.3.3(i) Memahami dan membina ayat penyata mengikut konteks.',
    wide: true,
  },
];

const PDP_STAGES = [
  {
    id: 'set-induksi',
    title: 'Set Induksi',
    duration: '5 minit',
    route: '/set-induksi',
    routeLabel: 'Buka Set Induksi',
    icon: MonitorPlay,
    cardStyle: 'bg-[#FFF8E1] border-[#FFE082]',
    badgeStyle: 'bg-[#FFD65A] text-[#243B53]',
    kickerStyle: 'text-[#7A5900]',
    points: [
      'Guru memainkan video “Suasana Kampung Muafakat” tanpa gangguan.',
      'Guru mengemukakan soalan rangsangan secara lisan selepas tayangan.',
    ],
  },
  {
    id: 'langkah-1',
    title: 'Langkah 1',
    duration: '15 minit',
    route: '/langkah-1',
    routeLabel: 'Buka Langkah 1',
    icon: BookOpen,
    cardStyle: 'bg-[#EAF6FE] border-[#A6DCFA]',
    badgeStyle: 'bg-[#57B8F2] text-[#243B53]',
    kickerStyle: 'text-[#166088]',
    points: [
      'Guru menggunakan OPD “Kenali Ayat Penyata Bersama Harmoni!” untuk menerangkan konsep ayat penyata.',
      'Murid menjawab tiga soalan interaktif semasa tayangan.',
      'Guru menggunakan poster asal “Karnival Kejiranan Taman Harmoni” yang mengandungi empat zon aktiviti.',
      'Murid melaksanakan Think-Pair-Share dan berkongsi respons melalui Padlet.',
    ],
  },
  {
    id: 'langkah-2',
    title: 'Langkah 2',
    duration: '10 minit',
    route: '/langkah-2',
    routeLabel: 'Buka Langkah 2',
    icon: Gamepad2,
    cardStyle: 'bg-[#EAF9F1] border-[#9BE4BE]',
    badgeStyle: 'bg-[#70D6A1] text-[#243B53]',
    kickerStyle: 'text-[#1B6B46]',
    points: [
      'Murid dibahagikan kepada empat kumpulan.',
      'Murid menggunakan permainan “Misi Susun Ayat Kejiranan”.',
      'Murid menyusun perkataan melalui drag-and-drop dan menerima maklum balas segera.',
    ],
  },
  {
    id: 'langkah-3',
    title: 'Langkah 3',
    duration: '15 minit',
    route: '/langkah-3',
    routeLabel: 'Buka Langkah 3',
    icon: Newspaper,
    cardStyle: 'bg-[#FFF0EE] border-[#FFB8B3]',
    badgeStyle: 'bg-[#FF8D85] text-[#243B53]',
    kickerStyle: 'text-[#9E2F28]',
    points: [
      'Murid menjalankan “Misi Wartawan Cilik”.',
      'Guru menyediakan lembaran kerja mengikut tiga tahap: MB (4 ayat), MS (3 ayat), MA (2 ayat).',
      'Murid menghasilkan skrip berita berdasarkan poster.',
      'Wheel of Names digunakan untuk memilih murid membuat persembahan.',
    ],
  },
  {
    id: 'penutup',
    title: 'Penutup',
    duration: '5 minit',
    route: '/penutup',
    routeLabel: 'Buka Penutup',
    icon: Trophy,
    cardStyle: 'bg-[#F3EEFE] border-[#CFC0FA]',
    badgeStyle: 'bg-[#B8A0F5] text-[#243B53]',
    kickerStyle: 'text-[#4D348C]',
    points: [
      'Guru membimbing murid menjawab lima soalan Betul atau Salah melalui kuiz interaktif pada halaman Penutup.',
      'Guru dan murid menyemak jawapan serta membuat rumusan pembelajaran.',
    ],
  },
];

const SUPPORT_RESOURCES = [
  {
    id: 'wordwall',
    kicker: 'Bahan Alternatif Penutup',
    title: 'Kuiz Wordwall Asal — Rujukan Guru',
    description:
      'Pautan kuiz Wordwall asal disediakan sebagai alternatif rujukan guru selain kuiz natif pada halaman Penutup.',
    url: WORDWALL_ORIGINAL_URL,
    buttonLabel: 'Buka Kuiz Wordwall',
    icon: Trophy,
    cardStyle: 'bg-[#EAF6FE] border-[#A6DCFA]',
    iconBoxStyle: 'bg-[#57B8F2] text-[#243B53]',
    kickerStyle: 'text-[#166088]',
    buttonStyle:
      'bg-[#FFD65A] hover:bg-[#F7C942] border-[#EFC034] text-[#243B53]',
  },
  {
    id: 'padlet',
    kicker: 'Aktiviti Think-Pair-Share (Langkah 1)',
    title: 'Padlet — Ayat Penyata 4 Zon Harmoni',
    description:
      'Ruang perkongsian ayat penyata murid secara berpasangan berdasarkan empat zon aktiviti dalam poster karnival.',
    url: PADLET_URL,
    buttonLabel: 'Buka Padlet Kelas',
    icon: MessageSquareText,
    cardStyle: 'bg-[#EAF9F1] border-[#9BE4BE]',
    iconBoxStyle: 'bg-[#70D6A1] text-[#243B53]',
    kickerStyle: 'text-[#1B6B46]',
    buttonStyle:
      'bg-[#70D6A1] hover:bg-[#57C78D] border-[#52BD86] text-[#243B53]',
  },
  {
    id: 'permainan',
    kicker: 'Pembelajaran Berasaskan Permainan (Langkah 2)',
    title: 'Permainan — Misi Susun Ayat Kejiranan',
    description:
      'Permainan interaktif susun perkataan (drag-and-drop) secara berkumpulan dengan maklum balas segera.',
    url: EXTERNAL_GAME_URL,
    buttonLabel: 'Buka Permainan',
    icon: Gamepad2,
    cardStyle: 'bg-[#FFF8E1] border-[#FFE082]',
    iconBoxStyle: 'bg-[#FFD65A] text-[#243B53]',
    kickerStyle: 'text-[#7A5900]',
    buttonStyle:
      'bg-[#57B8F2] hover:bg-[#3FA7E8] border-[#3FA7E8] text-[#243B53]',
  },
];

const ASSESSMENT_GUIDES = [
  {
    id: 'awal',
    stage: 'Pentaksiran Awal',
    detail: 'Pemerhatian dan soal jawab lisan.',
    icon: Users,
    cardStyle: 'bg-[#FFF8E1] border-[#FFE082]',
    iconBoxStyle: 'bg-[#FFD65A] text-[#243B53]',
  },
  {
    id: 'formatif',
    stage: 'Pentaksiran Formatif',
    detail:
      'Respons Padlet, susunan ayat dalam permainan dan hasil penulisan skrip berita.',
    icon: ClipboardCheck,
    cardStyle: 'bg-[#EAF6FE] border-[#A6DCFA]',
    iconBoxStyle: 'bg-[#57B8F2] text-[#243B53]',
  },
  {
    id: 'penutup',
    stage: 'Pentaksiran Penutup',
    detail: 'Kuiz Betul atau Salah dengan maklum balas segera.',
    icon: CheckCircle2,
    cardStyle: 'bg-[#EAF9F1] border-[#9BE4BE]',
    iconBoxStyle: 'bg-[#70D6A1] text-[#243B53]',
  },
];

export function RuangGuruPage() {
  return (
    <div>
      {/* Banner Ruang Guru */}
      <section
        aria-labelledby="ruang-guru-heading"
        className="bg-gradient-to-br from-[#EAF6FE] via-[#FFF8E9] to-[#EAF9F1] border-b-2 border-[#A6DCFA]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-7 h-7" aria-hidden="true" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
                  Pusat Panduan Pengajaran &amp; Bahan Sokongan
                </p>
                <h1
                  id="ruang-guru-heading"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#243B53] leading-tight"
                >
                  Ruang Guru
                </h1>
                <p className="mt-2 text-base text-[#334E68] max-w-2xl leading-relaxed">
                  Panduan pengajaran dan bahan sokongan alternatif untuk guru
                  Bahasa Melayu Tahun 4 bagi tajuk{' '}
                  <strong className="font-semibold text-[#243B53]">
                    Semangat Kejiranan Memupuk Keharmonian
                  </strong>
                  .
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-sm px-5 py-2.5 rounded-xl border-2 border-[#EFC034] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Kembali ke Halaman Utama</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* BAHAGIAN 1 — MAKLUMAT PENGAJARAN */}
        <section aria-labelledby="maklumat-pengajaran-heading">
          <div className="bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-[#EAF6FE] border border-[#A6DCFA] text-[#166088] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#166088] uppercase tracking-wide">
                  Bahagian 1
                </p>
                <h2
                  id="maklumat-pengajaran-heading"
                  className="font-display text-2xl font-bold text-[#243B53]"
                >
                  Maklumat Pengajaran
                </h2>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEACHING_INFO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl bg-[#FFF8E9] border border-[#F2E2B6] p-4 ${
                    item.wide ? 'sm:col-span-2 lg:col-span-3' : ''
                  }`}
                >
                  <dt className="text-xs font-bold text-[#7A5900] uppercase tracking-wide">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm sm:text-base font-bold text-[#243B53] leading-snug">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* BAHAGIAN 2 — PANDUAN PELAKSANAAN PdP */}
        <section aria-labelledby="panduan-pdp-heading">
          <div className="mb-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#1B6B46] uppercase tracking-wide">
                Bahagian 2
              </p>
              <h2
                id="panduan-pdp-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                Panduan Pelaksanaan PdP
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#334E68]">
                Urutan pelaksanaan aktiviti mengikut Rancangan Pengajaran Harian
                (RPH) asal.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border-2 border-[#BCE3FA] text-xs sm:text-sm font-bold text-[#243B53] shrink-0">
              <Clock className="w-4 h-4 text-[#166088]" aria-hidden="true" />
              <span>Tempoh PdP: 60 minit</span>
            </div>
          </div>

          <div className="space-y-4">
            {PDP_STAGES.map((stage, index) => {
              const IconComponent = stage.icon;
              return (
                <article
                  key={stage.id}
                  className={`rounded-2xl border-2 shadow-xs p-5 sm:p-6 ${stage.cardStyle}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${stage.badgeStyle}`}
                      >
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </span>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`text-xs font-bold uppercase tracking-wide ${stage.kickerStyle}`}
                          >
                            Peringkat {index + 1}
                          </span>
                          <span aria-hidden="true" className="text-[#486581]">
                            ·
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#243B53] bg-white/90 border border-black/10 px-2.5 py-0.5 rounded-lg">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{stage.duration}</span>
                          </span>
                        </div>

                        <h3 className="mt-1 font-display text-xl font-bold text-[#243B53]">
                          {stage.title}
                        </h3>

                        <ul className="mt-3 space-y-2">
                          {stage.points.map((point) => (
                            <li
                              key={point}
                              className="flex items-start gap-2.5 text-sm sm:text-base text-[#243B53] leading-relaxed"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 w-1.5 h-1.5 rounded-full bg-[#243B53] shrink-0"
                              />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="shrink-0 md:pt-1">
                      <Link
                        to={stage.route}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-black/15 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] whitespace-nowrap"
                      >
                        <span>{stage.routeLabel}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-4 rounded-xl bg-white border border-[#BCE3FA] px-4 py-3 text-xs sm:text-sm text-[#334E68] leading-relaxed">
            <strong className="font-bold text-[#243B53]">Nota Tempoh RPH:</strong>{' '}
            Jumlah masa aktiviti utama yang disenaraikan bagi kelima-lima
            peringkat di atas ialah 50 minit dalam keseluruhan tempoh PdP 60
            minit sebagaimana RPH asal.
          </p>
        </section>

        {/* BAHAGIAN 3 — MOD PENYAMPAIAN */}
        <section aria-labelledby="mod-penyampaian-heading">
          <div className="mb-5">
            <p className="text-xs font-bold text-[#4D348C] uppercase tracking-wide">
              Bahagian 3
            </p>
            <h2
              id="mod-penyampaian-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
            >
              Mod Penyampaian
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="bg-white rounded-2xl border-2 border-[#A6DCFA] shadow-xs p-6 sm:p-7 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
                  <Presentation className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-[#243B53]">
                  Pengajaran Bersemuka Berbantukan Digital
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#334E68] leading-relaxed">
                Guru menggunakan Smart TV atau projektor untuk membimbing murid
                mengikuti kandungan, video dan kuiz. Murid turut menjalankan
                aktiviti kolaboratif serta penulisan secara fizikal mengikut
                RPH.
              </p>
            </article>

            <article className="bg-white rounded-2xl border-2 border-[#CFC0FA] shadow-xs p-6 sm:p-7 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#B8A0F5] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
                  <Laptop className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-[#243B53]">
                  Pembelajaran Kendiri
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#334E68] leading-relaxed">
                Murid boleh mengakses semula penerangan konsep, bahan
                pembelajaran dan latihan digital yang tersedia pada laman web
                mengikut kesesuaian. Walau bagaimanapun, aktiviti berkumpulan,
                persembahan dan lembaran kerja fizikal masih memerlukan
                pelaksanaan atau bimbingan guru.
              </p>
            </article>
          </div>
        </section>

        {/* BAHAGIAN 4 — BAHAN SOKONGAN GURU */}
        <section aria-labelledby="bahan-sokongan-heading">
          <div className="mb-5">
            <p className="text-xs font-bold text-[#166088] uppercase tracking-wide">
              Bahagian 4
            </p>
            <h2
              id="bahan-sokongan-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
            >
              Bahan Sokongan Guru
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#334E68]">
              Pautan terus kepada bahan digital rasmi yang digunakan dalam RPH
              (dibuka dalam tab baharu).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SUPPORT_RESOURCES.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <article
                  key={resource.id}
                  className={`rounded-2xl border-2 shadow-xs p-6 flex flex-col justify-between gap-5 ${resource.cardStyle}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${resource.iconBoxStyle}`}
                      >
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <p className={`text-xs font-bold ${resource.kickerStyle}`}>
                        {resource.kicker}
                      </p>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#243B53]">
                      {resource.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#334E68] leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 space-y-2.5">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 w-full font-bold text-sm px-4 py-2.5 rounded-xl border-2 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs ${resource.buttonStyle}`}
                    >
                      <span>{resource.buttonLabel}</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <p className="text-[11px] text-[#486581] break-all">
                      {resource.url}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* BAHAGIAN 5 — PANDUAN PENTAKSIRAN */}
        <section aria-labelledby="panduan-pentaksiran-heading">
          <div className="bg-white rounded-2xl border-2 border-[#70D6A1] shadow-xs p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-xl bg-[#EAF9F1] border border-[#9BE4BE] text-[#1B6B46] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold text-[#1B6B46] uppercase tracking-wide">
                  Bahagian 5
                </p>
                <h2
                  id="panduan-pentaksiran-heading"
                  className="font-display text-2xl font-bold text-[#243B53]"
                >
                  Panduan Pentaksiran
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ASSESSMENT_GUIDES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border-2 p-5 flex flex-col gap-3 ${item.cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${item.iconBoxStyle}`}
                      >
                        <IconComponent className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#243B53]">
                        {item.stage}
                      </h3>
                    </div>
                    <p className="text-sm text-[#243B53] leading-relaxed font-medium">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl bg-[#FFF8E9] border border-[#FFD65A] px-4 py-3.5 flex items-start gap-3">
              <ClipboardCheck
                className="w-5 h-5 text-[#7A5900] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm sm:text-base font-semibold text-[#243B53] leading-relaxed">
                Guru menggunakan maklum balas dan hasil kerja murid untuk
                mengenal pasti tahap penguasaan ayat penyata.
              </p>
            </div>
          </div>
        </section>

        {/* Butang Kembali ke Halaman Utama */}
        <div className="flex justify-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#BCE3FA] font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Kembali ke Halaman Utama</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
