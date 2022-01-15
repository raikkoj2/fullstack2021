import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Menu = () => {
    const padding = {
        padding: 5
    }
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    return(
        <div style={{ backgroundColor: 'lightgrey' }}>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            <p style={{ display: 'inline-block', padding: 5 }}>{user.name} is logged in</p>
            <button onClick={() => dispatch(logout())}>logout</button>
        </div>
    )
}

export default Menu