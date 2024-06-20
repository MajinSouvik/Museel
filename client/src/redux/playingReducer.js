const initialState={
    playing:null,
    track:null
}

const playingReducer=(state=initialState, action)=>{
    switch(action.type) {
        case "PLAY_PAUSE":
            return {...state, playing:action.payload}
        case "TRACK":
            return {...state, track: action.payload}
        default:
            return state
    }
}
export default playingReducer