import React, {useEffect, useState} from 'react';

export const Auth = ({parentCallback}) => {
    const [userToken, setUserToken] = useState('none');
    const [flag, setFlag] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (flag) {
            fetch('http://localhost:8080/api/authenticate', {
                    method: 'POST',
                    body: JSON.stringify({password: `${userPassword}`, rememberMe: false, username: `${userName}`}),
                    headers: {
                        "accept": "*/*",
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => response.json())
                .then(data => !data.status ? setUserToken(data.id_token) : setErrorMessage('Invalid credentials'))
                .then(parentCallback(userToken))
                .then(() => setFlag(false))
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [flag, parentCallback, userToken]);

    function handleClick() {
        setFlag(true);
    }

    function handleUsernameInput(e) {
        setUserName(e.target.value)
    }

    function handlePasswordInput(e) {
        setUserPassword(e.target.value)
    }

    return (
        <div className='container'>
            <p className='headerParagraph'>
                Login to continue
            </p>
            <label>
                <input placeholder='username' className='input' type='text' onChange={handleUsernameInput}/>
                <br/>
                <input placeholder='password' type='password' className='input' onChange={handlePasswordInput}/>
                <br/>
                <button className='button' onClick={handleClick}>
                    Sign in
                </button>
            </label>
            <p className='errorMessage'>{errorMessage}</p>
        </div>
    )
};

