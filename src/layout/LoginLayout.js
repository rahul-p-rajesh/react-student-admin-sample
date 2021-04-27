import { useHistory } from 'react-router-dom'
import Login from '../components/Login/Login'

const LoginLayout = (props) => {
    const history = useHistory();
    let loginSucess = false;
    let userType = null;

    async function verifyLogin(credentials) {
        await fetch('http://localhost:5000/api/login/loginuser',
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
                    if (result.token) {
                        getCredentials(result.token);
                    } else {
                        alert(result.message)
                    }
                },
                (error) => {
                    console.log(error.message)
                }
            )
    }

    async function getCredentials(token) {
        await fetch(' http://localhost:5000/api/login/verifycredential',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    props.tokenHandler({
                        token: token
                    })
                    props.UserHandler({
                        userName: result.userName,
                        userType: result.userType
                    })
                    loginSucess = true;
                    userType = result.userType
                },
                (error) => {
                    console.log(error.message)
                }
            ).then(
                () => {
                    if (loginSucess && userType === "student") {
                        history.replace('/student')

                    } else if (loginSucess && userType === "admin") {
                        history.replace('/admin')
                    }
                }

            )
    }
    return (
        <div>
            <Login loginHandler={verifyLogin} />
        </div>
    )
}

export default LoginLayout;