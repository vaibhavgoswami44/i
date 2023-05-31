import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <div className='d-flex align-items-center justify-content-center flex-column'>
                <h5 className='text-danger' >Page Not Found</h5>
                <Link to='/'><Button>Home</Button></Link>
            </div>
        </>
    )
}

export default ErrorPage