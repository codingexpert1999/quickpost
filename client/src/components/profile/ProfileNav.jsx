import React from 'react'
import { useDispatch } from 'react-redux'
import {setSelectedComponent} from '../../actions/profileActions'
import {logOut} from '../../actions/userActions'

const ProfileNav = () => {
    const dispatch = useDispatch();

    return (
        <ul className="list-group">
            <li 
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(setSelectedComponent("profile-details"))}
            >
                Profile Details
            </li>
            <li 
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(setSelectedComponent("change-username"))}
            >
                Change Username
            </li>
            <li 
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(setSelectedComponent("change-email"))}
            >
                Change Email
            </li>
            <li 
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(setSelectedComponent("change-password"))}
            >
                Change Password
            </li>
            <li 
                className="list-group-item list-group-item-action"
                onClick={() => dispatch(logOut())}
            >
                Log Out
            </li>
        </ul>
    )
}

export default ProfileNav
