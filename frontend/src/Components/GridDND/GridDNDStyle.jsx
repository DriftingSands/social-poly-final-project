import styled from "styled-components";
import * as global from "../../globalStyle";

export const GridLayout = styled.div`
  .react-resizable-handle {
    filter: invert(12%) sepia(73%) saturate(7233%) hue-rotate(359deg)
      brightness(112%) contrast(115%);
  }
  .react-grid-item.react-grid-placeholder {
    background: #696969;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .MenuButton {
    position: fixed;
    bottom: 0px;
    right: 0px;
    padding: 20px;
  }
`;

export const GridDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: -1px -2px 6px 0px;
  :hover {
    box-shadow: 0px 0px 20px 0px;
  }

  #postCreation {
    overflow-x: hidden;
    width: 100%;
  }

  .movingOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://cdn-icons-png.flaticon.com/512/624/624831.png");
    background-repeat: no-repeat;
    background-size: 70px;
    background-position: center;
    background-color: ${global.colorMainD}30;
    cursor: grab;
  }

  .Large {
    height: 100%;
    width: 100%;
    &>h6 {
        text-align: center;
        font-size: ${global.fontM};
    }
    img {
      height: 100%;
    }
  }
`;
