import React, {useState} from "react";
import './css/functionalButtons.css'

export const AddTask = (params) => {

    const [taskName, setTaskName] = useState('');
    const [flag, setFlag] = useState(false);

    async function fetchData() {
        params.parentMessageCallback(<p className='messageFailed'>Adding task failed. Please insert task name.</p>);
        if (taskName !== '') {
            const APIKey = `Bearer ${params.userToken}`;
            const res = fetch('http://localhost:8080/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify({name: `${taskName}`, responsibleUserName: `admin`}),
                    headers: {
                        "accept": "*/*",
                        "Content-Type": "application/json",
                        "Authorization": APIKey,
                    },
                }
            ).then(() => setFlag(!flag))
                .then(() => params.parentAddTaskFlagCallback(!flag))
                .then(() => params.parentMessageCallback(<p className='messageSuccess'>Task added succesfully</p>));
            return res;
        }
    }

    function handleNameInput(e) {
        setTaskName(e.target.value);
    }

    return (
        <div>
            <input placeholder='New task name' onChange={handleNameInput}/>
            <button className='confirmButton' onClick={fetchData}>
                Confirm
            </button>
        </div>
    )
};
