import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import CommentForm from '../forms/CommentForm'
import PostForm from '../forms/PostForm'
import Layout from '../Layout'
import Profile from '../profile/Profile'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Layout}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path={["/create-post", "/post/:postId"]} component={PostForm} /> 
            <PrivateRoute exact path="/comment/:commentId" component={CommentForm} /> 
            <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
    )
}

export default Routes
