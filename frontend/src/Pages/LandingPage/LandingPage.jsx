import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { LandingPageWrapper } from './LandingPageStyles'
import Parrot from '../../Parrot.png'
import { ButtonMain } from '../../Components/Button/ButtonStyle'

export default function LandingPage() {
    const [secret, setSecret] = useState(false)
    const history = useHistory()
    
return (
<LandingPageWrapper secret={secret} >
    <div className='innerDiv'>
        <h1>Welcome to Social POLY!</h1>
        <img src={Parrot} alt="" />
        <ButtonMain className='startButton' onClick={() => history.push('/auth')}>start!</ButtonMain>
    </div>
    <button className='secretButton' onClick={() => setSecret(!secret)} >This is a secret</button>
</LandingPageWrapper>
)
}
