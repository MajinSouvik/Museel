import axios from 'axios';
import { login, logout } from '../redux/authSlice'; 
import store from '../redux/store'; 
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(API + "auth/api/token/", { username, password });
    store.dispatch(login(response.data));
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  store.dispatch(logout());
};

export const getAccessToken = () => {
  const state = store.getState();
  return state.auth.auth.access_token;
};

export const verifyToken=async(token)=>{
  try {
    const response = await axios.post(API+'auth/api/token/verify/', {
      token: token,
    });
    
    if(response.status===200){
      return true
    }
    return false
  } catch (error) {
    return false
  }
}


export const isAuthenticated = () => {
    const token = getAccessToken();
    const state = store.getState();
    if (!token) return false;
  
    try {
      if(verifyToken(token)){
        return true
      }
      return false
    } catch (e) {
      return false;
    }
  };


export const getRefreshToken = () => {
  const state = store.getState();
  return state.auth.auth.refresh_token;
};

