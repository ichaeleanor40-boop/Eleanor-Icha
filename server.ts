import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  header.writeUInt32LE(16, 16); // PCM subchunk size
  header.writeUInt16LE(1, 20); // AudioFormat = 1 (PCM)
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

  const wavBuffer = wrapPcmAsWav(decoded, sampleRate, 1, 16);
  return wavBuffer.toString('base64');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.post('/api/tts', async (req: Request, res: Response) => {
    const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';

    if (!rawText) {
      res.status(400).json({
        error: 'Teks skrip ucapan diperlukan untuk menjana audio.',
      });
      return;
    }

    if (rawText.length > 1000) {
      res.status(400).json({
        error: 'Skrip ucapan terlalu panjang.',
      });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      res.status(503).json({
        error:
          'Pelayan TTS belum dikonfigurasi dengan GEMINI_API_KEY yang sah.',
      });
      return;
    }

    const cacheKey = `${TTS_MODEL}:${VOICE_NAME}:${rawText}`;
    const cached = ttsCache.get(cacheKey);
    if (cached) {
      res.json({
        audioBase64: cached.audioBase64,
        mimeType: cached.mimeType,
        model: cached.model,
        cached: true,
      });
      return;
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
        res.status(502).json({
          error: 'Model TTS tidak mengembalikan data audio. Sila cuba sebentar lagi.',
        });
        return;
      }

      const wavBase64 = ensurePlayableWavBase64(rawData, returnedMime);
      const entry: CachedTtsEntry = {
        audioBase64: wavBase64,
        mimeType: 'audio/wav',
        model: TTS_MODEL,
      };
      ttsCache.set(cacheKey, entry);

      res.json({
        audioBase64: entry.audioBase64,
        mimeType: entry.mimeType,
        model: entry.model,
        cached: false,
      });
    } catch (err) {
      console.error('Gemini TTS error:', err);
      const message =
        err instanceof Error ? err.message : 'Ralat tidak dijangka pada pelayan TTS.';
      res.status(500).json({
        error: `Penjanaan suara AI gagal: ${message}`,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
