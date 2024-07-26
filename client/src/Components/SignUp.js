import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(){

  const history = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:8000/auth/register/", {
        username: inputs.username,
        password: inputs.password,
        password2:inputs.confirmPassword
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log("Registered Data-->**", data)
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // send http request
    sendRequest().then(() => history("/login"));
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
          <Typography variant="h2">Signup</Typography>

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

        <TextField
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={inputs.confirmPassword}
            variant="outlined"
            placeholder="Confirm Password"
            margin="normal"
          />

          <Button variant="contained" type="submit">
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;