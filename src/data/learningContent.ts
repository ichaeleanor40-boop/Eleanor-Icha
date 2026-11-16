export interface NavItem {
  label: string;
  path: string;
  pageTitle: string;
  subtitle: string;
}

export interface LearningObjective {
  id: string;
  label: string;
  text: string;
  iconName: 'book' | 'pencil';
}

export interface ContentModuleCard {
  id: string;
  stepLabel: string;
  title: string;
  description: string;
  path: string;
  iconName: 'play' | 'lightbulb' | 'puzzle' | 'newspaper' | 'check';
  accentColor: 'sky' | 'green' | 'yellow' | 'coral' | 'purple';
}

export interface LessonMetadataItem {
  label: string;
  value: string;
  fullWidth?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Halaman Utama',
    path: '/',
    pageTitle: 'Halaman Utama',
    subtitle: 'Portal pembelajaran Bahasa Melayu Tahun 4',
  },
  {
    label: 'Set Induksi',
    path: '/set-induksi',
    pageTitle: 'Set Induksi: Suasana Kampung Muafakat',
    subtitle: 'Pengenalan kepada kehidupan berjiran melalui video dan soal jawab.',
  },
  {
    label: 'Langkah 1',
    path: '/langkah-1',
    pageTitle: 'Langkah 1: Kenali Ayat Penyata',
    subtitle: 'Penerangan konsep dan penerokaan bahan pembelajaran.',
  },
  {
    label: 'Langkah 2',
    path: '/langkah-2',
    pageTitle: 'Langkah 2: Misi Susun Ayat Kejiranan',
    subtitle: 'Aktiviti menyusun perkataan untuk membina ayat penyata.',
  },
  {
    label: 'Langkah 3',
    path: '/langkah-3',
    pageTitle: 'Langkah 3: Misi Wartawan Cilik',
    subtitle: 'Aktiviti membina ayat penyata berdasarkan situasi kejiranan.',
  },
  {
    label: 'Penutup',
    path: '/penutup',
    pageTitle: 'Penutup: Uji Kefahaman',
    subtitle: 'Aktiviti pengukuhan dan pentaksiran pembelajaran.',
  },
  {
    label: 'Ruang Guru',
    path: '/ruang-guru',
    pageTitle: 'Ruang Guru',
    subtitle: 'Panduan pengajaran dan bahan sokongan untuk guru Bahasa Melayu Tahun 4.',
  },
];

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 'obj-1',
    label: 'Objektif 1',
    text: 'Memahami ayat penyata berkaitan semangat kejiranan berdasarkan poster Karnival Kejiranan Taman Harmoni dengan betul dan gramatis.',
    iconName: 'book',
  },
  {
    id: 'obj-2',
    label: 'Objektif 2',
    text: 'Membina ayat penyata berdasarkan poster Karnival Kejiranan Taman Harmoni dengan betul dan gramatis.',
    iconName: 'pencil',
  },
];

export const CONTENT_MODULES: ContentModuleCard[] = [
  {
    id: 'set-induksi',
    stepLabel: 'Set Induksi',
    title: 'Suasana Kampung Muafakat',
    description: 'Pengenalan kepada kehidupan berjiran melalui video dan soal jawab.',
    path: '/set-induksi',
    iconName: 'play',
    accentColor: 'sky',
  },
  {
    id: 'langkah-1',
    stepLabel: 'Langkah 1',
    title: 'Kenali Ayat Penyata',
    description: 'Penerangan konsep dan penerokaan bahan pembelajaran.',
    path: '/langkah-1',
    iconName: 'lightbulb',
    accentColor: 'green',
  },
  {
    id: 'langkah-2',
    stepLabel: 'Langkah 2',
    title: 'Misi Susun Ayat Kejiranan',
    description: 'Aktiviti menyusun perkataan untuk membina ayat penyata.',
    path: '/langkah-2',
    iconName: 'puzzle',
    accentColor: 'yellow',
  },
  {
    id: 'langkah-3',
    stepLabel: 'Langkah 3',
    title: 'Misi Wartawan Cilik',
    description: 'Aktiviti membina ayat penyata berdasarkan situasi kejiranan.',
    path: '/langkah-3',
    iconName: 'newspaper',
    accentColor: 'coral',
  },
  {
    id: 'penutup',
    stepLabel: 'Penutup',
    title: 'Uji Kefahaman',
    description: 'Aktiviti pengukuhan dan pentaksiran pembelajaran.',
    path: '/penutup',
    iconName: 'check',
    accentColor: 'purple',
  },
];

export const LESSON_METADATA: LessonMetadataItem[] = [
  {
    label: 'Mata Pelajaran',
    value: 'Bahasa Melayu',
  },
  {
    label: 'Tahun',
    value: '4',
  },
  {
    label: 'Tema',
    value: 'Kemasyarakatan',
  },
  {
    label: 'Tajuk',
    value: 'Semangat Kejiranan Memupuk Keharmonian',
  },
  {
    label: 'Tempoh PdP',
    value: '60 minit',
  },
  {
    label: 'Standard Kandungan',
    value: '5.3 Memahami dan membina ayat mengikut konteks.',
    fullWidth: true,
  },
  {
    label: 'Standard Pembelajaran',
    value: '5.3.3(i) Memahami dan membina ayat penyata mengikut konteks.',
    fullWidth: true,
  },
];
