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
