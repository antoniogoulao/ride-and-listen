import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { LandingPage } from './index';
import { VIDEOS } from '../videos';

vi.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({ navigateToVideo: vi.fn(), navigateToPrivacy: vi.fn() }),
}));

const theme = createTheme();
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('LandingPage', () => {
  test('renders the page title', () => {
    renderWithTheme(<LandingPage />);
    expect(screen.getByText('Ride & Listen')).toBeInTheDocument();
  });

  test('renders a thumbnail image for each video', () => {
    renderWithTheme(<LandingPage />);
    expect(screen.getByAltText('Portagem (Marvão) -> Castelo de Vide')).toBeInTheDocument();
    expect(screen.getByAltText('N222 - Parte 1')).toBeInTheDocument();
  });

  test('search bar filters videos by title', () => {
    renderWithTheme(<LandingPage />);
    const searchInput = screen.getByPlaceholderText('Search videos...');
    fireEvent.change(searchInput, { target: { value: 'N222' } });
    expect(screen.getByAltText('N222 - Parte 1')).toBeInTheDocument();
    expect(screen.getByAltText('N222 - Parte 2')).toBeInTheDocument();
    expect(
      screen.queryByAltText('Portagem (Marvão) -> Castelo de Vide')
    ).not.toBeInTheDocument();
  });

  test('search bar shows all videos when query is cleared', () => {
    renderWithTheme(<LandingPage />);
    const searchInput = screen.getByPlaceholderText('Search videos...');
    fireEvent.change(searchInput, { target: { value: 'N222' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(
      screen.getByAltText('Portagem (Marvão) -> Castelo de Vide')
    ).toBeInTheDocument();
  });

  test('renders a region badge for each distinct region', () => {
    renderWithTheme(<LandingPage />);
    expect(screen.getByText('Alentejo')).toBeInTheDocument();
    expect(screen.getAllByText('Ribatejo').length).toBeGreaterThan(0);
    expect(screen.getByText('Centro')).toBeInTheDocument();
    expect(screen.getByText('AML')).toBeInTheDocument();
    expect(screen.getByText('Minho')).toBeInTheDocument();
    expect(screen.getAllByText('Espanha').length).toBeGreaterThan(0);
    expect(screen.getByText('Estremadura')).toBeInTheDocument();
    expect(screen.getAllByText('Norte').length).toBeGreaterThan(0);
  });

  test('renders a play overlay element for every video card', () => {
    const { container } = renderWithTheme(<LandingPage />);
    const overlays = container.querySelectorAll('.play-overlay');
    expect(overlays.length).toBe(VIDEOS.length);
  });

  test('renders a Privacy Policy button in the footer', () => {
    renderWithTheme(<LandingPage />);
    expect(
      screen.getByRole('button', { name: /privacy policy/i })
    ).toBeInTheDocument();
  });
});
