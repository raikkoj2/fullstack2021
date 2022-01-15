/* eslint-disable no-case-declarations */
import usersService from '../services/users'

export const initializeUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

const usersReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
    case 'INIT_USERS':
        return action.data
    case 'ADD_COMMENT':
        const userToUpdate = state.find(user => user.id === action.data.user.id)
        userToUpdate.blogs = userToUpdate.blogs.map(blog => blog.id === action.data.id ? { ...blog, comments: action.data.comments } : blog)
        return state.map(user => user.id === action.data.user.id ? userToUpdate : user)
    case 'CREATE_BLOG':
        const userToAddBlog = state.find(user => user.id === action.data.user.id)
        userToAddBlog.blogs = userToAddBlog.blogs.concat({ title: action.data.title, author: action.data.author, url: action.data.url, comments: action.data.comments, id: action.data.id })
        return state.map(user => user.id === action.data.user.id ? userToAddBlog : user)
    default:
        return state
    }
}

export default usersReducer