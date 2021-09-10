import React from 'react'
import '../index.css'

const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    }
    const cssClass = success ? 'success' : 'error'
    return (
        <div className={cssClass}>
            {message}
        </div>
    )
}


export default Notification