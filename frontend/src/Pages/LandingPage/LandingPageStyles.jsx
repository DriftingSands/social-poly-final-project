import styled from "styled-components";
import * as global from "../../globalStyle";
import SecretParrot from '../../assets/images/secret-parrot.gif'


export const LandingPageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, ${global.colorMainL} 0%, ${global.colorMain} 50%, ${global.colorMainD} 100%);
    ${(props) => props.secret && `background-image: url(${SecretParrot})`};

    .startButton {
        border: white 2px solid;
    }
    
    .innerDiv {
        width: 40%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        min-height: 350px;
        padding: 10px;
        /* border: ${global.colorMain} 2px solid;
        box-shadow: ${global.borderColor} 0px 0px 10px;
        background-color: #8080801a;
        border-radius: 10px; */


        h1 {
            font-size: 34px;
        }

        img {
            height: 60%;
        }
    }

    .secretButton {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        border: none;
        outline: none;
        border-radius: 0 50% 0 0;
        background-color: transparent;
        color: transparent;
        transition: .5s;
        cursor: grab;
        
        &:hover {
            background-color: #80808024;
        }
    }

`