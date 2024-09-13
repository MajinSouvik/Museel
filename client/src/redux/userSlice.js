import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",

    initialState:{
        // user: localStorage.getItem("user"),
        // userID: localStorage.getItem("user_id")
    },

    reducers:{
        setUser:(state,action)=>{
            return action.payload
            // state.user=action.payload
        },

        removeUser:(state)=>{
            return null
        }


        // setUserID:(state,action)=>{
        //     state.userID=action.payload
        // }
    }
})

export const {setUser, removeUser}=userSlice.actions
export default userSlice.reducer

