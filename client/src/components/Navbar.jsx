import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { setCurrentPost } from '../actions/postActions';

const Navbar = () => {
    const dispatch = useDispatch();

    const {isAuthenticated} = useSelector(state => state.user)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">QuickPost</Link>

                <ul className="nav">
                    {
                        !isAuthenticated &&
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">
                                    Register <i className="fas fa-user-plus"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login <i className="fas fa-user-check"></i>
                                </NavLink>
                            </li>
                        </>
                    }

                    {
                        isAuthenticated &&
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/create-post" onClick={() => dispatch(setCurrentPost(null))}>
                                    Create Post <i className="far fa-plus-square"></i>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    Profile <i className="fas fa-user"></i>
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
