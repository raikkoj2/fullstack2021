import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Unit tests for Blog component', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Joonas',
        id: 1,
        likes: 5,
        user: { id: 2, username: 'tester', name: 'Testi' },
        url: 'www.trinode.fi'
    }


    test('renders title and author but nothing else', () => {
        const component = render(
            <Blog blog={blog} user={blog.user} handleBlogChange={() => { return }} showNotification={() => { return }} blogs={[]} sort={() => { return }} />
        )

        const div = component.container.querySelector('.titleRow')

        expect(div).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(div).toHaveTextContent(
            'Joonas'
        )

        const likes = component.container.querySelector('.likes')
        expect(likes).toBe(null)

        const url = component.container.querySelector('.url')
        expect(url).toBe(null)
    })


    test('After the click all content is shown', async () => {
        const component = render(
            <Blog blog={blog} user={blog.user} handleBlogChange={() => { return }} showNotification={() => { return }} blogs={[]} sort={() => { return }} />
        )
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.titleRow')

        expect(div).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )
        expect(div).toHaveTextContent(
            'Joonas'
        )

        const likes = component.container.querySelector('.likes')
        expect(likes).toHaveTextContent('Likes: ' + blog.likes)
        const url = component.container.querySelector('.url')
        expect(url).toHaveTextContent(blog.url)

    })


    test('clicking the button twice calls event handler twice', async () => {
        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} user={blog.user} handleBlogChange={() => { return }} showNotification={() => { return }} blogs={[]} sort={mockHandler} />
        )

        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)

        const button = component.container.querySelector('.like')

        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})
