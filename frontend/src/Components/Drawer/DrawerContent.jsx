import React from "react";
import {
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Dashboard,
  AccountCircle,
  PostAdd,
  CalendarToday,
  /* Assessment,
  Email, */
} from "@mui/icons-material";
import { useHistory } from "react-router";

export default function DrawerContent() {
  const history = useHistory();
  const DashboardHandler = (e) => {
    e.preventDefault();
    history.push("/dashboard/");
  };
  const AccountsHandler = (e) => {
    e.preventDefault();
    history.push("/accounts/");
  };
  const PostsHandler = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };
  const CalendarHandler = (e) => {
    e.preventDefault();
    history.push("/calendar/");
  };
  /*   const ReportsHandler = (e) => {
    e.preventDefault();
    history.push("/reports/");
  }; */
  /*   const MessagesHandler = (e) => {
    e.preventDefault();
    history.push("/messages/");
  }; */

  return (
    <Toolbar
      className="Toolbar"
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ top: 0, width: "100%" }}>
        <List style={{ width: "100%" }}>
          <ListItem button key="Dashboard" onClick={DashboardHandler}>
            <Tooltip title="Dashboard">
              <ListItemIcon>
                <Dashboard className="Icon" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Posts" onClick={PostsHandler}>
            <Tooltip title="Posts">
              <ListItemIcon>
                <PostAdd className="Icon" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Posts" />
          </ListItem>
          <ListItem button key="Calendar" onClick={CalendarHandler}>
            <Tooltip title="Calendar">
              <ListItemIcon>
                <CalendarToday className="Icon" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button key="Accounts" onClick={AccountsHandler}>
            <Tooltip title="Accounts">
              <ListItemIcon>
                <AccountCircle className="Icon" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Accounts" />
          </ListItem>
          {/* <ListItem button key="Reports" onClick={ReportsHandler}>
            <Tooltip title="Reports">
              <ListItemIcon>
                <Assessment className="Icon" />
              </ListItemIcon>
            </Tooltip>
            <ListItemText primary="Reports" />
          </ListItem> */}
          {/* <ListItem button key="Messages" onClick={MessagesHandler}>
        <Tooltip title="Messages">
        <ListItemIcon>
        <Email className="Icon" />
        </ListItemIcon>
        </Tooltip>
        <ListItemText primary="Messages" />
      </ListItem> */}
        </List>
      </div>
    </Toolbar>
  );
}
