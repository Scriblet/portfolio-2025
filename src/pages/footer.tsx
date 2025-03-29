import { Box, Icon, Link, Typography, useTheme } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

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
        <Link
          href="#home"
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Home
        </Link>
        <Link
          href="#"
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Experiência
        </Link>
        <Link
          href="#"
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Habilidades
        </Link>
        {/* <Link
          href="#"
          color="inherit"
          sx={{ fontWeight: 400, fontSize: "1rem", textDecoration: "none" }}
        >
          Portfólio
        </Link> */}
      </Box>
    </Box>
  );
};

export default Footer;
