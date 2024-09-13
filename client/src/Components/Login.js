import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../redux/authSlice"
import {setUser} from "../redux/userSlice"

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/auth/api/token/", {
        username: inputs.username,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send http request
  sendRequest()
      .then((data) => {
        console.log("login-data-->",data)
        const authTokens={
          "access":data.access_token,
          "refresh":data.refresh_token
        }
        dispatch(login(authTokens))
        dispatch(setUser(data.user))
        // localStorage.setItem("token",data.access_token)
        // localStorage.setItem("refresh",data.refresh_token)
        // localStorage.setItem("user_id",data.user.id)
        
        // localStorage.setItem("user",data.user.username)
        // console.log("BiggBoss-->",localStorage);
        // dispatch(login())
        // dispatch(setUser(data.user.username))
        // dispatch(setUserID(data.user.id))
      })
      .then(() => history("/"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
        >
            <Typography variant="h2">Login</Typography>

            <TextField
                name="username"
                onChange={handleChange}
                value={inputs.username}
                variant="outlined"
                placeholder="Username"
                margin="normal"
            />

            <TextField
                name="password"
                onChange={handleChange}
                type="password"
                value={inputs.password}
                variant="outlined"
                placeholder="Password"
                margin="normal"
            />

            <Button variant="contained" type="submit">
                Login
            </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;