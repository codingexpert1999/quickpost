import React from 'react'
import {useSelector} from 'react-redux'

const ProfileDetails = () => {
    const {user} = useSelector(state => state.user);

    return (
        <>
            <div className="details-group mb-3">
                <label>Username</label>
                <p>{user.username}</p>
            </div>

            <div className="details-group">
                <label>Email</label>
                <p>{user.email}</p>
            </div>
        </>
    )
}

export default ProfileDetails
