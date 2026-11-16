import { useMemo, useState } from 'react';
import { ExternalLink, RotateCcw, Sparkles, UserCheck, Users } from 'lucide-react';

const WHEEL_OF_NAMES_URL = 'https://wheelofnames.com/';

const SEGMENT_COLORS = [
  '#57B8F2',
  '#FFD65A',
  '#70D6A1',
  '#FF8D85',
  '#B8A0F5',
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeSlice(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export function RodaWartawanBertuah() {
  const [rawNamesInput, setRawNamesInput] = useState<string>('');
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [inputNotice, setInputNotice] = useState<string | null>(null);

  const namesList = useMemo(() => {
    return rawNamesInput
      .split(/[\n,]+/)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
  }, [rawNamesInput]);

  function handleSpinWheel() {
    if (namesList.length === 0) {
      setInputNotice(
        'Sila masukkan sekurang-kurangnya satu nama murid di kotak senarai atau gunakan pautan rasmi Wheel of Names.'
      );
      return;
    }

    setInputNotice(null);
    setIsSpinning(true);

    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const chosenIndex = randomBuffer[0] % namesList.length;

    const sliceAngle = 360 / namesList.length;
    const chosenCenterAngle = chosenIndex * sliceAngle + sliceAngle / 2;
    const targetMod = (360 - chosenCenterAngle) % 360;
    const currentMod = ((rotationDeg % 360) + 360) % 360;
    const delta = (targetMod - currentMod + 360) % 360;
    const extraSpins = 360 * 4;
    const nextRotation = rotationDeg + extraSpins + delta;

    setRotationDeg(nextRotation);

    window.setTimeout(() => {
      setIsSpinning(false);
      setSelectedName(namesList[chosenIndex]);
    }, 1800);
  }

  function handleResetWheel() {
    setSelectedName(null);
    setInputNotice(null);
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-[#CFC0FA] shadow-xs p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#E0D5FC]">
        <div>
          <p className="text-xs font-bold text-[#4D348C] tracking-wide mb-1">
            Pemilihan Pembentang Secara Rawak
          </p>
          <h3 className="font-display text-2xl font-bold text-[#243B53]">
            Pilih Wartawan Bertuah
          </h3>
          <p className="mt-1.5 text-sm text-[#334E68] max-w-xl">
            Guru boleh memasukkan senarai nama murid secara manual untuk
            memutar roda di sini, atau menggunakan pautan rasmi Wheel of Names.
            Tiada nama murid disimpan ke pangkalan data.
          </p>
        </div>

        <a
          href={WHEEL_OF_NAMES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#F3EEFE] hover:bg-[#E8DFFD] text-[#243B53] border-2 border-[#CFC0FA] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] shrink-0 whitespace-nowrap"
        >
          <span>Buka Wheel of Names</span>
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
        {/* Kolum Kiri: Input Senarai Nama Manual Guru */}
        <div className="lg:col-span-5 space-y-4">
          <label
            htmlFor="senarai-nama-murid"
            className="block text-sm font-bold text-[#243B53]"
          >
            Senarai Nama Murid (Satu nama setiap baris atau dipisahkan koma)
          </label>
          <textarea
            id="senarai-nama-murid"
            rows={6}
            value={rawNamesInput}
            onChange={(e) => {
              setRawNamesInput(e.target.value);
              setInputNotice(null);
            }}
            placeholder={'Contoh:\nAiman\nMei Lin\nRuphinee\nDanial'}
            className="w-full rounded-xl border-2 border-[#BCE3FA] bg-[#FFF8E9]/60 px-4 py-3 text-sm text-[#243B53] placeholder:text-[#486581]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#57B8F2]"
          />

          <div className="flex items-center justify-between text-xs font-semibold text-[#486581]">
            <span className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4" aria-hidden="true" />
              <span className="tabular-nums">
                Jumlah nama dimasukkan: {namesList.length}
              </span>
            </span>
            {rawNamesInput.trim().length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setRawNamesInput('');
                  setSelectedName(null);
                  setInputNotice(null);
                }}
                className="text-[#9E2F28] hover:underline"
              >
                Kosongkan Senarai
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className="inline-flex items-center gap-2 bg-[#FFD65A] hover:bg-[#F7C942] disabled:opacity-60 text-[#243B53] font-bold text-sm sm:text-base px-5 py-3 rounded-xl border-2 border-[#EFC034] shadow-xs transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243B53] whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSpinning ? 'Memilih Nama...' : 'Pilih Wartawan Bertuah'}
              </span>
            </button>

            {selectedName && (
              <button
                type="button"
                onClick={handleResetWheel}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-[#FFF8E9] text-[#243B53] border-2 border-[#BCE3FA] min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Set Semula</span>
              </button>
            )}
          </div>

          {inputNotice && (
            <p
              role="alert"
              className="rounded-xl bg-[#FFF0EE] border border-[#FF8D85] px-4 py-3 text-sm text-[#243B53]"
            >
              {inputNotice}
            </p>
          )}
        </div>

        {/* Kolum Kanan: Roda Visual & Paparan Nama Terpilih */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72">
            {/* Penunjuk Atas */}
            <div
              aria-hidden="true"
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#243B53]"
            />

            {namesList.length === 0 ? (
              <div className="w-full h-full rounded-full border-4 border-dashed border-[#A6DCFA] bg-[#EAF6FE] flex flex-col items-center justify-center p-6 text-center">
                <Users
                  className="w-10 h-10 text-[#166088] mb-2"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold text-[#243B53]">
                  Tiada Nama Dimasukkan
                </p>
                <p className="text-xs text-[#334E68] mt-1">
                  Masukkan nama murid di kotak senarai untuk memaparkan roda
                  pilihan.
                </p>
              </div>
            ) : namesList.length === 1 ? (
              <div className="w-full h-full rounded-full border-4 border-[#243B53] bg-[#57B8F2] flex items-center justify-center p-6 text-center shadow-sm">
                <span className="font-display text-xl font-bold text-[#243B53] break-words">
                  {namesList[0]}
                </span>
              </div>
            ) : (
              <svg
                viewBox="0 0 260 260"
                className="w-full h-full rounded-full border-4 border-[#243B53] shadow-sm"
                style={{
                  transform: `rotate(${rotationDeg}deg)`,
                  transition: isSpinning
                    ? 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }}
                aria-label="Roda pemilihan nama wartawan cilik"
              >
                {namesList.map((name, idx) => {
                  const sliceAngle = 360 / namesList.length;
                  const startAngle = idx * sliceAngle;
                  const endAngle = startAngle + sliceAngle;
                  const midAngle = startAngle + sliceAngle / 2;
                  const fill = SEGMENT_COLORS[idx % SEGMENT_COLORS.length];
                  const textPos = polarToCartesian(130, 130, 82, midAngle);

                  return (
                    <g key={`${idx}-${name}`}>
                      <path
                        d={describeSlice(130, 130, 128, startAngle, endAngle)}
                        fill={fill}
                        stroke="#243B53"
                        strokeWidth="1.5"
                      />
                      <text
                        x={textPos.x}
                        y={textPos.y}
                        fill="#243B53"
                        fontSize={namesList.length > 10 ? '9' : '11'}
                        fontWeight="700"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${midAngle - 90}, ${textPos.x}, ${textPos.y})`}
                      >
                        {name.length > 12 ? `${name.slice(0, 11)}…` : name}
                      </text>
                    </g>
                  );
                })}
                <circle
                  cx="130"
                  cy="130"
                  r="16"
                  fill="#FFFFFF"
                  stroke="#243B53"
                  strokeWidth="3"
                />
              </svg>
            )}
          </div>

          {selectedName && !isSpinning && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 w-full max-w-md rounded-2xl bg-[#EAF9F1] border-2 border-[#70D6A1] p-4 flex items-center justify-center gap-3 text-center"
            >
              <UserCheck
                className="w-6 h-6 text-[#1B6B46] shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs font-bold text-[#1B6B46]">
                  Wartawan Bertuah Terpilih:
                </p>
                <p className="font-display text-xl font-bold text-[#243B53]">
                  {selectedName}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
