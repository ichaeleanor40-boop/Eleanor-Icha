import { AlertCircle, CheckCircle2, Play } from 'lucide-react';
import type { OpdCheckpointQuestion } from '../data/opdHarmoniData';

interface OpdSoalanOverlayProps {
  question: OpdCheckpointQuestion;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  onContinue: () => void;
}

export function OpdSoalanOverlay({
  question,
  selectedOption,
  onSelectOption,
  onContinue,
}: OpdSoalanOverlayProps) {
  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctOption;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={`opd-q-title-${question.id}`}
      className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 bg-[#102A43]/75 backdrop-blur-[2px]"
    >
      <div className="w-full max-w-2xl bg-[#FFF8E9] rounded-2xl border-2 border-[#FFD65A] shadow-xl p-5 sm:p-7 text-[#243B53]">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F2E2B6]">
          <span className="text-xs sm:text-sm font-bold text-[#166088] tracking-wide uppercase">
            {question.title}
          </span>
          <span className="text-xs font-semibold text-[#627D98]">
            Jeda Interaktif Kelas
          </span>
        </div>

        <h3
          id={`opd-q-title-${question.id}`}
          className="mt-4 font-display text-lg sm:text-2xl font-bold text-[#243B53] leading-snug"
        >
          {question.prompt}
        </h3>

        <div
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
          role="group"
          aria-label="Pilihan jawapan"
        >
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            const isOptionCorrect = option === question.correctOption;

            let buttonStyle =
              'bg-white hover:bg-[#EAF6FE] border-[#A6DCFA] text-[#243B53]';

            if (hasAnswered) {
              if (isOptionCorrect) {
                buttonStyle =
                  'bg-[#EAF9F1] border-[#3FA974] text-[#243B53] ring-2 ring-[#70D6A1]';
              } else if (isSelected && !isOptionCorrect) {
                buttonStyle =
                  'bg-[#FFF0EE] border-[#E05348] text-[#243B53] ring-2 ring-[#FF8D85]';
              } else {
                buttonStyle =
                  'bg-white/70 border-[#D9E2EC] text-[#627D98] opacity-75';
              }
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelectOption(option)}
                aria-pressed={isSelected}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-bold text-base sm:text-lg transition-all min-h-[52px] flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] ${buttonStyle}`}
              >
                <span>{option}</span>
                {hasAnswered && isOptionCorrect && (
                  <CheckCircle2
                    className="w-5 h-5 text-[#1B6B46] shrink-0"
                    aria-hidden="true"
                  />
                )}
                {hasAnswered && isSelected && !isOptionCorrect && (
                  <AlertCircle
                    className="w-5 h-5 text-[#9E2F28] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {hasAnswered ? (
          <div
            role="status"
            aria-live="polite"
            className={`mt-4 rounded-xl border-2 px-4 py-3 flex items-start gap-2.5 text-sm sm:text-base leading-relaxed ${
              isCorrect
                ? 'bg-[#EAF9F1] border-[#70D6A1] text-[#243B53]'
                : 'bg-[#FFF0EE] border-[#FF8D85] text-[#243B53]'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2
                className="w-5 h-5 text-[#1B6B46] shrink-0 mt-0.5"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="w-5 h-5 text-[#9E2F28] shrink-0 mt-0.5"
                aria-hidden="true"
              />
            )}
            <p className="font-medium">
              {isCorrect ? question.feedbackCorrect : question.feedbackIncorrect}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-xs sm:text-sm font-medium text-[#486581]">
            Sila pilih jawapan bersama murid terlebih dahulu sebelum menyambung
            tayangan.
          </p>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onContinue}
            disabled={!hasAnswered}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm sm:text-base font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] border-2 border-[#E5B832] disabled:opacity-45 disabled:cursor-not-allowed shadow-xs transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            <span>Sambung Video</span>
          </button>
        </div>
      </div>
    </div>
  );
}
