import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className='f5 link dim white underline pa3 pointer'>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f5 link dim white underline pa3 pointer'>Login</p>
                <p onClick={() => onRouteChange('register')} className='f5 link dim white underline pa3 pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;