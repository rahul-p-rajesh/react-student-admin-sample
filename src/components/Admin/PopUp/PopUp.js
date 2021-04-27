import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import classes from './PopUp.module.css';

export default function PopUp(props) {
    return (
        <div classname={classes.container}>
            <Button variant={props.variant} color={props.color} onClick={props.handleClickOpen}>
                {props.icon}
            </Button>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                maxWidth={"md"}>

                <DialogContent>
                    {props.form}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
