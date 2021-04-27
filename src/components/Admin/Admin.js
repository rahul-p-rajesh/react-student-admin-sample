import React, { useState, useEffect } from 'react';
import AdminTable from './table/AdminTable'

import classes from "./Admin.module.css"
import AddIcon from '@material-ui/icons/Add';

import PopUpButton from './PopUp/PopUp'
import StudentForm from './formCard/StudentForm'
import LogOut from '../LogOut/LogOut'

function Admin() {

    const [tableIsLoading, setTableIsLoading] = useState(false);

    const [tableDatas, setTableDatas] = useState([])

    const [addPopUpOpen, setAddPopUpOpen] = React.useState(false);


    const addPopUpClickOpen = () => {
        setAddPopUpOpen(true);
    };

    const addPpopUpClose = () => {
        setAddPopUpOpen(false);
    };

    function tableLoadingHandler() {
        setTableIsLoading(true);
    }

    useEffect(() => {
        console.log("table refrres")
        fetch(' http://localhost:5000/api/admin'
        ).then((responce) => {
            return responce.json();
        }).then((data) => {
            setTableIsLoading(false);
            setTableDatas(data)

        })
    }, [tableIsLoading])

    return (
        <div>
            <div className={classes.actionContainer}>
                <div>
                    <PopUpButton
                        icon={<AddIcon />}
                        variant={"contained"}
                        color={"primary"}
                        open={addPopUpOpen}
                        handleClickOpen={addPopUpClickOpen}
                        handleClose={addPpopUpClose}
                        form={<StudentForm close={addPpopUpClose} loadTable={tableLoadingHandler} />}
                    />
                </div>
                <div>
                    <LogOut />
                </div>
            </div>
            <div>
                <AdminTable
                    loadTable={tableLoadingHandler}
                    tableData={tableDatas} />
            </div>
        </div>
    )

}

export default Admin;