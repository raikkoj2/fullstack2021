const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { testEnvironment } = require('../jest.config')
const User = require('../models/user')

describe('tests for blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(await helper.createInitialUsers())
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

    const user = {
      username: "raikkonen",
      password: "salasana"
    }

    const token = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token.body.token)
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

    const user = {
      username: "raikkonen",
      password: "salasana"
    }

    const token = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + token.body.token)
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

    const user = {
      username: "raikkonen",
      password: "salasana"
    }

    const token = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    await api
      .post('/api/blogs')
      .send(noTitle)
      .set('Authorization', 'bearer ' + token.body.token)
      .expect(400)
  
    await api
      .post('/api/blogs')
      .send(noUrl)
      .set('Authorization', 'bearer ' + token.body.token)
      .expect(400)
  
    const blogs = await helper.blogsInDb()
  
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('Adding blog without token fails', async () => {
    const newBlog = {
      title: "This is a test",
      author: "tester",
      url: "www.test.com",
      likes: 100
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')
  
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  
    const titles = blogs.map(blog => blog.title)
    expect(titles).not.toContain(newBlog.title)
  })
  



  test('deleting succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const user = {
      username: blogToDelete.user.username,
      password: "salasana"
    }

    const token = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + token.body.token)
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
})




describe('tests for user api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(await helper.createInitialUsers())
  })




  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })





  test('creation fails with faulty User', async () => {
    const usersAtStart = await helper.usersInDb()

    const noUsername = {
      name: "Testi",
      password: "secret"
    }


    let result = await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username or password is missing')

    let usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)



    const noPassword = {
      username: "testi",
      name: "Testi"
    }

    result = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username or password is missing')

    usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)


    const notUnique = {
      username: usersAtStart[0].username,
      name: "Testi",
      password: "hölökynkölökyn",
    }
    
    result = await api
      .post('/api/users')
      .send(notUnique)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)


    const shortParams = {
      username: "mo",
      name: "Testi",
      password: "mo"
    }

    result = await api
      .post('/api/users')
      .send(shortParams)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username or password is too short')

    usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    
    
  })
})


afterAll(() => {
  mongoose.connection.close()
})