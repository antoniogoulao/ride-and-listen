import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedVideoState, videosState } from "../../../atoms";

export const VideoSelector = () => {
  const videos = useRecoilValue(videosState);
  const selectedVideo = useRecoilValue(selectedVideoState);
  const setSelectedVideo = useSetRecoilState(selectedVideoState);

  return (
    <FormControl sx={{ margin: 1, minWidth: 120 }}>
      <Select
        value={selectedVideo}
        onChange={(event) => setSelectedVideo(event.target.value as string)}
        displayEmpty
        inputProps={{ "aria-label": "Select video" }}
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
