import React, { useState, } from 'react'

const BlogForm = ({ create }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url
        }
        create(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>Create new Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
          title
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
          author
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
          url
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button className='submit' type="submit">create</button>
            </form>
        </div>
    )

}

export default BlogForm