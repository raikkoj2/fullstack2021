import React from 'react'
import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'


const LoginForm = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            dispatch(login(username, password))
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('penis')
            dispatch(setNotification({ message: 'Wrong credentials', success: false }, 5))
        }
    }

    return(
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id='username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}


export default LoginForm