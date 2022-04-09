import { Box, Typography, Link } from "@mui/material";
import { GitHub, Twitter, Mail, Language } from '@mui/icons-material';

const About = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography>António Goulão</Typography>
            <Box>
                <Link marginX={0.25} aria-label="project github repo" target="blank" href="https://github.com/antoniogoulao/ride-and-listen"><GitHub color="secondary" /></Link>
                <Link marginX={0.25} aria-label="twitter account" target="blank" href="https://twitter.com/toniomg"><Twitter color="secondary" /></Link>
                <Link marginX={0.25} aria-label="email address" target="blank" href="mailto:antoniomgoulao@gmail.com"><Mail color="secondary" /></Link>
                <Link marginX={0.25} aria-label="personal website" target="blank" href="https://antoniogoulao.dev"><Language color="secondary" /></Link>
            </Box>
        </Box>
    )
}



export default About;