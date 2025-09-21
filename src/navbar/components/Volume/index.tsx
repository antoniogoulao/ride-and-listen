import { VolumeDown, VolumeUp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/system';
import { useAppState } from '@/context/AppStateProvider';

const handleVolumeChange =
  (setVolume: (volume: number) => void) => (_: any, value: number | number[]) => {
    if (typeof value === 'number') {
      if (value > 100) value = 100;
      if (value < 0) value = 0;
      setVolume(value as number);
    }
  };

export const Volume = () => {
  const { radioVolume, setRadioVolume } = useAppState();

  return (
    <Box sx={{ width: 200 }} display="flex" alignItems="center">
      <IconButton
        onClick={() => handleVolumeChange(setRadioVolume)(null, radioVolume - 10)}
        aria-label="volume down">
        <VolumeDown color="secondary" />
      </IconButton>

      <Slider
        min={0}
        max={100}
        value={radioVolume}
        onChange={handleVolumeChange(setRadioVolume)}
        aria-labelledby="Volume"
        color="secondary"
      />

      <IconButton
        onClick={() => handleVolumeChange(setRadioVolume)(null, radioVolume + 10)}
        aria-label="volume up">
        <VolumeUp color="secondary" />
      </IconButton>
    </Box>
  );
};
