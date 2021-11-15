import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {
  /* Badge, */
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
} from "@mui/material";
import {
  Settings,
  Notifications,
  BrightnessHigh,
  Brightness4,
  Logout,
  Palette,
} from "@mui/icons-material";

export default function HeaderContent(props) {
  const [UserData, setUserData] = React.useState(false);
  const [UserAvatar, setUserAvatar] = React.useState(false);
  const history = useHistory();

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/`,
        config
      );
      if (response.data) {
        console.log(response.data);
        setUserData(response.data);
        if (response.data.avatar) {
          setUserAvatar(
            response.data.avatar.replace(
              "http://backend:8000",
              "https://socialpoly.ch"
            )
          );
        }
      }
    }
    getUserData();
  }, []);

  const UserLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  // Account Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={props.toggleDarkMode}>
        {props.darkMode ? (
          <Tooltip title="Change to Lightmode">
            <BrightnessHigh className="Icon" />
          </Tooltip>
        ) : (
          <Tooltip title="Change to Darkmode">
            <Brightness4 className="Icon" />
          </Tooltip>
        )}
      </IconButton>
      <Tooltip title="Change Theme Colors">
        <IconButton
          color="inherit"
          onClick={(e) => {
            e.preventDefault();
            history.push("/themesettings/");
          }}
        >
          <Palette className="Icon" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Notifications">
        <IconButton color="inherit">
          {/* <Badge badgeContent={4} color="secondary">
          <Notifications />
        </Badge> */}
          <Notifications />
        </IconButton>
      </Tooltip>
      <Tooltip title="Account" sx={{ mr: 1 }}>
        <IconButton onClick={handleClick}>
          <Avatar src={UserAvatar}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <p style={{ display: "flex", justifyContent: "center" }}>
          Hello {UserData.first_name}!
        </p>
        <MenuItem
          onClick={() => {
            window.location.assign("/settings");
          }}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={UserLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
