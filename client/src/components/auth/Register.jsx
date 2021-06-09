import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {signup} from '../../actions/userActions'

const Register = () => {
    const dispatch = useDispatch();

    const {canClickButton} = useSelector(state => state.form);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }

        dispatch(signup(username, email, password))
    }

    return (
        <form className="max-height d-flex flex-column justify-content-center" onSubmit={handleSubmit}>

            <h3>Register <i className="fas fa-user-plus"></i></h3>

            <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your username..." 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email..." 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter your password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm your password..."
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <button className="btn btn-primary" disabled={!canClickButton}>Submit</button>

        </form>
    )
}

export default Register
