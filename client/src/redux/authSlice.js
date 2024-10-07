import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",

    initialState:{
        auth:localStorage.getItem("access")?{
            "access_token":localStorage.getItem("access"),
            "refresh_token":localStorage.getItem("refresh"),
            "user":{
                "id":localStorage.getItem("id"),
                "username":localStorage.getItem("username"),
                "profilePic":localStorage.getItem("profilePic")
            }
        }:{}
    },
    reducers:{
        login:(state,action)=>{
            state.auth=action.payload
            localStorage.setItem('access', action.payload.access_token);
            localStorage.setItem('refresh', action.payload.refresh_token);
            localStorage.setItem("id", action.payload.user.id)
            localStorage.setItem("username", action.payload.user.username)
            localStorage.setItem("profilePic", action.payload.user.profilePic)
        },

        logout:(state)=>{
            state.auth=null
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('profilePic');
        },

        refreshAccessToken: (state, action) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            
            state.auth.access_token= action.payload.tokens.access;
            state.auth.refresh_token= action.payload.tokens.refresh;

            localStorage.setItem('access', action.payload.tokens.access);
            localStorage.setItem('refresh', action.payload.tokens.refresh);
          },
    }
})


export const {login, logout, refreshAccessToken}=authSlice.actions
export default authSlice.reducer

