import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../../context/user/UserContext'

const Login = () => {
  const { signUp } = useContext(userContext)
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '', cpassword: '', name: '' })
  const [showHidePassword, setshowHidePassword] = useState('password')
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordLengthError, setPasswordLengthError] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value })
  }
  const handleNameError = () => {
    if (loginCredentials.name.length < 3) {
      setNameError(true)
    }
    else {
      setNameError(false)
    }
  }
  const handlePasswordError = () => {
    if (loginCredentials.password !== loginCredentials.cpassword) {
      setPasswordError(true)
    }
    else {
      setPasswordError(false)
    }
  }
  const handlePasswordLengthError = () => {
    if (loginCredentials.password.length < 8) {
      setPasswordLengthError(true)
    }
    else {
      setPasswordLengthError(false)
    }
  }
  const signForm = async (e) => {
    e.preventDefault()
    handleNameError()
    handlePasswordError()
    handlePasswordLengthError()
    if (!((loginCredentials.name.length < 3) || (loginCredentials.password !== loginCredentials.cpassword) || (loginCredentials.password.length < 8))) {
      const a = await signUp(loginCredentials)
      // console.log(a);
      if (a.status === 'success') {
        navigate('/')
      }
    }
  }
  return (
    <>
      <form onSubmit={signForm}>
        <h4 className='text-center'>Sign Up</h4>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input name='name' type="text" className="form-control" style={{ borderColor: nameError ? '#dc3545' : '#ced4da' }} id="name" value={loginCredentials.name} onChange={handleChange} />
          <div style={{ height: '10px', color: '#dc3545' }} >{nameError ? 'Name length must be at least 3 characters.' : ''}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input name='email' type="email" className="form-control" id="email" value={loginCredentials.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input name='password' type={showHidePassword} className="form-control" style={{ borderColor: passwordError || passwordLengthError ? '#dc3545' : '#ced4da' }} id="password" value={loginCredentials.password} onChange={handleChange} />
          <div style={{ height: '10px', color: '#dc3545' }} >{passwordLengthError ? 'Password length must be at least 8 characters.' : ''}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input name='cpassword' type={showHidePassword} className="form-control" style={{ borderColor: passwordError ? '#dc3545' : '#ced4da' }} id="cpassword" value={loginCredentials.cpassword} onChange={handleChange} />
          <div style={{ height: '10px', color: '#dc3545' }} >{passwordError ? 'Password Not Match' : ''}</div>
        </div>
        <div className="form-check">
          <input onClick={() => showHidePassword === 'password' ? setshowHidePassword('text') : setshowHidePassword('password')} className="form-check-input" type="checkbox" value="" id="showPassword" />
          <label className="form-check-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h6 className='mt-3' >Already Have an account</h6>
        <Link className='btn btn-primary' to="/login" role="button">Login here</Link>
      </div>
    </>
  )
}

export default Login