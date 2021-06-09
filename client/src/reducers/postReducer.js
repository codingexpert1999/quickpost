import { 
    CREATE_COMMENT, 
    CREATE_POST, 
    DELETE_COMMENT, 
    DELETE_POST, 
    FETCH_POSTS, 
    SET_CURRENT_COMMENT, 
    SET_CURRENT_POST, 
    SET_LOADING_POSTS, 
    UPDATE_COMMENT, 
    UPDATE_POST 
} from "../actionTypes/postActionTypes";
import {LOG_OUT} from '../actionTypes/userActionTypes';

const initialState = {
    posts: [],
    currentPost: null,
    loadingPosts: false,
    currentComment: null
}

const postReducer = (state=initialState, {type, payload}) => {
    let posts = state.posts;

    switch(type){
        case FETCH_POSTS:
            return {...state, posts: payload};
        case CREATE_POST:
            posts.unshift(payload);
            return {...state, posts};
        case UPDATE_POST:
            posts = posts.map(post => {
                if(post._id === payload._id){
                    return payload
                }else{
                    return post;
                }

            })

            return {...state, posts}
        case DELETE_POST:
            posts = posts.filter(post => post._id !== payload);
            return {...state, posts}
        case SET_CURRENT_POST:
            return {...state, currentPost: payload}
        case SET_LOADING_POSTS:
            return {...state, loadingPosts: payload}
        case CREATE_COMMENT:
            posts = posts.map(post => {
                if(post._id === payload.postId){
                    post.comments.unshift(payload.comment)
                }

                return post;
            })

            return {...state, posts};
        case UPDATE_COMMENT:
            posts = posts.map(post => {
                if(post._id === payload.postId){
                    post.comments = post.comments.map(comment => comment._id === payload.comment._id ? payload.comment : comment);
                }

                return post;
            })

            return {...state, posts};
        case DELETE_COMMENT:
            posts = posts.map(post => {
                if(post._id === payload.postId){
                    post.comments = post.comments.filter(comment => comment._id !== payload.comment._id);
                }

                return post;
            })

            return {...state, posts};
        case SET_CURRENT_COMMENT:
            return {...state, currentComment: payload}
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
}

export default postReducer;