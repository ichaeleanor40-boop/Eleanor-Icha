import { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardCheck,
  Monitor,
  Play,
  RotateCcw,
  XCircle,
} from 'lucide-react';

export type QuizChoice = 'BETUL' | 'SALAH';

export interface QuizQuestion {
  id: number;
  statement: string;
  correctAnswer: QuizChoice;
  feedback: string;
}

export const KUIZ_PANTAS_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: 'Ayat "Sila duduk di kerusi masing-masing." ialah ayat penyata.',
    correctAnswer: 'SALAH',
    feedback: 'Ayat ini ialah ayat perintah kerana mengandungi permintaan.',
  },
  {
    id: 2,
    statement:
      'Ayat "Abang sedang mencuci basikal di luar rumah." ialah ayat penyata.',
    correctAnswer: 'BETUL',
    feedback:
      'Ayat ini ialah ayat penyata kerana menyampaikan maklumat tentang perbuatan abang.',
  },
  {
    id: 3,
    statement: 'Ayat "Siapakah nama kucing kamu?" ialah ayat penyata.',
    correctAnswer: 'SALAH',
    feedback:
      'Ayat ini ialah ayat tanya kerana digunakan untuk bertanyakan sesuatu.',
  },
  {
    id: 4,
    statement: 'Ayat "Saya suka makan nasi lemak." ialah ayat penyata.',
    correctAnswer: 'BETUL',
    feedback:
      'Ayat ini ialah ayat penyata kerana menyatakan maklumat tentang makanan yang disukai.',
  },
  {
    id: 5,
    statement: 'Ayat penyata mesti ada tanda soal (?) di belakangnya.',
    correctAnswer: 'SALAH',
    feedback:
      'Ayat penyata lazimnya diakhiri dengan tanda noktah (.), bukannya tanda soal (?).',
  },
];

const POINTS_PER_CORRECT = 20;

type QuizPhase = 'intro' | 'question' | 'result';

