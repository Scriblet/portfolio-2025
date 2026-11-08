import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  alpha,
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, type FocusEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "../data";
import useScrollDirection from "../hooks/useScrollDirection";
import ThemeToggle from "../components/ThemeToggle";
import InstallButton from "../components/pwa/InstallButton";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { hidden: scrollHidden } = useScrollDirection();
  const [focusWithin, setFocusWithin] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isDev = import.meta.env.DEV;

  // Nunca esconde o header enquanto houver foco de teclado dentro dele.
  const hidden = scrollHidden && !focusWithin;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null;
    // Só o foco por teclado (ou programático) prende o header visível;
    // um clique de mouse num link não deve impedir o header de se esconder.
    if (!target?.matches || target.matches(":focus-visible")) {
      setFocusWithin(true);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !event.currentTarget.contains(next)) {
      setFocusWithin(false);
    }
  };

  const menuItems = [
    { text: "Experiência", to: "experience" },
    { text: "Jornada", to: "jornada" },
    { text: "Habilidades", to: "skills" },
    { text: "Toolbox", to: "toolbox" },
    { text: "Contato", to: "contact" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={ScrollLink} to={item.to} smooth={true} duration={500} offset={-80}>
            <ListItemText
              primary={item.text}
              sx={{
                textAlign: "center",
                color: theme.palette.text.primary,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      {isDev && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Button
            component={RouterLink}
            to="/roadmap"
            fullWidth
            variant="outlined"
            size="small"
          >
            Roadmap (dev)
          </Button>
          <Button
            component={RouterLink}
            to="/immersive"
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
          >
            Prévia imersiva (dev)
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <AppBar
      component={motion.header}
      position="fixed"
      elevation={0}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.25,
        ease: "easeOut",
      }}
      {...(hidden ? { inert: true } : {})}
      aria-hidden={hidden ? "true" : undefined}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
      sx={{
        color: theme.palette.text.primary,
        backgroundColor: alpha(
          theme.palette.background.default,
          theme.palette.mode === "dark" ? 0.4 : 0.75,
        ),
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <Toolbar variant="dense" sx={{
        justifyContent: "space-between",
        minHeight: { xs: "48px", sm: "56px" },
        px: { xs: 1, sm: 2 }
      }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component={ScrollLink}
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          sx={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            // Alvo de toque de 44px de altura no nome/atalho para o topo.
            display: "inline-flex",
            alignItems: "center",
            minHeight: "44px",
            fontWeight: 700,
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "1.8rem"
            }
          }}
        >
          {SITE_CONFIG.AUTHOR}
        </Typography>

        {isMobile ? (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <InstallButton />
              <ThemeToggle />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: { xs: 280, sm: 240 },
                    backgroundColor: alpha(theme.palette.background.default, 0.95),
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  },
                }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {menuItems.map((item) => (
              <ScrollLink
                key={item.text}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                spy={true}
                activeClass="active"
              >
                <Button
                  color="inherit"
                  sx={{
                    mx: 0.25,
                    px: { sm: 1.5, lg: 2.5 },
                    minHeight: "6vh",
                    fontSize: { sm: "0.9rem", lg: "1rem" },
                    letterSpacing: 0.15,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.text.primary, 0.1),
                    },
                  }}
                >
                  {item.text}
                </Button>
              </ScrollLink>
            ))}
            {isDev && (
              <Button
                component={RouterLink}
                to="/roadmap"
                color="inherit"
                sx={{
                  mx: 0.5,
                  px: 2,
                  minHeight: "6vh",
                  fontSize: "0.9rem",
                  display: { xs: "none", md: "inline-flex" },
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.text.primary, 0.1),
                  },
                }}
              >
                Roadmap
              </Button>
            )}
            {isDev && (
              <Button
                component={RouterLink}
                to="/immersive"
                color="inherit"
                sx={{
                  mx: 0.5,
                  px: 2,
                  minHeight: "6vh",
                  fontSize: "0.9rem",
                  display: { xs: "none", md: "inline-flex" },
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.text.primary, 0.1),
                  },
                }}
              >
                Imersivo
              </Button>
            )}
            <InstallButton />
            <ThemeToggle />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
