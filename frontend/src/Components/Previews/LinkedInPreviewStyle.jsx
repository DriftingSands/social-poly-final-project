import styled from "styled-components";

export const LinkedInPreviewWrapper = styled.div`
  width: calc(90% - 10px);
  overflow-x: auto;
  display: flex;
  justify-content: center;

  .linkedInPostWrapper {
    min-width: 450px;
    max-width: 600px;
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    border: 1px #e0dfdc solid;
    border-radius: 8px;
    margin: 20px;
    box-shadow: -1px -2px 6px 0px;
    :hover {
      box-shadow: 0px 0px 20px 0px;
    }
    background-color: white;
  }

  .postHeader {
    height: 48px;
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
  }
  .headerText {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
    margin-left: 8px;

    h4 {
      font-size: 13px;
      font-weight: bold;
      color: #434343;
    }
    span {
      font-size: 11px;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: nowrap;
      color: #666666;
    }
    svg {
      height: 14px;
      filter: invert(42%) sepia(0%) saturate(536%) hue-rotate(172deg)
        brightness(94%) contrast(90%);
    }
  }
  .menuDots {
    align-self: flex-start;
    justify-self: flex-end;
    height: 30px;
    width: 30px;
    margin-top: -8px;
    background-color: transparent;
    border: none;
    img {
      height: 100%;
      width: 100%;
      filter: invert(39%) sepia(0%) saturate(0%) hue-rotate(176deg)
        brightness(98%) contrast(85%);
    }
  }
  .profileIcon {
    height: 48px;
    border-radius: 50%;
  }

  .postBody {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #191919;
    overflow-wrap: anywhere;

    p {
      margin: 0;
      display: block;
    }

    .postImageWrapper {
      margin: 7px 0;
      width: 100%;
      video {
        margin: 0 -16px;
        width: calc(100% + 32px);
        object-fit: cover;
      }

      img {
        margin: 0 -16px;
        width: calc(100% + 32px);
        object-fit: cover;
      }
    }
  }

  .likeWrapper {
    width: 100%;
    border-bottom: #ebebeb solid 1px;
    padding-bottom: 10px;

    button {
      font-size: 13px;
      background-color: transparent;
      border: none;
      display: flex;
      align-content: center;

      span {
        margin-left: 5px;
        color: #666666;
      }
    }
  }

  .quickCommentWrapper {
    display: flex;
    flex-direction: row;
    margin: 8px 0;
    ul {
      width: 100%;
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      overflow: hidden;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
    li {
      height: 32px;
      display: flex;
      justify-content: center;
      align-content: center;
      box-sizing: border-box;
      border: #666666 1px solid;
      color: #666666;
      border-radius: 16px;
      padding: 7px 15px;
      margin-right: 4px;

      span {
        margin-top: -3px;
      }
    }
    .arrowButton {
      padding-left: 15px;
      background-color: white;
      border: none;
      svg {
        filter: invert(39%) sepia(0%) saturate(0%) hue-rotate(176deg)
          brightness(98%) contrast(85%);
      }
    }
  }

  .engagmentButtons {
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      filter: invert(39%) sepia(0%) saturate(0%) hue-rotate(176deg)
        brightness(98%) contrast(85%);

      span {
        font-weight: bold;
        margin-left: 5px;
      }
    }
  }
`;
