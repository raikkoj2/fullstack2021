import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm/BlogForm'
import Togglable from './components/Togglable'





const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ success, setSuccess ] = useState('success')
    const [ notifcationMessage, setNotificationMessage ] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => {
            sort(blogs)
        })
    }, [])

    useEffect(() => {
        const user = window.localStorage.getItem('user')

        if(user) {
            setUser(JSON.parse(user))
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
            window.localStorage.setItem('user', JSON.stringify(user))
        } catch (exception) {
            showNotification('Wrong credentials', false)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('user')
    }

    const createBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility()
        try {
            await blogService.create(newBlog, user.token)
            const newBlogs = await blogService.getAll()
            sort(newBlogs)
            showNotification(`A new blog ${newBlog.title} by ${newBlog.author} has been created!`, true)
        } catch (error) {
            showNotification('Creating blog failed', false)
        }
    }

    const showNotification = (message, success) => {
        setNotificationMessage(message)
        setSuccess(success)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const sort = (toSort) => {
        setBlogs(toSort.sort((a, b) => b.likes - a.likes))
    }

    const handleBlogChange = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id)
        sort(newBlogs)
    }

    return (
        <>
            {user === null
                ?<div>
                    <h2>Log in to application</h2>
                    <Notification message={notifcationMessage} success={success} />
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
                :<div>
                    <h2>blogs</h2>
                    <Notification message={notifcationMessage} success={success} />
                    <p style={{ display: 'inline-block' }}>{user.name} is logged in</p>
                    <button onClick={handleLogout}>logout</button>

                    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                        <BlogForm create={createBlog} />
                    </Togglable>

                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} handleBlogChange={handleBlogChange} showNotification={showNotification} user={user} blogs={blogs} sort={sort}/>
                    )}
                </div>
            }

        </>
    )
}

export default App