import { Box, Link as MuiLink, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { scroller } from "react-scroll";

const Footer = () => {
  const handleSmoothScroll = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scroller.scrollTo(targetId, {
      duration: 800, // Duração da animação 
      delay: 0, // Atraso de x segundos
      smooth: "easeInOutQuart", // Curva de animação suave
      offset: -80, // Ajuste de compensação
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        padding: "4rem 20rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        lineHeight: 1.6,
        backgroundColor: "#181823",
      }}
    >
      <Box>
        <Typography
          component="h2"
          sx={{ fontWeight: 700, fontSize: "2rem", mb: 2 }}
        >
          Lucas N.
        </Typography>
        <GitHub
          sx={{
            fontSize: "1.6rem",
            mr: 2,
          }}
        ></GitHub>
        <LinkedIn
          sx={{
            fontSize: "1.6rem",
          }}
        ></LinkedIn>
        <Typography
          color="text.secondary"
          sx={{
            mt: 8,
            fontWeight: 200,
            fontSize: "1rem",
          }}
        >
          Página em constante construção
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, fontWeight: 200, fontSize: "1rem" }}
        >
          Not Copyright 2025 – Lucas Nonato
        </Typography>
      </Box>

      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <MuiLink
          href="#home"
          onClick={handleSmoothScroll("home")}
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Home
        </MuiLink>
        <MuiLink
          href="#experience"
          onClick={handleSmoothScroll("experience")}
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Experiência
        </MuiLink>
        <MuiLink
          href="#skills"
          onClick={handleSmoothScroll("skills")}
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Habilidades
        </MuiLink>
        {/* <MuiLink
        href="#portfolio"
        onClick={handleSmoothScroll('portfolio')}
        color="inherit"
        sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
      >
        Portfólio
      </MuiLink> */}
      </Box>
    </Box>
  );
};

export default Footer;
