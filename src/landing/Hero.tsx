import { PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { selectedRadioAtom, videosAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';

export const Hero = ({ onBrowse }: { onBrowse: () => void }) => {
  const { t } = useTranslation();
  const videos = useAtomValue(videosAtom);
  const radio = useAtomValue(selectedRadioAtom);
  const { navigateToVideo } = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 420, md: 560 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
      <Box
        className="hero-img"
        sx={{ position: 'absolute', inset: 0, background: 'url(/hero.jpg) center/cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(13,15,18,0.55) 0%, rgba(13,15,18,0.05) 35%, rgba(13,15,18,0.92) 88%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 4 },
          py: 2.5,
        }}>
        <Typography
          sx={{
            fontFamily: 'Oswald, "Arial Narrow", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
          Ride & Listen
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.75,
            py: 0.75,
            borderRadius: 999,
            border: '1px solid rgba(234,230,220,0.25)',
            bgcolor: 'rgba(13,15,18,0.55)',
          }}>
          <Box
            className="onair-dot"
            sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }}
          />
          <Typography
            variant="caption"
            sx={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {t('onAir')} — {radio.name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: 'relative', px: { xs: 2, md: 4 }, pb: { xs: 4, md: 5.5 }, maxWidth: 720 }}>
        <Typography
          sx={{
            color: 'primary.main',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 600,
            mb: 1.25,
          }}>
          {t('heroEyebrow')}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: 0.95,
            whiteSpace: 'pre-line',
            fontSize: 'clamp(2.4rem, 7vw, 4.4rem)',
            mb: 1.75,
          }}>
          {t('heroTitle')}
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: '46ch', mb: 3 }}>
          {t('heroSub')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={() => navigateToVideo(videos[0].videoId)}
            sx={{ fontWeight: 700 }}>
            {t('startRiding')}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onBrowse}>
            {t('browseRides')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
