import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { YouTubePlayer } from "youtube-player/dist/types";
import { selectedVideoState, videoMuteState, videoSpeedState } from "../atoms";
import { VIDEOS } from "../videos";

export const YoutubeWrapper = () => {
  const id = useRecoilValue(selectedVideoState);
  const setSelectedVideo = useSetRecoilState(selectedVideoState);
  const isVideoMute = useRecoilValue(videoMuteState);
  const speed = useRecoilValue(videoSpeedState);
  const [player, setPlayer] = useState<YouTubePlayer>();

  useEffect(() => {
    isVideoMute ? player?.mute() : player?.unMute();
  }, [isVideoMute, player]);

  useEffect(() => {
    player?.setPlaybackRate(speed);
    player?.playVideo();
  }, [player, speed]);

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
  };

  const onEndVideo = () => {
    const index = VIDEOS.findIndex((elem) => elem.videoId === id);
    setSelectedVideo(VIDEOS[(index + 1) % VIDEOS.length].videoId);
  };

  return (
    <YouTube
      videoId={id}
      className="youtube-player"
      onReady={onReady}
      onEnd={onEndVideo}
      opts={{
        height: "100%",
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          controls: 0,
          loop: 1,
        },
      }}
    />
  );
};
