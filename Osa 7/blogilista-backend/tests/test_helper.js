const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [  
  {
    title: "Testi 1",
    author: "Miikka",
    url: "http://www.moikkamoi.com",
    likes: 5,
    user: {
      username: "raikkonen",
      name: "Joonas Räikkönen",
      _id: "6068ac782f3c2d7a40e57af6"
    },
    _id: "6068798366e0f345203e6f86"
  },
  {
    title: "Testi 2",
    author: "Joonas",
    url: "http://www.moikkamoi.com",
    likes: 5,
    user: {
      username: "raikkonen",
      name: "Joonas Räikkönen",
      _id: "6068ac782f3c2d7a40e57af6"
    },
    _id: "60687a9dc49f1351809cb270"
  },
  {
    title: "Testi 3",
    author: "Miikka",
    url: "http://www.moikkamoi.com",
    likes: 5,
    user: {
      username: "raikkonen",
      name: "Joonas Räikkönen",
      _id: "6068ac782f3c2d7a40e57af6"
    },
    _id: "60687b39a66a7747b4e27e69"
  },
  {
    title: "Testi 4",
    author: "Miikka",
    url: "http://www.moikkamoi.com",
    likes: 5,
    user: {
      username: "raikkonen",
      name: "Joonas Räikkönen",
      _id: "6068ac782f3c2d7a40e57af6"
    },
    _id: "6068825fa2b5e8330cddd222"
  },
  {
    title: "Testi 5",
    author: "Miikka",
    url: "http://www.moikkamoi.com",
    likes: 5,
    user: {
      username: "raikkonen",
      name: "Joonas Räikkönen",
      _id: "6068ac782f3c2d7a40e57af6"
    },
    _id: "60688278160c5c4518bd275c"
  },
  {
    title: "Testi 6",
    author: "Joonas",
    url: "http://www.moikkamoi.com",
    likes: 3000,
    user: {
      username: "raikkonen",
      name: "Joonas Räikkönen",
      _id: "6068ac782f3c2d7a40e57af6"
    },
    _id: "6068b41fafb88f25185f6b6a"
  }
]



const initialUsers = [
  {
    username: "thekirsila",
    name: "Miikka Kirsilä",
    _id: "60685be77c96c2348471b4b6"
  },
  {
    username: "raikkonen",
    name: "Joonas Räikkönen",
    _id: "6068ac782f3c2d7a40e57af6"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "", url: "", likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user', ({ username: 1, name: 1, id: 1}))
  return blogs.map(blog => blog.toJSON())
}

const createInitialUsers = async () => {
  const passwordHash1 = await bcrypt.hash('sekret', 10)
  const passwordHash2 = await bcrypt.hash('salasana', 10)
  
  initialUsers[0].passwordHash = passwordHash1
  initialUsers[1].passwordHash = passwordHash2

  return initialUsers
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, createInitialUsers, usersInDb
}