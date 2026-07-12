import { ArrowBack, Delete, VerifiedUser } from '@mui/icons-material';
import { Box, Button, Card, IconButton, Link, Typography } from '@mui/material';
import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { radioVolumeAtom, selectedRadioAtom } from '../atoms';
import { useNavigate } from '../hooks/useNavigate';
import { RADIOS } from '../radios';

export const PrivacyPolicy = () => {
  const { navigateToLanding } = useNavigate();
  const { t } = useTranslation();
  const setSelectedRadio = useSetAtom(selectedRadioAtom);
  const setVolume = useSetAtom(radioVolumeAtom);

  const handleClearData = () => {
    localStorage.removeItem('RECENTLY_PLAYED');
    localStorage.removeItem('VOLUME');
    setSelectedRadio(RADIOS[0]);
    setVolume(50);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
        <IconButton onClick={navigateToLanding} aria-label="back to landing page">
          <ArrowBack />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8,
          px: 2,
        }}
      >
        <Box sx={{ bgcolor: 'grey.200', borderRadius: '50%', p: 2, mb: 2 }}>
          <VerifiedUser sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          {t('privacyPolicy')}
        </Typography>
        <Card variant="outlined" sx={{ maxWidth: 600, width: '100%', p: 3, mb: 3 }}>
          <Typography paragraph>{t('privacyNoData')}</Typography>
          <Typography paragraph>{t('privacyLocalStorage')}</Typography>
          <Typography>
            {t('privacyYoutubePre')}{' '}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener"
            >
              {t('privacyYoutubeLink')}
            </Link>
            .
          </Typography>
        </Card>
        <Button variant="contained" color="error" startIcon={<Delete />} onClick={handleClearData}>
          {t('clearLocalData')}
        </Button>
      </Box>
    </Box>
  );
};