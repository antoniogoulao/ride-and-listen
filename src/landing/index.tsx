import { PlayArrow, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  amber,
  green,
  indigo,
  lightBlue,
  orange,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { videosAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';

const REGION_COLORS: Record<string, { bg: string; text: string }> = {
  Alentejo: { bg: orange[700], text: '#fff' },
  Ribatejo: { bg: green[700], text: '#fff' },
  Centro: { bg: purple[600], text: '#fff' },
  AML: { bg: lightBlue[700], text: '#fff' },
  Minho: { bg: teal[600], text: '#fff' },
  Espanha: { bg: red[700], text: '#fff' },
  Estremadura: { bg: amber[700], text: '#000' },
  Norte: { bg: indigo[600], text: '#fff' },
};

export const LandingPage = () => {
  const videos = useAtomValue(videosAtom);
  const { navigateToVideo, navigateToPrivacy } = useNavigate();
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const filtered = videos.filter(({ name, keywords }) => {
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
        pb: '80px',
        bgcolor: 'background.default',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}>
        <img src="/logo192.png" alt="Ride & Listen logo" style={{ height: 80, marginBottom: 16 }} />
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: theme.palette.mode === 'light' ? lightBlue[900] : yellow[700] }}>
          Ride & Listen
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, px: 2 }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          sx={{ width: '100%', maxWidth: 600 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filtered.map(({ videoId, name, region }) => {
          const colors = REGION_COLORS[region] ?? { bg: '#888', text: '#fff' };
          return (
            <Card
              key={videoId}
              onClick={() => navigateToVideo(videoId)}
              sx={{
                m: 1.5,
                p: '5px',
                cursor: 'pointer',
                width: { xs: 'calc(100vw - 24px)', sm: 400 },
                border: '2px solid',
                borderColor: 'grey.400',
                borderRadius: '10px',
                '&:hover .play-overlay': { opacity: 1 },
              }}>
              <Box sx={{ position: 'relative', m: '5px' }}>
                <CardMedia
                  component="img"
                  image={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={name}
                  sx={{ aspectRatio: '4/3', objectFit: 'cover', borderRadius: '5px' }}
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
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body1" noWrap>
                  {name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip
                    label={region}
                    size="small"
                    sx={{
                      bgcolor: colors.bg,
                      color: colors.text,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Button variant="text" onClick={navigateToPrivacy}>
          Privacy Policy
        </Button>
      </Box>
    </Box>
  );
};
