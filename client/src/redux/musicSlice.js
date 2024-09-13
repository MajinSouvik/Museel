import {createSlice} from "@reduxjs/toolkit"

const musicSlice=createSlice({
    name:"music",

    initialState:{
        music:{},
        songs:[]
    },

    reducers:{
        uploadMusic:(state,action)=>{
          state.music=action.payload  
        },

        setSongs:(state, action)=>{
            state.songs=action.payload
        }
    }
})

export const {uploadMusic,setSongs}=musicSlice.actions
export default musicSlice.reducer

