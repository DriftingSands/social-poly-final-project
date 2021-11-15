import styled from "styled-components";
import * as global from "../../globalStyle";

export const CustomToolTipWrapper = styled.div`
    max-width: 400px;
    word-wrap: break-word;
    border: ${global.colorMain} 2px solid;
    border-radius: 4px;
    box-shadow: 2px 2px 5px ${global.borderColor};
    background-color: ${(props) => props.theme.palette.background.default};
    padding: 5px;
`

export const GraphWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: auto;
    overflow: hidden;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .percentWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;

        h5 {
            font-size: 50px;
        }
        h6 {
            font-size: ${global.fontS};
        }

    }
`
