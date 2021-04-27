import { React, useState, useEffect } from 'react';
import classes from './FormStudent.module.css'

function FormStudent(props) {
    const [enteredUserName, setEnteredUserName] = useState("")
    const [enteredFirstName, setEnteredFirstName] = useState("")
    const [enteredLastName, setEnteredLastName] = useState("")
    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("")
    const [enteredGender, setEnteredGender] = useState("")

    useEffect(() => {
        setEnteredUserName(props.fetchData.userName)
        setEnteredFirstName(props.fetchData.firstName)
        setEnteredLastName(props.fetchData.lastName)
        setEnteredEmail(props.fetchData.email)
        setEnteredPhoneNumber(props.fetchData.phoneNumber)
        setEnteredGender(props.fetchData.gender)
    }, [])

    function submitHandler(event) {
        event.preventDefault();
        const credentials = {
            Id: props.fetchData.id,
            userName: enteredUserName,
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            phoneNumber: enteredPhoneNumber,
            gender: enteredGender,
            userType: "student",
        }
        console.log("credential are")
        console.log(credentials)
        fetch('http://localhost:5000/api/student',
            {
                method: 'PUT',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    alert(result.message)
                    if (props.loadTableMethod) {
                        props.loadTableMethod()
                    }
                },
                (error) => {
                    console.log(error.message)
                }
            )
    }
    return (
        <div className={classes.MainContainer}>
            <form onSubmit={submitHandler}>
                <div class="container ">
                    <div class="row mb-4">
                        <div class="col">

                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="userName"
                                    aria-describedby="emailHelp"
                                    value={enteredUserName}
                                    readonly
                                    onChange={(event) => setEnteredUserName(event.target.value)}
                                ></input>
                                <label for="userName" class="form-label">User Name</label>
                            </div>

                        </div>
                        <div class="col">
                            <div class="form-floating">
                                <input type="email"
                                    class="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    value={enteredEmail}
                                    onChange={(event) => setEnteredEmail(event.target.value)}
                                ></input>
                                <label for="email" class="form-label">Email</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="firstName"
                                    aria-describedby="emailHelp"
                                    value={enteredFirstName}
                                    onChange={(event) => setEnteredFirstName(event.target.value)}

                                ></input>
                                <label for="firstName" class="form-label">FirstName</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating">
                                <input
                                    type="text"
                                    class="form-control"
                                    id="lastName"
                                    aria-describedby="emailHelp"
                                    value={enteredLastName}
                                    onChange={(event) => setEnteredLastName(event.target.value)}

                                ></input>
                                <label for="lastName" class="form-label">Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-floating">

                                <input type="text"
                                    class="form-control"
                                    id="phoneNumber"
                                    aria-describedby="emailHelp"
                                    value={enteredPhoneNumber}
                                    onChange={(event) => setEnteredPhoneNumber(event.target.value)}
                                ></input>
                                <label for="phoneNumber" class="form-label">Phone Number</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating">

                                <input type="text"
                                    class="form-control"
                                    id="gender"
                                    aria-describedby="emailHelp"
                                    value={enteredGender}
                                    onChange={(event) => setEnteredGender(event.target.value)}
                                ></input>
                                <label for="gender" class="form-label">Gender</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-danger btn-block btn-sm">Edit Details</button>
            </form>

        </div>
    )
}

export default FormStudent
