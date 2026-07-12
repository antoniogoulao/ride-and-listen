import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import i18n from '../i18n';
import { PrivacyPolicy } from './index';

const navigateToLandingMock = vi.fn();

vi.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({
    navigateToLanding: navigateToLandingMock,
  }),
}));

const theme = createTheme();
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('PrivacyPolicy', () => {
  beforeEach(() => {
    navigateToLandingMock.mockClear();
  });

  test('renders the page title', () => {
    renderWithTheme(<PrivacyPolicy />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  test('renders the no personal data paragraph', () => {
    renderWithTheme(<PrivacyPolicy />);
    expect(
      screen.getByText(/does not collect, store, or share any personal data/)
    ).toBeInTheDocument();
  });

  test('renders the localStorage paragraph', () => {
    renderWithTheme(<PrivacyPolicy />);
    expect(
      screen.getByText(/localStorage to remember your settings/)
    ).toBeInTheDocument();
  });

  test('renders a link to YouTube privacy policy', () => {
    renderWithTheme(<PrivacyPolicy />);
    const link = screen.getByRole('link', { name: /youtube's privacy policy/i });
    expect(link).toHaveAttribute('href', 'https://policies.google.com/privacy');
  });

  test('back button calls navigateToLanding', () => {
    renderWithTheme(<PrivacyPolicy />);
    fireEvent.click(screen.getByLabelText('back to landing page'));
    expect(navigateToLandingMock).toHaveBeenCalledTimes(1);
  });

  test('translates the page when the language changes', async () => {
    await i18n.changeLanguage('pt-PT');
    renderWithTheme(<PrivacyPolicy />);
    expect(screen.getByText('Política de Privacidade')).toBeInTheDocument();
    expect(screen.getByText(/não recolhe, armazena nem partilha/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apagar dados locais/i })).toBeInTheDocument();
    await i18n.changeLanguage('en-US');
  });

  test('clear local data button removes RECENTLY_PLAYED and VOLUME from localStorage', () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem');
    localStorage.setItem('RECENTLY_PLAYED', '{}');
    localStorage.setItem('VOLUME', '80');

    renderWithTheme(<PrivacyPolicy />);
    fireEvent.click(screen.getByRole('button', { name: /clear local data/i }));

    expect(removeItemSpy).toHaveBeenCalledWith('RECENTLY_PLAYED');
    expect(removeItemSpy).toHaveBeenCalledWith('VOLUME');
    removeItemSpy.mockRestore();
  });
});