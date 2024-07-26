import {createSlice} from "@reduxjs/toolkit"

const musicSlice=createSlice({
    name:"music",

    initialState:{
        music:{}
    },

    reducers:{
        uploadMusic:(state,action)=>{
          state.music=action.payload  
        }
    }
})

export const {uploadMusic}=musicSlice.actions
export default musicSlice.reducer

