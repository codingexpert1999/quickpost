import React from 'react'
import { useSelector } from 'react-redux'
import ChangeUsername from './ChangeUsername';
import ChangeEmail from './ChangeEmail';
import ProfileDetails from './ProfileDetails';
import ProfileNav from './ProfileNav'
import ChangePassword from './ChangePassword';

const Profile = () => {
    const {selectedComponent} = useSelector(state => state.profile);

    return (
        <div className="container max-height py-3 profile">
            <h1 className="mb-4">Profile <i className="fas fa-user"></i></h1>

            <div className="d-flex justify-content-center align-items-center profile-container">
                <ProfileNav/>

                <div className="selected-component">
                    {selectedComponent === "profile-details" && <ProfileDetails/>}

                    {selectedComponent === "change-username" && <ChangeUsername/>}

                    {selectedComponent === "change-email" && <ChangeEmail/>}

                    {selectedComponent === "change-password" && <ChangePassword/>}
                </div>
            </div>
        </div>
    )
}

export default Profile
