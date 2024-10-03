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


    // {
    //     "username": "megha",
    //     "email": "megha@gmail.com",
    //     "profilePic": "https://firebasestorage.googleapis.com/v0/b/museel-972fc.appspot.com/o/upload%2F6300823491632545849.jpgac7ffe04-85cd-4ba2-b5ef-1b3ef07670b4?alt=media&token=81daa428-067d-4931-b1f4-f2f44689047a"
    // }



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
        }
    }
})


export const {login, logout}=authSlice.actions
export default authSlice.reducer

