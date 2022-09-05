import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {GitHub,ViewModule} from '@mui/icons-material'
function Footer() {
  const LinkMaker = ({to,text}) => {
    return (
      <RouterLink style={{ textDecoration: "none" }} to={'/'+to} >
        <Typography
          sx={{
            textDecoration: "none",
            color: "#fff",
            "&:hover": { textDecoration: "underline" },
            "&:visited": { color: "primary.light" },
          }}
        >
          {text}
        </Typography>
      </RouterLink>
    );
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: 150,
          backgroundColor: "secondary.dark",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
          flexDirection:{xs:'column',sm:'row'}
        }}
        component="footer"
      >
        <ul style={{ listStyle: "none" }}>
          <li>
            <LinkMaker to='home' text="Home"/>
          </li>
          <li>
            <LinkMaker to='categories' text="Categories"/>
          </li>
          <li>
          <LinkMaker to='cart' text="Cart"/>
          </li>
        </ul>
        <ul style={{listStyle:'none'}} >
          <li>
            <Link target="_blank" rel="noopener" sx={{color: "#fff",textDecoration:'none','&:hover':{textDecoration:'underline'},display:'flex' }} href="https://sajjad-kazemi-portfolio.netlify.app/">
              <ViewModule/>
              My Portfolio
            </Link>
          </li>
          <li>
            <Link target="_blank" rel="noopener" sx={{color: "#fff",textDecoration:'none','&:hover':{textDecoration:'underline'}, display:'flex',mt:1 }} href="https://github.com/sajjad-kazemi">
              <GitHub/>
              My Github
            </Link>
          </li>
        </ul>
      </Box>
    </>
  );
}

export default Footer;
