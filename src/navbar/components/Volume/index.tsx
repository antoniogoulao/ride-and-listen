import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import { useAtom } from 'jotai';
import { radioVolumeAtom } from '../../../atoms';

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const Volume = () => {
  const [volume, setVolume] = useAtom(radioVolumeAtom);

  const handleSliderChange = (_: unknown, value: number | number[]) => {
    if (typeof value === 'number') setVolume(clamp(value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: 130, sm: 200 }
      }}>
      <IconButton
        onClick={() => setVolume(clamp(volume - 10))}
        aria-label="volume down"
      >
        <VolumeDown color="secondary" />
      </IconButton>
      <Slider
        min={0}
        max={100}
        value={volume}
        onChange={handleSliderChange}
        aria-labelledby="Volume"
        color="secondary"
      />
      <IconButton
        onClick={() => setVolume(clamp(volume + 10))}
        aria-label="volume up"
      >
        <VolumeUp color="secondary" />
      </IconButton>
    </Box>
  );
};