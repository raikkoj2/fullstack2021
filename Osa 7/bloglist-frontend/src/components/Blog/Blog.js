import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { addComment, deleteBlog, likeBlog } from '../../reducers/blogReducer'
import { useHistory } from 'react-router-dom'


const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const history = useHistory()
    const [newComment, setNewComment] = useState('')

    if(!blog){
        return null
    }

    const handleLike = (event) => {
        event.preventDefault()

        const newBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        dispatch(likeBlog(newBlog, blog.id))
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        const id = blog.id
        if(user.id === blog.user.id){
            if (window.confirm(`Remove blog '${blog.name}' by ${blog.author}`)) {
                dispatch(deleteBlog(id))
                history.push('/')
            }
        }else{
            dispatch(setNotification({ message: 'You can\'t delete this blog', success: false }, 5))
        }
    }
    const handleAddComment = (e) => {
        e.preventDefault()
        dispatch(addComment(blog.id, newComment))
        setNewComment('')
        return null
    }

    return (
        <div className='blog'>
            <h2>{blog.title} by {blog.author}</h2>
            <div>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p className='likes'>
                    Likes: {blog.likes} <button className='like' onClick={handleLike}>like</button>
                </p>
                <p>added by {blog.user.name}</p>
                {
                    user.id === blog.user.id &&
                    <button className='deleteBlog' onClick={handleDelete}>delete</button>
                }
            </div>
            <h3>comments</h3>
            <form onSubmit={handleAddComment}>
                <input type='text' value={newComment} onChange={({ target }) => setNewComment(target.value)}></input>
                <button>add comment</button>
            </form>
            {blog.comments.length === 0
                ? <p>no comments yet</p>
                :
                <ul>
                    {blog.comments.map(comment => {
                        return (
                            <li key={comment.id}>{comment.content}</li>
                        )
                    })
                    }
                </ul>
            }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog