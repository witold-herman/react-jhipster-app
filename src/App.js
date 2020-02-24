import React, {useState} from 'react';
import {Auth} from './Auth';
import {AddTask} from "./AddTask";
import {IsAuthenticated} from "./IsAuthenticated";
import {SignOut} from "./SignOut";
import {GetTasks} from "./GetTasks";
import './css/login.css';
import {NewUser} from "./NewUser";
import {DeleteUser} from "./DeleteUser";
import './css/functionalButtons.css'

export const App = () => {
    const [userToken, setUserToken] = useState('none');
    const [userProps, setUserProps] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [addTaskFlag, setAddTaskFlag] = useState(false);
    const [addTaskButton, setAddTaskButton] = useState(false);
    const [createUserButton, setCreateUserButton] = useState(false);
    const [deleteUserButton, setDeleteUserButton] = useState(false);
    const [functionalButtonStyle] = useState(['functionalButton', 'functionalButton', 'functionalButton']);
    const [message, setMessage] = useState('');


    const userTokenCallback = (userToken) => {
        setUserToken(userToken)
    };

    const userPropsCallback = userProps => {
        setUserProps(userProps)
    };

    const signOutCallback = (userProps, userToken) => {
        setUserProps(userProps);
        setUserToken(userToken)
    };

    const parentIsAdminCallback = (isAdmin) => {
        setIsAdmin(isAdmin);
    };

    const parentAddTaskFlagCallback = (addTaskFlag) => {
        setAddTaskFlag(addTaskFlag);
    };

    const parentMessageCallback = (message) => {
        setMessage(message);
    };

    const handleAddTaskButton = () => {
        setAddTaskButton(!addTaskButton);
        if (!addTaskButton) {
            functionalButtonStyle[0] = 'functionalButtonClicked'
        } else {
            functionalButtonStyle[0] = 'functionalButton'
        }
    };

    const handleCreateUserButton = () => {
        setCreateUserButton(!createUserButton);
        if (!createUserButton) {
            functionalButtonStyle[1] = 'functionalButtonClicked'
        } else {
            functionalButtonStyle[1] = 'functionalButton'
        }
    };

    const handleDeleteUserButton = () => {
        setDeleteUserButton(!deleteUserButton);
        if (!deleteUserButton) {
            functionalButtonStyle[2] = 'functionalButtonClicked'
        } else {
            functionalButtonStyle[2] = 'functionalButton'
        }
    };

    return (

        <div>
            {(userToken === 'none' || userToken === undefined) && (
                <Auth parentCallback={userTokenCallback}/>
            )}
            {(userToken !== 'none' && userToken !== undefined) && (
                <>
                    <div className='loggedContainer'>
                        <IsAuthenticated parentUserPropsCallback={userPropsCallback}
                                         parentIsAdminCallback={parentIsAdminCallback}
                                         userToken={userToken}
                        />
                        <SignOut parentCallback={signOutCallback}/>
                    </div>
                    {(userProps !== null) &&
                    <GetTasks userToken={userToken}
                              addTaskFlag={addTaskFlag}
                              isAdmin={isAdmin}
                              currentUser={userProps}
                    />
                    }
                    {isAdmin &&
                    <div className='functionalButtonsContainer'>
                        {message}
                        <button className={functionalButtonStyle[0]} onClick={handleAddTaskButton}>
                            Add task
                        </button>
                        <br/>
                        {addTaskButton &&
                        <>
                            <AddTask parentAddTaskFlagCallback={parentAddTaskFlagCallback}
                                     userToken={userToken}
                                     parentMessageCallback={parentMessageCallback}
                            />
                            <br/>
                        </>
                        }
                        <button className={functionalButtonStyle[1]}
                                onClick={handleCreateUserButton}>
                            Add user
                        </button>
                        <br/>
                        {createUserButton &&
                        <>
                            <NewUser userToken={userToken}
                                     parentMessageCallback={parentMessageCallback}
                            />
                            <br/>
                        </>
                        }
                        <button className={functionalButtonStyle[2]}
                                onClick={handleDeleteUserButton}>
                            Delete user
                        </button>
                        <br/>
                        {deleteUserButton &&
                        <>
                            <DeleteUser userToken={userToken}
                                        parentMessageCallback={parentMessageCallback}
                            />
                            <br/>
                        </>
                        }
                    </div>
                    }

                </>
            )}
        </div>
    )
};


