import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Unit tests for BlogForm component', () => {


    test('clicking create calls the creator fonction with right parameters', async () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm create={createBlog} />
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'testing of forms could be easier' }
        })
        fireEvent.change(author, {
            target: { value: 'Test author' }
        })
        fireEvent.change(url, {
            target: { value: 'www.trinode.fi' }
        })
        fireEvent.submit(form)

        const blog = {
            title: 'testing of forms could be easier',
            author: 'Test author',
            url: 'www.trinode.fi'
        }
        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
        expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
        expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
    })

})
