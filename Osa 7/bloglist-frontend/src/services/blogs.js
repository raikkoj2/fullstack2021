import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const credentials = {
        headers: { Authorization: `bearer ${user.token}` }
    }
    const response = await axios.post(baseUrl, newBlog, credentials)
    response.data.user = user
    return response.data
}

const update = async (newBlog, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog)
    return response.data
}

const remove = async (id) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const credentials = {
        headers: { Authorization: `bearer ${user.token}` }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, credentials)
    return response.data
}

const createComment = async (blogId, comment) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const credentials = {
        headers: { Authorization: `bearer ${user.token}` }
    }
    const response = await axios.post(`${baseUrl}/${blogId}/comments`, comment, credentials)
    return response.data
}
export default { getAll, create, update, remove, createComment }