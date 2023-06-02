import React, { useState } from 'react'
import alertContext from './AlertContext'

const AlertState = (props) => {
    const [alertState, setAlertState] = useState({ status: null, msg: null })

    const updateAlert = (status, msg) => {
        if (status === 'Failed') {
            const errorMsgs = msg.map(msg => <div key={msg}>{msg}<br /></div>);
            setAlertState({ status: status === 'success' ? 'success' : 'danger', msg: errorMsgs })
        }
        else {
            setAlertState({ status, msg })
        }
    }

    return (
        <alertContext.Provider value={{ updateAlert, alertState, setAlertState }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState