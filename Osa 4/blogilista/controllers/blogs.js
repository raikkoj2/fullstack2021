const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })


  const result = await blog.save()

  response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  const blog = {
    likes: body.likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})

  response.status(200).json(updated.toJSON())
})


module.exports = blogsRouter