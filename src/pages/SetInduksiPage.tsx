import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  HeartHandshake,
  Megaphone,
  MessageCircle,
  ClipboardList,
} from 'lucide-react';
import heroBannerImg from '../assets/images/hero_kejiranan_ceria_1794840572714.jpg';
import setInduksiImg from '../assets/images/set_induksi_kejiranan_1794840939299.jpg';
import { ResilientImage } from '../components/ResilientImage';
import { VideoPlayerSuasana } from '../components/VideoPlayerSuasana';

const DISCUSSION_QUESTIONS = [
  {
    id: 'q-1',
    number: 'Soalan 1',
    text: 'Apakah yang dilakukan oleh Mei Lin dan Ruphinee?',
    icon: MessageCircle,
    cardStyle: 'bg-[#EAF6FE] border-[#A6DCFA]',
    iconStyle: 'bg-[#57B8F2] text-[#243B53]',
    labelStyle: 'text-[#166088]',
  },
  {
    id: 'q-2',
    number: 'Soalan 2',
    text: 'Apakah cara kita membantu jiran yang sakit?',
    icon: HeartHandshake,
    cardStyle: 'bg-[#EAF9F1] border-[#9BE4BE]',
    iconStyle: 'bg-[#70D6A1] text-[#243B53]',
    labelStyle: 'text-[#1B6B46]',
  },
  {
    id: 'q-3',
    number: 'Soalan 3',
    text: 'Bagaimanakah kita menceritakan aktiviti ini?',
    icon: Megaphone,
    cardStyle: 'bg-[#FFF8E1] border-[#FFE082]',
    iconStyle: 'bg-[#FFD65A] text-[#243B53]',
    labelStyle: 'text-[#7A5900]',
  },
];

