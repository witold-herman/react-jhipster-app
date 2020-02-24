import React, {useEffect, useState} from 'react';
import {ResponsibleUserOptions} from "./ResponsibleUserOptions";
import './css/responsibleUser.css'

export const SelectResponsibleUser = (params) => {

    const [selectedUser, setSelectedUser] = useState('');
    const [responsibleUserId, setResponsibleUserId] = useState();
    const APIKey = `Bearer ${params.userToken}`;
    const [flag, setFlag] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    const updateTask = () => {
        if (selectedUser !== '') {
            fetch(`http://localhost:8080/api/tasks`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        id: params.id,
                        name: `${params.name}`,
                        responsibleUserId: responsibleUserId,
                        responsibleUserName: `${selectedUser}`,
                    }),
                    headers: {
                        "accept": "*/*",
                        "Content-Type": "application/json",
                        "Authorization": APIKey,
                    },
                }
            )
                .then(() => setFlag(!flag))
                .then(() => params.parentSelectedCategoryCallback(!flag));
        }
    };

    const setAllUsersCallback = allUsers => {
        setAllUsers(allUsers)
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/responsible-users`, {
                method: 'GET',
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": APIKey,
                },
            }
        )
            .then(response => response.json())
            .then(data => data.filter(element => {
                    return selectedUser === element.name
                }
            ))
            .then(data => data.map(element => element.id))
            .then((data) => setResponsibleUserId(data[0]))
    }, [selectedUser]);

    const handleChange = e => {
        setSelectedUser(e.target.value)

    };

    return (
        <>
            <td>
                <select className="form-control" onChange={handleChange}>
                    <option value="" selected disabled>Select user</option>
                    <ResponsibleUserOptions userToken={params.userToken} setAllUsersCallback={setAllUsersCallback}/>
                </select>
            </td>
            <td>
                <button className='updateUserButton' onClick={updateTask}>
                    Update user
                </button>
            </td>
        </>
    )
};
