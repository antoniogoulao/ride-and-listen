import '../styles/globals.css';
import { getLocale, state } from '@/i18n';
import { defaultLocale, locales } from '@/config';

export type Props = {
  params: Promise<{
    /**
     * Optional because it's not available in `app/page.tsx`.
     */
    locale?: string;
  }>;
};

export function generateStaticParams(): { locale: string }[] {
  return locales.filter((locale) => locale !== defaultLocale).map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<Props & { children: React.ReactNode }>) {
  // Await the params promise
  const { locale } = await params;

  state.locale = getLocale(locale);

  return (
    <html lang={getLocale(state.locale)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Ride & Listen</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
