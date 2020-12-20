Cypress.Commands.add('Login', ({ username, password }) => {
  cy.request('POST', 'https://guarded-shore-68847.herokuapp.com/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('AddBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'https://guarded-shore-68847.herokuapp.com/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('Register', ({ username, password, name }) => {
  cy.request('POST', 'https://guarded-shore-68847.herokuapp.com/api/users', {
    username,
    password,
    name,
  })
})
