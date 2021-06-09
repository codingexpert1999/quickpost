import { SET_CAN_CLICK_BUTTON } from "../actionTypes/formActionTypes"

export const setCanClickButton = (value) => {
    return {type: SET_CAN_CLICK_BUTTON, payload: value}
} 