import React from "react";
import AddAccountCardTwitter from "../../Components/AddAccountCards/AddAccountCardTwitter";
import AddAccountCardFacebook from "../../Components/AddAccountCards/AddAccountCardFacebook";
import AddAccountCardInstagram from "../../Components/AddAccountCards/AddAccountCardInstagram";
import AddAccountCardLinkedIn from "../../Components/AddAccountCards/AddAccountCardLinkedIn";
/* import AddAccountCardTikTok from "../../Components/AddAccountCards/AddAccountCardTikTok"; */
import { Grid } from "@mui/material";

export default function Accounts() {
  return (
    <Grid container direction="row" justifyContent="center">
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} sx={{ height: "320px" }}>
        <AddAccountCardTwitter />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} sx={{ height: "320px" }}>
        <AddAccountCardLinkedIn />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} sx={{ height: "320px" }}>
        <AddAccountCardFacebook />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} sx={{ height: "320px" }}>
        <AddAccountCardInstagram />
      </Grid>
      {/* <Grid item xs={12} sm={12} md={5} lg={5} xl={5} sx={{ height: "320px" }}>
        <AddAccountCardTikTok />
      </Grid> */}
    </Grid>
  );
}
