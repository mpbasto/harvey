import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import dino from './dino.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt br2 shadow-2' options={{ max: 25 }} style={{ height: 160, width: 160 }}>
                <div className='Tilt-inner pa3'>
                    <img style={{ paddingTop: '5px' }} src={dino} alt='logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;