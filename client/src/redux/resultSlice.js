import {createSlice} from "@reduxjs/toolkit"

const resultSlice=createSlice({
    name:"result",

    initialState:{
        result:[]
    },

    reducers:{
        uploadResult:(state,action)=>{
            state.result=action.payload
        }
    }
})
export const {uploadResult}=resultSlice.actions
export default resultSlice.reducer

