import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto 10%',

        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));


function FormCard(props) {
    //props --> inputs
    //props --> handler method
    console.log(props.preData)
    const classes = useStyles();
    let enteredUserName = "";
    let enteredFirstName = "";
    let enteredLastName = "";
    let enteredEmail = "";
    let enteredPhoneNumber = "";
    let enteredGender = "";
    let enteredPassword = "";
    function submitHandler(event) {
        event.preventDefault();


        const credentials = {
            userName: enteredUserName,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            gender: enteredGender,
            password: enteredPassword,
            userType: "student"

        }
        console.log(credentials)
        fetch('http://localhost:5000/api/admin',
            {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result.message) {
                        alert(result.message)
                    } else {
                        alert("student added")
                        props.loadTable();
                        props.close();
                    }

                },
                (error) => {
                    console.log(error.message)
                }
            )
    }

    return (

        <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        onChange={(event) => { enteredUserName = event.target.value }}
                        label="User Name"
                        autoFocus

                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        onChange={(event) => { enteredFirstName = event.target.value }}
                        label="first Name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="lastName"
                        label="last Name"
                        id="lastName"
                        onChange={(event) => { enteredLastName = event.target.value }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        id="email"
                        onChange={(event) => { enteredEmail = event.target.value }}
                    />

                </Grid>
                <Grid item xs={5}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        id="phoneNumber"
                        onChange={(event) => { enteredPhoneNumber = event.target.value }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="gender"
                        label="Gender "
                        id="gender"
                        onChange={(event) => { enteredGender = event.target.value }}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="password "
                        id="password"
                        onChange={(event) => { enteredPassword = event.target.value }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default FormCard;