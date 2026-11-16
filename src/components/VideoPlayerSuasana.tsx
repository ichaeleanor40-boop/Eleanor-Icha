import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Film,
  Upload,
} from 'lucide-react';

const DEFAULT_VIDEO_SRC =
  '/media/Video%20Kejiranan%20%28Set%20Induksi%29%20-%20YouTube.mp4';

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function VideoPlayerSuasana() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const localObjectUrlRef = useRef<string | null>(null);

  const [videoSrc, setVideoSrc] = useState<string>(DEFAULT_VIDEO_SRC);
  const [hasValidVideo, setHasValidVideo] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (localObjectUrlRef.current) {
        URL.revokeObjectURL(localObjectUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.volume = volume;
    videoEl.muted = isMuted;
  }, [volume, isMuted]);

  function handlePlay() {
    const videoEl = videoRef.current;
    if (!videoEl || videoError) return;
    void videoEl.play().catch(() => {
      setIsPlaying(false);
    });
  }

  function handlePause() {
    const videoEl = videoRef.current;
    if (!videoEl || videoError) return;
    videoEl.pause();
  }

  function handleReplay() {
    const videoEl = videoRef.current;
    if (!videoEl || videoError) return;
    videoEl.currentTime = 0;
    setCurrentTime(0);
    void videoEl.play().catch(() => {
      setIsPlaying(false);
    });
  }

  function handleToggleMute() {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const nextMuted = !isMuted;
    videoEl.muted = nextMuted;
    setIsMuted(nextMuted);
  }

  function handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (nextVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (nextVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
  }

  function handleLocalFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (localObjectUrlRef.current) {
      URL.revokeObjectURL(localObjectUrlRef.current);
    }

    const nextUrl = URL.createObjectURL(file);
    localObjectUrlRef.current = nextUrl;
    setLoadedFileName(file.name);
    setVideoError(false);
    setHasValidVideo(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setVideoSrc(nextUrl);
  }

  function handleResetDefaultVideo() {
    if (localObjectUrlRef.current) {
      URL.revokeObjectURL(localObjectUrlRef.current);
      localObjectUrlRef.current = null;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setLoadedFileName(null);
    setVideoError(false);
    setHasValidVideo(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setVideoSrc(DEFAULT_VIDEO_SRC);
  }

  const controlsDisabled = videoError;

  return (
    <div className="bg-white rounded-2xl border-2 border-[#A6DCFA] shadow-xs overflow-hidden">
      {/* Ruang Paparan Video 16:9 */}
      <div className="relative aspect-video bg-[#102A43] flex items-center justify-center">
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          preload="metadata"
          aria-label="Pemain video Suasana Kampung Muafakat"
          onLoadedMetadata={(e) => {
            setHasValidVideo(true);
            setVideoError(false);
            setDuration(e.currentTarget.duration || 0);
          }}
          onCanPlay={() => {
            setHasValidVideo(true);
            setVideoError(false);
          }}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            setHasValidVideo(false);
            setVideoError(true);
            setIsPlaying(false);
          }}
          className={`w-full h-full object-contain bg-[#102A43] ${
            videoError ? 'hidden' : 'block'
          }`}
        >
          Pelayar anda tidak menyokong pemain video HTML5.
        </video>

        {videoError && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-br from-[#EAF6FE] via-white to-[#FFF8E9]">
            <div className="w-16 h-16 rounded-2xl bg-[#57B8F2] text-[#243B53] flex items-center justify-center shadow-xs mb-4">
              <Film className="w-8 h-8" aria-hidden="true" />
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold text-[#243B53]">
              Video Suasana Kampung Muafakat
            </h3>

            <p className="mt-2 text-sm sm:text-base text-[#334E68] max-w-lg leading-relaxed">
              Fail video asal tidak ditemui pada pelayan semasa. Pastikan fail
              berada di laluan repositori{' '}
              <code className="bg-white/90 border border-[#BCE3FA] px-2 py-0.5 rounded text-[#243B53] font-mono text-xs">
                public/media/Video Kejiranan (Set Induksi) - YouTube.mp4
              </code>
              .
            </p>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 shadow-xs"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                <span>Pilihan Alternatif: Muat Naik Video Tempatan</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bar Kawalan Video HTML5 */}
      <div className="bg-[#EAF6FE] border-t border-[#BCE3FA] px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePlay}
              disabled={controlsDisabled || isPlaying}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] border border-[#EFC034] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Main</span>
            </button>

            <button
              type="button"
              onClick={handlePause}
              disabled={controlsDisabled || !isPlaying}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#BCE3FA] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <Pause className="w-4 h-4" aria-hidden="true" />
              <span>Jeda</span>
            </button>

            <button
              type="button"
              onClick={handleReplay}
              disabled={controlsDisabled || (!hasValidVideo && currentTime === 0)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#BCE3FA] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Ulang</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleToggleMute}
              disabled={controlsDisabled}
              aria-label={isMuted ? 'Pasang bunyi video' : 'Senyapkan bunyi video'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#BCE3FA] disabled:opacity-45 disabled:cursor-not-allowed transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-[#9E2F28]" aria-hidden="true" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#166088]" aria-hidden="true" />
              )}
              <span>{isMuted ? 'Senyap' : 'Bunyi'}</span>
            </button>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#243B53]">
              <span>Kelantangan</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                disabled={controlsDisabled}
                aria-label="Pelaras kelantangan bunyi video"
                className="w-24 accent-[#243B53] cursor-pointer disabled:opacity-45"
              />
            </label>

            <span className="text-xs font-semibold tabular-nums text-[#334E68] bg-white border border-[#BCE3FA] rounded-lg px-2.5 py-1.5">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Pilihan alternatif guru (disembunyikan daripada paparan biasa) */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/*"
          onChange={handleLocalFileSelect}
          className="sr-only"
          id="local-mp4-upload"
        />

        <details className="mt-3 pt-2.5 border-t border-[#BCE3FA]/80 text-xs text-[#486581]">
          <summary className="cursor-pointer font-semibold text-[#166088] hover:text-[#243B53] select-none w-fit">
            Pilihan alternatif guru (ganti video tempatan)
          </summary>
          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border border-[#A6DCFA] transition-colors min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
            >
              <Upload className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Pilih Fail MP4 Tempatan</span>
            </button>

            {loadedFileName && (
              <>
                <button
                  type="button"
                  onClick={handleResetDefaultVideo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FFF8E9] hover:bg-[#FFD65A] text-[#243B53] border border-[#EFC034] transition-colors min-h-[36px]"
                >
                  <span>Guna Video Asal Semula</span>
                </button>
                <span className="text-xs text-[#166088] font-medium">
                  Fail alternatif aktif: {loadedFileName}
                </span>
              </>
            )}
          </div>
        </details>
      </div>
    </div>
  );
}
