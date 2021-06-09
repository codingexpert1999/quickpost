import {combineReducers} from 'redux'
import formReducer from './formReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    form: formReducer,
    post: postReducer,
    profile: profileReducer
})

export default rootReducer;