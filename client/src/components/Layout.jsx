import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Link, useHistory} from 'react-router-dom'

const Layout = () => {
    const history = useHistory();

    const {user} = useSelector(state => state.user)

    useEffect(() => {
        if(user){
            history.push("/dashboard")
        }
    }, [])

    return (
        <div className="container max-height d-flex flex-column justify-content-center align-items-center">
            <h1>QuickPost</h1>
            <p>Create posts fast and easy!</p>
            
            <Link className="btn btn-primary" to="/register">Register</Link>
        </div>
    )
}

export default Layout
