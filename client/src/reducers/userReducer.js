import { CHANGE_EMAIL, CHANGE_USERNAME, LOAD_USER, LOGIN, LOG_OUT, SIGN_UP } from "../actionTypes/userActionTypes";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false
}

const userReducer = (state=initialState, {type, payload}) => {
    let user = {...state.user};

    switch(type){
        case SIGN_UP:
        case LOGIN:
        case LOAD_USER:
            return {user: payload.user, token: payload.token, isAuthenticated: true}
        case CHANGE_USERNAME:
            user.username = payload.username;

            return {...state, user, token: payload.token}
        case CHANGE_EMAIL:
            user.email = payload.email;

            return {...state, user, token: payload.token}
        case LOG_OUT:
            return initialState;
        default:
            return state
    }
}

export default userReducer;