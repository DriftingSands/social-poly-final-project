import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { SettingsMain, FormDiv, FileDrop } from "./SettingsStyle";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff, Save } from "@mui/icons-material";

export default function Settings({ UserData, UserAvatar }) {
  const [ShowPassword, setShowPassword] = useState(false);
  const [Disabled, setDisabled] = useState(false);

  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState(null);

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

  const handleClickShowPassword = () => {
    setShowPassword(!ShowPassword);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Settings</h1>
      <h2>Change your Profile Settings</h2>
      <SettingsMain style={{ marginBottom: "30px" }}>
        <FormDiv>
          <FileDrop
            className="test"
            dragover={dragOver}
            style={{
              backgroundImage: `url(${UserAvatar})`,
            }}
          >
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
          <TextField
            disabled
            fullWidth
            label="Username"
            id="fullWidth"
            margin="dense"
            defaultValue={UserData.username}
          />
          <TextField
            disabled={Disabled}
            fullWidth
            label="Firstname"
            id="fullWidth"
            margin="dense"
            defaultValue={UserData.first_name}
          />
          <TextField
            disabled={Disabled}
            fullWidth
            label="Lastname"
            id="fullWidth"
            margin="dense"
            defaultValue={UserData.last_name}
          />
          <TextField
            disabled={Disabled}
            fullWidth
            label="E-Mail"
            id="fullWidth"
            margin="dense"
            defaultValue={UserData.email}
          />
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={ShowPassword ? "text" : "password"}
              /* value={password} */
              /* onChange={handleChange("password")} */
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {ShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password confirmation
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={ShowPassword ? "text" : "password"}
              /* value={password} */
              /* onChange={handleChange("password")} */
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {ShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LoadingButton
            color="primary"
            /* onClick={handleClick}
            loading={loading} */
            loadingPosition="start"
            startIcon={<Save />}
            variant="contained"
          >
            Save
          </LoadingButton>
        </FormDiv>
      </SettingsMain>
    </div>
  );
}
