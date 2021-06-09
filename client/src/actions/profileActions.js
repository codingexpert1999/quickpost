import { SET_SELECTED_COMPONENT } from "../actionTypes/profileActionTypes"

export const setSelectedComponent = (component) => {
    return {type: SET_SELECTED_COMPONENT, payload: component}
}