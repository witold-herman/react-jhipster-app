import React, {useState} from 'react';
import './css/signOut.css'

export const SignOut = ({parentCallback}) => {
    const [userToken] = useState('none');
    const [userProps] = useState(null);

    function handleClick() {
        parentCallback(userProps, userToken)
    }

    return (
        <button className='signOutButton' onClick={handleClick}>
            Sign out
        </button>
    )
};
