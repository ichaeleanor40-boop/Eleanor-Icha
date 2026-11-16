import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenCheck,
  PenLine,
  PlayCircle,
  Lightbulb,
  Puzzle,
  Newspaper,
  ClipboardCheck,
} from 'lucide-react';
import heroBannerImg from '../assets/images/hero_kejiranan_ceria_1794840572714.jpg';
import {
  CONTENT_MODULES,
  LEARNING_OBJECTIVES,
  LESSON_METADATA,
  type ContentModuleCard,
} from '../data/learningContent';
import { ResilientImage } from '../components/ResilientImage';
import { WelcomeMascotSection } from '../components/WelcomeMascotSection';

const MODULE_COLOR_STYLES: Record<
  ContentModuleCard['accentColor'],
  {
    card: string;
    iconBox: string;
    stepText: string;
    divider: string;
  }
> = {
  sky: {
    card: 'bg-[#EAF6FE] border-[#A6DCFA] hover:border-[#57B8F2]',
    iconBox: 'bg-[#57B8F2] text-[#243B53]',
    stepText: 'text-[#166088]',
    divider: 'border-[#CBE8FA]',
  },
  green: {
    card: 'bg-[#EAF9F1] border-[#9BE4BE] hover:border-[#70D6A1]',
    iconBox: 'bg-[#70D6A1] text-[#243B53]',
    stepText: 'text-[#1B6B46]',
    divider: 'border-[#C5F0DA]',
  },
  yellow: {
    card: 'bg-[#FFF8E1] border-[#FFE082] hover:border-[#FFD65A]',
    iconBox: 'bg-[#FFD65A] text-[#243B53]',
    stepText: 'text-[#7A5900]',
    divider: 'border-[#F7E6A8]',
  },
  coral: {
    card: 'bg-[#FFF0EE] border-[#FFB8B3] hover:border-[#FF8D85]',
    iconBox: 'bg-[#FF8D85] text-[#243B53]',
    stepText: 'text-[#9E2F28]',
    divider: 'border-[#FAD3D0]',
  },
  purple: {
    card: 'bg-[#F3EEFE] border-[#CFC0FA] hover:border-[#B8A0F5]',
    iconBox: 'bg-[#B8A0F5] text-[#243B53]',
    stepText: 'text-[#4D348C]',
    divider: 'border-[#E0D5FC]',
  },
};

