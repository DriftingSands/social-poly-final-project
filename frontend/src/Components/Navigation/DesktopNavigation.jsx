import React from "react";
import { styled } from "@mui/material/styles";
import { HeaderMain } from "../Header/HeaderStyle";
import logoHead from "../../assets/images/ParrotHead.png";
import { AppBar, IconButton, Drawer, Toolbar, Tooltip } from "@mui/material";
import { Menu, MenuOpen } from "@mui/icons-material";
import HeaderContent from "../Header/HeaderContent";
import { useHistory } from "react-router";
import DrawerContent from "../Drawer/DrawerContent";
import { StyledBox } from "../Drawer/DrawerStyle";
import ParrotFeather from "../../assets/images/ParrotFeather2.jpg";
import SITLogoSide from "../../assets/images/SIT-academy-white-side.png";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function DesktopNavigation({
  toggleDrawer,
  toggleDarkMode,
  darkMode,
  drawerWidth,
}) {
  const history = useHistory();
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
          display: { xs: "none", sm: "flex" },
        }}
      >
        <HeaderMain>
          <div className="TopLeft">
            {/* <Tooltip title="Collapse Sidebar"> */}
            <IconButton color="inherit" onClick={toggleDrawer}>
              {drawerWidth > 60 ? (
                <Tooltip title="Collapse Sidebar">
                  <MenuOpen />
                </Tooltip>
              ) : (
                <Tooltip title="Expand Sidebar">
                  <Menu />
                </Tooltip>
              )}
            </IconButton>
            {/* </Tooltip> */}
            <img
              src={logoHead}
              className="Logo"
              alt="Logo"
              onClick={HomeHandler}
            />
            <h1 onClick={HomeHandler}>Poly</h1>
          </div>
          <HeaderContent
            className="TopRight"
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        </HeaderMain>
      </AppBar>
      <Offset />
      <StyledBox
        sx={{
          overflow: "auto",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              overflow: "hidden",
              backgroundImage: "url(" + ParrotFeather + ")",
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.75)",
              border: "none",
              color: "#ffffff",
            },
            [`& .Icon`]: {
              color: "#ffffff",
            },
          }}
        >
          <Toolbar />
          <DrawerContent />
          {drawerWidth > 60 ? (
            <img
              src={SITLogoSide}
              alt="SIT Logo"
              style={{
                marginLeft: "95px",
                marginBottom: "-70px",
                bottom: 0,
                width: "29px",
                height: "200px",
                transform: "rotate(90deg)",
              }}
            />
          ) : (
            <img
              src={SITLogoSide}
              alt="SIT Logo"
              style={{ margin: "15px", width: "29px", height: "200px" }}
            />
          )}
        </Drawer>
      </StyledBox>
    </div>
  );
}
