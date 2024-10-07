import React, { useState } from 'react';
import { loginUser } from '../services/authService'; 
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center relative bg-[url('https://source.unsplash.com/1600x900/?urban')]">

      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-60"></div>

      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Museel</h1>

     
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />


        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />


        <button
          onClick={handleLogin}
          className="w-full bg-teal-500 text-white font-bold p-3 rounded-lg mt-4 hover:bg-teal-600 transition"
        >
          Log In
        </button>


        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
