import axios from 'axios';
import {toast} from 'react-toastify'
import { CREATE_POST, FETCH_POSTS, SET_LOADING_POSTS, SET_CURRENT_POST, UPDATE_POST, DELETE_POST, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, SET_CURRENT_COMMENT } from '../actionTypes/postActionTypes';
import {API} from '../config'

export const fetchPosts = (userId, token) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingPosts(true));

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
    
            const res = await axios.get(`${API}/posts/${userId}`, config);
    
            dispatch({type: FETCH_POSTS, payload: res.data});
        } catch (err) {
            toast.error("Posts couldn't be fetched!")
        }finally{
            dispatch(setLoadingPosts(false));
        }
    }
}

export const setCurrentPost = (post) => {
    return {type: SET_CURRENT_POST, payload: post}
}

export const createPost = (userId, token, text) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const body = JSON.stringify({text});
    
            const res = await axios.post(`${API}/posts/${userId}`, body, config)
    
            dispatch({type: CREATE_POST, payload: res.data});
        } catch (err) {
            toast.error("Post couldn't be created!")
        }
    }
}

export const updatePost = (userId, token, postId, text) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const body = JSON.stringify({text});
    
            const res = await axios.put(`${API}/posts/${postId}/${userId}`, body, config)
    
            dispatch({type: UPDATE_POST, payload: res.data});
        } catch (err) {
            toast.error("Post couldn't be updated!")
        }
    }
}

export const deletePost = (userId, token, postId) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            await axios.delete(`${API}/posts/${postId}/${userId}`, config)
    
            dispatch({type: DELETE_POST, payload: postId});
        } catch (err) {
            toast.error("Post couldn't be updated!")
        }
    }
}

export const setLoadingPosts = (value) => {
    return {type: SET_LOADING_POSTS, payload: value}
}

export const createComment = (userId, token, postId, text) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const body = JSON.stringify({text});

            const res = await axios.post(`${API}/comments/${postId}/${userId}`, body, config);

            dispatch({type: CREATE_COMMENT, payload: {postId, comment: res.data}});
        } catch (err) {
            toast.error("Comment couldn't be created");
        }
    }
}

export const updateComment = (userId, token, postId, commentId, text) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const body = JSON.stringify({text});

            const res = await axios.put(`${API}/comments/${commentId}/${userId}`, body, config);

            dispatch({type: UPDATE_COMMENT, payload: {postId, comment: res.data}});
        } catch (err) {
            toast.error("Comment couldn't be updated");
        }
    }
}

export const deleteComment = (userId, token, postId, commentId) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            await axios.delete(`${API}/comments/${commentId}/${userId}`, config);

            dispatch({type: DELETE_COMMENT, payload: {postId, commentId}});
        } catch (err) {
            toast.error("Comment couldn't be deleted");
        }
    }
}

export const setCurrentComment = (comment) => {
    return {type: SET_CURRENT_COMMENT, payload: comment}
}