import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import userContext from '../../context/user/UserContext'
import Loader from '../Loader'
import noteContext from '../../context/note/NoteContext'

const Login = () => {
    const { login } = useContext(userContext)
    const { featchNotes } = useContext(noteContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [loginCredentials, setLoginCredentials] = useState({ email: location.state ? location.state.email : '', password: '' })
    const [showHidePassword, setshowHidePassword] = useState('password')
    const [loader, setLoader] = useState()
    const handleChange = (e) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
    }
    const loginForm = async (e) => {
        e.preventDefault()
        setLoader(true)
        const a = await login(loginCredentials)
        // console.log(a);
        if (a.status === 'success') {
            navigate('/')
            await featchNotes(a.authToken)
        }
        setLoader(false)
    }
    return (
        <>
            {loader ?
                <Loader title={'Please Wait'} color={'green'} />
                :
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
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <Link to="/forgot-password" state={loginCredentials.email} >Forgot Your Password?</Link>
                        <h6 className='mt-3' >Not Have an account</h6>
                        <Link className='btn btn-primary' to="/signup" role="button">SignUp here</Link>
                    </div>
                </>
            }
        </>
    )
}

export default Login