export function KuizPantasAyatPenyata() {
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, QuizChoice>>({});
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQuestion = KUIZ_PANTAS_QUESTIONS[currentIndex];
  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const isAnswered = selectedAnswer !== undefined;

  const correctCount = KUIZ_PANTAS_QUESTIONS.reduce((total, q) => {
    return answers[q.id] === q.correctAnswer ? total + 1 : total;
  }, 0);
  const totalScore = correctCount * POINTS_PER_CORRECT;
  const maxScore = KUIZ_PANTAS_QUESTIONS.length * POINTS_PER_CORRECT;

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(
    ((phase === 'result' ? KUIZ_PANTAS_QUESTIONS.length : currentIndex + (isAnswered ? 1 : 0)) /
      KUIZ_PANTAS_QUESTIONS.length) *
      100
  );

  function handleStartQuiz() {
    setPhase('question');
    setCurrentIndex(0);
    setAnswers({});
    setShowReview(false);
  }

  function handleSelectAnswer(choice: QuizChoice) {
    if (!currentQuestion || isAnswered) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: choice,
    }));
  }

  function handleNextQuestion() {
    if (!isAnswered) return;
    if (currentIndex + 1 < KUIZ_PANTAS_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setPhase('result');
    }
  }

  function handleRetryQuiz() {
    setAnswers({});
    setCurrentIndex(0);
    setShowReview(false);
    setPhase('question');
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-[#B8A0F5] shadow-sm overflow-hidden">
      {/* Bar Status Kuiz Kelas (Smart TV Ready) */}
      <div className="bg-[#F3EEFE] border-b-2 border-[#CFC0FA] px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#4D348C]">
            <Monitor className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              {phase === 'intro'
                ? 'Sedia untuk Dimulakan · Mod Smart TV (Kawalan Guru)'
                : phase === 'question'
                  ? `Soalan ${currentIndex + 1} daripada ${KUIZ_PANTAS_QUESTIONS.length}`
                  : `Selesai · ${KUIZ_PANTAS_QUESTIONS.length} daripada ${KUIZ_PANTAS_QUESTIONS.length} Soalan`}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm font-bold text-[#243B53] bg-white border border-[#CFC0FA] rounded-xl px-3.5 py-1.5 tabular-nums">
            <span>Markah Kelas:</span>
            <span className="text-[#4D348C]">
              {totalScore} / {maxScore}
            </span>
          </div>
        </div>

        {/* Bar Kemajuan */}
        {phase !== 'intro' && (
          <div className="mt-3">
            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Kemajuan Kuiz Pantas Ayat Penyata"
              className="w-full h-3 rounded-full bg-white border border-[#CFC0FA] overflow-hidden"
            >
              <div
                className="h-full bg-[#57B8F2] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* FASA 1: PAPARAN PENGENALAN KUIZ */}
      {phase === 'intro' && (
        <div className="p-8 sm:p-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#B8A0F5] text-[#243B53] flex items-center justify-center mx-auto shadow-xs">
            <ClipboardCheck className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#243B53]">
              Kuiz Pantas Ayat Penyata!
            </h2>
            <p className="text-lg sm:text-xl text-[#334E68] leading-relaxed">
              Jom uji kefahaman kita! Baca setiap pernyataan dan tentukan sama ada{' '}
              <strong className="font-bold text-[#1B6B46]">BETUL</strong> atau{' '}
              <strong className="font-bold text-[#9E2F28]">SALAH</strong>.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-2xl bg-[#FFF8E9] border border-[#FFE082] p-4 text-sm text-[#243B53]">
            5 soalan · 20 markah bagi setiap jawapan betul · Guru mengawal
            perjalanan kuiz bersama kelas melalui paparan Smart TV.
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleStartQuiz}
              className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-lg px-8 py-4 rounded-2xl border-2 border-[#EFC034] shadow-xs transition-all hover:-translate-y-0.5 min-h-[52px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2"
            >
              <Play className="w-5 h-5 fill-current" aria-hidden="true" />
              <span>Mula Kuiz</span>
            </button>
          </div>
        </div>
      )}

      {/* FASA 2: SOALAN SATU DEMI SATU (MESRA SMART TV) */}
      {phase === 'question' && currentQuestion && (
        <div className="p-6 sm:p-10 space-y-7">
          <div className="rounded-2xl bg-[#FFF8E9] border-2 border-[#FFE082] p-6 sm:p-8">
            <p className="text-xs sm:text-sm font-bold text-[#7A5900] mb-3 tabular-nums">
              Soalan {currentIndex + 1} daripada {KUIZ_PANTAS_QUESTIONS.length}
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-[#243B53] leading-snug">
              {currentQuestion.statement}
            </p>
          </div>

          {/* Dua Butang Besar: BETUL dan SALAH */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {(['BETUL', 'SALAH'] as QuizChoice[]).map((choice) => {
              const isChosen = selectedAnswer === choice;
              const isCorrectOption = currentQuestion.correctAnswer === choice;

              let buttonClasses = '';
              if (!isAnswered) {
                buttonClasses =
                  choice === 'BETUL'
                    ? 'bg-[#EAF9F1] hover:bg-[#D6F5E5] border-[#70D6A1] text-[#243B53]'
                    : 'bg-[#FFF0EE] hover:bg-[#FFE2DF] border-[#FF8D85] text-[#243B53]';
              } else if (isCorrectOption) {
                buttonClasses =
                  'bg-[#70D6A1] border-[#1B6B46] text-[#243B53] ring-2 ring-[#1B6B46]/30';
              } else if (isChosen && !isCorrectOption) {
                buttonClasses =
                  'bg-[#FF8D85] border-[#9E2F28] text-[#243B53] ring-2 ring-[#9E2F28]/30';
              } else {
                buttonClasses =
                  'bg-slate-100 border-slate-200 text-slate-500 opacity-65';
              }

              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleSelectAnswer(choice)}
                  disabled={isAnswered}
                  aria-pressed={isChosen}
                  className={`flex items-center justify-center gap-3 px-6 py-5 sm:py-6 rounded-2xl border-2 font-display text-2xl sm:text-3xl font-bold transition-all duration-200 min-h-[76px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] focus-visible:ring-offset-2 disabled:cursor-default ${buttonClasses}`}
                >
                  {choice === 'BETUL' ? (
                    <CheckCircle2 className="w-7 h-7 shrink-0" aria-hidden="true" />
                  ) : (
                    <XCircle className="w-7 h-7 shrink-0" aria-hidden="true" />
                  )}
                  <span>{choice}</span>
                </button>
              );
            })}
          </div>

          {/* Maklum Balas Segera & Butang Kawalan Guru */}
          {isAnswered && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-2xl border-2 p-6 transition-all duration-200 space-y-4 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-[#EAF9F1] border-[#70D6A1]'
                  : 'bg-[#FFF0EE] border-[#FF8D85]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <CheckCircle2
                      className="w-6 h-6 text-[#1B6B46] shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <XCircle
                      className="w-6 h-6 text-[#9E2F28] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span className="font-display text-lg sm:text-xl font-bold text-[#243B53]">
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? `Jawapan BETUL! (+${POINTS_PER_CORRECT} markah)`
                      : `Jawapan SALAH! Jawapan sebenar ialah ${currentQuestion.correctAnswer}.`}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#243B53] bg-white/80 border border-black/10 px-3 py-1 rounded-lg tabular-nums">
                  Dijawab: {answeredCount} / {KUIZ_PANTAS_QUESTIONS.length}
                </span>
              </div>

              <p className="text-base sm:text-lg text-[#243B53] leading-relaxed">
                {currentQuestion.feedback}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2.5 bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] font-bold text-base sm:text-lg px-6 py-3 rounded-xl border-2 border-[#EFC034] shadow-xs transition-all hover:-translate-y-0.5 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53]"
                >
                  <span>
                    {currentIndex + 1 < KUIZ_PANTAS_QUESTIONS.length
                      ? 'Soalan Seterusnya'
                      : 'Lihat Keputusan Kuiz'}
                  </span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FASA 3: PAPARAN KEPUTUSAN KUIZ KELAS */}
      {phase === 'result' && (
        <div className="p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD65A] text-[#243B53] flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-8 h-8" aria-hidden="true" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#243B53]">
              Tahniah! Kita telah menyelesaikan Kuiz Pantas Ayat Penyata!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl bg-[#EAF9F1] border-2 border-[#70D6A1] p-5">
                <p className="text-xs font-bold text-[#1B6B46] mb-1">
                  Jumlah Jawapan Betul (Kelas)
                </p>
                <p className="font-display text-3xl font-bold text-[#243B53] tabular-nums">
                  {correctCount} / {KUIZ_PANTAS_QUESTIONS.length}
                </p>
              </div>

              <div className="rounded-2xl bg-[#EAF6FE] border-2 border-[#57B8F2] p-5">
                <p className="text-xs font-bold text-[#166088] mb-1">
                  Jumlah Markah Kelas
                </p>
                <p className="font-display text-3xl font-bold text-[#243B53] tabular-nums">
                  {totalScore} / {maxScore}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowReview((prev) => !prev)}
                aria-expanded={showReview}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-bold bg-[#57B8F2] hover:bg-[#3FA7E8] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
              >
                <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
                <span>
                  {showReview ? 'Tutup Semakan Jawapan' : 'Semak Jawapan'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleRetryQuiz}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-bold bg-[#FFD65A] hover:bg-[#F7C942] text-[#243B53] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shadow-xs"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Cuba Lagi</span>
              </button>
            </div>
          </div>

          {/* Semakan Semua 5 Soalan */}
          {showReview && (
            <div className="pt-6 border-t-2 border-[#E0D5FC] space-y-4">
              <h3 className="font-display text-xl font-bold text-[#243B53]">
                Semakan Jawapan (5 Soalan)
              </h3>

              <div className="space-y-4">
                {KUIZ_PANTAS_QUESTIONS.map((q) => {
                  const chosen = answers[q.id];
                  const isCorrect = chosen === q.correctAnswer;

                  return (
                    <article
                      key={q.id}
                      className={`rounded-2xl border-2 p-5 ${
                        isCorrect
                          ? 'bg-[#EAF9F1] border-[#9BE4BE]'
                          : 'bg-[#FFF0EE] border-[#FFB8B3]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-[#243B53]">
                          Soalan {q.id}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#243B53] bg-white px-2.5 py-1 rounded-lg border border-black/10">
                          {isCorrect ? (
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-[#1B6B46]"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="w-3.5 h-3.5 text-[#9E2F28]"
                              aria-hidden="true"
                            />
                          )}
                          <span>
                            Pilihan Kelas: {chosen ?? '-'} · Jawapan Betul:{' '}
                            {q.correctAnswer}
                          </span>
                        </span>
                      </div>

                      <p className="font-display text-base sm:text-lg font-bold text-[#243B53]">
                        {q.statement}
                      </p>
                      <p className="mt-2 text-sm text-[#334E68] leading-relaxed">
                        {q.feedback}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
