import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Locale, resolveLocale } from '../../../i18n';

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: 'pt-PT', label: '🇵🇹 Português (Portugal)' },
  { code: 'pt-BR', label: '🇧🇷 Português (Brasil)' },
  { code: 'es-ES', label: '🇪🇸 Español' },
  { code: 'fr-FR', label: '🇫🇷 Français' },
  { code: 'en-GB', label: '🇬🇧 English (UK)' },
  { code: 'en-US', label: '🇺🇸 English (US)' },
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  return (
    <FormControl sx={{ margin: 1, minWidth: 150 }} size="small">
      <Select
        value={resolveLocale(i18n.language)}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
        inputProps={{ 'aria-label': t('language') }}
      >
        {LANGUAGES.map(({ code, label }) => (
          <MenuItem key={code} value={code}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
