import React, {useEffect, useState} from 'react';
import './css/functionalButtons.css'

export const DeleteUser = (params) => {

    const APIKey = `Bearer ${params.userToken}`;
    const [allUsers, setAllUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": APIKey,
                },
            }
        )
            .then(res => res.json())
            .then(data => data.map(element => element.login))
            .then(data => data.map(element => element))
            .then(data => setAllUsers(data.map(e => {
                return <option value={e}>{e}</option>
            })))

    }, []);

    const deleteUser = () => {
        params.parentMessageCallback(<p className='messageFailed'>Please choose user to delete</p>);
        if (selectedUser !== null) {
            fetch(`http://localhost:8080/api/users/${selectedUser}`, {
                    method: 'DELETE',
                    headers: {
                        "accept": "*/*",
                        "Content-Type": "application/json",
                        "Authorization": APIKey,
                    },
                }
            )
                .then(() => {
                    fetch('http://localhost:8080/api/responsible-users', {
                            method: 'GET',
                            headers: {
                                "accept": "*/*",
                                "Content-Type": "application/json",
                                "Authorization": APIKey,
                            },
                        }
                    )
                        .then(res => res.json())
                        .then(data => data.filter(element => element.name === selectedUser))
                        .then(data => data.map(element => element.id))
                        .then(data => fetch(`http://localhost:8080/api/responsible-users/${data[0]}`, {
                                method: 'DELETE',
                                headers: {
                                    "accept": "*/*",
                                    "Content-Type": "application/json",
                                    "Authorization": APIKey,
                                },
                            }
                        ))
                });
            setSelectedUser(null)
            params.parentMessageCallback(<p className='messageSuccess'>User deleted.</p>)
        }
    };

    const handleChange = (e) => {
        setSelectedUser(e.target.value)
    };

    return (
        <>
            <select className="form-control" onChange={handleChange}>
                <option value="" selected disabled>Select user</option>
                {allUsers}
            </select>
            <button className='confirmButton' onClick={deleteUser}>
                Confirm
            </button>
        </>
    );
};


