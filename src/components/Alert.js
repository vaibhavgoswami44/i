import React, { useContext, useEffect } from 'react';
import '../App.css'
import alertContext from '../context/alert/AlertContext';

const Alert = () => {
    const { alertState, setAlertState } = useContext(alertContext);
    let timer
    useEffect(() => {
        //eslint-disable-next-line
        timer = setTimeout(() => {
            setAlertState({ status: null, msg: null })
        }, 6000);

        return () => clearTimeout(timer);
        //eslint-disable-next-line
    }, [alertState.status]); // add alertState.status as a dependency to avoid unnecessary rerenders

    const dismissAlert = () => {
        setAlertState({ status: null, msg: null });
        clearTimeout(timer);
    }

    return (
        <>
            {alertState.status && (
                <div className={` p-0 alert alert-${alertState.status}`} style={{zIndex:'1200'}} role="alert">
                    <div className='p-3 d-flex justify-content-between'>
                        <div>
                            {alertState.msg}
                        </div>
                        <div>
                            <span onClick={dismissAlert}>X</span>
                        </div>
                    </div>
                    <div className='progress-bar' style={{ height: '1px', backgroundColor: alertState.status === 'success' ? 'green' : 'red' }} ></div>
                </div>
            )}
        </>
    );
};

export default Alert;