import {SET_SELECTED_COMPONENT} from '../actionTypes/profileActionTypes'
import {LOG_OUT} from '../actionTypes/userActionTypes'

const initialState = {
    selectedComponent: "profile-details"
};

const profileReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case SET_SELECTED_COMPONENT:
            return {...state, selectedComponent: payload}
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

export default profileReducer;