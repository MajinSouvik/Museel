import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService'; // Import your service
import { v4 } from 'uuid';
import { storage } from '../firebase'; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [file, setFile] = useState(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const uploadImageToFirebase = async (imageFile) => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `upload/${imageFile.name + v4()}`);
    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let profilePicURL = null;
    if (file) {
      profilePicURL = await uploadImageToFirebase(file);
    }

    const registrationSuccess = await registerUser(username, email, profilePicURL, password, confirmPassword);

    if (registrationSuccess) {
      navigate('/login'); // Redirect to login on success
    } else {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center relative bg-[url('https://source.unsplash.com/1600x900/?travel')]">

      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-60"></div>

      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Museel</h1>


        <input
          ref={usernameRef}
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 mb-4"
        />


        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 mb-4"
        />

  
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 mb-4"
        />


        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 mb-4"
        />


        <div className="flex items-center justify-center mb-4">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full shadow-md object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <label className="w-full cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-full bg-blue-500 text-white p-2 rounded-lg text-center cursor-pointer">
            Upload Profile Picture
          </div>
        </label>


        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white font-bold p-3 rounded-lg mt-4 hover:bg-teal-600 transition"
        >
          Sign Up
        </button>

  
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
