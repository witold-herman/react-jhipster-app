import React, {useEffect} from 'react';

export const CurrentUser = (params) => {

    useEffect(() => {
        const APIKey = `Bearer ${params.userToken}`;
        fetch(`http://localhost:8080/api/users/${params.role}`, {
                method: 'GET',
                headers: {
                    "accept": "*/*",
                    Authorization: APIKey,
                },
            }
        )
            .then((response) => response.json())
            .then(data => params.parentCallback(data))


    },[params.userToken, params.role]);

    return (
        <>
        </>
    )
};
