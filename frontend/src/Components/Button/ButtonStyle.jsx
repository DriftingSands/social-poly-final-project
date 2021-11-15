import styled from 'styled-components';
import * as global from '../../globalStyle'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const buttonWidth = '220px'
const buttonHeight = '50px'

export const ButtonMain = styled(Button)`

    &&{
    margin: 10px;
    width: ${buttonWidth};
    height: ${buttonHeight};
    /* border: solid 1px ${global.borderColor}; */
    /* box-shadow: 0px 0px 10px ${global.borderColor}; */
    border-radius: 4px;
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : global.colorMain};
    font-size: ${(props) => props.fontSize ? props.fontSize : global.fontL};
    font-family: ${(props) => props.fontFamily ? props.fontFamily : global.openSans};
    font-weight: ${(props) => props.fontWeight ? props.fontWeight : 600};
    text-transform: ${(props) => props.texttransform ? props.texttransform : 'uppercase'};
    color: ${(props) => props.fontColor ? props.fontColor : 'white'};
    cursor: pointer;
    transition: .5s;
    
    &:hover {
        box-shadow: 0px 0px 10px ${global.borderColor};
        background-color: ${(props) => props.backgroundColor ? props.backgroundColor : global.colorMain};
        transition: .5s;
        filter: brightness(85%);
    }}
`

export const ButtonMinor = styled(ButtonMain)`

    &&{
    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'white'};
    color: ${(props) => props.fontColor ? props.fontColor : '#525252'};
    
    &:hover {
        background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'white'};
        filter: brightness(90%);
    }}
`

export const PostScheduler = styled(TextField)`
    && {
        border-radius: 4px;
        .label {
            color:red;
        }
    }
`