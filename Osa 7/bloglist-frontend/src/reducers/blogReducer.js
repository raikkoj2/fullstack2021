/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


export const createNewBlog = (newBlog) => {
    return async dispatch => {

        try {
            const createdBlog = await blogService.create(newBlog)
            dispatch({
                type: 'CREATE_BLOG',
                data: createdBlog
            })
            dispatch(setNotification({ message: `A new blog ${newBlog.title} by ${newBlog.author} has been created!`, success: true }, 5))
        } catch (error) {
            dispatch(setNotification({ message: 'Creating blog failed', success: false }, 5))
        }
    }
}

export const likeBlog = (newBlog, id) => {
    return async dispatch => {
        await blogService.update(newBlog, id)
        dispatch({
            type: 'LIKE_BLOG',
            data: {
                id: id
            }
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: {
                id: id
            }
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addComment = (blogId, content) => {
    return async dispatch => {
        const comment = {
            content
        }
        const newBlog = await blogService.createComment(blogId, comment)

        dispatch({
            type: 'ADD_COMMENT',
            data: newBlog
        })
    }
}

const sort = (toSort) => {
    return toSort.sort((a, b) => b.likes - a.likes)
}

const blogReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
    case 'CREATE_BLOG':
        return sort(state.concat(action.data))
    case 'LIKE_BLOG':
        const likedBlog = state.find(blog => blog.id === action.data.id)
        const updatedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
        console.log(likedBlog)
        console.log(updatedBlog)
        const newState = state.map(blog => blog.id === action.data.id ? updatedBlog : blog)
        console.log(newState)
        return sort(newState)
    case 'DELETE_BLOG':
        return sort(state.filter(blog => blog.id !== action.data.id))
    case 'INIT_BLOGS':
        return sort(action.data)
    case 'ADD_COMMENT':
        return state.map(blog => blog.id === action.data.id ? action.data : blog)
    default:
        return state
    }
}

export default blogReducer