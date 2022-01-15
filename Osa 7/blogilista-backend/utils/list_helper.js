const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(((prev, cur) => prev + cur.likes), 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, current) => {
    return current.likes > favorite.likes
      ? current
      : favorite
  }

  return blogs.length === 0
    ? []
    : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  const counts = lodash.countBy(blogs, "author")
  
  const sorted = lodash.orderBy(counts)
  const highest = blogs.length === 0
    ? 0
    : sorted[sorted.length - 1]

  return {
    "author": blogs.length === 0
      ? ""
      : lodash.keys(counts)[lodash.values(counts).indexOf(highest)],
    "blogs": highest
  }
}

const mostLikes = (blogs) => {
  const grouped = lodash.groupBy(blogs, "author")
  const authors = lodash.keys(grouped)
  const list = []

  for(let i = 0; i < authors.length; i++){
    list.push({"author": authors[i], "likes": 0})
  }

  for(let i = 0; i < blogs.length; i++){
    const blog = blogs[i]
    const index = authors.indexOf(blog.author)

    list[index].likes = list[index].likes + blog.likes
  }

  return blogs.length === 0
    ? {"author": "", "likes": 0}
    : lodash.head(lodash.orderBy(list, ['likes'], ['desc']))

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}