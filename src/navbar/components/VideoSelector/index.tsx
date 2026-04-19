import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import { currentViewAtom, videosAtom } from '../../../atoms';
import { useNavigate } from '../../../hooks/useNavigate';

export const VideoSelector = () => {
  const videos = useAtomValue(videosAtom);
  const currentView = useAtomValue(currentViewAtom);
  const { navigateToVideo } = useNavigate();

  if (currentView === 'landing') return null;

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={currentView}
        onChange={(event) => navigateToVideo(event.target.value as string)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select video' }}
      >
        {videos.map(({ videoId, name }) => (
          <MenuItem key={videoId} value={videoId}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};