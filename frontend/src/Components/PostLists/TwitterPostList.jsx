import React, { useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function TwitterPostList() {
  const [TwitterPosts, setTwitterPosts] = React.useState(false);

  useEffect(() => {
    async function getTwitterPosts() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/twitter/mytweets/`,
        config
      );
      if (response.data) {
        setTwitterPosts(response.data.tweets);
      }
    }
    getTwitterPosts();
  }, []);
  return (
    <div>
      <h4 style={{ display: "flex", justifyContent: "center" }}>My Tweets</h4>
      {TwitterPosts ? (
        Object.keys(TwitterPosts).map((i) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {TwitterPosts[i].created_at.replace(" +0000 2021", "")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Tweet:</strong>{" "}
                {TwitterPosts[i].full_text.includes("https://")
                  ? TwitterPosts[i].full_text.substring(
                      0,
                      TwitterPosts[i].full_text.indexOf("https://")
                    )
                  : TwitterPosts[i].full_text}
                {TwitterPosts[i].entities.media ? (
                  <img
                    src={TwitterPosts[i].entities.media[0].media_url_https}
                    alt="Twitter Post"
                  />
                ) : null}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}
