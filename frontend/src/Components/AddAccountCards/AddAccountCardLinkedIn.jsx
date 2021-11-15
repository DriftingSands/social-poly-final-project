import React, { useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Alert,
  AlertTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  PersonAdd,
  Help,
  MoreVert,
  KeyboardArrowUp,
  HowToReg,
  LinkedIn,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAccountCardLinkedIn() {
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [UserData, setUserData] = React.useState(false);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/linkedin/`,
        config
      );
      if (response.data) {
        setUserData(response.data.results);
      }
    }
    getUserData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ConnectToLinkedin = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {};
    const response = await axios.post(
      "https://socialpoly.ch/backend/api/linkedin/auth/",
      body,
      config
    );
    window.location.assign(response.data.url);
  };

  let LinkedInConnectReturnURL = window.location.href;
  const LinkedInConnectCode = LinkedInConnectReturnURL.substring(
    LinkedInConnectReturnURL.lastIndexOf("?") + 6,
    LinkedInConnectReturnURL.lastIndexOf("&")
  );

  const GetLinkedInToken = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = { linked_in_auth_code: LinkedInConnectCode };
    await axios.patch(
      "https://socialpoly.ch/backend/api/users/me/linkedin/",
      body,
      config
    );
    await window.location.assign("/accounts/linkedin/success");
  };

  const handleConnect = async () => {
    setLoading(true);
    await ConnectToLinkedin();
  };

  const DisconnectFromLinkedIn = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      linked_in_auth_code: null,
      linked_in_access_token: null,
    };
    await axios.patch(
      "https://socialpoly.ch/backend/api/users/me/",
      body,
      config
    );
    await window.location.assign("/accounts/linkedin/disconnectsuccess");
  };

  const handleDisconnect = async () => {
    setLoading(true);
    await DisconnectFromLinkedIn();
  };

  const handleCloseDialog = () => {
    window.location.assign("/accounts/linkedin/?error");
  };

  return (
    <Card
      sx={{
        margin: "5%",
        height: "90%",
        boxShadow: "-1px -2px 6px 0px",
        "&:hover": {
          boxShadow: "0px 0px 20px 0px",
        },
      }}
    >
      <CardHeader
        avatar={
          UserData ? (
            <Avatar src={UserData.avatar_picture_data} alt="Avatar"></Avatar>
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} alt="Avatar">
              N/A
            </Avatar>
          )
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="LinkedIn"
        subheader={
          UserData
            ? UserData.first_name + " " + UserData.last_name
            : "No Account Connected"
        }
      />
      <CardContent
        sx={{ display: "flex", justifyContent: "center", textAlign: "center" }}
      >
        {UserData ? (
          <span>
            <Typography sx={{ color: "primary.main" }}>
              <strong>Information about your connected Account:</strong>
            </Typography>

            <Typography>
              <strong>Firstname:</strong> {UserData.first_name}
            </Typography>
            <Typography>
              <strong>Lastname:</strong> {UserData.last_name}
            </Typography>
          </span>
        ) : (
          <Typography variant="body2" sx={{ mb: 6.5 }}>
            You must connect your LinkedIn Account before you can use it.
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="LinkedIn"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedIn />
        </IconButton>
        <IconButton aria-label="register">
          {UserData ? (
            <HowToReg sx={{ color: "primary.main" }} />
          ) : (
            <PersonAdd />
          )}
        </IconButton>
        <IconButton
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{ marginLeft: "auto" }}
        >
          {expanded ? <KeyboardArrowUp /> : <Help />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography paragraph sx={{ color: "primary.main" }}>
            <strong>How to connect</strong>
          </Typography>
          <Typography paragraph>
            1. Click on the Connect to LinkedIn Button
          </Typography>
          <Typography paragraph>
            2. You will be redirected to LinkedIn
          </Typography>
          <Typography paragraph>3. Grant Access to our App</Typography>
          <Typography paragraph>
            4. You will be redirected to Us again
          </Typography>
          <Typography paragraph>5. Click on Save LinkedIn Token</Typography>
          <Typography paragraph>6. Your LinkedIn is now Connected</Typography>
        </CardContent>
      </Collapse>
      <CardActions
        sx={{ p: 0 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {UserData ? (
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleDisconnect}
            sx={{ bgcolor: red[500], mb: 1 }}
          >
            Remove Connected LinkedIn Account
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleConnect}
            sx={{ mb: 1 }}
          >
            Connect to LinkedIn
          </LoadingButton>
        )}
      </CardActions>
      {/* Alert when the connection with LinkedIn went wrong */}
      {window.location.href.includes("/accounts/linkedin/?error") ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      ) : null}
      {/* Alert when the connection with LinkedIn was successfully */}
      {window.location.href.includes("/accounts/linkedin/?code") ? (
        <Dialog
          open="true"
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
        >
          <DialogTitle>
            {"Do you want to Connect your LinkedIn Account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Note: You can always remove your Credentials or Change to another
              Account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Disagree</Button>
            <Button onClick={GetLinkedInToken}>Connect LinkedIn</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {window.location.href.includes("/accounts/linkedin/success") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your LinkedIn account was successfully connected.
        </Alert>
      ) : null}
      {window.location.href.includes("/accounts/linkedin/disconnectsuccess") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your LinkedIn account was successfully disconnected.
        </Alert>
      ) : null}
    </Card>
  );
}
