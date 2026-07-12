import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { LandingPage } from './index';
import { VIDEOS } from '../videos';

const { navigateToVideo } = vi.hoisted(() => ({ navigateToVideo: vi.fn() }));
vi.mock('../hooks/useNavigate', () => ({
  useNavigate: () => ({
    navigateToVideo,
    navigateToLanding: vi.fn(),
    navigateToPrivacy: vi.fn(),
  }),
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
    const searchInput = screen.getByPlaceholderText('Search rides…');
    fireEvent.change(searchInput, { target: { value: 'N222' } });
    expect(screen.getByAltText('N222 - Parte 1')).toBeInTheDocument();
    expect(screen.getByAltText('N222 - Parte 2')).toBeInTheDocument();
    expect(
      screen.queryByAltText('Portagem (Marvão) -> Castelo de Vide')
    ).not.toBeInTheDocument();
  });

  test('search bar shows all videos when query is cleared', () => {
    renderWithTheme(<LandingPage />);
    const searchInput = screen.getByPlaceholderText('Search rides…');
    fireEvent.change(searchInput, { target: { value: 'N222' } });
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(
      screen.getByAltText('Portagem (Marvão) -> Castelo de Vide')
    ).toBeInTheDocument();
  });

  test('renders a region badge for each distinct region', () => {
    renderWithTheme(<LandingPage />);
    for (const region of ['Alentejo', 'Ribatejo', 'Centro', 'AML', 'Minho', 'Espanha', 'Estremadura', 'Norte']) {
      expect(screen.getAllByText(region).length).toBeGreaterThan(1);
    }
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

  test('hero renders translated headline and CTAs', () => {
    renderWithTheme(<LandingPage />);
    expect(screen.getByText(/Ride Portugal & Spain/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start riding/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse rides/i })).toBeInTheDocument();
  });

  test('start riding navigates to the first video', () => {
    renderWithTheme(<LandingPage />);
    fireEvent.click(screen.getByRole('button', { name: /start riding/i }));
    expect(navigateToVideo).toHaveBeenCalledWith(VIDEOS[0].videoId);
  });

  test('region plate narrows the grid and search filters within it', () => {
    renderWithTheme(<LandingPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Norte' }));
    expect(screen.getByAltText('N222 - Parte 1')).toBeInTheDocument();
    expect(screen.queryByAltText("Serra D'Arga")).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search rides…'), {
      target: { value: 'Parte 2' },
    });
    expect(screen.getByAltText('N222 - Parte 2')).toBeInTheDocument();
    expect(screen.queryByAltText('N222 - Parte 1')).not.toBeInTheDocument();
  });

  test('All roads plate resets the region filter', () => {
    renderWithTheme(<LandingPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Norte' }));
    fireEvent.click(screen.getByRole('button', { name: /all roads/i }));
    expect(screen.getByAltText("Serra D'Arga")).toBeInTheDocument();
  });
});
