describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('blogs')
  })
  it('valid user can be logged in', function () {
    cy.get('#togglable-btn').click()
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#login-button').click()

    cy.contains('Admin logged in')

  })

  it('login fails with invalid credentials', function () {
    cy.get('#togglable-btn').click()
    cy.get('#username').type('abcdefg')
    cy.get('#password').type('ijklmnop')
    cy.get('#login-button').click()

    cy.get('.error')
      .and('contain', 'Invalid credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Cypress logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.Login({ username: 'root', password: 'root' })
    })

    it('a new blog can be created', function () {
      cy.contains('Add Blog').click()
      cy.get('#Title').type('Life in Mars')
      cy.get('#Author').type('Samundra')
      cy.get('#Url').type('sam.com')
      cy.get('#Likes').type(20)
      cy.get('#addblog-btn').click()
      cy.contains('Life in Mars')
    })

    it('it can be liked', function(){
      cy.contains('Show').click()
      cy.get('.blogStyle').as('blogInfo')
      cy.get('@blogInfo').contains('Like').click()
      cy.get('.success')
        .and('contain', 'You have liked the blog')

    })

    it('a user who created a blog can delete it', function () {
      cy.contains('Life in Mars')
        .parent().find('button').click()
      cy.contains('Delete').contains('Delete').click()
      cy.get('html').should('not.contain', 'cypress3')
    })

  })
})

