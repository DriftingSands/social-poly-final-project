import styled from "styled-components";

export const FacebookPreviewWrapper = styled.div`
    width: 100%;
    max-width: 500px;
    min-width: 350px;

    .facebookPostWrapper {
        width: 100%;
        background-color: white;
        border: #EDEFF2 1px solid;
        box-shadow: #EDEFF2 0 0 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 16px;
        border-radius: 8px;
    }
    
    .facebookPostHeader {
        display: flex;
        width: 100%;
        align-items: center;
        margin-bottom: 8px;

        .profileIcon {
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }
        .nameWrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        h6, span {
            margin: -2px 8px;
        }
        h6 {
            font-size: 14px;
            color: black;
        }
        span {
            font-size: 11px;
            color: #65676B;
        }
    }
    .moreButton {
        justify-self: flex-end;
        background-color: transparent;
        border: none;
        margin-left: auto;
        margin-right: 25px;
        img {
            filter: invert(42%) sepia(0%) saturate(536%) hue-rotate(172deg) brightness(94%) contrast(90%);
        }
    }

    .postBody {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        
        p {
            display: block;
        }
        .postImageWrapper {
            margin-top: 10px;
            width: calc(100% + 32px);
            object-fit: cover;
            img, video {
                width: 100%;
            }
        }

    }

    .postFooter {
        margin: 0 18px;
        span {
            color: #65676B;
            font-size: 14px;
        }
        img {
            height: 18px;
            width: 18px;
            margin-top: -2px;
            margin-right: 9px;
        }
        div {
            padding: 12px 0;
            border-bottom: #CED0D4 1px solid;
            display: flex;
            align-items: center;
        }
        .commentCount{
            margin-left: auto;
        }
        .footerBot {
            justify-content: space-around;
            margin-bottom: 15px;
            button {
                background-image: url(https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/qt8nH3S47vh.png);
                background-size: auto;
                height: 18px;
                background-repeat: no-repeat;
                display: inline-block;
                padding-left: 27px;
                background-color: transparent;
                border: none;
            }
        }
        .commentButton {
            background-position: 0px -159px;
        }
        .likeButton {
            background-position: 0px -197px;
        }
    }
`