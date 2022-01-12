import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateAnecdote = async (id) => {
  const url = baseUrl + '/' + id
  const votedAnecdote = await axios.get(url)
  const updatedAnecdote = await axios.put(url, {
    ...votedAnecdote.data,
    votes: votedAnecdote.data.votes + 1
  })
  return updatedAnecdote.data
}

export default {
  getAll,
  createNew,
  updateAnecdote,
}