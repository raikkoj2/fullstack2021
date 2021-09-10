import React, { useState } from 'react'
import blogService from '../../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleBlogChange, showNotification, user, blogs, sort }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const blogStyle = {
        paddingTop: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        paddingBottom: 5,
        paddingLeft: 5,
    }

    const handleLike = (event) => {
        event.preventDefault()
        setLikes(likes+1)

        const newBlog = {
            user: blog.user.id,
            likes: likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        blogService.update(newBlog, blog.id)
        blogs = blogs.map(item => {
            if(item.id === blog.id){
                item.likes = likes + 1
            }
            return(item)
        })
        sort(blogs)

    }

    const handleDelete = async (event) => {
        event.preventDefault()
        const id = blog.id
        if(user.id === blog.user.id){
            if (window.confirm(`Remove blog '${blog.name}' by ${blog.author}`)) {
                await blogService.remove(id)
                handleBlogChange(id)
            }
        }else{
            showNotification('You can\'t delete this blog', false)
        }
    }

    return (
        <div className='blog' style={blogStyle}>
            <div className='titleRow'>
                {blog.title} by {blog.author}
                <button style={{ marginLeft: 5 }} onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
            </div>
            {visible &&
                <div>
                    <p className='url'>
                        {blog.url}
                    </p>
                    <p className='likes'>
                    Likes: {likes} <button className='like' onClick={handleLike}>like</button>
                    </p>
                    <p className='user'>
                        {blog.user.name}
                    </p>
                    {
                        user.id === blog.user.id &&
                    <button className='deleteBlog' onClick={handleDelete}>delete</button>
                    }

                </div>
            }
        </div>

    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleBlogChange: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired
}

export default Blog