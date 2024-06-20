import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playingReducer from "./playingReducer";

const rootReducer=combineReducers({
    auth:authReducer,
    play:playingReducer
})

export default rootReducer