function ModuleIcon({
  iconName,
  accentColor,
}: {
  iconName: ContentModuleCard['iconName'];
  accentColor: ContentModuleCard['accentColor'];
}) {
  const styles = MODULE_COLOR_STYLES[accentColor];

  const IconComponent =
    iconName === 'play'
      ? PlayCircle
      : iconName === 'lightbulb'
        ? Lightbulb
        : iconName === 'puzzle'
          ? Puzzle
          : iconName === 'newspaper'
            ? Newspaper
            : ClipboardCheck;

  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${styles.iconBox}`}
    >
      <IconComponent className="w-6 h-6" aria-hidden="true" />
    </div>
  );
}

export function HomePage() {
  const basicMetadata = LESSON_METADATA.filter((item) => !item.fullWidth);
  const standardMetadata = LESSON_METADATA.filter((item) => item.fullWidth);

  return (
    <div>
      {/* 1. Banner Halaman Utama */}
      <section
        aria-labelledby="hero-heading"
        className="bg-gradient-to-br from-[#DDF1FD] via-[#EAF6FE] to-[#FFF8E9] border-b-2 border-[#A6DCFA]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs sm:text-sm font-semibold text-[#166088] tracking-wide mb-3">
                Bahasa Melayu Tahun 4 · Tema Kemasyarakatan
              </p>
              <h1
                id="hero-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#243B53] leading-[1.15] text-balance"
              >
                Jom Belajar Ayat Penyata!
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#334E68] leading-relaxed max-w-xl">
                Kenali ayat penyata melalui kehidupan berjiran yang harmoni.
              </p>
              <div className="mt-7">
                <Link
                  to="/set-induksi"
                  className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] active:bg-[#EFC034] text-[#243B53] font-bold text-base px-6 py-3 rounded-xl shadow-xs transition-all hover:-translate-y-0.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  <span>Mula Belajar</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border-2 border-[#A6DCFA] shadow-sm bg-white aspect-[16/9]">
                <ResilientImage
                  src={heroBannerImg}
                  alt="Ilustrasi 2D panorama kawasan kejiranan Malaysia yang ceria dengan langit biru, rumah teres berwarna-warni, taman permainan dan penduduk pelbagai kaum yang saling bertegur sapa."
                  fallbackTitle="Panorama Kejiranan Ceria"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Seksyen Selamat Datang & Maskot Harmoni */}
      <WelcomeMascotSection />

      {/* 3. Seksyen Objektif Pembelajaran */}
      <section
        aria-labelledby="objectives-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      >
        <div>
          <p className="text-xs font-semibold text-[#166088] tracking-wide mb-1.5">
            Matlamat Pembelajaran
          </p>
          <h2
            id="objectives-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
          >
            Objektif Pembelajaran
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {LEARNING_OBJECTIVES.map((objective, idx) => {
            const isFirst = idx === 0;
            return (
              <article
                key={objective.id}
                className={`rounded-2xl border-2 shadow-xs p-6 sm:p-7 flex items-start gap-4 ${
                  isFirst
                    ? 'bg-[#EAF9F1] border-[#9BE4BE]'
                    : 'bg-[#F3EEFE] border-[#CFC0FA]'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isFirst
                      ? 'bg-[#70D6A1] text-[#243B53]'
                      : 'bg-[#B8A0F5] text-[#243B53]'
                  }`}
                >
                  {objective.iconName === 'book' ? (
                    <BookOpenCheck className="w-6 h-6" aria-hidden="true" />
                  ) : (
                    <PenLine className="w-6 h-6" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-xs font-bold mb-1.5 ${
                      isFirst ? 'text-[#1B6B46]' : 'text-[#4D348C]'
                    }`}
                  >
                    {objective.label}
                  </p>
                  <p className="text-base text-[#243B53] leading-relaxed">
                    {objective.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Seksyen Kandungan Pembelajaran */}
      <section
        aria-labelledby="modules-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
      >
        <div>
          <p className="text-xs font-semibold text-[#166088] tracking-wide mb-1.5">
            Aliran Aktiviti PdP
          </p>
          <h2
            id="modules-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
          >
            Jelajah Kandungan Pembelajaran
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {CONTENT_MODULES.map((module) => {
            const colorStyle = MODULE_COLOR_STYLES[module.accentColor];
            return (
              <Link
                key={module.id}
                to={module.path}
                className={`group rounded-2xl border-2 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-6 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 ${colorStyle.card}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <ModuleIcon
                      iconName={module.iconName}
                      accentColor={module.accentColor}
                    />
                    <span className={`text-xs font-bold ${colorStyle.stepText}`}>
                      {module.stepLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#243B53]">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#334E68] leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-4 border-t flex items-center justify-between text-sm font-bold text-[#243B53] ${colorStyle.divider}`}
                >
                  <span>Buka {module.stepLabel}</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Seksyen Maklumat Pembelajaran */}
      <section
        aria-labelledby="info-heading"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4"
      >
        <div className="bg-white rounded-2xl border-2 border-[#BCE3FA] shadow-xs p-6 sm:p-8">
          <h2
            id="info-heading"
            className="font-display text-xl sm:text-2xl font-bold text-[#243B53]"
          >
            Maklumat Pembelajaran
          </h2>

          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            {basicMetadata.map((item) => (
              <div
                key={item.label}
                className="bg-[#FFF8E9] rounded-xl border border-[#F5E1B0] p-4"
              >
                <dt className="text-xs font-semibold text-[#486581]">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm sm:text-base font-bold text-[#243B53]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#EAF6FE]">
            {standardMetadata.map((item) => (
              <div
                key={item.label}
                className="bg-[#EAF6FE] rounded-xl border border-[#BCE3FA] p-4"
              >
                <dt className="text-xs font-semibold text-[#166088]">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-[#243B53] leading-relaxed">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
