import React, { useState } from 'react'
import alertContext from './AlertContext'

const AlertState = (props) => {
    const [alertState, setAlertState] = useState({ status: null, msg: null })
    const [theme, setTheme] = useState('')
    const [loading, setLoading] = useState(false)

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
        <alertContext.Provider value={{ updateAlert, alertState, setAlertState, theme, setTheme, setLoading, loading }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState