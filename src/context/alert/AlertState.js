import React, { useState } from 'react'
import alertContext from './AlertContext'

const AlertState = (props) => {
    const [alertState, setAlertState] = useState({ status: null, msg: null })
    const [progress, setProgress] = useState(0)
    const [theme, setTheme] = useState('')



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
        <alertContext.Provider value={{ updateAlert, alertState, setAlertState, progress, setProgress, theme, setTheme }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState