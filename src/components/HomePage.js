import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import alertContext from '../context/alert/AlertContext'

const HomePage = () => {
  const { theme } = useContext(alertContext)
  return (
    <div className='m-5 d-flex justify-content-center align-items-center flex-column '>
      <h6>Welcome To iNoteNook App</h6>
      <div>
        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
      </div>
    </div>
  )
}

export default HomePage