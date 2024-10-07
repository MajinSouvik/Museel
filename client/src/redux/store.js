import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import reelSlice from "./reelSlice"
import albumSlice from "./albumSlice"
import musicSlice from "./musicSlice"
import resultSlice from "./resultSlice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        reels:reelSlice,
        album:albumSlice,
        music:musicSlice,
        result:resultSlice
    }
})

export default store