import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",

    initialState:{
        // isLoggedIn: localStorage.getItem("token"),
        // refresh:localStorage.getItem("refresh")
    },

    reducers:{
        login:(state,action)=>{
            return action.payload
            // state.isLoggedIn=localStorage.getItem("token")
            // state.refresh=localStorage.getItem("refresh")
        }
    }
})


export const {login}=authSlice.actions
export default authSlice.reducer

