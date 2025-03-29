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
    <AppBar color="transparent" elevation={0}>
      <Toolbar variant="dense">
        <Typography
          variant="h6"
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
        <Button color="inherit" sx={{ mx: 0.5, px: 2.5, minHeight: "6vh" }}>
          Experiência
        </Button>
        <Button color="inherit" sx={{ mx: 0.5, px: 2.5, minHeight: "6vh" }}>
          Habilidades
        </Button>
        <Button
          color="inherit"
          sx={{ mr: 3, ml: 0.5, px: 2.5, minHeight: "6vh" }}
        >
          Portfólio
        </Button>

        {/* Botão "Contato" alinhado à direita */}
        <Button
          variant="contained"
          sx={{
            marginLeft: "auto",
            boxShadow: "none",
            fontWeight: "bold",
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
