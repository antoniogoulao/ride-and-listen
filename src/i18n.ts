import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const LOCALES = ['pt-PT', 'pt-BR', 'es-ES', 'fr-FR', 'en-GB', 'en-US'] as const;
export type Locale = (typeof LOCALES)[number];

export const resolveLocale = (detected: string): Locale => {
  const exact = LOCALES.find((l) => l.toLowerCase() === detected.toLowerCase());
  if (exact) return exact;
  const lang = detected.split('-')[0].toLowerCase();
  if (lang === 'pt') return 'pt-PT';
  if (lang === 'es') return 'es-ES';
  if (lang === 'fr') return 'fr-FR';
  return 'en-US';
};

const en = {
  heroEyebrow: 'Roads of Portugal & Spain · Live radio',
  heroTitle: 'Ride Portugal & Spain.\nRadio on.',
  heroSub:
    'Real motorcycle rides through Portuguese and Spanish back roads, with local radio playing along. Pick a road, pick a station, go.',
  startRiding: 'Start riding',
  browseRides: 'Browse rides',
  onAir: 'On air',
  pickARoad: 'Pick a road',
  ridesCount: '{{rides}} rides · {{regions}} regions',
  searchPlaceholder: 'Search rides…',
  allRoads: 'All roads',
  privacyPolicy: 'Privacy Policy',
  hide: 'Hide',
  language: 'Language',
  privacyNoData:
    'This site does not collect, store, or share any personal data. No cookies or tracking technologies are used.',
  privacyLocalStorage:
    "Your last played radio station and volume preference are saved in your browser's localStorage to remember your settings between visits. This data never leaves your device.",
  privacyYoutubePre: 'Video playback uses YouTube embeds, which are subject to',
  privacyYoutubeLink: "YouTube's Privacy Policy",
  clearLocalData: 'Clear local data',
};

