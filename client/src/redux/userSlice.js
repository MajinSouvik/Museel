import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",

    initialState:{
        user: localStorage.getItem("user"),
        userID: localStorage.getItem("user_id")
    },

    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },

        setUserID:(state,action)=>{
            state.userID=action.payload
        }
    }
})

export const {setUser,setUserID}=userSlice.actions
export default userSlice.reducer

