let timeoutID = null
const initialState = {
    message: '',
    success: true,
    show: false
}
export const setNotification = (content, time) => {
    return async dispatch => {
        if(timeoutID){
            clearTimeout(timeoutID)
            timeoutID = null
        }
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: { ...content, show: true }
        })
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, time * 1000)
    }
}


const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
    case 'HIDE_NOTIFICATION':
        return {
            message: '',
            success: true,
            show: false
        }
    case 'SHOW_NOTIFICATION':
        return action.data
    default:
        return state
    }
}

export default notificationReducer