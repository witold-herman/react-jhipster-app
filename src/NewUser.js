import React, {useState} from 'react';
import './css/functionalButtons.css'

export const NewUser = (params) => {

    const [newUserName, setNewUserName] = useState(null);
    const [newUserPassword, setNewUserPassword] = useState(null);
    const [newUserEmail, setNewUserEmail] = useState(null);

    const addNewUser = () => {
        const APIKey = `Bearer ${params.userToken}`;
        fetch('http://localhost:8080/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    authorities: [`ROLE_USER`],
                    langKey: 'en',
                    email: `${newUserEmail}`,
                    activated: true,
                    login: `${newUserName}`,
                    password: `${newUserPassword}`,
                }),
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": APIKey,
                },
            }
        ).then(res => {
            if (res.ok === true) {
                fetch('http://localhost:8080/api/responsible-users', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: `${newUserName}`
                        }),
                        headers: {
                            "accept": "*/*",
                            "Content-Type": "application/json",
                            "Authorization": APIKey,
                        },
                    }
                )
                    .then(() => params.parentMessageCallback(<p className='messageSuccess'>Added new user</p>))
            } else params.parentMessageCallback(<p className='messageFailed'>Adding user failed</p>)
        })
    };

    const handleLoginInputChange = (e) => {
        setNewUserName(e.target.value);
    };

    const handlePasswordInputChange = (e) => {
        setNewUserPassword(e.target.value);
    };

    const handleEmailInputChange = (e) => {
        setNewUserEmail(e.target.value);
    };

    return (
        <>
            <input placeholder='login' value={newUserName} onChange={handleLoginInputChange}/>
            <input placeholder='password' type='password' value={newUserPassword} onChange={handlePasswordInputChange}/>
            <input placeholder='email' type='email' value={newUserEmail} onChange={handleEmailInputChange}/>
            <button className='confirmButton' onClick={addNewUser}>
                Confirm
            </button>
        </>
    );
};


