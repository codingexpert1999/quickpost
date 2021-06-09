import {toast} from 'react-toastify'
import axios from  'axios'
import { API } from '../config'
import {CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_USERNAME, LOAD_USER, LOGIN, LOG_OUT, SIGN_UP} from '../actionTypes/userActionTypes'
import { setCanClickButton } from './formActions'

export const signup = (username, email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setCanClickButton(false))

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const body = JSON.stringify({username, email, password});

            const res = await axios.post(`${API}/signup`, body, config);

            localStorage.setItem("user", JSON.stringify(res.data))

            dispatch({type: SIGN_UP, payload: res.data})
        } catch (err) {
            toast.error("Username or email is already taken!")
        }finally{
            dispatch(setCanClickButton(true))
        }
    }
}

export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(setCanClickButton(false))

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const body = JSON.stringify({email, password});

            const res = await axios.post(`${API}/login`, body, config);

            localStorage.setItem("user", JSON.stringify(res.data))

            dispatch({type: LOGIN, payload: res.data})
        } catch (err) {
            toast.error("Email or password is wrong!")
        }finally{
            dispatch(setCanClickButton(true))
        }
    }
}

export const logOut = () => {
    localStorage.removeItem("user");
    return {type: LOG_OUT}
}

export const loadUser = () => {
    if(localStorage.getItem("user")){
        return {type: LOAD_USER, payload: JSON.parse(localStorage.getItem("user"))}
    }else{
        return {type: "CANNOT_LOAD_USER"}
    }
}

export const changeUsername = (userId, token, username) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const body = JSON.stringify({username});

            const res = await axios.put(`${API}/user/username/${userId}`, body, config);

            let user = JSON.parse(localStorage.getItem("user"));

            user.user.username = username;
            user.token = res.data;

            localStorage.setItem("user", JSON.stringify(user))

            dispatch({type: CHANGE_USERNAME, payload: {username, token: res.data}})

            toast.success("Username changed successfully!")
        } catch (err) {
            toast.error("Username is already taken!")
        }
    }
}

export const changeEmail = (userId, token, email) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const body = JSON.stringify({email});

            const res = await axios.put(`${API}/user/email/${userId}`, body, config);

            let user = JSON.parse(localStorage.getItem("user"));

            user.user.email = email;
            user.token = res.data;

            localStorage.setItem("user", JSON.stringify(user))

            dispatch({type: CHANGE_EMAIL, payload: {email, token: res.data}})

            toast.success("Email changed successfully!")
        } catch (err) {
            toast.error("Email is already taken!")
        }
    }
}

export const changePassword = (userId, token, password) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const body = JSON.stringify({password});

            await axios.put(`${API}/user/password/${userId}`, body, config);

            dispatch({type: CHANGE_PASSWORD})

            toast.success("Password changed successfully!")
        } catch (err) {
            toast.error("Password is already taken!")
        }
    }
}