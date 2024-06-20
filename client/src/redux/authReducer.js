const initialState ={
    token: null
}

const authReducer = (state=initialState,action) => {
    switch(action.type){
        case 'TOKEN':
            console.log("ACTION_PAYLOAD", action.payload)
            return {...state, token:action.payload}
        default :
            return state;
    }
}

export default authReducer