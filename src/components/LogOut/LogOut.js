import React from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function LogOut() {
    const history = useHistory();

    function logoutClickHandler() {
        localStorage.clear();
        history.replace('/')

    }
    return (
        <div>
            <Button color="primary"
                onClick={logoutClickHandler}>
                Log Out<ExitToAppIcon />
            </Button>
        </div>
    )
}

export default LogOut
