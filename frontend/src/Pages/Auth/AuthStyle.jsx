import styled from 'styled-components';
import * as global from '../../globalStyle'



export const AuthWrapper = styled.div`
background: radial-gradient(circle, ${global.colorMainL} 0%, ${global.colorMain} 50%, ${global.colorMainD} 100%);

.authMainButton {
    border: white 2px solid;
    
}
.authInput {
    width: 90%;
    margin: 3%;
    border-radius: 4px;
    background-color: ${(props) => props.theme.palette.background.default};
    
}

@media only screen and (max-width: 1026px) {
    .sideParrot {
        display: none;
    }
}

.sideParrot {
    position: fixed;
    object-fit: cover;
    height: 50%;
    top: 25%;
    margin-left: 3%;
}

.formWrapper {
    margin: 15vh auto;
    width: 60%;
    height: 70vh;
    padding: 5%;
    min-height: 390px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.primary.dark : props.theme.palette.grey['300']} 2px solid;
    box-shadow: 0px 0px 10px ${(props) => props.theme.palette.mode === 'dark' ? props.theme.palette.primary.dark : props.theme.palette.grey['300']}; */

    form {
        flex-grow: 1;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        
        &>div {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            &>div {
            }
            
        }
        input {
        }
    }
    p {
        text-align: center;
    }
    .titleWrapper{
    }
    .inputWrapper {
        min-width: 300px;
        width: 80%;
        display: flex;
        align-items: center;
        padding: none;
    }
    .inputWrapper2 {
        min-width: 400px;
        width: 50%;
        display: grid;
        grid-template-columns: repeat(2, 50%);
        flex-wrap: wrap;
        &>*:first-child {
            grid-column: 1/3;
            margin: 1.5%;
            width: 95%;
        }
        &>*{
            flex-grow: 1;
        }
    }
    .buttonWrapper {
    }
    h4 {
        font-size: 28px;

    }
}
`