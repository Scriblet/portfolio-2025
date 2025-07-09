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
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Experiência", to: "experience" },
    { text: "Habilidades", to: "skills" },
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
    </Box>
  );

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
            fontWeight: 700,
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
              md: "1.8rem"
            }
          }}
        >
          Lucas N.
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
                    backgroundColor: "rgba(11, 6, 19, 0.95)",
                    backdropFilter: "blur(10px)",
                  },
                }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    mx: 0.5,
                    px: 2.5,
                    minHeight: "6vh",
                    fontSize: "1rem",
                    letterSpacing: 0.15,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              </ScrollLink>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
