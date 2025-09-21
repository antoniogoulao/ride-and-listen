'use client';

import { Suspense } from 'react';
import { getTranslations } from '@/i18n';
import { App } from '@/App';

export type Props = {
  params: Promise<{
    /**
     * Optional because it's not available in `app/page.tsx`.
     */
    locale?: string;
  }>;
};

async function LoadingComponent({ params }: Readonly<Props>) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
      }}>
      <div style={{ textAlign: 'center' }}>
        <img src={'/motorcycle_wheelie.svg'} alt={t.loading.title} />
        <h2>{t.loading.title}</h2>
        <p>{t.loading.subtitle}</p>
      </div>
    </div>
  );
}

export default async function HomePage({ params }: Readonly<Props>) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <Suspense fallback={<LoadingComponent params={params} />}>
      <App locale={locale ?? 'pt'} />
    </Suspense>
  );
}
