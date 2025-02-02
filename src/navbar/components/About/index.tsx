import { Box, Link, Typography } from '@mui/material';
import { GitHub, Language, Mail } from '@mui/icons-material';
import { Bluesky } from '../../../svg/Bluesky';

export const About = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minWidth: 'max-content',
        marginX: 2,
      }}>
      <Typography>António Goulão</Typography>
      <Box>
        <Link
          marginX={0.25}
          aria-label="project github repo"
          target="blank"
          href="https://github.com/antoniogoulao/ride-and-listen">
          <GitHub color="secondary" />
        </Link>
        <Link
          marginX={0.25}
          aria-label="bluesky account"
          target="blank"
          href="https://bsky.app/profile/antoniogoulao.dev">
          <Bluesky color="secondary" />
        </Link>
        <Link
          marginX={0.25}
          aria-label="email address"
          target="blank"
          href="mailto:antoniomgoulao@gmail.com">
          <Mail color="secondary" />
        </Link>
        <Link
          marginX={0.25}
          aria-label="personal website"
          target="blank"
          href="https://antoniogoulao.dev">
          <Language color="secondary" />
        </Link>
      </Box>
    </Box>
  );
};
