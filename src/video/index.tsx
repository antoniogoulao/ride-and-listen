import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { useAtomValue } from 'jotai';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { currentViewAtom, videoMuteAtom, videoSpeedAtom } from '../atoms';
import { VIDEOS } from '../videos';
import { useNavigate } from '../hooks/useNavigate';

export const YoutubeWrapper = () => {
  const currentView = useAtomValue(currentViewAtom);
  const isVideoMute = useAtomValue(videoMuteAtom);
  const speed = useAtomValue(videoSpeedAtom);
  const [player, setPlayer] = useState<YouTubePlayer>();
  const { navigateToVideo } = useNavigate();

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
    const index = VIDEOS.findIndex((elem) => elem.videoId === currentView);
    navigateToVideo(VIDEOS[(index + 1) % VIDEOS.length].videoId);
  };

  return (
    <YouTube
      videoId={currentView as string}
      className="youtube-player"
      onReady={onReady}
      onEnd={onEndVideo}
      opts={{
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
        },
      }}
    />
  );
};