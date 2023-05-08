import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../../context/user/UserContext'

const Login = () => {
    const { login } = useContext(userContext)
    const navigate = useNavigate()
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' })
    const [showHidePassword, setshowHidePassword] = useState('password')
    const handleChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }
    const loginForm = async (e) => {
        e.preventDefault()
        const a = await login(loginCredentials)
        // console.log(a);
        if (a.status === 'success') {
            navigate('/')
        }
    }
    return (
        <>
            <form onSubmit={loginForm}>
                <h4 className='text-center' >Login</h4>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input name='email' type="email" className="form-control" id="email" value={loginCredentials.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input name='password' type={showHidePassword} className="form-control" id="password" value={loginCredentials.password} onChange={handleChange} required />
                    <div className="form-check">
                        <input onClick={() => showHidePassword === 'password' ? setshowHidePassword('text') : setshowHidePassword('password')} className="form-check-input" type="checkbox" value="" id="showPassword" />
                        <label className="form-check-label" htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Link to="/forgot-password" role="button">Forgot Your Password Reset Here</Link>
            <h6 className='mt-3' >Not Have an account</h6>
            <Link className='btn btn-primary' to="/signup" role="button">SignUp here</Link>
        </>
    )
}

export default Login