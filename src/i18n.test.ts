import i18n, { resolveLocale } from './i18n';

describe('resolveLocale', () => {
  test('exact matches pass through', () => {
    expect(resolveLocale('pt-BR')).toBe('pt-BR');
    expect(resolveLocale('en-GB')).toBe('en-GB');
    expect(resolveLocale('fr-FR')).toBe('fr-FR');
  });

  test('is case-insensitive on exact matches', () => {
    expect(resolveLocale('pt-br')).toBe('pt-BR');
  });

  test('language-only and unknown-region variants fall back', () => {
    expect(resolveLocale('pt')).toBe('pt-PT');
    expect(resolveLocale('pt-AO')).toBe('pt-PT');
    expect(resolveLocale('es-MX')).toBe('es-ES');
    expect(resolveLocale('fr-CA')).toBe('fr-FR');
    expect(resolveLocale('en-AU')).toBe('en-US');
  });

  test('unsupported languages fall back to en-US', () => {
    expect(resolveLocale('de-DE')).toBe('en-US');
  });
});

describe('resources', () => {
  test('every locale defines every key', async () => {
    const keys = Object.keys(i18n.getResourceBundle('en-US', 'translation'));
    for (const locale of ['pt-PT', 'pt-BR', 'es-ES', 'fr-FR', 'en-GB', 'en-US']) {
      const bundle = i18n.getResourceBundle(locale, 'translation');
      expect(Object.keys(bundle).sort()).toEqual(keys.sort());
    }
  });
});
