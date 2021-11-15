import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  PersonAdd,
  Help,
  MoreVert,
  KeyboardArrowUp,
  HowToReg,
} from "@mui/icons-material";
import { TikTok } from "../CustomSVG/CustomSVG";

export default function AddAccountCardTikTok() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            N/A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="TikTok"
        subheader="No Account Connected"
      />
      <CardContent>
        <Typography variant="body2" sx={{ mb: 6.5 }}>
          You must connect your TikTok Account before you can use it.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="TikTok"
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TikTok />
        </IconButton>
        <IconButton aria-label="share">
          {expanded ? <HowToReg /> : <PersonAdd />}
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
        <CardContent>
          <Typography paragraph>How to connect</Typography>
          <Typography paragraph>
            First of all, you must have a Parrot 🦜
          </Typography>
          <Typography paragraph>Please don't forget to feed him!</Typography>
          <Typography paragraph>
            Change the Newspaper in the cage, so he don't get bored.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
