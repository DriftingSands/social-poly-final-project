import styled from 'styled-components';
import * as global from '../../globalStyle'
import searchIcon from '../../assets/svgs/search.svg'
import cancelIcon from '../../assets/svgs/cancel.svg'

const backgroundColor = '#e4e4e4'

export const SearchMain = styled.form`
    height: ${(props) => props.h};
    width: ${(props) => props.w};
    display: flex;
    align-items: center;

    button {
        height: ${(props) => props.h};
        width: ${(props) => props.h}; /* This is intentional so the button is always square */
        max-width: 30px;
        max-height: 30px;
        position: absolute;
        margin: 0;
        padding: 0;
        outline: none;
        border: 0;
        background-color: #bdbdbd00;
        background-image: url(${searchIcon});
        background-repeat: no-repeat;
        background-position: 3px center;
        border-radius: 50%;
        cursor: pointer;
        transition: .5s;
        
        &:hover {
            transition: .5s;
            background-color: #bdbdbd;
        }
    }

    input {
        height: 100%;
        width: 100%;
        ${(props) => props.fontSize ? 'font-size: ' + props.fontSize : global.fontM};
        font-family: ${(props) => props.fontFamily ? props.fontFamily : global.openSans};
        padding-left: 35px;
        outline: none;
        background-color: white;
        border: gray 1px solid;
        border-radius: 4px;
        transition: .5s;
        /* background-image: url(${searchIcon}); */
        background-repeat: no-repeat;
        background-position: 0 center;
    
        &:focus {
            transition: .5s;
            background-color: ${backgroundColor};
        }
        &::-webkit-search-cancel-button{
            position:relative;
            right:0px;  
    
            -webkit-appearance: none;
            height: 25px;
            width: 25px;
            background-image: url(${cancelIcon});
            background-position: 0 center;
            background-repeat: no-repeat;
            filter: invert(57%) sepia(84%) saturate(1245%) hue-rotate(315deg) brightness(109%) contrast(107%);
            cursor: pointer;
            
            &:hover {
                filter: invert(27%) sepia(93%) saturate(7417%) hue-rotate(356deg) brightness(97%) contrast(117%);
            }
        }
    }
`