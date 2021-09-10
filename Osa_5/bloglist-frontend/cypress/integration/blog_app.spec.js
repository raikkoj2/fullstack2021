describe('Blog app', function() {
    const user = {
        name: 'Joonas Räikkönen',
        username: 'testi',
        password: 'salainen'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.get('html').should('not.contain', 'blogs')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.contains('login').click()

            cy.contains(`${user.name} is logged in`)
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type('something that is not password')
            cy.contains('login').click()

            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.contains('login').click()
        })

        const blog = {
            title: 'This is a test blog from cypress',
            author: 'Cypress',
            url: 'www.trinode.fi'
        }

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.get('.submit').click()

            cy.get('html').should('contain', blog.title)
        })

        describe('When blog is created', function() {
            beforeEach(function() {
                cy.contains('create new blog').click()
                cy.get('#title').type(blog.title)
                cy.get('#author').type(blog.author)
                cy.get('#url').type(blog.url)
                cy.get('.submit').click()
            })

            it('a blog may be liked', function() {

                cy.contains('view').click().parent().parent().get('.like').click()
                cy.get('.likes').should('contain', '1')
            })

            it('Creator of blog may delete it', function() {
                cy.contains('view').click()
                cy.get('.deleteBlog').click()
                cy.get('.blog').should('have.length', 0)
            })
        })

        it('Blogs are organized based on the likes', function() {
            const blogs = [
                {
                    title: 'test 1',
                    author: 'author 1',
                    url: 'www.trinode.fi'
                },
                {
                    title: 'test 2',
                    author: 'author 2',
                    url: 'www.trinode.fi'
                },
                {
                    title: 'test 3',
                    author: 'author 3',
                    url: 'www.trinode.fi'
                }
            ]
            let blog = blogs[0]
            cy.contains('create new blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.get('.submit').click()

            cy.get('.blog').contains('view').click().parent().parent().find('.like').click().click()

            blog = blogs[1]

            cy.contains('create new blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.get('.submit').click()

            cy.wait(1000)

            cy.get('.blog:last').contains('view').click().parent().parent().find('.like').click().click().click()

            blog = blogs[2]

            cy.contains('create new blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.get('.submit').click()

            cy.wait(1000)

            cy.get('.blog:last').contains('view').click().parent().parent().find('.like').click().click().click().click().click()

            cy.get('.blog:first').should('contain', 'Likes: 5')

            cy.get('.blog').eq(1).should('contain', 'Likes: 3')

            cy.get('.blog:last').should('contain', 'Likes: 2')

        })


    })

})