export function SetInduksiPage() {
  const [showConceptExample, setShowConceptExample] = useState(true);

  return (
    <div>
      {/* 1. Banner Bertemakan Kejiranan Malaysia & Tajuk Set Induksi */}
      <section
        aria-labelledby="set-induksi-heading"
        className="bg-gradient-to-br from-[#DDF1FD] via-[#EAF6FE] to-[#FFF8E9] border-b-2 border-[#A6DCFA]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-[#166088] mb-3">
                <span>Set Induksi</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>5 minit</span>
                </span>
              </div>

              <h1
                id="set-induksi-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-[#243B53] leading-tight text-balance"
              >
                Suasana Kampung Muafakat
              </h1>

              <p className="mt-3 text-base text-[#334E68] max-w-xl leading-relaxed">
                Tonton video animasi kejiranan, bincangkan soalan bersama guru, dan
                kenali maksud ayat penyata secara ringkas sebelum meneroka poster
                kejiranan.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#BCE3FA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Kembali ke Halaman Utama</span>
                </Link>
                <Link
                  to="/langkah-1"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
                >
                  <span>Terokai Poster Kejiranan</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-[#A6DCFA] shadow-sm bg-white aspect-[16/9]">
                <ResilientImage
                  src={heroBannerImg}
                  alt="Ilustrasi suasana kejiranan Malaysia yang ceria dan harmoni."
                  fallbackTitle="Suasana Kampung Muafakat"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pengenalan Ringkas: "Jom Kenali Jiran Kita!" */}
      <section
        aria-labelledby="kenali-jiran-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12"
      >
        <div className="bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold text-[#1B6B46] tracking-wide mb-2">
                Langkah Set Induksi 1 · Tonton &amp; Perhatikan
              </p>
              <h2
                id="kenali-jiran-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
              >
                Jom Kenali Jiran Kita!
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#334E68] leading-relaxed">
                Perhatikan suasana kejiranan dalam video berikut. Apakah amalan
                baik yang dapat kamu lihat?
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border-2 border-[#9BE4BE] bg-[#EAF9F1] aspect-[16/9]">
                <ResilientImage
                  src={setInduksiImg}
                  alt="Ilustrasi 2D Mei Lin dan Ruphinee bersama jiran pelbagai kaum membawa buah-buahan untuk menziarahi jiran."
                  fallbackTitle="Jom Kenali Jiran Kita!"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pemain Video HTML5: Video Suasana Kampung Muafakat */}
      <section
        aria-labelledby="video-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
      >
        <div className="mb-5">
          <p className="text-xs font-bold text-[#166088] tracking-wide mb-1">
            Bahan Rangsangan Video
          </p>
          <h2
            id="video-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
          >
            Video Suasana Kampung Muafakat
          </h2>
        </div>

        <VideoPlayerSuasana />
      </section>

      {/* 4. Soalan Rangsangan ("Mari Kita Berbincang!") & Nota Pentaksiran Guru */}
      <section
        aria-labelledby="bincang-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12"
      >
        <div>
          <p className="text-xs font-bold text-[#9E2F28] tracking-wide mb-1">
            Langkah Set Induksi 2 · Soal Jawab Lisan Bersama Guru
          </p>
          <h2
            id="bincang-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
          >
            Mari Kita Berbincang!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {DISCUSSION_QUESTIONS.map((question) => {
            const IconComponent = question.icon;
            return (
              <article
                key={question.id}
                className={`rounded-2xl border-2 shadow-xs p-6 flex flex-col gap-4 ${question.cardStyle}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${question.iconStyle}`}
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className={`text-xs font-bold ${question.labelStyle}`}>
                    {question.number}
                  </span>
                </div>
                <p className="font-display text-lg font-bold text-[#243B53] leading-snug">
                  {question.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl bg-white border-2 border-[#CFC0FA] shadow-xs p-5 sm:p-6 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#B8A0F5] text-[#243B53] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#4D348C] mb-1">
              Nota Pentaksiran Guru
            </p>
            <p className="text-sm sm:text-base font-medium text-[#243B53] leading-relaxed">
              Pentaksiran dilaksanakan melalui pemerhatian dan soal jawab lisan
              oleh guru.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Pengenalan Ringkas: "Kenali Ayat Penyata" */}
      <section
        aria-labelledby="kenali-ayat-penyata-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-4"
      >
        <div className="bg-white rounded-2xl border-2 border-[#70D6A1] shadow-xs p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#70D6A1] text-[#243B53] flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold text-[#1B6B46] tracking-wide mb-1">
                  Langkah Set Induksi 3 · Perkaitan Konsep Asas
                </p>
                <h2
                  id="kenali-ayat-penyata-heading"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
                >
                  Kenali Ayat Penyata
                </h2>
                <p className="mt-3 text-base sm:text-lg text-[#243B53] leading-relaxed max-w-2xl">
                  Ayat penyata ialah ayat yang digunakan untuk menyatakan sesuatu
                  maklumat atau berita.
                </p>

                {/* Kad Konsep Ringkas & Interaktif */}
                <div className="mt-5 rounded-2xl border-2 border-[#A6DCFA] bg-[#EAF6FE] overflow-hidden max-w-2xl">
                  <button
                    type="button"
                    onClick={() => setShowConceptExample((prev) => !prev)}
                    aria-expanded={showConceptExample}
                    className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left text-sm font-bold text-[#243B53] hover:bg-[#DDF1FD] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] min-h-[44px]"
                  >
                    <span>Contoh Mudah Ayat Penyata</span>
                    {showConceptExample ? (
                      <ChevronUp className="w-4 h-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>

                  {showConceptExample && (
                    <div className="px-5 pb-5 pt-1">
                      <div className="rounded-xl bg-[#FFF8E9] border border-[#FFD65A] p-4">
                        <p className="font-display text-lg sm:text-xl font-bold text-[#243B53] leading-relaxed">
                          <span
                            title="Huruf besar pada awal ayat"
                            className="inline-block bg-[#FFD65A] text-[#243B53] px-1.5 rounded border border-[#EFC034] mr-0.5"
                          >
                            P
                          </span>
                          <span>
                            enduduk taman bekerjasama membersihkan kawasan
                            kejiranan
                          </span>
                          <span
                            title="Tanda noktah pada akhir ayat"
                            className="inline-block bg-[#FF8D85] text-[#243B53] px-2 rounded border border-[#F47269] ml-0.5"
                          >
                            .
                          </span>
                        </p>

                        <div className="mt-3 pt-3 border-t border-[#F5E1B0] flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#243B53]">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              className="w-3.5 h-3.5 rounded bg-[#FFD65A] border border-[#EFC034]"
                            />
                            <span>Dimulakan dengan huruf besar (P)</span>
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              className="w-3.5 h-3.5 rounded bg-[#FF8D85] border border-[#F47269]"
                            />
                            <span>Diakhiri dengan tanda noktah (.)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="shrink-0 md:self-center">
              <Link
                to="/langkah-1"
                className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-base px-6 py-3 rounded-xl shadow-xs transition-all hover:-translate-y-0.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 whitespace-nowrap"
              >
                <span>Terokai Poster Kejiranan</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
