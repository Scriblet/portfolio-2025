import { Box, Link as MuiLink, Typography, useMediaQuery, useTheme } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { scroller } from "react-scroll";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleSmoothScroll = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scroller.scrollTo(targetId, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80,
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        padding: isMobile 
          ? "2rem 1rem" 
          : isTablet 
            ? "3rem 4rem" 
            : "4rem 20rem",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "center" : "flex-start",
        gap: isMobile ? "2rem" : "0",
        lineHeight: 1.6,
        backgroundColor: "#181823",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <Box sx={{ width: isMobile ? "100%" : "auto" }}>
        <Typography
          component="h2"
          sx={{ 
            fontWeight: 700, 
            fontSize: isMobile ? "1.5rem" : "2rem", 
            mb: 2 
          }}
        >
          Lucas N.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: isMobile ? "center" : "flex-start", gap: 2 }}>
          <GitHub
            sx={{
              fontSize: isMobile ? "1.4rem" : "1.6rem",
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          />
          <LinkedIn
            sx={{
              fontSize: isMobile ? "1.4rem" : "1.6rem",
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          />
        </Box>
        <Typography
          color="text.secondary"
          sx={{
            mt: isMobile ? 4 : 8,
            fontWeight: 200,
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          Página em constante construção
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ 
            mt: 0.5, 
            fontWeight: 200, 
            fontSize: isMobile ? "0.9rem" : "1rem" 
          }}
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
          alignItems: isMobile ? "center" : "flex-start",
        }}
      >
        <MuiLink
          href="#home"
          onClick={handleSmoothScroll("home")}
          color="inherit"
          sx={{ 
            fontWeight: 400, 
            fontSize: isMobile ? "0.9rem" : "1rem", 
            textDecoration: "none",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Home
        </MuiLink>
        <MuiLink
          href="#experience"
          onClick={handleSmoothScroll("experience")}
          color="inherit"
          sx={{ 
            fontWeight: 400, 
            fontSize: isMobile ? "0.9rem" : "1rem", 
            textDecoration: "none",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Experiência
        </MuiLink>
        <MuiLink
          href="#skills"
          onClick={handleSmoothScroll("skills")}
          color="inherit"
          sx={{ 
            fontWeight: 400, 
            fontSize: isMobile ? "0.9rem" : "1rem", 
            textDecoration: "none",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          Habilidades
        </MuiLink>
      </Box>
    </Box>
  );
};

export default Footer;
