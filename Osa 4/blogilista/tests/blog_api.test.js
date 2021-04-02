const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { testEnvironment } = require('../jest.config')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog contains field "id"', async () => {
  const blogs = await api.get('/api/blogs')
  
  expect(blogs.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "This is a test",
    author: "tester",
    url: "www.test.com",
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogs.map(blog => blog.title)
  expect(titles).toContain(newBlog.title)
  
})

test('likes is zero if not defined', async () => {
  const newBlog = {
    title: "This is a test for adding blog without likes",
    author: "tester",
    url: "www.test.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  const added = blogs.filter(blog => blog.title === newBlog.title)

  expect(added[0].likes).toBe(0)

})

test('adding blog without title or url should fail', async () => {
  const noTitle = new Blog({
    author: "tester",
    url: "www.tester.fi",
    likes: 222
  })

  const noUrl = new Blog({
    title: "This is a blog without a url",
    author: "tester",
    likes: 332
  })

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)

  const blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('deleting succeeds with status code 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('updating a likes of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    likes: 544
  }

  const updated = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  expect(blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0].likes).toBe(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})