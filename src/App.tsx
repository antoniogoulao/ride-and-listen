
import { RecoilRoot } from 'recoil';
import { makeStyles } from '@material-ui/styles';
import YoutubeWrapper from './video';
import RadioWrapper from './radio';
import NavBar from './navbar';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    display: 'flex',
  }
});

const App = () => {

  const classes = useStyles();
  return (
    <RecoilRoot>
      <div className={classes.container}>
        <YoutubeWrapper />
        <NavBar />
        <RadioWrapper />
      </div>
    </RecoilRoot>
  );
}

export default App;
