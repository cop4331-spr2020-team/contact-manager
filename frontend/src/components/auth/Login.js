import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function Login ()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const [isLogin, setLogin] = useState(false);
    const [isError, setError] = useState(false);

    function getLogin() {
        if ((username == "") || (password == "")) { // if submitted without any input give error
            setError(true);
            setErrorMsg("Invalid Username/Password");
            return;
        }
        // in user-router "/login" route uses get, but i couldnt make it work so i changed to put instead
        // Retrieve user from backend
        axios.put("/auth/login", {
            username,
            password
        }
        ).then(result => {
          if (result.status === 200) {
            console.log(result.data);
                                  // Token needs to be stored
            setLogin(true);
          } else {
            setError(true);
            setErrorMsg("Invalid Username/Password");
            setUsername("");
            setPassword("");
          }
        }).catch(e => {
          setError(true);
          setErrorMsg("Invalid Username/Password");
          setUsername("");
          setPassword("");
        });

      }

      if (isLogin) {
          return <Redirect to="/"/> // Redirect after login
      }


      const handleUsername = (event) => {
        if(setError) {
            setErrorMsg("");
            setError(false);
        }
        setUsername(event.target.value);
      }
      const handlePassword = (event) => {
        if(setError) {
            setErrorMsg("");
            setError(false);
        }
        setPassword(event.target.value);
      }


        return(
            <Form className="login">
                <FormGroup>
                    <Label>Username</Label>
                    <Input
                        className="input"
                        type="text"
                        value={username}
                        onChange={handleUsername}
                        invalid = {isError}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        className="input"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        invalid = {isError}
                    />
                </FormGroup>
                <Label>{errorMsg}</Label>
                <Button className="btn-lg btn-dark btn-block" onClick={getLogin} >
                    Login</Button>

                <div  className="p-2">
                    <Link to="/register">Sign Up</Link> {/*needs to be linked*/}
                </div>
            </Form>
        );

};

export default Login;
