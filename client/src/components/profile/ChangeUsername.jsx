import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../actions/profileActions';
import { changeUsername } from '../../actions/userActions';

const ChangeUsername = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)

    const [username, setUsername] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(changeUsername(user.id, token, username));

        dispatch(setSelectedComponent("profile-details"))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter a new username..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
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

export default ChangeUsername
