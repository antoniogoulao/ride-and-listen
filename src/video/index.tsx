'use client';

import { VIDEOS } from '@/videos';
import { useAppState } from '@/context/AppStateProvider';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

// Prevent SSR issues by dynamically importing it
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />,
});

export const YoutubeWrapper = () => {
  const { selectedVideoId, setSelectedVideoId, videoMute } = useAppState();
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const onEndVideo = () => {
    const index = VIDEOS.findIndex((elem) => elem.videoId === selectedVideoId);
    setSelectedVideoId(VIDEOS[(index + 1) % VIDEOS.length].videoId);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactPlayer
        ref={playerRef}
        src={`https://www.youtube.com/watch?v=${selectedVideoId}`}
        playing={true}
        muted={videoMute}
        controls={false}
        loop={false}
        onEnded={onEndVideo}
        width="100%"
        height="100%"
        config={{
          youtube: {
            // @ts-ignore
            playerVars: {
              autoplay: 1,
              controls: 0,
              showinfo: 0,
              rel: 0, // Don't show related videos
              modestbranding: 1, // Minimal YouTube branding
              iv_load_policy: 3, // Hide annotations
              cc_load_policy: 0, // Hide closed captions
              fs: 0, // Hide fullscreen button
              playsinline: 1,
              disablekb: 1, // Disable keyboard controls
              enablejsapi: 1, // Enable JavaScript API
              origin: typeof window !== 'undefined' ? window.location.origin : '',
              // Quality settings
              vq: 'highres', // Preferred quality
              hd: 1, // Enable HD when available
            },
          },
        }}
        style={{
          pointerEvents: 'none', // Disable all interactions
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
    </div>
  );
};
