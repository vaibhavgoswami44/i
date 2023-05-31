import React from 'react'
import Spinner from '../icons/Spinner.svg'

const Loader = () => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={Spinner} alt='Loading' />
        </div>
    )
}

export default Loader