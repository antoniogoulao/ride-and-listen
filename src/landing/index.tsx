import { Search } from '@mui/icons-material';
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import logo from '../logo.svg';
import { videosAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';

export const LandingPage = () => {
  const videos = useAtomValue(videosAtom);
  const { navigateToVideo } = useNavigate();
  const [query, setQuery] = useState('');

  const filtered = videos.filter(({ name, keywords }) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      name.toLowerCase().includes(q) ||
      (keywords ?? []).some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        pb: '80px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
        }}
      >
        <img
          src={logo}
          alt="Ride & Listen logo"
          style={{ height: 80, marginBottom: 16 }}
        />
        <Typography variant="h3" fontWeight="bold">
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
        {filtered.map(({ videoId, name }) => (
          <Box
            key={videoId}
            onClick={() => navigateToVideo(videoId)}
            sx={{
              m: 1.5,
              cursor: 'pointer',
              width: { xs: 'calc(100vw - 24px)', sm: 400 },
              '&:hover img': { opacity: 0.85, transition: 'opacity 0.2s' },
            }}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={name}
              style={{
                width: '100%',
                aspectRatio: '4/3',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <Typography
              variant="body1"
              sx={{
                mt: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};