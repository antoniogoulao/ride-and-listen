import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import i18n from '../../../i18n';
import { LanguageSelector } from './index';

describe('LanguageSelector', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en-US');
  });

  test('renders all six languages with flags and native names', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('🇵🇹 Português (Portugal)')).toBeInTheDocument();
    expect(screen.getByText('🇧🇷 Português (Brasil)')).toBeInTheDocument();
    expect(screen.getByText('🇪🇸 Español')).toBeInTheDocument();
    expect(screen.getByText('🇫🇷 Français')).toBeInTheDocument();
    expect(screen.getByText('🇬🇧 English (UK)')).toBeInTheDocument();
    // "en-US" appears in both the Select display and menu, so we check length > 0
    expect(screen.getAllByText('🇺🇸 English (US)').length).toBeGreaterThan(0);
  });

  test('selecting a language changes the i18n language', async () => {
    const user = userEvent.setup();
    render(<LanguageSelector />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('🇫🇷 Français'));
    expect(i18n.language).toBe('fr-FR');
  });
});
