import { useState, type DragEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

/**
 * CADANGAN KOMPONEN ALTERNATIF NATIF (DRAG-AND-DROP + SENTUHAN/KLIK/PAPAN KEKUNCI)
 * Disediakan dalam kod projek untuk dipertimbangkan sekiranya permainan luar
 * tidak dapat diakses oleh murid tanpa log masuk. Belum menggantikan permainan asal.
 */

interface SentencePuzzle {
  id: string;
  groupLabel: string;
  targetWords: string[];
  correctSentence: string;
  scrambledWords: string[];
}

const PUZZLES: SentencePuzzle[] = [
  {
    id: 'gotong-royong',
    groupLabel: 'Kumpulan 1 — Gotong-royong',
    targetWords: [
      'Penduduk',
      'Taman Harmoni',
      'bergotong-royong',
      'membersihkan',
      'kawasan taman.',
    ],
    correctSentence:
      'Penduduk Taman Harmoni bergotong-royong membersihkan kawasan taman.',
    scrambledWords: [
      'membersihkan',
      'Penduduk',
      'kawasan taman.',
      'bergotong-royong',
      'Taman Harmoni',
    ],
  },
  {
    id: 'ziarah-kebajikan',
    groupLabel: 'Kumpulan 2 — Ziarah Kebajikan',
    targetWords: [
      'Jiran tetangga',
      'menziarahi',
      'warga emas',
      'sambil membawa',
      'buah tangan.',
    ],
    correctSentence:
      'Jiran tetangga menziarahi warga emas sambil membawa buah tangan.',
    scrambledWords: [
      'warga emas',
      'buah tangan.',
      'Jiran tetangga',
      'sambil membawa',
      'menziarahi',
    ],
  },
  {
    id: 'sukaneka',
    groupLabel: 'Kumpulan 3 — Sukaneka Kejiranan',
    targetWords: [
      'Kanak-kanak',
      'menyertai',
      'acara sukaneka',
      'kejiranan',
      'dengan gembira.',
    ],
    correctSentence:
      'Kanak-kanak menyertai acara sukaneka kejiranan dengan gembira.',
    scrambledWords: [
      'acara sukaneka',
      'dengan gembira.',
      'Kanak-kanak',
      'kejiranan',
      'menyertai',
    ],
  },
  {
    id: 'jamuan',
    groupLabel: 'Kumpulan 4 — Jamuan Muafakat',
    targetWords: [
      'Para penduduk',
      'menikmati',
      'pelbagai hidangan',
      'di jamuan',
      'muafakat.',
    ],
    correctSentence:
      'Para penduduk menikmati pelbagai hidangan di jamuan muafakat.',
    scrambledWords: [
      'di jamuan',
      'Para penduduk',
      'muafakat.',
      'pelbagai hidangan',
      'menikmati',
    ],
  },
];

interface WordToken {
  key: string;
  word: string;
}

function buildTokens(words: string[]): WordToken[] {
  return words.map((word, index) => ({
    key: `${index}-${word}`,
    word,
  }));
}

export function CadanganSusunAyatNatif() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const puzzle = PUZZLES[puzzleIndex];

  const [bankTokens, setBankTokens] = useState<WordToken[]>(() =>
    buildTokens(puzzle.scrambledWords)
  );
  const [answerTokens, setAnswerTokens] = useState<WordToken[]>([]);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect';
    message: string;
  } | null>(null);
  const [draggedToken, setDraggedToken] = useState<{
    source: 'bank' | 'answer';
    index: number;
  } | null>(null);

  function loadPuzzle(nextIndex: number) {
    const next = PUZZLES[nextIndex];
    setPuzzleIndex(nextIndex);
    setBankTokens(buildTokens(next.scrambledWords));
    setAnswerTokens([]);
    setFeedback(null);
  }

  function moveBankToAnswer(index: number) {
    const chosen = bankTokens[index];
    if (!chosen) return;
    setBankTokens((prev) => prev.filter((_, i) => i !== index));
    setAnswerTokens((prev) => [...prev, chosen]);
    setFeedback(null);
  }

  function moveAnswerToBank(index: number) {
    const chosen = answerTokens[index];
    if (!chosen) return;
    setAnswerTokens((prev) => prev.filter((_, i) => i !== index));
    setBankTokens((prev) => [...prev, chosen]);
    setFeedback(null);
  }

  function shiftAnswerToken(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= answerTokens.length) return;
    setAnswerTokens((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[target];
      next[target] = temp;
      return next;
    });
    setFeedback(null);
  }

  function handleDragStart(
    event: DragEvent<HTMLButtonElement>,
    source: 'bank' | 'answer',
    index: number
  ) {
    setDraggedToken({ source, index });
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${source}:${index}`);
  }

  function handleDropOnAnswerZone(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (!draggedToken) return;
    if (draggedToken.source === 'bank') {
      moveBankToAnswer(draggedToken.index);
    }
    setDraggedToken(null);
  }

  function handleDropOnAnswerToken(
    event: DragEvent<HTMLButtonElement>,
    targetIndex: number
  ) {
    event.preventDefault();
    event.stopPropagation();
    if (!draggedToken) return;

    if (draggedToken.source === 'bank') {
      const chosen = bankTokens[draggedToken.index];
      if (!chosen) return;
      setBankTokens((prev) => prev.filter((_, i) => i !== draggedToken.index));
      setAnswerTokens((prev) => {
        const next = [...prev];
        next.splice(targetIndex, 0, chosen);
        return next;
      });
    } else if (draggedToken.index !== targetIndex) {
      setAnswerTokens((prev) => {
        const next = [...prev];
        const [moved] = next.splice(draggedToken.index, 1);
        next.splice(targetIndex, 0, moved);
        return next;
      });
    }
    setDraggedToken(null);
    setFeedback(null);
  }

  function handleCheckAnswer() {
    const currentSentence = answerTokens.map((t) => t.word).join(' ').trim();
    if (answerTokens.length < puzzle.targetWords.length) {
      setFeedback({
        type: 'incorrect',
        message: 'Sila susun semua kad perkataan ke dalam kotak jawapan dahulu.',
      });
      return;
    }

    if (currentSentence === puzzle.correctSentence) {
      setFeedback({
        type: 'correct',
        message:
          'Syabas! Susunan ayat penyata kamu tepat dan gramatis.',
      });
    } else {
      setFeedback({
        type: 'incorrect',
        message:
          'Susunan masih belum tepat. Cuba periksa huruf besar di awal ayat dan tanda noktah di hujung ayat, kemudian cuba lagi.',
      });
    }
  }

  function handleReset() {
    setBankTokens(buildTokens(puzzle.scrambledWords));
    setAnswerTokens([]);
    setFeedback(null);
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-[#A6DCFA] p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-[#166088]">
            {puzzle.groupLabel}
          </p>
          <h3 className="font-display text-xl font-bold text-[#243B53]">
            Susun Kad Perkataan Menjadi Ayat Penyata
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {PUZZLES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => loadPuzzle(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors min-h-[36px] ${
                idx === puzzleIndex
                  ? 'bg-[#57B8F2] text-[#243B53] border-[#166088]'
                  : 'bg-[#EAF6FE] text-[#243B53] border-[#A6DCFA] hover:bg-[#DDF1FD]'
              }`}
            >
              Misi {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Kotak Jawapan */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnAnswerZone}
        aria-label="Kotak jawapan susunan ayat"
        className="min-h-[88px] rounded-2xl bg-[#FFF8E9] border-2 border-dashed border-[#FFD65A] p-4 flex flex-wrap items-center gap-2.5"
      >
        {answerTokens.length === 0 ? (
          <p className="text-sm text-[#486581]">
            Seret atau tekan kad perkataan di bawah untuk menyusun ayat penyata di
            sini.
          </p>
        ) : (
          answerTokens.map((token, index) => (
            <div
              key={token.key}
              className="inline-flex items-center gap-1 bg-white border-2 border-[#57B8F2] rounded-xl px-2 py-1 shadow-xs"
            >
              <button
                type="button"
                aria-label={`Alih ${token.word} ke kiri`}
                onClick={() => shiftAnswerToken(index, -1)}
                disabled={index === 0}
                className="p-1 text-[#243B53] disabled:opacity-30 hover:bg-[#EAF6FE] rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                draggable
                onDragStart={(e) => handleDragStart(e, 'answer', index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropOnAnswerToken(e, index)}
                onClick={() => moveAnswerToBank(index)}
                title="Klik untuk pulangkan ke senarai perkataan"
                className="px-2 py-1 text-sm sm:text-base font-bold text-[#243B53] cursor-grab active:cursor-grabbing"
              >
                {token.word}
              </button>

              <button
                type="button"
                aria-label={`Alih ${token.word} ke kanan`}
                onClick={() => shiftAnswerToken(index, 1)}
                disabled={index === answerTokens.length - 1}
                className="p-1 text-[#243B53] disabled:opacity-30 hover:bg-[#EAF6FE] rounded"
              >
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Bank Kad Perkataan */}
      <div>
        <p className="text-xs font-bold text-[#486581] mb-2">
          Kad Perkataan (Seret atau klik untuk memilih):
        </p>
        <div className="flex flex-wrap gap-2.5">
          {bankTokens.map((token, index) => (
            <button
              key={token.key}
              type="button"
              draggable
              onDragStart={(e) => handleDragStart(e, 'bank', index)}
              onClick={() => moveBankToAnswer(index)}
              className="px-4 py-2.5 rounded-xl bg-[#EAF6FE] hover:bg-[#DDF1FD] border-2 border-[#A6DCFA] text-sm sm:text-base font-bold text-[#243B53] transition-colors min-h-[44px] cursor-grab active:cursor-grabbing"
            >
              {token.word}
            </button>
          ))}
        </div>
      </div>

      {/* Kawalan Semak & Reset */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleCheckAnswer}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] min-h-[44px] shadow-xs"
        >
          <Sparkles className="w-4 h-4" aria-hidden="true" />
          <span>Semak Jawapan</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#A6DCFA] min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Set Semula</span>
        </button>
      </div>

      {feedback && (
        <div
          role="status"
          className={`rounded-xl border-2 p-4 flex items-start gap-3 text-sm sm:text-base font-medium ${
            feedback.type === 'correct'
              ? 'bg-[#EAF9F1] border-[#70D6A1] text-[#243B53]'
              : 'bg-[#FFF0EE] border-[#FF8D85] text-[#243B53]'
          }`}
        >
          {feedback.type === 'correct' ? (
            <CheckCircle2 className="w-5 h-5 text-[#1B6B46] shrink-0 mt-0.5" aria-hidden="true" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#9E2F28] shrink-0 mt-0.5" aria-hidden="true" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
}
