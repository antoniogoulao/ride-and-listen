import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/styles';
import { useRecoilValue } from 'recoil';
import { selectedVideoState, videoMuteState } from '../atoms';

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

    return (
        <YouTube videoId={id}
            containerClassName={classes.videoDiv}
            opts={
                {
                    height: '100%',
                    width: '100%',
                    playerVars: {
                        // https://developers.google.com/youtube/player_parameters
                        autoplay: 1,
                        controls: 0,
                        mute: isMute,
                        loop: 1,
                    },
                }} />
    )
}

export default YoutubeWrapper;
