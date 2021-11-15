import { useTheme } from '@mui/material/styles'
import React from 'react'
import { PostErrorWrapper } from './PostCreationStyle'

const displayMessage = (type) => {
    if (type === 'size') {return (
        <div className='messageWrapper'>
            <h3>Error</h3>
            <p>This file is too large and could not be sent, please choose a smaller file.</p>
        </div>
    )} else if (type === 'success') {return (
        <div className='messageWrapper'>
            <h2>Success!</h2>
            <p>Your post has been scheduled!</p>
        </div>
    )} else if (type === 'title') {return (
        <div className='messageWrapper'>
            <h3>Error!</h3>
            <p>You need to add a draft title!</p>
        </div>
    )} else if (type === 'time') {return (
        <div className='messageWrapper'>
            <h3>Error</h3>
            <p>You have not input a time to schedule your post!</p>
        </div>
    )} else if (type === 'platform') {return (
        <div className='messageWrapper'>
            <h3>Error</h3>
            <p>You must choose at least one platform to post on!</p>
        </div>
    )} else if (type === 'content') {return (
        <div className='messageWrapper'>
            <h3>Error</h3>
            <p>Your post must have text content!</p>
        </div>
    )} else {return (
        <div className='messageWrapper'>
            <h3>Error</h3>
            <p>Something went wrong!</p>
        </div>
    )}
}

export default function PostError(props) {
    const theme = useTheme()
    return (
        <PostErrorWrapper theme={theme} >
            <div className='popUpBackground' onClick={() => props.closeErrors()}>
                <div className='popUpWrapper'>
                    {displayMessage(props.type)}
                </div>

            </div>
        </PostErrorWrapper>
    )
}
