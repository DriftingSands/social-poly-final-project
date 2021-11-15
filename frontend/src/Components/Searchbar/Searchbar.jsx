import React from 'react'
import {SearchMain} from './SearchbarStyle'

const submitHandler = (e) => {
    e.preventDefault()
    console.log('test')
}

export default function Searchbar(props) {
    return (
        <SearchMain w={props.w} h={props.h} onSubmit={submitHandler} >
            <button onClick={submitHandler}></button>
            <input type='search' placeholder='Search...' />
        </SearchMain>
    )
}
