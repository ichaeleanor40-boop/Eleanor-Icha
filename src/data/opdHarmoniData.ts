export interface OpdScene {
  id: string;
  sceneNumber: number;
  label: string;
  title: string;
  startTime: number;
  durationSec: number;
  narration: string;
  subtitleText: string;
  highlightSentence?: string;
}

export interface OpdCheckpointQuestion {
  id: string;
  afterSceneIndex: number;
  triggerTimeSec: number;
  title: string;
  prompt: string;
  options: string[];
  correctOption: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export const OPD_TOTAL_DURATION_SEC = 100; // 1 minit 40 saat

export const OPD_SCENES: OpdScene[] = [
  {
    id: 'babak-1',
    sceneNumber: 1,
    label: 'Babak 1',
    title: 'Pengenalan Ayat Penyata',
    startTime: 0,
    durationSec: 20,
    narration:
      'Hai, kawan-kawan! Hari ini, kita akan belajar tentang ayat penyata. Ayat penyata ialah ayat yang digunakan untuk menyatakan sesuatu maklumat atau berita. Jom kita lihat contohnya!',
    subtitleText:
      'Hai, kawan-kawan! Ayat penyata ialah ayat yang digunakan untuk menyatakan sesuatu maklumat atau berita. Jom kita lihat contohnya!',
    highlightSentence: 'Ayat Penyata = Menyatakan maklumat atau berita',
  },
  {
    id: 'babak-2',
    sceneNumber: 2,
    label: 'Babak 2',
    title: 'Contoh Ayat Penyata',
    startTime: 20,
    durationSec: 20,
    narration:
      'Ibu memasak di dapur. Ayat ini ialah ayat penyata kerana memberitahu kita perkara yang sedang dilakukan oleh ibu.',
    subtitleText:
      'Ibu memasak di dapur. Ayat ini ialah ayat penyata kerana memberitahu kita perkara yang sedang dilakukan oleh ibu.',
    highlightSentence: 'Ibu memasak di dapur.',
  },
  {
    id: 'babak-3',
    sceneNumber: 3,
    label: 'Babak 3',
    title: 'Ciri Ayat Penyata',
    startTime: 40,
    durationSec: 22,
    narration:
      'Ayat penyata biasanya bermula dengan huruf besar dan diakhiri dengan tanda noktah. Ayat penyata digunakan untuk menyampaikan maklumat, bukan untuk bertanya.',
    subtitleText:
      'Ayat penyata biasanya bermula dengan huruf besar dan diakhiri dengan tanda noktah. Ayat penyata digunakan untuk menyampaikan maklumat, bukan untuk bertanya.',
    highlightSentence: 'Huruf besar di awal + Tanda noktah (.) di akhir',
  },
  {
    id: 'babak-4',
    sceneNumber: 4,
    label: 'Babak 4',
    title: 'Situasi Kejiranan',
    startTime: 62,
    durationSec: 20,
    narration:
      'Jiran-jiran bekerjasama membersihkan taman. Ayat ini ialah ayat penyata kerana menyampaikan maklumat tentang aktiviti mereka.',
    subtitleText:
      'Jiran-jiran bekerjasama membersihkan taman. Ayat ini ialah ayat penyata kerana menyampaikan maklumat tentang aktiviti mereka.',
    highlightSentence: 'Jiran-jiran bekerjasama membersihkan taman.',
  },
  {
    id: 'babak-5',
    sceneNumber: 5,
    label: 'Babak 5',
    title: 'Rumusan',
    startTime: 82,
    durationSec: 18,
    narration:
      'Hebat! Sekarang, mari kita cari ayat penyata dalam poster Karnival Kejiranan Taman Harmoni!',
    subtitleText:
      'Hebat! Sekarang, mari kita cari ayat penyata dalam poster Karnival Kejiranan Taman Harmoni!',
    highlightSentence: 'Mari cari ayat penyata dalam poster kejiranan!',
  },
];

export const OPD_QUESTIONS: OpdCheckpointQuestion[] = [
  {
    id: 'soalan-1',
    afterSceneIndex: 1,
    triggerTimeSec: 40,
    title: 'Soalan Interaktif 1 (Selepas Babak 2)',
    prompt: 'Ayat "Ibu memasak di dapur." ialah ayat penyata.',
    options: ['Betul', 'Salah'],
    correctOption: 'Betul',
    feedbackCorrect:
      'Betul! Ayat "Ibu memasak di dapur." ialah ayat penyata kerana ayat ini menyatakan maklumat tentang perkara yang sedang dilakukan oleh ibu.',
    feedbackIncorrect:
      'Kurang tepat. Ayat "Ibu memasak di dapur." memberitahu kita maklumat tentang perbuatan ibu, maka ayat ini ialah ayat penyata (Betul).',
  },
  {
    id: 'soalan-2',
    afterSceneIndex: 2,
    triggerTimeSec: 62,
    title: 'Soalan Interaktif 2 (Selepas Babak 3)',
    prompt: 'Apakah tanda baca yang lazim digunakan pada akhir ayat penyata?',
    options: ['A. Tanda soal (?)', 'B. Tanda noktah (.)'],
    correctOption: 'B. Tanda noktah (.)',
    feedbackCorrect:
      'Syabas! Ayat penyata lazimnya bermula dengan huruf besar dan diakhiri dengan tanda noktah (.) kerana bertujuan menyampaikan maklumat.',
    feedbackIncorrect:
      'Kurang tepat. Tanda soal (?) digunakan untuk ayat tanya. Ayat penyata lazimnya diakhiri dengan tanda noktah (.).',
  },
  {
    id: 'soalan-3',
    afterSceneIndex: 3,
    triggerTimeSec: 82,
    title: 'Soalan Interaktif 3 (Selepas Babak 4)',
    prompt:
      'Ayat "Jiran-jiran bekerjasama membersihkan taman." menyampaikan maklumat tentang aktiviti jiran.',
    options: ['Betul', 'Salah'],
    correctOption: 'Betul',
    feedbackCorrect:
      'Tepat sekali! Ayat tersebut ialah ayat penyata yang menyampaikan maklumat jelas tentang aktiviti bergotong-royong di taman kejiranan.',
    feedbackIncorrect:
      'Kurang tepat. Ayat ini memang menyampaikan maklumat tentang aktiviti yang dilakukan oleh jiran-jiran, iaitu membersihkan taman (Betul).',
  },
];
