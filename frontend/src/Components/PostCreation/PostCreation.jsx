import React, { useEffect, useState } from "react";
import {
  FileDrop,
  PlatformButton,
  PostCreationWrapper,
  PostTextArea,
} from "./PostCreationStyle";
import { PostScheduler } from "../../Components/Button/ButtonStyle";
import TwitterIcon from "../../assets/svgs/twitter-icon.svg";
import FacebookIcon from "../../assets/svgs/facebook-icon.svg";
import InstagramIcon from "../../assets/svgs/instagram-icon.svg";
import LinkedIn from "../../assets/svgs/linkedin-icon.svg";
/* import TiktokIcon from "../../assets/svgs/tiktok-icon.svg"; */
import { useDropzone } from "react-dropzone";
import axios from "axios";
import {
  Alert,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DisplayPreview from "../Previews/DisplayPreview";

export default function PostCreation() {
  const theme = useTheme();
  const [statusTwitter, setStatusTwitter] = useState(false);
  const [statusFacebook, setStatusFacebook] = useState(false);
  const [statusInstagram, setStatusInstagram] = useState(false);
  const [statusLinkedIn, setStatusLinkedIn] = useState(false);
  const [statusTiktok, setStatusTiktok] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);
  const [successDraft, setSuccessDraft] = useState(false);
  const [errorTime, setErrorTime] = useState(false);
  const [errorPlatform, setErrorPlatform] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorSize, setErrorSize] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  //   const [errorTitle, setErrorTitle] = useState(false);

  const [previews, setPreviews] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState("Upload Media");
  const [postText, setPostText] = useState("");
  const [draftTitle, setDraftTitle] = useState("");
  const [schedualPost, setSchedualPost] = useState(false);
  const [schedualTime, setSchedualTime] = useState("");
  const [link, setLink] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm",
    onDrop: (acceptedFiles) => {
      setDragOver(false);
      setFileName(acceptedFiles[0].name);
      setFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    const previewsArray = [];
    statusTwitter && previewsArray.push("Twitter");
    statusFacebook && previewsArray.push("Facebook");
    statusInstagram && previewsArray.push("Instagram");
    statusLinkedIn && previewsArray.push("LinkedIn");
    statusTiktok && previewsArray.push("Tik Tok");
    setPreviews(previewsArray);
  }, [
    statusTwitter,
    statusFacebook,
    statusInstagram,
    statusLinkedIn,
    statusTiktok,
  ]);

  const postTwitter = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = new FormData();
    draftTitle
      ? body.append("title", draftTitle)
      : body.append("title", "Untitled Draft");
    body.append("content", postText);
    if (schedualPost) {
      if (schedualTime) {
        let timeString = schedualTime;
        timeString = timeString.replace("T", " ");
        timeString += ":00";
        body.append("send_time", timeString);
      } else {
        setErrorTime(true);
        return null;
      }
    } else {
      body.append("send_time", "");
    }
    if (file) {
      body.append("images", file);
    }

    const response = await axios
      .post(`https://socialpoly.ch/backend/api/twitter/send/`, body, config, {
        validateStatus: (status) => {
          return true; // Always give return status
        },
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        } else {
          return { status: 413 };
        }
      });
    return response.status;
  };

  const postLinkedIn = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = new FormData();
    // body.append("title", draftTitle);
    body.append("content", postText);
    body.append("link", link);
    if (schedualPost) {
      if (schedualTime) {
        let timeString = schedualTime;
        timeString = timeString.replace("T", " ");
        timeString += ":00";
        body.append("post_date_time", timeString);
      } else {
        setErrorTime(true);
        return null;
      }
    } else {
      body.append("post_date_time", "");
    }
    if (file) {
      body.append("image", file);
    }

    const response = await axios
      .post(`https://socialpoly.ch/backend/api/linkedin/posts/`, body, config, {
        validateStatus: (status) => {
          return true; // Always give return status
        },
      })
      .catch(function (error) {
        if (error.response) {
          return error.response;
        } else {
          return { status: 413 };
        }
      });
    return response.status;
    // if (response.status >= 200 && response.status < 300) {
    //   setSuccessAlert(true);
    // } else if (response.status === 413) {
    //   setErrorSize(true);
    // } else {
    //   setErrorAlert(true);
    // }
  };

  const deleteDraftHandler = () => {
    setPreviews([]);
    setFile(null);
    setFilePreview("");
    setPostText("");
    setDraftTitle("");
    setSchedualPost(false);
    setSchedualTime("");
  };

  const postFacebook = async () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const body = new FormData();
    draftTitle
      ? body.append("title", draftTitle)
      : body.append("title", "Untitled Draft");
    body.append("content", postText);
    if (schedualPost) {
      if (schedualTime) {
        let timeString = schedualTime;
        timeString = timeString.replace("T", " ");
        timeString += ":00";
        body.append("send_time", timeString);
      } else {
        setErrorTime(true);
        return null;
      }
    } else {
      body.append("post_date_time", "");
    }
    if (file) {
      body.append("images", file);
    }

    const response = await axios
      .post(
        `https://socialpoly.ch/backend/api/facebook/create/`,
        body,
        config,
        {
          validateStatus: (status) => {
            return true; // Always give return status
          },
        }
      )
      .catch(function (error) {
        if (error.response) {
          return error.response;
        } else {
          return { status: 413 };
        }
      });
    return response.status;

    // if (response.status >= 200 && response.status < 300) {
    //   setSuccessAlert(true);
    // } else if (response.status === 413) {
    //   setErrorSize(true);
    // } else {
    //   setErrorAlert(true);
    // }
  };

  const postButtonHandler = async () => {
    if (
      !statusTwitter &&
      !statusFacebook &&
      !statusInstagram &&
      !statusLinkedIn &&
      !statusTiktok
    ) {
      setErrorPlatform(true);
    } else if (!postText.replace(/\s/g, "")) {
      setErrorContent(true);
      // } else if (!draftTitle.replace(/\s/g, "")) {
      //   setErrorTitle(true);
    } else {
      let responseTwitter = 0;
      let responseLinkedIn = 0;
      let responseFacebook = 0;
      statusTwitter && (responseTwitter = await postTwitter());
      if (responseTwitter !== 0) {
        if (responseTwitter >= 200 && responseTwitter < 300) {
          responseTwitter = 200;
        } else if (responseTwitter === 413) {
          console.log("twitter failed 1");
          setErrorSize(true);
          return;
        } else {
          console.log("twitter failed 2");
          setErrorAlert(true);
          return;
        }
      }
      statusLinkedIn && (responseLinkedIn = await postLinkedIn());
      if (responseLinkedIn !== 0) {
        if (responseLinkedIn >= 200 && responseLinkedIn < 300) {
          responseLinkedIn = 200;
        } else if (responseLinkedIn === 413) {
          console.log("linked in failed 1");
          setErrorSize(true);
          return;
        } else {
          console.log("linked in failed 2");
          setErrorAlert(true);
          return;
        }
      }
      statusFacebook && (responseFacebook = await postFacebook());
      if (responseFacebook !== 0) {
        if (responseFacebook >= 200 && responseFacebook < 300) {
          responseFacebook = 200;
        } else if (responseFacebook === 413) {
          console.log("facebook failed 1");
          setErrorSize(true);
          return;
        } else {
          console.log("facebook failed 2");
          setErrorAlert(true);
          return;
        }
      }
      if (
        responseTwitter === 200 ||
        responseLinkedIn === 200 ||
        responseFacebook === 200
      ) {
        console.log(responseTwitter, responseLinkedIn, responseFacebook);
        setSuccessAlert(true);
        setFilePreview("");
        setFileName("Upload Media");
        setPostText("");
        setDraftTitle("");
        setSchedualPost(false);
        setSchedualTime("");
        setLink("");
        setStatusTwitter(false);
        setStatusFacebook(false);
        setStatusInstagram(false);
        setStatusLinkedIn(false);
        setStatusTiktok(false);
      } else {
        console.log(
          "something went really wrong!",
          responseTwitter,
          responseLinkedIn,
          responseFacebook
        );
      }
    }
  };

  const saveDraftHandler = async () => {
    if (
      !statusTwitter &&
      !statusFacebook &&
      !statusInstagram &&
      !statusLinkedIn &&
      !statusTiktok
    ) {
      setErrorPlatform(true);
    } else if (!postText.replace(/\s/g, "")) {
      setErrorContent(true);
      // } else if (!draftTitle.replace(/\s/g, "")) {
      //   setErrorTitle(true);
    } else {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const body = new FormData();
      draftTitle
        ? body.append("title", draftTitle)
        : body.append("title", "Untitled Draft");
      body.append("content", postText);
      statusTwitter && body.append("is_twitter", true);
      statusLinkedIn && body.append("is_linkedin", true);
      statusFacebook && body.append("is_facebook", true);
      statusInstagram && body.append("is_instagram", true);
      statusTiktok && body.append("is_tiktok", true);

      // checking for schedule time
      if (schedualPost) {
        if (schedualTime) {
          let timeString = schedualTime;
          timeString = timeString.replace("T", " ");
          timeString += ":00";
          body.append("send_time", timeString);
        } else {
          setErrorTime(true);
          return null;
        }
      } else {
        body.append("send_time", "");
      }

      // adding image if there is one
      if (file) {
        body.append("images", file);
      }
      const response = await axios
        .post(`https://socialpoly.ch/backend/api/draft/create/`, body, config, {
          validateStatus: (status) => {
            return true; // Always give return status
          },
        })
        .catch(function (error) {
          if (error.response) {
            return error.response;
          } else {
            return { status: 413 };
          }
        });
      if (response.status >= 200 && response.status < 300) {
        setSuccessDraft(true);
      } else if (response.status === 413) {
        setErrorSize(true);
      } else {
        setErrorAlert(true);
      }
    }
  };

  return (
    <PostCreationWrapper remainingText={280 - postText.length} theme={theme}>
      {/* <Snackbar
        open={errorTitle}
        autoHideDuration={6000}
        onClose={() => setErrorTitle(false)}
      >
        <Alert
          onClose={() => setErrorTitle(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          You must have a Draft Title!
        </Alert>
      </Snackbar> */}
      <Snackbar
        open={errorSize}
        autoHideDuration={6000}
        onClose={() => setErrorSize(false)}
      >
        <Alert
          onClose={() => setErrorSize(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          This file is too large and could not be sent, please choose a smaller
          file.
        </Alert>
      </Snackbar>
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert
          onClose={() => setSuccessAlert(false)}
          severity="success"
          sx={{ width: "200%" }}
        >
          Your post has been scheduled!
        </Alert>
      </Snackbar>
      <Snackbar
        open={successDraft}
        autoHideDuration={6000}
        onClose={() => setSuccessDraft(false)}
      >
        <Alert
          onClose={() => setSuccessDraft(false)}
          severity="success"
          sx={{ width: "200%" }}
        >
          Your draft has been Saved!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorTime}
        autoHideDuration={6000}
        onClose={() => setErrorTime(false)}
      >
        <Alert
          onClose={() => setErrorTime(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          You have not input a time to schedule your post!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorPlatform}
        autoHideDuration={6000}
        onClose={() => setErrorPlatform(false)}
      >
        <Alert
          onClose={() => setErrorPlatform(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          You must choose at least one platform to post on!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorContent}
        autoHideDuration={6000}
        onClose={() => setErrorContent(false)}
      >
        <Alert
          onClose={() => setErrorContent(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          Your post must have text content!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorContent}
        autoHideDuration={6000}
        onClose={() => setErrorContent(false)}
      >
        <Alert
          onClose={() => setErrorContent(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          Your post must have text content!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={() => setErrorAlert(false)}
      >
        <Alert
          onClose={() => setErrorAlert(false)}
          severity="error"
          sx={{ width: "200%" }}
        >
          Something went wrong! Your post was not sent!
        </Alert>
      </Snackbar>
      <div className="postWrapper">
        <div className="postContent">
          <div className="platformButtons">
            <PlatformButton
              onClick={() => setStatusTwitter(!statusTwitter)}
              active={statusTwitter}
            >
              <img src={TwitterIcon} alt="" />
            </PlatformButton>
            <PlatformButton
              onClick={() => setStatusLinkedIn(!statusLinkedIn)}
              active={statusLinkedIn}
            >
              <img src={LinkedIn} alt="" />
            </PlatformButton>
            <PlatformButton
              disabled
              onClick={() => setStatusFacebook(!statusFacebook)}
              active={statusFacebook}
            >
              <img src={FacebookIcon} alt="" />
            </PlatformButton>
            <PlatformButton
              disabled
              onClick={() => setStatusInstagram(!statusInstagram)}
              active={statusInstagram}
            >
              <img src={InstagramIcon} alt="" />
            </PlatformButton>
            {/* <PlatformButton
              disabled
              onClick={() => setStatusTiktok(!statusTiktok)}
              active={statusTiktok}
            >
              <img src={TiktokIcon} alt="" />
            </PlatformButton> */}
          </div>

          <PostTextArea
            multiline
            label="Create new Post"
            name="textContent"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            rows={10}
          ></PostTextArea>
          {/* {statusLinkedIn && <TextField id="outlined-basic" label="Link (LinkedIn only!)" placeholder='LinkedIn only' variant="outlined" value={link} onChange={(e) => setLink(e.target.value)} sx={{margin: '10px', boxShadow: 5}} />} */}
          {statusTwitter && (
            <span>{280 - postText.length} characters left</span>
          )}
          <Button
            style={{ margin: "20px" }}
            variant="contained"
            color="primary"
            sx={{ m: 1, color: "white" }}
            className="fileDropWrapper"
          >
            <FileDrop className="dragArea" dragover={dragOver}>
              <div
                className="fileDrop"
                {...getRootProps()}
                onDragEnter={() => setDragOver(true)}
              >
                <input {...getInputProps()} />
                <p>{fileName}</p>
              </div>

              <div
                className="dragOverlay"
                {...getRootProps()}
                onDragLeave={() => setDragOver(false)}
              >
                <input {...getInputProps()} />
              </div>
            </FileDrop>
          </Button>
        </div>

        <div className="postControls">
          <TextField
            id="outlined-basic"
            label="Draft Title"
            variant="outlined"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            sx={{
              m: 1,
              width: "60%",
            }}
          />
          <Button
            onClick={() => saveDraftHandler()}
            variant="contained"
            color="secondary"
            sx={{ m: 1, width: "60%", color: "white" }}
          >
            Save Draft
          </Button>
          <FormControlLabel
            control={
              <Switch
                checked={schedualPost}
                onChange={() => setSchedualPost(!schedualPost)}
                name="schedual"
              />
            }
            label="Schedule Post"
          />
          <PostScheduler
            disabled={!schedualPost}
            value={schedualTime}
            onChange={(e) => setSchedualTime(e.target.value)}
            id="datetime-local"
            label="Schedule Post"
            type="datetime-local"
            sx={{
              width: "60%",
              m: 1,
            }}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => postButtonHandler()}
            sx={{ m: 1, width: "60%", color: "white" }}
          >
            Post
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ m: 1, width: "60%", color: "white" }}
            onClick={() => deleteDraftHandler()}
          >
            Delete
          </Button>
        </div>
      </div>

      {previews.length >= 1 && (
        // a key value is only needed here to force a re-render when the props change
        <DisplayPreview
          key={previews.length}
          image={filePreview}
          textContent={postText}
          previews={previews}
        />
      )}
    </PostCreationWrapper>
  );
}
