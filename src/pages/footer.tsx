import { Box, Icon, Link, Typography, useTheme } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";


const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        padding: "2rem 20rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        lineHeight: 1.6,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
          Lucas N.
        </Typography>
        <GitHub></GitHub>
        <LinkedIn></LinkedIn>
        <Typography variant="body2" color="text.secondary">
          Página em constante construção
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Not Copyright 2025 – Lucas Nonato
        </Typography>
      </Box>

      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          mb: "1.5rem",
        }}
      >
        <Link
          href="#home"
          color="inherit"
          sx={{ fontWeight: 500, fontSize: "1.1rem" }}
        >
          Home
        </Link>
        <Link
          href="#"
          color="inherit"
          sx={{ fontWeight: 500, fontSize: "1.1rem" }}
        >
          Experiência
        </Link>
        <Link
          href="#"
          color="inherit"
          sx={{ fontWeight: 500, fontSize: "1.1rem" }}
        >
          Habilidades
        </Link>
        <Link
          href="#"
          color="inherit"
          sx={{ fontWeight: 500, fontSize: "1.1rem" }}
        >
          Portfólio
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
