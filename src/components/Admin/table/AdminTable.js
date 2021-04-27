//style
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
//import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { useState } from 'react'
import PopUpButton from '../PopUp/PopUp'
import Modal from '../PopUp/Modal'

import EditStudentForm from '../formCard/EditStudentForm'
import classes from './AdminTable.module.css'
import FormStudent from '../../Student/FormStudent'

const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1
}


function AdminTable(props) {


    const [isOpen, setIsOpen] = useState(false)
    const [rowData, setRowData] = useState();
    function editPressHandler(data) {
        props.loadTable();
        setIsOpen(true)
        setRowData(data)

    }
    let data = null;
    if (props.tableData) {
        data = (props.tableData.map((data) => {
            return (
                <TableRow key={data.id} className={classes.tableText}>
                    <TableCell >{data.id}</TableCell>
                    <TableCell>{data.userName}</TableCell>
                    <TableCell>{data.firstName}</TableCell>
                    <TableCell>{data.lastName}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.phoneNumber}</TableCell>
                    <TableCell>{data.gender}</TableCell>
                    <TableCell >
                        <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    editPressHandler(data)
                                }}>
                                <EditIcon />
                            </Button>
                        </div>
                    </TableCell>
                    <TableCell >
                        <Button
                            variant="danger"
                            onClick={() => deleteData(data.id)}
                        ><DeleteForeverIcon />
                        </Button>
                    </TableCell>
                </TableRow>
            )
        }))
        console.log(data);
    } else {
        props.setIsLoading(false);
    }

    function deleteData(id) {
        console.log(id)
        fetch('http://localhost:5000/api/admin/' + id,
            {
                method: 'DELETE',
            }
        ).then(
            () => {
                console.log("delete done")
                props.loadTable();
            },
            (error) => {
                console.log(error.message)
            }
        )
    }

    return (

        <div>
            <div>
                <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                    {/* <EditStudentForm close={() => setIsOpen(false)} preData={data.id} /> */}
                    <FormStudent fetchData={rowData} />
                </Modal>
            </div>
            <Container maxWidth="lg"  >
                <Table aria-label="simple table" className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow >
                            <TableCell >Roll No</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {data}
                    </TableBody>
                </Table >
            </Container>
        </div>
    )

}

export default AdminTable;