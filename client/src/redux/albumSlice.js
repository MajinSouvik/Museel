import {createSlice} from "@reduxjs/toolkit"

const albumSlice=createSlice({
    name:"album",

    initialState:{
        album:{}
    },

    reducers:{
        uploadAlbum:(state,action)=>{
          state.album=action.payload  
        }
    }
})

export const {uploadAlbum}=albumSlice.actions
export default albumSlice.reducer

