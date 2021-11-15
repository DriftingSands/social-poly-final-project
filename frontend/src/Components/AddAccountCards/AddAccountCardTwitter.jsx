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
  Twitter,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAccountCardTwitter() {
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [UserData, setUserData] = React.useState(false);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/twitter/`,
        config
      );
      if (response.data) {
        setUserData(response.data);
      }
    }
    getUserData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ConnectToTwitter = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(
      "https://socialpoly.ch/backend/api/twitter/auth/",
      config
    );
    window.location.assign(response.data.url);
  };

  let TwitterConnectReturnURL = window.location.href;

  const OauthToken = TwitterConnectReturnURL.substring(
    TwitterConnectReturnURL.lastIndexOf("?") + 13,
    TwitterConnectReturnURL.lastIndexOf("&")
  );

  const OauthVerifier = TwitterConnectReturnURL.substring(
    TwitterConnectReturnURL.lastIndexOf("=") + 1
  );
  const GetTwitterToken = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      oauth_token: OauthToken,
      oauth_verifier: OauthVerifier,
    };
    await axios.post(
      "https://socialpoly.ch/backend/api/twitter/verify/",
      body,
      config
    );
    await window.location.assign("/accounts/twitter/success");
  };

  const handleConnect = async () => {
    setLoading(true);
    await ConnectToTwitter();
  };

  const DisconnectFromTwitter = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = {
      twitter_access_token: null,
      twitter_access_token_secret: null,
    };
    await axios.patch(
      "https://socialpoly.ch/backend/api/users/me/",
      body,
      config
    );
    await window.location.assign("/accounts/twitter/disconnectsuccess");
  };

  const handleDisconnect = async () => {
    setLoading(true);
    await DisconnectFromTwitter();
  };

  const handleCloseDialog = () => {
    window.location.assign("/accounts/twitter/?denied");
  };

  return (
    <Card
      sx={{
        m: "5%",
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
            <Avatar
              src={UserData.profile_image_url_https}
              alt="Avatar"
            ></Avatar>
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
        title="Twitter"
        subheader={UserData ? UserData.screen_name : "No Account Connected"}
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
              <strong>Username:</strong> {UserData.screen_name}
            </Typography>
            <Typography>
              <strong>Name:</strong> {UserData.name}
            </Typography>
            {/* <Typography>
              <strong>Bio:</strong> {UserData.description}
            </Typography>
            <Typography>
              <strong>Followers:</strong> {UserData.followers_count}
            </Typography>
            <Typography>
              <strong>Following:</strong> {UserData.friends_count}
            </Typography>
            <Typography>
              <strong>Tweets:</strong> {UserData.statuses_count}
            </Typography> */}
          </span>
        ) : (
          <Typography variant="body2" sx={{ mb: 6.5 }}>
            You must connect your Twitter Account before you can use it.
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Twitter"
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter />
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
            1. Click on the Connect to Twitter Button
          </Typography>
          <Typography paragraph>
            2. You will be redirected to Twitter
          </Typography>
          <Typography paragraph>3. Grant Access to our App</Typography>
          <Typography paragraph>
            4. You will be redirected to Us again
          </Typography>
          <Typography paragraph>5. Click on Save Twitter Token</Typography>
          <Typography paragraph>6. Your Twitter is now Connected</Typography>
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
            Remove Connected Twitter Account
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleConnect}
            sx={{ mb: 1 }}
          >
            Connect to Twitter
          </LoadingButton>
        )}
      </CardActions>
      {/* Alert when the connection with LinkedIn went wrong */}
      {window.location.href.includes("/accounts/twitter/?denied") ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      ) : null}
      {window.location.href.includes("/accounts/twitter/?oauth_token") ? (
        <Dialog
          open="true"
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
        >
          <DialogTitle>
            {"Do you want to Connect your Twitter Account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Note: You can always remove your Credentials or Change to another
              Account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Disagree</Button>
            <Button onClick={GetTwitterToken}>Connect Twitter</Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {/* Alert when the connection with Twitter was successfully */}
      {window.location.href.includes("/accounts/twitter/success") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Twitter account was successfully connected.
        </Alert>
      ) : null}
      {/* Alert when the disconnection with Twitter was successfully */}
      {window.location.href.includes("/accounts/twitter/disconnectsuccess") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Twitter account was successfully disconnected.
        </Alert>
      ) : null}
    </Card>
  );
}
