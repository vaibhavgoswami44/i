import React, { useState } from 'react'
import generalContext from './generalContext'

const GeneralState = (props) => {
    const [theme, setTheme] = useState('')
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)


    return (
        <generalContext.Provider value={{ theme, setTheme, setLoading, loading, setProgress, progress }}>
            {props.children}
        </generalContext.Provider>
    )
}

export default GeneralState