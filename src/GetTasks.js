import React, {useEffect, useState} from 'react';
import {SelectResponsibleUser} from "./SelectResponsibleUser";
import {MarkTask} from "./MarkTask";
import './css/tasks.css';

export const GetTasks = (params) => {

    const [tasks, setTasks] = useState([]);
    const [selectedUserFlag, setSelectedUserFlag] = useState(false);
    const [deleteTaskFlag, setDeleteTaskFlag] = useState(false);

    const deleteTask = (taskId) => {
        const APIKey = `Bearer ${params.userToken}`;

        fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    "accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": APIKey,
                },
            }
        )
            .then(() => setDeleteTaskFlag(!deleteTaskFlag))

    };

    useEffect(() => {

        const APIKey = `Bearer ${params.userToken}`;
        const res = fetch('http://localhost:8080/api/tasks', {
                method: 'GET',
                headers: {
                    "accept": "*/*",
                    Authorization: APIKey,
                },
            }
        )
            .then((res) => res.json())
            .then(data => data.filter(element => {
                if (params.isAdmin) {
                    return element;
                } else if (element.responsibleUserName !== null)return element.responsibleUserName.toLowerCase() === `${params.currentUser.login}`
            }))
            .then(data => setTasks(data.map((d) => {
                if (params.isAdmin) {
                    return (
                        <tr>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            {d.responsibleUserName === 'Finished' &&
                            <td className='finishedTask'>{d.responsibleUserName}</td>
                            }
                            {d.responsibleUserName === 'Abandoned' &&
                            <td className='abandonedTask'>{d.responsibleUserName}</td>
                            }
                            {d.responsibleUserName !== 'Abandoned' && d.responsibleUserName !== 'Finished' &&
                            <td>{d.responsibleUserName}</td>
                            }
                            <SelectResponsibleUser parentSelectedCategoryCallback={parentSelectCategoryFlagCallback}
                                                       userToken={params.userToken} name={d.name} id={d.id}
                                                       responsibleUserName={d.responsibleUserName}/>
                            <td>
                                <button className='deleteTaskButton' onClick={() => deleteTask(d.id)}>
                                    Delete task
                                </button>
                            </td>
                        </tr>
                    );
                } else return (
                    <tr>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td><MarkTask parentSelectedCategoryCallback={parentSelectCategoryFlagCallback}
                                      userToken={params.userToken} name={d.name} id={d.id}
                                      responsibleUserName={d.responsibleUserName}/></td>
                    </tr>
                )
            })))

    }, [params.userToken, params.isAdmin, params.addTaskFlag, selectedUserFlag, deleteTaskFlag]);

    const parentSelectCategoryFlagCallback = (selectedUserFlag) => {
        setSelectedUserFlag(selectedUserFlag);
    };

    return (
        <>
            <div className="table-responsive">
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Task Id</th>
                        <th>Name</th>
                        {params.isAdmin &&
                        <>
                            <th>Responsible user</th>
                        </>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {tasks}
                    </tbody>
                </table>
            </div>
        </>
    )
};
