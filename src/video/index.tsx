import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/styles';
import { useRecoilValue } from 'recoil';
import { selectedVideoState, videoMuteState, videoSpeedState } from '../atoms';
import { useState } from 'react';
import { useEffect } from 'react';
import { YouTubePlayer } from 'youtube-player/dist/types';

const useStyles = makeStyles({
    videoDiv: {
        width: "100%",
        height: "100%",
        pointerEvents: 'none',
    }
});

const YoutubeWrapper = () => {
    const classes = useStyles();
    const id = useRecoilValue(selectedVideoState);
    const isMute = useRecoilValue(videoMuteState);
    const speed = useRecoilValue(videoSpeedState);
    const [player, setPlayer] = useState<YouTubePlayer>();

    useEffect(() => {
        player?.isMuted() ? player?.unMute() : player?.mute()
    }, [isMute, player])

    useEffect(() => {
        player?.setPlaybackRate(speed);
    }, [player, speed])

    const onReady = (event: { target: YouTubePlayer }) => {
        setPlayer(event.target);
    }

    return (
        <YouTube videoId={id}
            containerClassName={classes.videoDiv}
            onReady={onReady}
            opts={
                {
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        // https://developers.google.com/youtube/player_parameters
                        autoplay: 0,
                        controls: 0,
                        mute: 0,
                        loop: 1,
                    },
                }} />
    )
}

export default YoutubeWrapper;
