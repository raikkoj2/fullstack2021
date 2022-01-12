const initialState = ''


export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: {
      content: content
    }
  }
}

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.content
    default:
      return state
  }
}

export default filterReducer