import styled from "styled-components";
import UploadIcon from "../../assets/svgs/upload-icon.svg";

export const SettingsMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(600px, 80%);
`;

export const FileDrop = styled.div`
  display: flex;
  height: 200px;
  width: 200px;
  border: ${global.borderColor} 3px
    ${(props) => (props.dragover ? "dashed" : "solid")};
  border-radius: 8px;
  flex-grow: 1;
  /* background-image: url("https://socialpoly.ch/media-files/user/2/Profile_Picture.png"); */
  background-repeat: no-repeat;
  background-size: 100%;

  div {
    display: ${(props) => (props.dragover ? "none" : "flex")};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  .fileDrop {
    background-color: ${global.colorMainL};
  }
  .dragOverlay {
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    display: ${(props) => (props.dragover ? "flex" : "none")};
    background-image: url(${UploadIcon});
    background-repeat: no-repeat;
    background-size: 40px 40px;
    background-position: center;
  }
`;
