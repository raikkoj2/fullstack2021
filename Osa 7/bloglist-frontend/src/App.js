import React, { useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Bloglist from './components/BlogList'
import Menu from './components/Menu'
import {
    Switch, Route, Redirect, useRouteMatch
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog/Blog'


const App = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)


    useEffect(() => {
        dispatch(setUser())
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [])


    const userMatch = useRouteMatch('/users/:id')
    const userToShow = userMatch
        ? users.find(user => user.id === userMatch.params.id)
        : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const blogToShow = blogMatch
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    return (
        <>
            {user !== null && <Menu />}
            <h1>Blog app</h1>
            <Notification />
            <Switch>
                <Route path='/users/:id'>
                    {user ? <User user={userToShow} /> : <Redirect to='/' />}
                </Route>
                <Route path='/users'>
                    {user ? <Users /> : <Redirect to='/' />}
                </Route>
                <Route path='/blogs/:id'>
                    {user ? <Blog blog={blogToShow} /> : <Redirect to='/' />}
                </Route>
                <Route path='/'>
                    {user === null
                        ? <LoginForm />
                        : <Bloglist />
                    }
                </Route>
            </Switch>
        </>
    )
}

export default App