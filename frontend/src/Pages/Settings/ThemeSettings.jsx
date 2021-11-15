import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { SettingsMain, FormDiv } from "./SettingsStyle";
import {
  Alert,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import {
  Edit,
  FormatColorFill,
  Help,
  KeyboardArrowUp,
  Save,
} from "@mui/icons-material";

export default function Settings({ CustomUserTheme, SaveCustomUserTheme }) {
  const [RadioValue, setRadioValue] = React.useState("PrimaryLightColor");
  const [SuccessOpen, setSuccessOpen] = React.useState(false);
  const [HowItWorksOpen, setHowItWorksOpen] = React.useState(false);
  const [LightDescriptionOpen, setLightDescriptionOpen] = React.useState(false);
  const [DarkDescriptionOpen, setDarkDescriptionOpen] = React.useState(false);

  const [PrimaryLightColor, setPrimaryLightColor] = useState(
    CustomUserTheme.PrimaryLightColor
  );
  const [SecondaryLightColor, setSecondaryLightColor] = useState(
    CustomUserTheme.SecondaryLightColor
  );
  const [BackgroundLightColor, setBackgroundLightColor] = useState(
    CustomUserTheme.BackgroundLightColor
  );
  const [PrimaryDarkColor, setPrimaryDarkColor] = useState(
    CustomUserTheme.PrimaryDarkColor
  );
  const [SecondaryDarkColor, setSecondaryDarkColor] = useState(
    CustomUserTheme.SecondaryDarkColor
  );
  const [BackgroundDarkColor, setBackgroundDarkColor] = useState(
    CustomUserTheme.BackgroundDarkColor
  );

  const CustomTheme = {
    PrimaryLightColor: PrimaryLightColor,
    SecondaryLightColor: SecondaryLightColor,
    BackgroundLightColor: BackgroundLightColor,
    PrimaryDarkColor: PrimaryDarkColor,
    SecondaryDarkColor: SecondaryDarkColor,
    BackgroundDarkColor: BackgroundDarkColor,
  };

  const PresetColors = [
    { color: "#1976d2", title: "Primary Light default" },
    { color: "#f44336", title: "Secondary Light default" },
    { color: "#f2f2f2", title: "Background Light default" },
    { color: "#90caf9", title: "Primary Dark default" },
    { color: "#ce93d8", title: "Secondary Dark default" },
    { color: "#1c1c1c", title: "Background Dark default" },
    { color: "#f44336", title: "error" },
    { color: "#ffa726", title: "warning" },
    { color: "#29b6f6", title: "info" },
    { color: "#66bb6a", title: "success" },
  ];

  const handlePLColorChange = (color) => {
    setPrimaryLightColor(color.hex);
  };
  const handleSLColorChange = (color) => {
    setSecondaryLightColor(color.hex);
  };
  const handleBLColorChange = (color) => {
    setBackgroundLightColor(color.hex);
  };
  const handlePDColorChange = (color) => {
    setPrimaryDarkColor(color.hex);
  };
  const handleSDColorChange = (color) => {
    setSecondaryDarkColor(color.hex);
  };
  const handleBDColorChange = (color) => {
    setBackgroundDarkColor(color.hex);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    return event.target.value;
  };

  const SuccessAlert = () => {
    setSuccessOpen(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleHIWOHelp = () => {
    setHowItWorksOpen(!HowItWorksOpen);
  };

  const handleLDHelp = () => {
    setLightDescriptionOpen(!LightDescriptionOpen);
  };

  const handleDDHelp = () => {
    setDarkDescriptionOpen(!DarkDescriptionOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Theme-Settings</h1>
      <h2>Customize the Theme so that it fits for you!</h2>
      <SettingsMain style={{ marginBottom: "30px" }}>
        <FormDiv>
          <span
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <h3>See your changes directly in the Preivew</h3>
            <FormatColorFill />
          </span>
          <h4>Light Theme (most bright Background and bright colors)</h4>
          {LightDescriptionOpen ? (
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton>
                <KeyboardArrowUp onClick={handleLDHelp} />
              </IconButton>
              <p style={{ marginBottom: "10px" }}>
                Primary: All Main Buttons and the Header <br />
                Secondary: All Minor Buttons
              </p>
            </span>
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <Help onClick={handleLDHelp} />
              </IconButton>
            </span>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              margin: "10px",
            }}
          >
            <Card
              sx={{
                backgroundColor: BackgroundLightColor,
                width: "100%",
                boxShadow: "-1px -2px 6px 0px",
                "&:hover": {
                  boxShadow: "0px 0px 20px 0px",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: PrimaryLightColor,
                  width: "40%",
                  m: "5%",
                  color: "white",
                }}
              >
                Primary Light
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: SecondaryLightColor,
                  width: "40%",
                  m: "5%",
                  color: "white",
                }}
              >
                Secondary Light
              </Button>
            </Card>
          </div>
          <h4>Dark Theme (most dark background and soft colors)</h4>
          {DarkDescriptionOpen ? (
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton>
                <KeyboardArrowUp onClick={handleDDHelp} />
              </IconButton>
              <p style={{ marginBottom: "10px" }}>
                Primary: All Main Buttons <br />
                Secondary: All Minor Buttons
              </p>
            </span>
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton>
                <Help onClick={handleDDHelp} />
              </IconButton>
            </span>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              margin: "10px",
            }}
          >
            <Card
              sx={{
                backgroundColor: BackgroundDarkColor,
                width: "100%",
                boxShadow: "-1px -2px 6px 0px",
                "&:hover": {
                  boxShadow: "0px 0px 20px 0px",
                },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: PrimaryDarkColor,
                  width: "40%",
                  m: "5%",
                  color: "black",
                }}
              >
                Primary Dark
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: SecondaryDarkColor,
                  width: "40%",
                  m: "5%",
                  color: "black",
                }}
              >
                Secondary Dark
              </Button>
            </Card>
          </div>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ textAlign: "center", color: "text.primary" }}
              >
                Which Component would you like to change?
              </FormLabel>
              {HowItWorksOpen ? (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton>
                    <KeyboardArrowUp onClick={handleHIWOHelp} />
                  </IconButton>
                  <p style={{ marginBottom: "10px" }}>
                    Select the Componentgroup you'd like to edit. Choose your
                    preffered Color. You can see immediately your changes
                    directly in the Preview Section. When you're satisfied with
                    it, please save it and the Theme will update.
                  </p>
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton>
                    <Help onClick={handleHIWOHelp} />
                  </IconButton>
                </span>
              )}
              <RadioGroup
                row
                aria-label="Component"
                name="row-radio-buttons-group"
                value={RadioValue}
                onChange={handleRadioChange}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  value="PrimaryLightColor"
                  control={
                    <Radio
                      icon={<Edit color="secondary" />}
                      checkedIcon={<FormatColorFill />}
                    />
                  }
                  label="Primary Light"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="SecondaryLightColor"
                  control={
                    <Radio
                      icon={<Edit color="secondary" />}
                      checkedIcon={<FormatColorFill />}
                    />
                  }
                  label="Secondary Light"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="BackgroundLightColor"
                  control={
                    <Radio
                      icon={<Edit color="secondary" />}
                      checkedIcon={<FormatColorFill />}
                    />
                  }
                  label="Background Light"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="PrimaryDarkColor"
                  control={
                    <Radio
                      icon={<Edit color="secondary" />}
                      checkedIcon={<FormatColorFill />}
                    />
                  }
                  label="Primary Dark"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="SecondaryDarkColor"
                  control={
                    <Radio
                      icon={<Edit color="secondary" />}
                      checkedIcon={<FormatColorFill />}
                    />
                  }
                  label="Secondary Dark"
                  sx={{ width: "30%" }}
                />
                <FormControlLabel
                  value="BackgroundDarkColor"
                  control={
                    <Radio
                      icon={<Edit color="secondary" />}
                      checkedIcon={<FormatColorFill />}
                    />
                  }
                  label="Background Dark"
                  sx={{ width: "30%" }}
                />
              </RadioGroup>
            </FormControl>
            {RadioValue === "PrimaryLightColor" ? (
              <SketchPicker
                color={PrimaryLightColor}
                onChange={handlePLColorChange}
                presetColors={PresetColors}
                width="250px"
              />
            ) : null}
            {RadioValue === "SecondaryLightColor" ? (
              <SketchPicker
                color={SecondaryLightColor}
                onChange={handleSLColorChange}
                presetColors={PresetColors}
                width="250px"
              />
            ) : null}
            {RadioValue === "BackgroundLightColor" ? (
              <SketchPicker
                color={BackgroundLightColor}
                onChange={handleBLColorChange}
                presetColors={PresetColors}
                width="250px"
              />
            ) : null}
            {RadioValue === "PrimaryDarkColor" ? (
              <SketchPicker
                color={PrimaryDarkColor}
                onChange={handlePDColorChange}
                presetColors={PresetColors}
                width="250px"
              />
            ) : null}
            {RadioValue === "SecondaryDarkColor" ? (
              <SketchPicker
                color={SecondaryDarkColor}
                onChange={handleSDColorChange}
                presetColors={PresetColors}
                width="250px"
              />
            ) : null}
            {RadioValue === "BackgroundDarkColor" ? (
              <SketchPicker
                color={BackgroundDarkColor}
                onChange={handleBDColorChange}
                presetColors={PresetColors}
                width="250px"
              />
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  window.localStorage.removeItem("Theme");
                  window.location.reload();
                }}
                sx={{ mt: 2, width: "40%" }}
              >
                Set to Default
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={() => {
                  SaveCustomUserTheme(CustomTheme);
                  SuccessAlert();
                }}
                sx={{ mt: 2, width: "40%" }}
              >
                Save
              </Button>
            </div>
            <Snackbar
              open={SuccessOpen}
              autoHideDuration={6000}
              onClose={handleSuccessClose}
            >
              <Alert
                onClose={handleSuccessClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Your Theme was successfully saved!
              </Alert>
            </Snackbar>
          </span>
        </FormDiv>
      </SettingsMain>
    </div>
  );
}
