const initialState = ''

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      content: content
    }
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