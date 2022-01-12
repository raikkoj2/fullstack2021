const initialState = ''

export const setNotification = (message, time) => {
  console.log(message)
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        content: message
      }
    })
    setTimeout(() => {
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
      return ''
    case 'SHOW_NOTIFICATION':
      return action.data.content
    default:
      return state
  }
}

export default notificationReducer