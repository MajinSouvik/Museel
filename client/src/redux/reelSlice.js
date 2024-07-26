import {createSlice} from "@reduxjs/toolkit"

const reelSlice=createSlice({
    name:"reels",

    initialState:{
        reels:[]
    },

    reducers:{
        upload:(state,action)=>{
            state.reels=action.payload
        }
    }
})
export const {upload}=reelSlice.actions
export default reelSlice.reducer

