import React from 'react'
import Spinner from '../icon/Spinner.svg'

const Loader = (props) => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={Spinner} alt='Loading' />
            <div style={{ position: 'absolute', marginTop: '65px', color: props.color }}>{props.title}</div>
        </div>
    )
}

export default Loader