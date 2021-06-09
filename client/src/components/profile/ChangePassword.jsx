import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setSelectedComponent } from '../../actions/profileActions';
import { changePassword } from '../../actions/userActions';

const ChangePassword = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }

        dispatch(changePassword(user.id, token, password));

        dispatch(setSelectedComponent("profile-details"))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">New Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter a new username..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter a new username..."
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" type="submit">Submit</button>
            <button 
                className="btn btn-secondary" 
                type="button" 
                onClick={() => dispatch(setSelectedComponent("profile-details"))}
            >
                Cancel
            </button>
        </form>
    )
}

export default ChangePassword
