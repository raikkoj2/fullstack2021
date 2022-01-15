import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'


const Notification = () => {
    const notification = useSelector(state => state.notification)

    const cssClass = notification.success ? 'success' : 'error'
    return (
        <>
            {notification.show &&
                <div className={cssClass}>
                    {notification.message}
                </div>
            }
        </>
    )
}


export default Notification