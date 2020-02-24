import React, {useEffect, useState} from 'react';

export const ResponsibleUserOptions = (params) => {

    const [allUsers, setAllUsers] = useState([]);
    const APIKey = `Bearer ${params.userToken}`;

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
            .then(data => data.filter(element => element.name
            ))
            .then(data => data.map(element => element.name))
            .then(data => setAllUsers(data.map(e => {
                return <option value={e}>{e}</option>
            })))

    },[]);

    return (
        <>
            {allUsers}
        </>
    )
};
