import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import userSlice from "./userSlice"
import reelSlice from "./reelSlice"
import albumSlice from "./albumSlice"
import musicSlice from "./musicSlice"
import resultSlice from "./resultSlice"

const appStore=configureStore({
    reducer:{
        auth:authSlice,
        reels:reelSlice,
        user:userSlice,
        album:albumSlice,
        music:musicSlice,
        result:resultSlice
    }
})

export default appStore