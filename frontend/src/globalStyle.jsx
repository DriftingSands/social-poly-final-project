import { createGlobalStyle } from "styled-components";

export const fontXS = "14px";
export const fontS = "16px";
export const fontM = "18px";
export const fontL = "22px";
export const fontXL = "24px";

export const openSans = "'Open Sans', sans-serif";
export const overpass = "'Overpass', sans-serif";

export const colorMain = "#0260b2";
export const colorMainD = "#004393";
export const colorMainL = "#3f9fe7";
export const colorComp = "#b25402";
export const colorCompL = "#f07710";
export const borderColor = "#c7c7c7";
// export const borderColor = (props) => {console.log('theme',props)}

export const colorOther1 = "#02b2ac";
export const colorOther2 = "#0208b2";
export const colorOther3 = "#5402b2";
export const colorOther4 = "#b20260";

export const test = "border: crimson 2px solid;";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        /* width: 100vw; */
        height: 100vh;
        margin: 0;
        padding: 0;
        font-family: 'Open Sans', sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Overpass', sans-serif;
    }
`;
