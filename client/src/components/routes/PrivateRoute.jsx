import React from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useSelector(state => state.user);

    return (
        isAuthenticated ?
        <Component {...rest} />
        : <Redirect to="/login" />
    )
}

export default PrivateRoute
