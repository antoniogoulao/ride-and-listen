import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { useAppState } from '@/context/AppStateProvider';
import { VIDEOS } from '@/videos';

export const VideoSelector = () => {
  const { selectedVideoId, setSelectedVideoId } = useAppState();

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={selectedVideoId}
        onChange={(event) => setSelectedVideoId(event.target.value as string)}
        displayEmpty
        inputProps={{ 'aria-label': 'Select video' }}>
        {VIDEOS.map(({ videoId, name }) => (
          <MenuItem key={videoId} value={videoId}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
