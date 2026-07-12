import { PlayArrow, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { videosAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';
import { Hero } from './Hero';

const plateSx = (active: boolean) => ({
  fontFamily: 'Oswald, "Arial Narrow", sans-serif',
  fontWeight: 600,
  fontSize: '0.8rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: active ? '#14110A' : '#fff',
  bgcolor: active ? 'primary.main' : '#20489E',
  border: '2px solid #fff',
  borderRadius: '4px',
  px: 1.5,
  py: 0.5,
  '&:hover': { bgcolor: active ? 'primary.dark' : '#2A57B8' },
});

export const LandingPage = () => {
  const videos = useAtomValue(videosAtom);
  const { navigateToVideo, navigateToPrivacy } = useNavigate();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const regions = [...new Set(videos.map((v) => v.region))];

  const filtered = videos.filter(({ name, keywords, region: videoRegion }) => {
    if (region && videoRegion !== region) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      name.toLowerCase().includes(q) || (keywords ?? []).some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        pb: '96px',
        bgcolor: 'background.default',
      }}>
      <Hero onBrowse={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <Box sx={{ px: { xs: 2, md: 4 }, pt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Typography
            variant="h4"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '1.15rem' }}>
            {t('pickARoad')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('ridesCount', { rides: videos.length, regions: regions.length })}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Button onClick={() => setRegion(null)} sx={plateSx(region === null)}>
            {t('allRoads')}
          </Button>
          {regions.map((r) => (
            <Button key={r} onClick={() => setRegion(r)} sx={plateSx(region === r)}>
              {r}
            </Button>
          ))}
        </Box>

        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          size="small"
          sx={{ width: '100%', maxWidth: 420, mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Box
          ref={gridRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 2.25,
          }}>
          {filtered.map(({ videoId, name, region: videoRegion }) => (
            <Box
              key={videoId}
              onClick={() => navigateToVideo(videoId)}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid #23272E',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.18s, border-color 0.18s',
                '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' },
                '&:hover .play-overlay': { opacity: 1 },
              }}>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={name}
                  sx={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                />
                <Box
                  className="play-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}>
                  <PlayArrow sx={{ fontSize: 64, color: '#fff' }} />
                </Box>
              </Box>
              <Box sx={{ p: 1.75 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.92rem', mb: 1 }} noWrap>
                  {name}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: 'Oswald, "Arial Narrow", sans-serif',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    bgcolor: '#20489E',
                    borderRadius: '3px',
                    px: 1,
                    py: 0.375,
                  }}>
                  {videoRegion}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Button variant="text" onClick={navigateToPrivacy} sx={{ color: 'text.secondary' }}>
          {t('privacyPolicy')}
        </Button>
      </Box>
    </Box>
  );
};
