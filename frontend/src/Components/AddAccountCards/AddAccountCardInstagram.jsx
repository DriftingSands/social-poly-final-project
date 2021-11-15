import React /* , { useEffect } */ from "react";
import axios from "axios";
import {
  /* Button, */
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
  /* Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, 
  Slide,*/
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  PersonAdd,
  Help,
  MoreVert,
  KeyboardArrowUp,
  HowToReg,
  Instagram,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

/* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
}); */

export default function AddAccountCardInstagram() {
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [UserData, setUserData] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const DisconnectFromInstagram = async () => {
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
    await window.location.assign("/accounts/instagram/disconnectsuccess");
  };

  const handleDisconnect = async () => {
    setLoading(true);
    await DisconnectFromInstagram();
  };

  /* const handleCloseDialog = () => {
    window.location.assign("/accounts/instagram/?error");
  }; */

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
        title="Instagram"
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
            You must connect your Instagram Account before you can use it.
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Instagram"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
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
            1. Click on the Connect to Instagram Button
          </Typography>
          <Typography paragraph>
            2. You will be redirected to Instagram
          </Typography>
          <Typography paragraph>3. Grant Access to our App</Typography>
          <Typography paragraph>
            4. You will be redirected to Us again
          </Typography>
          <Typography paragraph>5. Click on Save Instagram Token</Typography>
          <Typography paragraph>6. Your Instagram is now Connected</Typography>
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
            Remove Connected Instagram Account
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            loading={loading}
            /* onClick={handleConnect} */
            sx={{ mb: 1 }}
            disabled
          >
            Connect to Instagram
          </LoadingButton>
        )}
      </CardActions>
      {/* Alert when the connection with Instagram went wrong */}
      {window.location.href.includes("/accounts/instagram/?error") ? (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something went wrong! Please try again.
        </Alert>
      ) : null}
      {/* Alert when the connection with Instagram was successfully */}
      {/* {window.location.href.includes("/accounts/instagram/?code") ? (
        <Dialog
          open="true"
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
        >
          <DialogTitle>
            {"Do you want to Connect your Instagram Account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Note: You can always remove your Credentials or Change to another
              Account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Disagree</Button>
            <Button onClick={GetInstagramToken}>Connect Instagram</Button>
          </DialogActions>
        </Dialog>
      ) : null} */}
      {window.location.href.includes("/accounts/instagram/success") ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Instagram account was successfully connected.
        </Alert>
      ) : null}
      {window.location.href.includes(
        "/accounts/instagram/disconnectsuccess"
      ) ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Your Instagram account was successfully disconnected.
        </Alert>
      ) : null}
    </Card>
  );
}
