import ImgPresentation from "../img/presetation.jpg";
import { CardMedia, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";

function Presentation() {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onlyLargeScreen = useMediaQuery(theme.breakpoints.down("xl"));
  return (
    <Box
      component="div"
      sx={{
        height: onlySmallScreen
          ? "60vh"
          : onlyMediumScreen
          ? "60vh"
          : onlyLargeScreen
          ? "60vh"
          : "100vh",
        display: "flex",
        borderRadius: "16px",
      }}
    >
      <div
        className="container-image"
        style={{
          padding: "120px",
          margin: "0",
        }}
      >
        <CardMedia
          component="img"
          image={ImgPresentation}
          alt="Lucas Nonato"
          sx={{
            height: "100%",
            objectFit: "fill",
            borderRadius: "160px",
          }}
        />
      </div>
      <div
        className="container-texts"
        style={{
          minWidth: "52%",
          height: "auto",
          padding: onlySmallScreen
            ? "0 0 0 6vw"
            : onlyMediumScreen
            ? "0 0 0 6vw"
            : onlyLargeScreen
            ? "0 0 0 4vw"
            : "0 0 0 8.5vw",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2.5rem",
          backgroundColor: "#000a0a",
        }}
      >
        <Typography variant="h1" className="presentation-title">
          Eu sou Lucas Nonato
        </Typography>
        <Typography variant="h1" className="presentation-title">
          Desenvolvedor Web
          <Typography
            variant="inherit"
            sx={{ fontWeight: 700, color: "rgb(88, 88, 95)" }}
          >
            Full-Stack
          </Typography>
        </Typography>

        <Typography variant="h1" className="presentation-title">
          UX Designer
        </Typography>
      </div>
    </Box>
  );
}

export default Presentation;