const resources = {
  'en-US': { translation: en },
  'en-GB': { translation: en }, // ponytail: identical copy today; split when spelling diverges
  'pt-PT': {
    translation: {
      heroEyebrow: 'Estradas de Portugal e Espanha · Rádio em direto',
      heroTitle: 'Acelera por Portugal e Espanha.\nRádio ligada.',
      heroSub:
        'Passeios reais de mota pelas estradas secundárias de Portugal e Espanha, com rádio local a tocar. Escolhe a estrada, escolhe a estação e segue.',
      startRiding: 'Começar o passeio',
      browseRides: 'Ver passeios',
      onAir: 'No ar',
      pickARoad: 'Escolhe a estrada',
      ridesCount: '{{rides}} passeios · {{regions}} regiões',
      searchPlaceholder: 'Procurar passeios…',
      allRoads: 'Todas as estradas',
      privacyPolicy: 'Política de Privacidade',
      hide: 'Esconder',
      language: 'Idioma',
      privacyNoData:
        'Este site não recolhe, armazena nem partilha quaisquer dados pessoais. Não são usados cookies nem tecnologias de rastreio.',
      privacyLocalStorage:
        'A última rádio ouvida e o volume ficam guardados no localStorage do teu navegador para lembrar as tuas preferências entre visitas. Estes dados nunca saem do teu dispositivo.',
      privacyYoutubePre: 'A reprodução de vídeo usa incorporações do YouTube, sujeitas à',
      privacyYoutubeLink: 'Política de Privacidade do YouTube',
      clearLocalData: 'Apagar dados locais',
    },
  },
  'pt-BR': {
    translation: {
      heroEyebrow: 'Estradas de Portugal e Espanha · Rádio ao vivo',
      heroTitle: 'Acelere por Portugal e Espanha.\nRádio ligada.',
      heroSub:
        'Passeios reais de moto pelas estradas secundárias de Portugal e Espanha, com rádio local tocando. Escolha a estrada, escolha a estação e vá.',
      startRiding: 'Começar o passeio',
      browseRides: 'Ver passeios',
      onAir: 'No ar',
      pickARoad: 'Escolha a estrada',
      ridesCount: '{{rides}} passeios · {{regions}} regiões',
      searchPlaceholder: 'Buscar passeios…',
      allRoads: 'Todas as estradas',
      privacyPolicy: 'Política de Privacidade',
      hide: 'Esconder',
      language: 'Idioma',
      privacyNoData:
        'Este site não coleta, armazena nem compartilha nenhum dado pessoal. Não são usados cookies nem tecnologias de rastreamento.',
      privacyLocalStorage:
        'A última rádio tocada e o volume ficam salvos no localStorage do seu navegador para lembrar suas preferências entre visitas. Esses dados nunca saem do seu dispositivo.',
      privacyYoutubePre: 'A reprodução de vídeo usa incorporações do YouTube, sujeitas à',
      privacyYoutubeLink: 'Política de Privacidade do YouTube',
      clearLocalData: 'Apagar dados locais',
    },
  },
  'es-ES': {
    translation: {
      heroEyebrow: 'Carreteras de Portugal y España · Radio en directo',
      heroTitle: 'Rueda por Portugal y España.\nRadio encendida.',
      heroSub:
        'Rutas reales en moto por carreteras secundarias de Portugal y España, con la radio local sonando. Elige una carretera, elige una emisora y arranca.',
      startRiding: 'Empezar la ruta',
      browseRides: 'Ver rutas',
      onAir: 'En el aire',
      pickARoad: 'Elige tu carretera',
      ridesCount: '{{rides}} rutas · {{regions}} regiones',
      searchPlaceholder: 'Buscar rutas…',
      allRoads: 'Todas las carreteras',
      privacyPolicy: 'Política de privacidad',
      hide: 'Ocultar',
      language: 'Idioma',
      privacyNoData:
        'Este sitio no recopila, almacena ni comparte ningún dato personal. No se usan cookies ni tecnologías de rastreo.',
      privacyLocalStorage:
        'La última emisora reproducida y el volumen se guardan en el localStorage de tu navegador para recordar tus preferencias entre visitas. Estos datos nunca salen de tu dispositivo.',
      privacyYoutubePre: 'La reproducción de vídeo usa contenido incrustado de YouTube, sujeto a la',
      privacyYoutubeLink: 'Política de Privacidad de YouTube',
      clearLocalData: 'Borrar datos locales',
    },
  },
  'fr-FR': {
    translation: {
      heroEyebrow: "Routes du Portugal et d'Espagne · Radio en direct",
      heroTitle: 'Roulez au Portugal et en Espagne.\nRadio allumée.',
      heroSub:
        "De vraies balades à moto sur les routes secondaires du Portugal et de l'Espagne, avec la radio locale en fond. Choisissez une route, une station, et partez.",
      startRiding: 'Démarrer la balade',
      browseRides: 'Voir les balades',
      onAir: "À l'antenne",
      pickARoad: 'Choisissez votre route',
      ridesCount: '{{rides}} balades · {{regions}} régions',
      searchPlaceholder: 'Rechercher des balades…',
      allRoads: 'Toutes les routes',
      privacyPolicy: 'Politique de confidentialité',
      hide: 'Masquer',
      language: 'Langue',
      privacyNoData:
        "Ce site ne collecte, ne stocke ni ne partage aucune donnée personnelle. Aucun cookie ni technologie de suivi n'est utilisé.",
      privacyLocalStorage:
        'Votre dernière station écoutée et le volume sont enregistrés dans le localStorage de votre navigateur pour mémoriser vos préférences entre les visites. Ces données ne quittent jamais votre appareil.',
      privacyYoutubePre: 'La lecture vidéo utilise des intégrations YouTube, soumises à la',
      privacyYoutubeLink: 'Politique de confidentialité de YouTube',
      clearLocalData: 'Effacer les données locales',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    // ponytail: convertDetectedLanguage lives under `detection` for i18next-browser-languagedetector's types
    detection: { convertDetectedLanguage: resolveLocale },
    interpolation: { escapeValue: false },
  });

export default i18n;
