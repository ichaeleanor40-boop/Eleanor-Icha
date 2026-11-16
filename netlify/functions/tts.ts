import { GoogleGenAI } from '@google/genai';

const TTS_MODEL = 'gemini-3.8-flash-lite-tts';
const VOICE_NAME = 'Kore';
const VOICE_STYLE =
  'Warm, gentle, cheerful Malaysian female teacher speaking standard Bahasa Melayu Malaysia with clear natural pronunciation, moderate pace, child-friendly intonation for 10-year-old primary school students, and no English accent.';

interface CachedTtsEntry {
  audioBase64: string;
  mimeType: string;
  model: string;
}

const ttsCache = new Map<string, CachedTtsEntry>();

function isWavBuffer(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  return (
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WAVE'
  );
}

function wrapPcmAsWav(pcmBuffer: Buffer, sampleRate = 24000, channels = 1, bitDepth = 16): Buffer {
  const byteRate = (sampleRate * channels * bitDepth) / 8;
  const blockAlign = (channels * bitDepth) / 8;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + pcmBuffer.length, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(pcmBuffer.length, 40);

  return Buffer.concat([header, pcmBuffer]);
}

function ensurePlayableWavBase64(rawBase64: string, returnedMimeType?: string): string {
  const decoded = Buffer.from(rawBase64, 'base64');
  if (isWavBuffer(decoded)) {
    return rawBase64;
  }

  let sampleRate = 24000;
  if (returnedMimeType) {
    const rateMatch = returnedMimeType.match(/rate=(\d+)/i);
    if (rateMatch) {
      const parsed = Number(rateMatch[1]);
      if (Number.isFinite(parsed) && parsed > 0) {
        sampleRate = parsed;
      }
    }
  }

  return wrapPcmAsWav(decoded, sampleRate, 1, 16).toString('base64');
}

interface NetlifyEvent {
  httpMethod: string;
  body: string | null;
}

export async function handler(event: NetlifyEvent) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Kaedah tidak dibenarkan.' }),
    };
  }

  let parsedBody: { text?: unknown } = {};
  try {
    parsedBody = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Format JSON tidak sah.' }),
    };
  }

  const rawText = typeof parsedBody.text === 'string' ? parsedBody.text.trim() : '';
  if (!rawText) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Teks skrip ucapan diperlukan untuk menjana audio.',
      }),
    };
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error:
          'Netlify Function belum dikonfigurasi dengan pemboleh ubah persekitaran GEMINI_API_KEY.',
      }),
    };
  }

  const cacheKey = `${TTS_MODEL}:${VOICE_NAME}:${rawText}`;
  const cached = ttsCache.get(cacheKey);
  if (cached) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...cached, cached: true }),
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: TTS_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: rawText,
              speechMetadata: {
                style: VOICE_STYLE,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: VOICE_NAME,
            },
          },
        },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const audioPart = parts.find((part) => part.inlineData?.data);
    const rawData = audioPart?.inlineData?.data;
    const returnedMime = audioPart?.inlineData?.mimeType;

    if (!rawData) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'Model TTS tidak mengembalikan data audio.',
        }),
      };
    }

    const entry: CachedTtsEntry = {
      audioBase64: ensurePlayableWavBase64(rawData, returnedMime),
      mimeType: 'audio/wav',
      model: TTS_MODEL,
    };
    ttsCache.set(cacheKey, entry);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...entry, cached: false }),
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Ralat pelayan semasa menjana suara AI.';
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: `Penjanaan suara AI gagal: ${message}`,
      }),
    };
  }
}
