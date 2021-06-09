import {SET_CAN_CLICK_BUTTON} from '../actionTypes/formActionTypes'

const initialState = {
    canClickButton: true
}

const formReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case SET_CAN_CLICK_BUTTON:
            return {canClickButton: payload}
        default:
            return state;
    }
}

export default formReducer;