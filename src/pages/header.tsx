import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

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
        backgroundColor: "rgba(11, 6, 19, 0.4)", // Fundo semi-transparente
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <Toolbar variant="dense">
        <Typography
          variant="h4"
          component={Link}
          to="/"
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
        {/* <Button
          color="inherit"
          sx={{ mr: 3, ml: 0.5, px: 2.5, minHeight: "6vh" }}
        >
          Portfólio
        </Button> */}

        {/* Botão "Contato" alinhado à direita */}
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
      </Toolbar>
    </AppBar>
  );
}
