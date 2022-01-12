let timeoutID = null

export const setNotification = (message, time) => {
  console.log(message)
  return async dispatch => {
    if(timeoutID){
      clearTimeout(timeoutID)
      timeoutID = null
    }
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        content: message
      }
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, time * 1000)
  }
}


const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'HIDE_NOTIFICATION':
      return ''
    case 'SHOW_NOTIFICATION':
      return action.data.content
    default:
      return state
  }
}

export default notificationReducer