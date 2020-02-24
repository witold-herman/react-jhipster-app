import React, {useEffect, useState} from 'react';
import {CurrentUser} from './CurrentUser'
import './css/login.css'

export const IsAuthenticated = (params) => {

    const [role, setRole] = useState('basic role');
    const [userProps, setUserProps] = useState(null);

    useEffect(() => {
        const APIKey = `Bearer ${params.userToken}`;
        const res = fetch('http://localhost:8080/api/authenticate', {
                method: 'GET',
                headers: {
                    "accept": "*/*",
                    Authorization: APIKey,
                },
            }
        )
            .then((res) => res.text())
            .then(data => setRole(data))
            .then(params.parentUserPropsCallback(userProps))
            .then(() => role === 'admin' ? params.parentIsAdminCallback(true) : params.parentIsAdminCallback(false))


    }, [params.userToken, userProps]);

    const userPropsCallback = userProps => {
        setUserProps(userProps)
    };

    return (
        <>
            {userProps !== null &&
            <span className='currentUser'> Logged as {userProps.login} </span>
            }
            <br/>
            <CurrentUser parentCallback={userPropsCallback} userToken={params.userToken} role={role}/>
        </>
    )
};
