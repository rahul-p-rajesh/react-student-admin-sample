import React, { useEffect, useState } from 'react';
import classes from './StudentLayout.module.css'
import LogOut from '../components/LogOut/LogOut'
import FormStudent from '../components/Student/FormStudent';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "backgroundColor": 'rgba(255, 136, 130, 0.7)',
        'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'backdrop-filter': 'blur(15.5px)',
        // -webkit - backdrop - filter: blur(15.5px),
        'border-radius': '10px',
        'border': '1px solid rgba(255, 255, 255, 0.18)',
    },
}));


const StudentLayout = (props) => {

    const templateClass = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [prefetchData, setprefetchData] = useState(
        {
            id: "",
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            gender: ""
        })


    useEffect(() => {
        console.log("get form details");
        console.log("userName " + localStorage.getItem('userName'));
        fetch('http://localhost:5000/api/student/' + localStorage.getItem('userName'),
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result.firstName)
                    setprefetchData(result)
                },
                (error) => {
                    console.log(error.message)
                }
            )
    }, [])

    let ShowDetails = (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="standard-required"
                        label="Roll No"
                        value={prefetchData.id}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="standard-required"
                        label="User Name"
                        value={prefetchData.userName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="standard-required"
                        label="first Name"
                        value={prefetchData.firstName}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="standard-required"
                        label="Last Name"
                        value={prefetchData.lastName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="standard-required"
                        label="Phone Number"
                        value={prefetchData.phoneNumber}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="standard-required"
                        label="Gender"
                        value={prefetchData.gender}
                    />
                </Grid>
            </Grid>
        </div>
    )
    return (
        <div>
            <div className={classes.Card}>
                <h1>Student Portal</h1>
            </div>
            <div className={classes.MainContainer}>
                <div className={classes.FeedContiner}>
                    <div>
                        <h3>Hello</h3>
                        <h3>{props.userName}</h3>
                    </div>
                    <LogOut />
                </div>
                <div className={classes.DataContiner}>
                    <div className={templateClass.root}>
                        <AppBar position="static">
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Basic Details" {...a11yProps(0)} />
                                <Tab label="Edit Details" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <div className={classes.basicDetailContainer}>
                                {ShowDetails}
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className={classes.basicDetailContainer}>
                                <FormStudent fetchData={prefetchData} />
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default StudentLayout;