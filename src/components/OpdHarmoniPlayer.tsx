import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import {
  AlertCircle,
  Captions,
  Film,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  OPD_QUESTIONS,
  OPD_SCENES,
  OPD_TOTAL_DURATION_SEC,
  type OpdCheckpointQuestion,
} from '../data/opdHarmoniData';
import { OpdAnimasiPentas } from './OpdAnimasiPentas';
import { OpdSoalanOverlay } from './OpdSoalanOverlay';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const clamped = Math.min(seconds, OPD_TOTAL_DURATION_SEC);
  const mins = Math.floor(clamped / 60);
  const secs = Math.floor(clamped % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function base64ToBlobUrl(base64: string, mimeType: string): string {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
}

function getSceneIndexAtTime(timeSec: number): number {
  for (let i = OPD_SCENES.length - 1; i >= 0; i -= 1) {
    if (timeSec >= OPD_SCENES[i].startTime) {
      return i;
    }
  }
  return 0;
}

export function OpdHarmoniPlayer() {
  const [globalTime, setGlobalTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  const [activeQuestion, setActiveQuestion] =
    useState<OpdCheckpointQuestion | null>(null);
  const [answersByQuestionId, setAnswersByQuestionId] = useState<
    Record<string, string>
  >({});
  const [clearedCheckpoints, setClearedCheckpoints] = useState<
    Record<string, boolean>
  >({});

  // Audio AI TTS states
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Optional real MP4 replacement mode
  const [mp4Src, setMp4Src] = useState<string | null>(null);
  const [mp4FileName, setMp4FileName] = useState<string | null>(null);
  const [mp4Duration, setMp4Duration] = useState<number>(
    OPD_TOTAL_DURATION_SEC
  );
  const [mp4Error, setMp4Error] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const ttsCacheRef = useRef<Map<string, string>>(new Map());
  const inFlightTtsRef = useRef<Map<string, Promise<string>>>(new Map());
  const currentAudioSceneIdRef = useRef<string | null>(null);
  const spokenScenesRef = useRef<Set<string>>(new Set());
  const localMp4UrlRef = useRef<string | null>(null);
  const isAudioPlayingRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);

  useEffect(() => {
    isAudioPlayingRef.current = isAudioPlaying;
  }, [isAudioPlaying]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const audioEl = audioRef.current;
    const cacheMap = ttsCacheRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
        audioEl.removeAttribute('src');
      }
      cacheMap.forEach((url) => URL.revokeObjectURL(url));
      cacheMap.clear();
      if (localMp4UrlRef.current) {
        URL.revokeObjectURL(localMp4UrlRef.current);
      }
    };
  }, []);

  const currentSceneIndex = getSceneIndexAtTime(globalTime);
  const currentScene = OPD_SCENES[currentSceneIndex];

  const fetchSceneTts = useCallback(async (sceneId: string, text: string) => {
    const cached = ttsCacheRef.current.get(sceneId);
    if (cached) return cached;

    const existingPromise = inFlightTtsRef.current.get(sceneId);
    if (existingPromise) return existingPromise;

    const promise = (async () => {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        audioBase64?: string;
        mimeType?: string;
        error?: string;
      };

      if (!response.ok || !data.audioBase64) {
        throw new Error(
          data.error ||
            'Suara AI Harmoni tidak dapat dijana buat masa ini. Sila cuba lagi.'
        );
      }

      const objectUrl = base64ToBlobUrl(
        data.audioBase64,
        data.mimeType || 'audio/wav'
      );
      ttsCacheRef.current.set(sceneId, objectUrl);
      return objectUrl;
    })().finally(() => {
      inFlightTtsRef.current.delete(sceneId);
    });

    inFlightTtsRef.current.set(sceneId, promise);
    return promise;
  }, []);

  const playSceneNarration = useCallback(
    async (sceneIndex: number) => {
      if (mp4Src) return;
      const scene = OPD_SCENES[sceneIndex];
      const audioEl = audioRef.current;
      if (!scene || !audioEl) return;

      // Resume paused audio for same scene
      if (
        currentAudioSceneIdRef.current === scene.id &&
        audioEl.src &&
        audioEl.paused &&
        !audioEl.ended &&
        audioEl.currentTime > 0
      ) {
        try {
          audioEl.muted = isMutedRef.current;
          await audioEl.play();
          setIsAudioPlaying(true);
        } catch {
          setIsAudioPlaying(false);
        }
        return;
      }

      if (spokenScenesRef.current.has(scene.id)) {
        return;
      }

      spokenScenesRef.current.add(scene.id);
      currentAudioSceneIdRef.current = scene.id;
      setAudioError(null);
      setIsAudioLoading(true);

      try {
        const audioUrl = await fetchSceneTts(scene.id, scene.narration);
        if (!isPlayingRef.current || currentAudioSceneIdRef.current !== scene.id) {
          setIsAudioLoading(false);
          return;
        }

        audioEl.src = audioUrl;
        audioEl.currentTime = 0;
        audioEl.muted = isMutedRef.current;
        await audioEl.play();
        setIsAudioLoading(false);
        setIsAudioPlaying(true);

        // Prefetch next scene quietly for seamless playback
        const nextScene = OPD_SCENES[sceneIndex + 1];
        if (nextScene && !ttsCacheRef.current.has(nextScene.id)) {
          void fetchSceneTts(nextScene.id, nextScene.narration).catch(() => {});
        }
      } catch (err) {
        setIsAudioLoading(false);
        setIsAudioPlaying(false);
        setAudioError(
          err instanceof Error
            ? err.message
            : 'Penjanaan suara AI gagal. Animasi dan sarikata kekal berjalan.'
        );
      }
    },
    [fetchSceneTts, mp4Src]
  );

  // Trigger scene narration whenever playing enters a scene
  useEffect(() => {
    if (!isPlaying || mp4Src || activeQuestion) return;
    void playSceneNarration(currentSceneIndex);
  }, [isPlaying, currentSceneIndex, mp4Src, activeQuestion, playSceneNarration]);

  // Prototype 2D timeline loop
  useEffect(() => {
    if (!isPlaying || mp4Src || activeQuestion) return;

    const timer = window.setInterval(() => {
      setGlobalTime((prev) => {
        const sceneIdx = getSceneIndexAtTime(prev);
        const scene = OPD_SCENES[sceneIdx];
        const sceneEnd = scene.startTime + scene.durationSec;
        const next = Number((prev + 0.2).toFixed(1));

        if (next >= sceneEnd) {
          // Wait gently if Harmoni is still finishing the sentence
          if (isAudioPlayingRef.current) {
            return sceneEnd - 0.1;
          }

          const checkpoint = OPD_QUESTIONS.find(
            (q) => q.afterSceneIndex === sceneIdx && !clearedCheckpoints[q.id]
          );

          if (checkpoint) {
            setIsPlaying(false);
            setActiveQuestion(checkpoint);
            return sceneEnd;
          }

          if (next >= OPD_TOTAL_DURATION_SEC) {
            setIsPlaying(false);
            setIsCompleted(true);
            return OPD_TOTAL_DURATION_SEC;
          }
        }

        return Math.min(next, OPD_TOTAL_DURATION_SEC);
      });
    }, 200);

    return () => window.clearInterval(timer);
  }, [isPlaying, mp4Src, activeQuestion, clearedCheckpoints]);

  function handlePlay() {
    if (activeQuestion) return;

    if (mp4Src && videoRef.current) {
      setHasStarted(true);
      setIsCompleted(false);
      void videoRef.current.play();
      return;
    }

    if (isCompleted || globalTime >= OPD_TOTAL_DURATION_SEC) {
      handleReplay();
      return;
    }

    setHasStarted(true);
    setIsPlaying(true);
  }

  function handlePause() {
    if (mp4Src && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(false);
    const audioEl = audioRef.current;
    if (audioEl && !audioEl.paused) {
      audioEl.pause();
    }
    setIsAudioPlaying(false);
  }

  function handleReplay() {
    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }

    spokenScenesRef.current.clear();
    currentAudioSceneIdRef.current = null;
    setIsAudioPlaying(false);
    setIsAudioLoading(false);
    setAudioError(null);
    setActiveQuestion(null);
    setAnswersByQuestionId({});
    setClearedCheckpoints({});
    setIsCompleted(false);
    setGlobalTime(0);
    setHasStarted(true);

    if (mp4Src && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play();
      return;
    }

    setIsPlaying(true);
  }

  function handleSelectScene(sceneIndex: number) {
    if (activeQuestion) return;
    const targetScene = OPD_SCENES[sceneIndex];
    if (!targetScene) return;

    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    currentAudioSceneIdRef.current = null;
    spokenScenesRef.current.delete(targetScene.id);
    setIsAudioPlaying(false);
    setIsCompleted(false);
    setHasStarted(true);
    setGlobalTime(targetScene.startTime);

    // Clear future checkpoint flags so jumping backwards still replays checkpoints naturally
    setClearedCheckpoints((prev) => {
      const next = { ...prev };
      OPD_QUESTIONS.forEach((q) => {
        if (q.afterSceneIndex >= sceneIndex) {
          delete next[q.id];
        }
      });
      return next;
    });

    if (mp4Src && videoRef.current) {
      videoRef.current.currentTime = targetScene.startTime;
    }
  }

  function handleSelectOption(option: string) {
    if (!activeQuestion) return;
    setAnswersByQuestionId((prev) => ({
      ...prev,
      [activeQuestion.id]: option,
    }));
  }

  function handleContinueAfterQuestion() {
    if (!activeQuestion) return;
    const chosen = answersByQuestionId[activeQuestion.id];
    if (!chosen) return;

    const currentCheckpoint = activeQuestion;
    setClearedCheckpoints((prev) => ({
      ...prev,
      [currentCheckpoint.id]: true,
    }));
    setActiveQuestion(null);

    if (mp4Src && videoRef.current) {
      void videoRef.current.play();
      return;
    }

    const nextScene = OPD_SCENES[currentCheckpoint.afterSceneIndex + 1];
    if (nextScene) {
      spokenScenesRef.current.delete(nextScene.id);
      setGlobalTime(nextScene.startTime);
    }
    setIsPlaying(true);
  }

  function handleMp4FileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (localMp4UrlRef.current) {
      URL.revokeObjectURL(localMp4UrlRef.current);
    }

    const audioEl = audioRef.current;
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }

    const nextUrl = URL.createObjectURL(file);
    localMp4UrlRef.current = nextUrl;
    setMp4FileName(file.name);
    setMp4Src(nextUrl);
    setMp4Error(null);
    setIsPlaying(false);
    setHasStarted(false);
    setGlobalTime(0);
    setActiveQuestion(null);
    setClearedCheckpoints({});
    setAnswersByQuestionId({});
  }

  function handleSwitchToPrototypeMode() {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setMp4Src(null);
    setMp4FileName(null);
    setMp4Error(null);
    setIsPlaying(false);
    setHasStarted(false);
    setGlobalTime(0);
    setActiveQuestion(null);
    setClearedCheckpoints({});
    setAnswersByQuestionId({});
  }

  function handleMp4TimeUpdate(currentTimeSec: number) {
    setGlobalTime(currentTimeSec);
    if (activeQuestion) return;

    const checkpoint = OPD_QUESTIONS.find(
      (q) =>
        currentTimeSec >= q.triggerTimeSec &&
        !clearedCheckpoints[q.id]
    );

    if (checkpoint && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setActiveQuestion(checkpoint);
    }
  }

  const totalDisplayDuration = mp4Src ? mp4Duration : OPD_TOTAL_DURATION_SEC;
  const progressPercent =
    totalDisplayDuration > 0
      ? Math.min(100, (globalTime / totalDisplayDuration) * 100)
      : 0;

  return (
    <section
      aria-labelledby="opd-harmoni-heading"
      className="bg-white rounded-2xl border-2 border-[#57B8F2] shadow-xs overflow-hidden"
    >
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => setIsAudioPlaying(false)}
        onError={() => {
          setIsAudioPlaying(false);
          setIsAudioLoading(false);
        }}
      />

      {/* Kepala Seksyen OPD */}
      <div className="bg-gradient-to-r from-[#EAF6FE] via-[#FFF8E9] to-[#EAF9F1] border-b-2 border-[#BCE3FA] px-5 sm:px-7 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-[#166088] mb-1">
              <Sparkles className="w-4 h-4 text-[#D99B00]" aria-hidden="true" />
              <span>Objek Pembelajaran Digital (OPD) Interaktif</span>
              <span aria-hidden="true">·</span>
              <span>Anggaran Masa: 1 minit 40 saat</span>
            </div>
            <h2
              id="opd-harmoni-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]"
            >
              Kenali Ayat Penyata Bersama Harmoni!
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#334E68]">
              Tonton penerangan animasi interaktif ini sebelum meneroka poster
              karnival. Video akan berhenti seketika pada 3 hentian soalan untuk
              perbincangan kelas.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#A6DCFA] text-xs font-bold text-[#243B53]">
              <Film className="w-3.5 h-3.5 text-[#166088]" aria-hidden="true" />
              <span>
                {mp4Src ? 'Mod: Fail MP4 Sebenar' : 'Mod: Animasi 2D + Suara AI'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Pentas Animasi 16:9 + Tindihan Soalan Interaktif */}
      <div className="relative aspect-video w-full bg-[#EAF6FE]">
        <OpdAnimasiPentas
          scene={currentScene}
          isPlaying={isPlaying}
          isTalking={isAudioPlaying}
          hasStarted={hasStarted}
          showSubtitles={showSubtitles}
          isQuestionActive={Boolean(activeQuestion)}
          mp4Src={mp4Src}
          videoRef={videoRef}
          onMp4LoadedMetadata={(dur) => {
            if (dur > 0) setMp4Duration(dur);
          }}
          onMp4TimeUpdate={handleMp4TimeUpdate}
          onMp4PlayChange={setIsPlaying}
          onMp4Ended={() => {
            setIsPlaying(false);
            setIsCompleted(true);
          }}
          onMp4Error={() =>
            setMp4Error(
              'Fail MP4 yang dipilih tidak dapat dimainkan oleh pelayar. Anda boleh kembali ke Mod Animasi 2D.'
            )
          }
        />

        {activeQuestion && (
          <OpdSoalanOverlay
            question={activeQuestion}
            selectedOption={answersByQuestionId[activeQuestion.id] ?? null}
            onSelectOption={handleSelectOption}
            onContinue={handleContinueAfterQuestion}
          />
        )}
      </div>

      {/* Bar Kemajuan & Penanda 3 Hentian Soalan */}
      <div className="bg-[#FFF8E9] border-t border-[#F2E2B6] px-5 sm:px-7 pt-3.5 pb-2">
        <div className="relative h-3 bg-[#E6ECF2] rounded-full overflow-visible border border-[#CBD5E1]">
          <div
            className="h-full bg-[#57B8F2] rounded-full transition-[width] duration-200"
            style={{ width: `${progressPercent}%` }}
          />
          {OPD_QUESTIONS.map((q, index) => {
            const leftPct = Math.min(
              96,
              (q.triggerTimeSec / OPD_TOTAL_DURATION_SEC) * 100
            );
            const isCleared = Boolean(clearedCheckpoints[q.id]);
            return (
              <div
                key={q.id}
                title={`Hentian Soalan ${index + 1} (${formatTime(q.triggerTimeSec)})`}
                style={{ left: `${leftPct}%` }}
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 text-[10px] font-bold flex items-center justify-center shadow-xs ${
                  isCleared
                    ? 'bg-[#70D6A1] border-[#1B6B46] text-[#243B53]'
                    : 'bg-[#FFD65A] border-[#243B53] text-[#243B53]'
                }`}
              >
                ?
              </div>
            );
          })}
        </div>

        {/* Tab Navigasi 5 Babak */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {OPD_SCENES.map((scene, idx) => {
            const isCurrent = idx === currentSceneIndex;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => handleSelectScene(idx)}
                disabled={Boolean(activeQuestion)}
                className={`px-2.5 py-2 rounded-xl text-left border transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] disabled:opacity-50 ${
                  isCurrent
                    ? 'bg-[#EAF6FE] border-[#57B8F2] text-[#243B53] font-bold'
                    : 'bg-white border-[#D9E2EC] text-[#486581] hover:bg-[#EAF6FE]/50 font-medium'
                }`}
              >
                <span className="block text-[11px] font-bold text-[#166088]">
                  {scene.label}
                </span>
                <span className="block text-xs truncate">{scene.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bar Kawalan Utama (Main, Jeda, Main Semula, Bunyi, Sarikata) */}
      <div className="bg-[#EAF6FE] border-t border-[#BCE3FA] px-5 sm:px-7 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePlay}
              disabled={isPlaying || Boolean(activeQuestion)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] border-2 border-[#E5B832] disabled:opacity-45 disabled:cursor-not-allowed shadow-xs transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Main</span>
            </button>

            <button
              type="button"
              onClick={handlePause}
              disabled={!isPlaying}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <Pause className="w-4 h-4" aria-hidden="true" />
              <span>Jeda</span>
            </button>

            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Main Semula</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isAudioLoading && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#166088] bg-white border border-[#BCE3FA] px-3 py-1.5 rounded-xl">
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                <span>Menjana suara AI...</span>
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsMuted((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#9E2F28]" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#166088]" aria-hidden="true" />
              )}
              <span>{isMuted ? 'Senyap' : 'Suara AI'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSubtitles((prev) => !prev)}
              aria-pressed={showSubtitles}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] ${
                showSubtitles
                  ? 'bg-[#EAF9F1] border-[#70D6A1] text-[#243B53]'
                  : 'bg-white border-[#A6DCFA] text-[#486581]'
              }`}
            >
              <Captions className="w-4 h-4" aria-hidden="true" />
              <span>Sarikata</span>
            </button>

            <span className="text-xs sm:text-sm font-bold tabular-nums text-[#243B53] bg-white border border-[#A6DCFA] rounded-xl px-3 py-2">
              {formatTime(globalTime)} / {formatTime(totalDisplayDuration)}
            </span>
          </div>
        </div>

        {(audioError || mp4Error) && (
          <div
            role="alert"
            className="mt-3 rounded-xl bg-[#FFF8E9] border border-[#FFD65A] px-4 py-2.5 flex items-start gap-2 text-xs sm:text-sm text-[#243B53]"
          >
            <AlertCircle
              className="w-4 h-4 text-[#9E2F28] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{mp4Error || audioError}</span>
          </div>
        )}

        {/* Nota jujur tentang Prototaip 2D + pilihan uji fail MP4 sebenar */}
        <div className="mt-4 pt-3 border-t border-[#BCE3FA] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#334E68]">
          <p>
            <strong className="text-[#243B53]">Nota Guru:</strong> Paparan ini
            ialah{' '}
            <span className="font-semibold text-[#243B53]">
              prototaip animasi interaktif 2D
            </span>{' '}
            dengan suara AI Harmoni (bukan fail video <code>.mp4</code> yang
            dieksport). Jika anda mempunyai fail <code>.mp4</code> sebenar pada
            masa hadapan, anda boleh memuatkannya untuk menggantikan pentas
            animasi sambil mengekalkan 3 hentian soalan yang sama.
            {mp4FileName && ` (Fail aktif: ${mp4FileName})`}
          </p>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/mp4,video/*"
              onChange={handleMp4FileChange}
              className="sr-only"
              id="opd-mp4-upload"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#A6DCFA] transition-colors min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{mp4Src ? 'Tukar Fail MP4' : 'Uji Fail MP4'}</span>
            </button>

            {mp4Src && (
              <button
                type="button"
                onClick={handleSwitchToPrototypeMode}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] border border-[#E5B832] transition-colors min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
              >
                <span>Kembali ke Animasi 2D</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
