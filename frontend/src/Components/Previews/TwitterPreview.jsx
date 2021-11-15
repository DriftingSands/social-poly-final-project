import React, { useEffect, useState } from "react";
import axios from "axios";
import { TwitterPreviewWrapper } from "./TwitterPreviewStyle";
import RetweetIcon from "../../assets/svgs/twitter-retweet.svg";
import CommentIcon from "../../assets/svgs/twitter-comment.svg";
import LikeIcon from "../../assets/svgs/twitter-like.svg";
import ShareIcon from "../../assets/svgs/twitter-share.svg";
import MoreIcon from "../../assets/svgs/more_horiz.svg";

export default function TwitterPreview(props) {
  const [image, setImage] = useState("");

  const [UserData, setUserData] = React.useState(false);

  useEffect(() => {
    async function getUserData() {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `https://socialpoly.ch/backend/api/users/me/twitter/`,
        config
      );
      setImage(props.image);
      if (response.data) {
        setUserData(response.data);
      }
    }
    getUserData();
  }, [props.image]);

  return (
    <TwitterPreviewWrapper>
      <div className="twitterPostWrapper">
        <div className="postHeader">
          <img
            className="profileIcon"
            src={UserData.profile_image_url_https}
            alt=""
          />
          <div className="nameWrapper">
            <h6>{UserData.name}</h6>
            <span>@{UserData.screen_name}</span>
          </div>
          <button>
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

        <span className="timestamp">
          5:23 PM · Jul 4, 2021 · Twitter Web App
        </span>
        <div className="engagment">
          <span>
            <strong>832</strong> Retweets
          </span>
          <span>
            <strong>11</strong> Quote Tweets
          </span>
          <span>
            <strong>34.6K</strong> Likes
          </span>
        </div>

        <div className="engagmentButtons">
          <button>
            <img src={CommentIcon} alt="" />
          </button>
          <button>
            <img src={RetweetIcon} alt="" />
          </button>
          <button>
            <img src={LikeIcon} alt="" />
          </button>
          <button>
            <img src={ShareIcon} alt="" />
          </button>
        </div>
      </div>
    </TwitterPreviewWrapper>
  );
}
