import React, {useEffect, useState} from 'react';
import './css/markButtons.css'

export const MarkTask = (params) => {

    const [selectedUser, setSelectedUser] = useState('');
    const APIKey = `Bearer ${params.userToken}`;
    const [flag, setFlag] = useState(false);

    const markAsFinished = () => {

        fetch(`http://localhost:8080/api/tasks`, {
                method: 'PUT',
                body: JSON.stringify({
                    responsibleUserId: 26703,
                    responsibleUserName: `Finished`,
                    id: params.id,
                    name: `${params.name}`,
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

    };

    const markAsAbandoned = () => {

        fetch(`http://localhost:8080/api/tasks`, {
                method: 'PUT',
                body: JSON.stringify({
                    responsibleUserId: 31503,
                    responsibleUserName: `Abandoned`,
                    id: params.id,
                    name: `${params.name}`,
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
    }, [selectedUser]);

    return (
        <>
            <td>
                <button className='finishedButton' onClick={markAsFinished}>
                    Task finished
                </button>
            </td>
            <td>
                <button className='abandonedButton' onClick={markAsAbandoned}>
                    Abandon task
                </button>
            </td>
        </>
    )
};
