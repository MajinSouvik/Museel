// http://localhost:8000/auth/api/token/

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { login, logout, refreshAccessToken } from '../redux/authSlice'; // Import Redux actions
import store from '../redux/appStore'; // Your Redux store
import { API } from '../utils/constants';

export const registerUser = async (username, email, profilePic, password, confirmPassword) => {
  try {
    const response = await axios.post(API + "auth/register/", {
      username,
      email,
      profilePic,
      password,
      confirmPassword
    });

    if (response.status === 201) {
      // Registration successful, return true
      return true;
    } else {
      // Any other status indicates failure, return false
      return false;
    }
  } catch (error) {
    console.log("login error-->", error);
    return false; // Return false on error (e.g., network issues or validation errors)
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API + "auth/api/token/", { username, password });
    const { access_token, refresh_token, user } = response.data;
    console.log("decoded_token-->", jwtDecode(access_token))
    console.log("authService-->", response.data)
    // Dispatch login action to Redux store
    store.dispatch(login(response.data));
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  // Dispatch logout action to Redux store
  store.dispatch(logout());
};

export const getAccessToken = () => {
  const state = store.getState();
  console.log("state==>",state.auth.auth.access_token)
  return state.auth.auth.access_token;
};

export const isAuthenticated = () => {
    const token = getAccessToken();
    if (!token) return false;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 > Date.now(); // Check if the token has expired
    } catch (e) {
      return false;
    }
  };


// export const getRefreshToken = () => {
//   const state = store.getState();
//   return state.auth.refresh_token;
// };

// export const isTokenExpired = (token) => {
// //   const decodedToken = jwt_decode(token);
// //   return decodedToken.exp * 1000 < Date.now();
// };

// export const refreshToken = async () => {
//   try {
//     const refresh = getRefreshToken();
//     const response = await axios.post(`${API_URL}token/refresh/`, { refresh });
//     const { access } = response.data;

//     // Dispatch refreshAccessToken action to Redux store
//     store.dispatch(refreshAccessToken({ access }));

//     // return jwt_decode(access); // Return the decoded token
//   } catch (error) {
//     throw error;
//   }
// };

