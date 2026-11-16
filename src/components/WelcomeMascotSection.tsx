import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Loader2,
  RotateCcw,
  Square,
  Volume2,
  AlertCircle,
} from 'lucide-react';
import mascotHarmoniImg from '../assets/images/mascot_harmoni_1794839891901.jpg';
import { ResilientImage } from './ResilientImage';

const HARMONI_DISPLAY_DIALOGUE =
  'Hai, sahabat Tahun 4! Saya Harmoni. Selamat datang ke dunia ayat penyata! Hari ini, kita akan belajar tentang ayat penyata melalui kehidupan berjiran yang harmoni. Jom belajar bersama-sama!';

const HARMONI_TTS_SCRIPT =
  'Hai, sahabat Tahun Empat! Saya Harmoni. Selamat datang ke dunia ayat penyata! Hari ini, kita akan belajar tentang ayat penyata melalui kehidupan berjiran yang harmoni. Jom belajar bersama-sama!';

type AudioState = 'idle' | 'loading' | 'playing' | 'error';

function base64ToBlobUrl(base64: string, mimeType: string): string {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
}

export function WelcomeMascotSection() {
  const [audioState, setAudioState] = useState<AudioState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCachedAudio, setHasCachedAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cachedUrlRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      abortControllerRef.current?.abort();
      if (audioEl) {
        audioEl.pause();
        audioEl.removeAttribute('src');
      }
      if (cachedUrlRef.current) {
        URL.revokeObjectURL(cachedUrlRef.current);
        cachedUrlRef.current = null;
      }
    };
  }, []);

  async function ensureAndPlayAudio(restartFromStart: boolean) {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    setErrorMessage(null);

    if (cachedUrlRef.current) {
      try {
        if (restartFromStart) {
          audioEl.currentTime = 0;
        } else if (audioState === 'playing') {
          return;
        }
        if (audioEl.src !== cachedUrlRef.current) {
          audioEl.src = cachedUrlRef.current;
        }
        await audioEl.play();
        setAudioState('playing');
      } catch {
        setAudioState('error');
        setErrorMessage(
          'Pelayar menyekat main balik audio. Sila tekan butang "Dengar Harmoni" sekali lagi.'
        );
      }
      return;
    }

    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setAudioState('loading');

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: HARMONI_TTS_SCRIPT }),
        signal: controller.signal,
      });

      const data = (await response.json().catch(() => ({}))) as {
        audioBase64?: string;
        mimeType?: string;
        error?: string;
      };

      if (!response.ok || !data.audioBase64) {
        throw new Error(
          data.error ||
            'Suara AI tidak dapat dijana buat masa ini. Sila pastikan pelayan TTS dan GEMINI_API_KEY telah dikonfigurasi.'
        );
      }

      const objectUrl = base64ToBlobUrl(
        data.audioBase64,
        data.mimeType || 'audio/wav'
      );
      cachedUrlRef.current = objectUrl;
      setHasCachedAudio(true);

      audioEl.src = objectUrl;
      audioEl.currentTime = 0;
      await audioEl.play();
      setAudioState('playing');
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setAudioState('idle');
        return;
      }
      setAudioState('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Penjanaan audio gagal. Sila cuba sebentar lagi.'
      );
    }
  }

  function handleStop() {
    abortControllerRef.current?.abort();
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    setAudioState('idle');
  }

  function handleReplay() {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    void ensureAndPlayAudio(true);
  }

  const isPlaying = audioState === 'playing';
  const isLoading = audioState === 'loading';

  return (
    <section
      aria-labelledby="welcome-heading"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6"
    >
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => setAudioState('idle')}
        onError={() => {
          setAudioState('error');
          setErrorMessage('Audio tidak dapat dimainkan oleh pelayar.');
        }}
      />

      <div className="relative overflow-hidden bg-[#EAF6FE] rounded-2xl border-2 border-[#A6DCFA] shadow-xs p-6 sm:p-10">
        {/* Elemen dekoratif halus: awan, bintang dan corak geometri */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 120"
          className="pointer-events-none select-none absolute -top-4 -right-4 w-40 h-24 text-white/75"
          fill="currentColor"
        >
          <circle cx="70" cy="65" r="28" />
          <circle cx="105" cy="52" r="34" />
          <circle cx="140" cy="68" r="24" />
          <rect x="65" y="65" width="80" height="28" rx="14" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="pointer-events-none select-none absolute top-6 right-44 w-6 h-6 text-[#FFD65A]"
          fill="currentColor"
        >
          <path d="M20 2l4.6 11.4L37 15l-9.2 8 2.8 12L20 28.6 9.4 35l2.8-12L3 15l12.4-1.6z" />
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#57B8F2]/15"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolum Kiri: Tajuk, Penerangan Ringkas, Kawalan Audio & Butang Mula Belajar */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold text-[#166088] tracking-wide mb-2">
              Pengenalan
            </p>
            <h2
              id="welcome-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#243B53] leading-snug text-balance"
            >
              Selamat Datang ke Dunia Ayat Penyata!
            </h2>
            <p className="mt-4 text-base text-[#334E68] leading-relaxed max-w-xl">
              Hai, sahabat Tahun 4! Mari kita belajar memahami dan membina ayat
              penyata melalui aktiviti menarik yang berkaitan dengan kehidupan
              berjiran. Bersedia untuk belajar bersama-sama?
            </p>

            {/* Kawalan Audio Harmoni */}
            <div className="mt-6 pt-5 border-t border-[#BCE3FA]">
              <p className="text-xs font-semibold text-[#334E68] mb-3">
                Ucapan Suara AI Maskot Harmoni (Bahasa Melayu)
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => void ensureAndPlayAudio(false)}
                  disabled={isLoading || isPlaying}
                  aria-live="polite"
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 whitespace-nowrap shadow-xs ${
                    isPlaying
                      ? 'bg-[#57B8F2] text-[#243B53] border-[#3FA7E8]'
                      : isLoading
                        ? 'bg-[#FFF0EE] text-[#243B53] border-[#FFB8B3] cursor-wait'
                        : 'bg-[#FF8D85] hover:bg-[#FA776E] text-[#243B53] border-[#F47269]'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>
                    {isLoading
                      ? 'Menjana Suara...'
                      : isPlaying
                        ? 'Sedang Bercakap'
                        : 'Dengar Harmoni'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleStop}
                  disabled={!isPlaying && !isLoading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#BCE3FA] bg-white text-[#243B53] hover:bg-[#FFF8E9] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2] focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                  <span>Hentikan</span>
                </button>

                <button
                  type="button"
                  onClick={handleReplay}
                  disabled={isLoading || (!hasCachedAudio && !isPlaying)}
                  title={
                    hasCachedAudio
                      ? 'Mainkan semula ucapan Harmoni'
                      : 'Tekan Dengar Harmoni dahulu untuk menjana ucapan'
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-[#BCE3FA] bg-white text-[#243B53] hover:bg-[#FFF8E9] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2] focus-visible:ring-offset-2 whitespace-nowrap"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Ulang</span>
                </button>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="mt-3 flex items-start gap-2.5 rounded-xl bg-[#FFF8E9] border border-[#FFD65A] px-4 py-3 text-sm text-[#243B53]"
                >
                  <AlertCircle
                    className="w-4 h-4 text-[#B83B33] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Link
                to="/set-induksi"
                className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-xs transition-all hover:-translate-y-0.5 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 whitespace-nowrap"
              >
                <span>Mula Belajar</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Kolum Kanan: Maskot Harmoni + Gelombang Suara Lembut + Kotak Dialog */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-white border border-[#BCE3FA] shadow-xs p-6 sm:p-7 flex flex-col items-center text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
                <div className="relative shrink-0">
                  <div
                    className={`w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 bg-[#EAF9F1] transition-shadow ${
                      isPlaying
                        ? 'border-[#57B8F2] shadow-md ring-4 ring-[#57B8F2]/25'
                        : 'border-[#70D6A1]'
                    }`}
                  >
                    <ResilientImage
                      src={mascotHarmoniImg}
                      alt="Ilustrasi maskot Harmoni, seorang murid sekolah rendah yang mesra dan ceria sambil memegang buku."
                      fallbackTitle="Maskot Harmoni"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {isPlaying && (
                    <div
                      aria-hidden="true"
                      className="mt-2.5 flex items-end justify-center gap-1 h-4"
                    >
                      <span
                        className="w-1.5 h-3 rounded-full bg-[#57B8F2] animate-harmoni-wave"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-1.5 h-4 rounded-full bg-[#FF8D85] animate-harmoni-wave"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-1.5 h-2.5 rounded-full bg-[#70D6A1] animate-harmoni-wave"
                        style={{ animationDelay: '300ms' }}
                      />
                      <span
                        className="w-1.5 h-3.5 rounded-full bg-[#FFD65A] animate-harmoni-wave"
                        style={{ animationDelay: '450ms' }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <div className="flex items-center justify-center sm:justify-between gap-2 mb-2">
                    <p className="text-xs font-bold text-[#1B6B46]">
                      Maskot Harmoni
                    </p>
                    {isPlaying && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#166088]">
                        <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Sedang Bercakap</span>
                      </span>
                    )}
                  </div>

                  <div className="bg-[#FFF8E9] border-2 border-[#FFD65A] rounded-2xl p-4 sm:p-5 text-sm text-[#243B53] leading-relaxed text-left">
                    “{HARMONI_DISPLAY_DIALOGUE}”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
