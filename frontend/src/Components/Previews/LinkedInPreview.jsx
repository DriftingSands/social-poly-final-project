import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinkedInPreviewWrapper } from "./LinkedInPreviewStyle";
import PublicIcon from "@mui/icons-material/Public";
import MoreIcon from "../../assets/svgs/more_horiz.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LinkedInLike } from "../../Components/CustomSVG/CustomSVG";
import { LinkedInComment } from "../../Components/CustomSVG/CustomSVG";
import { LinkedInShare } from "../../Components/CustomSVG/CustomSVG";
import { LinkedInSend } from "../../Components/CustomSVG/CustomSVG";

export default function LinkedInPreview(props) {
  const [image, setImage] = useState("");

  const [UserData, setUserData] = React.useState(false);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/linkedin/`,
        config
      );
      setImage(props.image);
      if (response.data) {
        setUserData(response.data.results);
      }
    }
    getUserData();
  }, [props.image]);

  return (
    <LinkedInPreviewWrapper>
      <div className="linkedInPostWrapper">
        <div className="postHeader">
          <img
            className="profileIcon"
            src={UserData.avatar_picture_data}
            alt=""
          />
          <div className="headerText">
            <h4>
              {UserData.first_name} {UserData.last_name}
            </h4>
            <span>2,965 Followers</span>
            <span>
              2d • <PublicIcon />
            </span>
          </div>
          <button className="menuDots">
            <img src={MoreIcon} alt="more" />
          </button>
        </div>

        <div className="postBody">
          {props.textContent ? (
            <p className="postContent">{props.textContent}</p>
          ) : (
            <p className="postContent" style={{ color: "red" }}>
              Posts require text content!!!
            </p>
          )}
          <p className="postContent"></p>
          {image ? (
            <div className="postImageWrapper">
              {image.substring(5, 10) === "video" ? (
                <video src={image} controls></video>
              ) : (
                <img className="postImage" src={image} alt="" />
              )}
            </div>
          ) : null}
        </div>

        <div className="likeWrapper">
          <button>
            <img
              src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
              alt=""
            />
            <span>11</span>
          </button>
        </div>

        <div className="quickCommentWrapper">
          <ul>
            <li>
              <span>Can I ask...</span>
            </li>
            <li>
              <span>Great opportunity...</span>
            </li>
            <li>
              <span>Can I send you...</span>
            </li>
            <li>
              <span>Sharing this...</span>
            </li>
          </ul>
          <button className="arrowButton">
            <ArrowForwardIosIcon />
          </button>
        </div>

        <div className="engagmentButtons">
          <button>
            <LinkedInLike /> <span>Like</span>
          </button>
          <button>
            <LinkedInComment /> <span>Comment</span>
          </button>
          <button>
            <LinkedInShare /> <span>Share</span>
          </button>
          <button>
            <LinkedInSend /> <span>Send</span>
          </button>
        </div>
      </div>
    </LinkedInPreviewWrapper>
  );
}
