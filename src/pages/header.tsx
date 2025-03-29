import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

export default function Header() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(11, 6, 19, 0.4)",
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <Toolbar variant="dense">
        <Typography
          variant="h4"
          component={ScrollLink} 
          to="home"
          smooth={true}
          duration={500}
          offset={-80} 
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Lucas N.
        </Typography>

        <ScrollLink
          to="experience" 
          smooth={true}
          duration={500}
          offset={-80}
          spy={true}
          activeClass="active"
        >
          <Button
            color="inherit"
            sx={{
              mx: 0.5,
              px: 2.5,
              minHeight: "6vh",
              fontSize: "1.1vw",
              letterSpacing: 0.15,
            }}
          >
            Experiência
          </Button>
        </ScrollLink>

        <ScrollLink
          to="skills"
          smooth={true}
          duration={500}
          offset={-80}
          spy={true}
          activeClass="active"
        >
          <Button
            color="inherit"
            sx={{
              mx: 0.5,
              px: 2.5,
              minHeight: "6vh",
              fontSize: "1.1vw",
              letterSpacing: 0.15,
            }}
          >
            Habilidades
          </Button>
        </ScrollLink>

        {/* Botão Contato */}
        <ScrollLink
          to="contact" 
          smooth={true}
          duration={500}
          offset={-80}
          spy={true}
          activeClass="active"
        >
          <Button
            variant="contained"
            sx={{
              marginLeft: "auto",
              boxShadow: "none",
              fontWeight: "bold",
              fontSize: "1.1vw",
              letterSpacing: 0.15,
              minHeight: onlySmallScreen
                ? "20vh"
                : onlyMediumScreen
                ? "20vh"
                : onlyLargeScreen
                ? "10vh"
                : "8vh",
              borderRadius: 0,
              minWidth: onlySmallScreen
                ? "10vw"
                : onlyMediumScreen
                ? "10vw"
                : onlyLargeScreen
                ? "10vw"
                : "8vw",
            }}
          >
            Contato
          </Button>
        </ScrollLink>
      </Toolbar>
    </AppBar>
  );
}
