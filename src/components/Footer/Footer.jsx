import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
function Footer() {
  const LinkMaker = ({to,text}) => {
    return (
      <RouterLink style={{ textDecoration: "none" }} to={'/'+to}>
        <Link
          component=""
          sx={{
            color: "#fff",
            "&:hover": { textDecoration: "underline" },
            "&:visited": { color: "primary.light" },
          }}
        >
          {text}
        </Link>
      </RouterLink>
    );
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: 150,
          backgroundColor: "primary.dark",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
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
            <Link target="_blank" rel="noopener" sx={{color: "#fff" }} href="https://sajjad-kazemi-portfolio.netlify.app/">
              My Portfolio
            </Link>
          </li>
          <li>
            <Link target="_blank" rel="noopener" sx={{color: "#fff" }} href="https://github.com/sajjad-kazemi">
              My Github
            </Link>
          </li>
        </ul>
      </Box>
    </>
  );
}

export default Footer;
