import pt from './messages/pt.json';
import en from './messages/en.json';
import fr from './messages/fr.json';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
export const translations = { pt, en, fr } as const;
export type Locale = keyof typeof translations;
export const locales = Object.keys(translations) as Locale[];
export const defaultLocale: Locale = 'pt' as const;

export const pages = ['home'] as const;
export type Page = (typeof pages)[number];
