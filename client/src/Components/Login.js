import React, { useState } from 'react';
import { loginUser, logoutUser } from '../services/authService';
import {useNavigate} from "react-router-dom"

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleLogin = async () => {
    try {
      await loginUser(username, password);
      // console.log('User logged in:', user);
      console.log("navigating to App...")
      navigate("/")
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    console.log('User logged out');
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginComponent;
