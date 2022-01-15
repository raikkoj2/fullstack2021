/* eslint-disable no-case-declarations */
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

export const setUser = () => {
    return dispatch => {
        const storedUser = window.localStorage.getItem('user')

        if(storedUser) {
            dispatch({
                type: 'SET_USER',
                data: JSON.parse(storedUser)
            })
        }
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('user')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem('user', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (error) {
            dispatch(setNotification({ message: 'Wrong credentials', success: false }, 5))
        }
    }
}
const localStorage = window.localStorage.getItem('user')
const initialState = localStorage ? JSON.parse(localStorage) : null
const userReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
    case 'SET_USER':
        return action.data
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export default userReducer