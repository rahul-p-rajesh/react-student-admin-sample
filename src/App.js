import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//layouts
import LoginLayout from './layout/LoginLayout';
import AdminLayout from './layout/AdminLayout'
import StudentLayout from './layout/StudentLayout'
import './App.css';


function App() {
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    userName: "",
    userType: ""
  });
  localStorage.setItem('userName', user.userName);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <LoginLayout tokenHandler={setToken} UserHandler={setUser} />
          </Route>
          <Route path="/admin">
            <AdminLayout />
          </Route>
          <Route path="/student">
            <StudentLayout userName={localStorage.getItem('userName')} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
