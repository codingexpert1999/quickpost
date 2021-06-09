import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedComponent } from '../../actions/profileActions';
import { changeEmail } from '../../actions/userActions';

const ChangeEmail = () => {
    const dispatch = useDispatch();

    const {user, token} = useSelector(state => state.user)

    const [email, setEmail] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(changeEmail(user.id, token, email));

        dispatch(setSelectedComponent("profile-details"))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter a new email..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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

export default ChangeEmail
