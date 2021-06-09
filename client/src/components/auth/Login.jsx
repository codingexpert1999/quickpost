import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../../actions/userActions'

const Login = () => {
    const dispatch = useDispatch();

    const {canClickButton} = useSelector(state => state.form);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(email, password))
    }

    return (
        <form className="max-height d-flex flex-column justify-content-center" onSubmit={handleSubmit}>

            <h3>Login <i className="fas fa-user-check"></i></h3>

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

            <button className="btn btn-primary" disabled={!canClickButton}>Submit</button>

        </form>
    )
}

export default Login
