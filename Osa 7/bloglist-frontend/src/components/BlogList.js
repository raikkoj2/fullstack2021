import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Bloglist = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)

    const blogFormRef = useRef()
    const createBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createNewBlog(newBlog))
    }

    const blogStyle = {
        paddingTop: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        paddingBottom: 5,
        paddingLeft: 5,
    }
    return(
        <div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm create={createBlog} />
            </Togglable>

            {blogs.map(blog =>
                <div style={blogStyle} key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></div>
            )}
        </div>
    )
}

export default Bloglist