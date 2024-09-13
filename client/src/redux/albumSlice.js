import {createSlice} from "@reduxjs/toolkit"

const albumSlice=createSlice({
    name:"album",

    initialState:{
        album:{},
        allAlbums:[]
    },

    reducers:{
        uploadAlbum:(state,action)=>{
          state.album=action.payload  
        },

        setAlbums:(state,action)=>{
            state.allAlbums=action.payload
        }
    }
})

export const {uploadAlbum,setAlbums}=albumSlice.actions
export default albumSlice.reducer

