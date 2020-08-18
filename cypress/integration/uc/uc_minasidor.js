describe('Goto uc-url, login, click Mina Tjanster and verify you are in the correct place', () => {
   
        it('visit the url', () =>  {
            cy.visit('https://www1.uc.se/')
        })
    
        it('login to the application', () => {
            cy.get('.site-header__login').click()
            cy.url().should('include', 'weblogin/login')
            cy.get('#UP').click()
            cy.get('#username').type('195008196015')
            cy.get('#password').type('testMinuc4')
            cy.get('#loggainperson').click()   
            cy.url().should('include', 'weblogin/uploginhandler')
            cy.get('div:nth-child(2) > div > div > div > a:nth-child(2)').click()
        })
    
        it('confirm user login and go to Privat Service', () => {
            cy.url().should('include', 'mina-tjanster/uc')
        })

        it('confirm bolagshandlingar appear', () => {        
            cy.get('#bolagshandlingar').should('exist')
        })
        
    })
  