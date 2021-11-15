import React from "react";
import HeaderContent from "../Header/HeaderContent";
import { MobileHeaderMain } from "../Header/HeaderStyle";
import logoHead from "../../assets/images/ParrotHead.png";
import { AppBar, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import DrawerContent from "../Drawer/DrawerContent";
import { Drawer, Toolbar } from "@mui/material";
import { StyledBox } from "../Drawer/DrawerStyle";
import { useHistory } from "react-router";

export default function MobileNavigation({ toggleDarkMode, darkMode }) {
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const ToggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };
  const HomeHandler = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "row-reverse",
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
          display: { xs: "flex", sm: "none" },
        }}
      >
        <MobileHeaderMain>
          <div className="TopLeft">
            <img
              src={logoHead}
              className="Logo"
              alt="Logo"
              onClick={HomeHandler}
            />
            <IconButton color="inherit" onClick={ToggleMobileMenu}>
              <Menu />
            </IconButton>
          </div>
          <HeaderContent
            className="TopRight"
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        </MobileHeaderMain>
      </AppBar>
      <StyledBox
        sx={{
          display: { xs: "flex", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
          overflow: "auto",
        }}
      >
        <Drawer
          anchor="top"
          open={mobileOpen}
          onClose={ToggleMobileMenu}
          sx={{
            display: { xs: "flex", sm: "none" },
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              boxSizing: "border-box",
              overflow: "hidden",
            },
          }}
        >
          <Toolbar />
          <DrawerContent />
        </Drawer>
      </StyledBox>
    </div>
  );
}
