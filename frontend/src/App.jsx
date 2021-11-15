import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppMain } from "./AppStyle";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "./Pages/Calendar/Calendar";
import Accounts from "./Pages/Accounts/Accounts";
import GridDND from "./Components/GridDND/GridDND";
import MobileNavigation from "./Components/Navigation/MobileNavigation";
import DesktopNavigation from "./Components/Navigation/DesktopNavigation";
import { Box, CssBaseline } from "@mui/material";
import { setToLS, getFromLS } from "./utils/storage";
import { GlobalStyle } from "./globalStyle";
import Auth from "./Pages/Auth/Auth";
import Posts from "./Pages/Posts/Posts";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Settings from "./Pages/Settings/Settings";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import NotFound404 from "./Pages/NotFound404/NotFound404";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserData, setUserData] = useState(false);
  const [UserAvatar, setUserAvatar] = useState(false);

  const UserSystemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [darkMode, setDarkMode] = useState(
    getFromLS("DarkMode") !== null ? getFromLS("DarkMode") : UserSystemTheme
  );
  const [drawerWidth, setDrawerWidth] = useState(220);

  const HandleThemeChange = (CustomUserTheme) => {
    setCustomUserTheme(CustomUserTheme);
    setToLS("Theme", CustomUserTheme);
  };

  const [CustomUserTheme, setCustomUserTheme] = useState(
    getFromLS("Theme") !== null
      ? getFromLS("Theme")
      : {
          PrimaryLightColor: "#1A76D2",
          SecondaryLightColor: "#f44336",
          BackgroundLightColor: "#f2f2f2",
          PrimaryDarkColor: "#90caf9",
          SecondaryDarkColor: "#ce93d8",
          BackgroundDarkColor: "#1c1c1c",
        }
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode
          ? CustomUserTheme.PrimaryDarkColor
          : CustomUserTheme.PrimaryLightColor,
      },
      secondary: {
        main: darkMode
          ? CustomUserTheme.SecondaryDarkColor
          : CustomUserTheme.SecondaryLightColor,
      },
      background: {
        paper: darkMode
          ? CustomUserTheme.BackgroundDarkColor
          : CustomUserTheme.BackgroundLightColor,
        default: darkMode
          ? CustomUserTheme.BackgroundDarkColor
          : CustomUserTheme.BackgroundLightColor,
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setToLS("DarkMode", !darkMode);
  };

  const toggleDrawer = () => {
    if (drawerWidth === 220) {
      setDrawerWidth(60);
    } else {
      setDrawerWidth(220);
    }
  };
  const DrawerWidthMargin = (drawerWidth + 20) / 8;

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/`,
        config
      );
      // console.log(response)
      if (response.status === 200) {
        setUserData(response.data);
        setIsLoggedIn(true);
      }
      if (response.data.avatar) {
        setUserAvatar(
          response.data.avatar.replace(
            "http://backend:8000",
            "https://socialpoly.ch"
          )
        );
      }
    }
    !isLoggedIn && checkLogin();
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Router>
        {isLoggedIn ? (
          <AppMain>
            <MobileNavigation
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
            />

            <DesktopNavigation
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              toggleDrawer={toggleDrawer}
              drawerWidth={drawerWidth}
            />
            <Box
              sx={{
                ml: { xs: 1, sm: DrawerWidthMargin },
                mr: 1,
              }}
            >
              <Switch>
                <Route path="/" component={GridDND} exact />
                <Route path="/auth" component={Auth} exact />
                <Route path="/dashboard" component={GridDND} exact />
                <Route path="/accounts" component={Accounts} />
                <Route path="/posts" component={Posts} exact />
                <Route path="/calendar" component={Calendar} exact />
                <Route path="/reports" component={GridDND} exact />
                <Route path="/messages" component={GridDND} exact />
                <Route
                  path="/settings"
                  render={(props) => (
                    <Settings
                      {...props}
                      UserData={UserData}
                      UserAvatar={UserAvatar}
                    />
                  )}
                  exact
                />
                <Route
                  path="/themesettings"
                  render={(props) => (
                    <ThemeSettings
                      {...props}
                      UserData={UserData}
                      CustomUserTheme={CustomUserTheme}
                      SaveCustomUserTheme={(CustomUserTheme) =>
                        HandleThemeChange(CustomUserTheme)
                      }
                    />
                  )}
                  exact
                />

                <Route component={NotFound404} />
              </Switch>
            </Box>
          </AppMain>
        ) : (
          <AppMain>
            <Switch>
              <Route path="/auth" component={Auth} exact />
              <Route component={LandingPage} />
            </Switch>
          </AppMain>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
