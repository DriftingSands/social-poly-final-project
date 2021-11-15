import styled from "styled-components";
import * as global from "../../globalStyle";

export const TwitterPreviewWrapper = styled.div`
  width: calc(90% - 10px);
  overflow-x: auto;
  display: flex;
  justify-content: center;

  .twitterPostWrapper {
    min-width: 450px;
    max-width: 600px;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    box-sizing: border-box;
    border: #eff3f4 1px solid;
    border-radius: 8px;
    margin: 20px;
    box-shadow: -1px -2px 6px 0px;
    :hover {
      box-shadow: 0px 0px 20px 0px;
    }
    color: #000000;

    div {
      margin-top: 10px;
    }

    .postHeader {
      display: flex;
      flex-direction: row;
    }
    .nameWrapper {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;

      h6 {
        font-family: ${global.openSans};
        font-size: 15px;
      }
      span {
        font-family: ${global.openSans};
        font-size: 15px;
        margin-bottom: 7px;
        color: gray;
      }
    }
    .profileIcon {
      height: 48px;
      width: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    button {
      width: 35px;
      height: 35px;
      border: none;
      background-color: transparent;
      filter: invert(37%) sepia(5%) saturate(1627%) hue-rotate(164deg)
        brightness(96%) contrast(87%);
    }

    .postBody {
      width: 100%;
      font-size: 20px;
      overflow-wrap: anywhere;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      p {
        margin: 0;
        display: block;
      }
      .postImageWrapper {
        width: 100%;
        /* border: #CFD9DE 1px solid;
            border-radius: 15px; */

        video {
          border: #cfd9de 1px solid;
          border-radius: 15px;
          width: 100%;
          object-fit: cover;
        }

        img {
          border: #cfd9de 1px solid;
          border-radius: 15px;
          width: 100%;
          object-fit: cover;
        }
      }
    }

    .timestamp {
      color: #536471;
      font-size: 15px;
      border-bottom: solid 1px #eff3f4;
      padding: 10px 4px 16px 4px;
    }
    .engagment {
      display: flex;
      border-bottom: solid 1px #eff3f4;
      padding: 16px 4px;
      span {
        color: #536471;
        font-size: 15px;
        margin-right: 20px;

        strong {
          color: black;
        }
      }
    }
    .engagmentButtons {
      display: flex;
      justify-content: space-around;

      button {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 19px;
          height: 19px;
        }
      }
    }
  }
`;
