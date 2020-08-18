
import 'cypress-iframe'

const getIframeBody = () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get('iframe[name="klarna-checkout-iframe"]')
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
  }
  

describe('Make a Purchase as Logged out User', () => {
    it('visit UC website, pick a product', () => {
        cy.visit('https://www1.uc.se/')
        cy.get('.products-shortcut__product-list').within(()=> {
            cy.contains('Årsredovisning').click()
        })
        cy.url().should('include', 'arsredovisningar')
    })

    it('select the product', () => {
        cy.get('div.form-group').within( () => {
            cy.get('input[name="searchString"]').type('UC AB')
            cy.get('input[name="searchString"]').should('have.value', 'UC AB')
            cy.get('.initorder__btn').click()
        })
        cy.get('#lookupcompanytable').within( () => {
            cy.contains('UC AB').click()
        })
    })

    it('move to the checkout', () => {
        cy.url().should('include', 'checkout/uc')
        cy.contains('Privatperson').click()
        cy.get('input[name="personId"]').type('195008196015')
        cy.contains('Betala med Klarna').click()
        cy.get('#klarna-checkout-container').should('be.visible')
        cy.get('iframe')
    })



        //cy.frameLoaded('#klarna-checkout-iframe').should('exist')
        
         //cy.iframe().find('input[name="email"]').type('jhhjhjg@jhhj.com')
        //cy.get('iframe').iframe(() => {
            // Targets the input within the iframe element
        //    cy.get('input[name="email"]').type('195008196015@noemail.com')
        //    cy.get('input[name="postal_code"]').type('12245')
        /* cy.getIframeBody()
      .find('input[name="email"]').type('jhhjhjg@jhhj.com')

      cy.getIframeBody()
      .find('#result').should('include.text', '"delectus aut autem"') */

        //  })
          
     
 

    const getIframeDocument = () => {
        return cy
        .get('iframe[name="klarna-checkout-iframe"]')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('not.be.empty')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        // https://on.cypress.io/wrap
        .then(cy.wrap)
      }

      
    const getIframeBody = () => {
        // get the document
        return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
      }

    const getIframeWindow = () => {
        return cy
        .get('iframe[name="klarna-checkout-iframe"]')
        .its('0.contentWindow').should('exist')
      }
      
      it('spies on window.fetch method call', () => {
      
        getIframeWindow().then((win) => {
          cy.spy(win, 'fetch').as('fetch')
        })
      
       // getIframeBody().find('#email__container').type('jhhjhjg@jhhj.com')
       // getIframeBody().find('#postal_code').type('12245')
      
        // because the UI has already updated, we know the fetch has happened
        // so we can use "cy.get" to retrieve it without waiting
        // otherwise we would have used "cy.wait('@fetch')"
        cy.get('@fetch').should('have.been.calledOnce')
        // let's confirm the url argument
        .and('have.been.calledWith', 'https://js.playground.klarna.com/kcoc')
      })
   /*
      it('gets the post', () => {
     //   cy.visit('index.html')
        getIframeBody().find('#email__container').type('jhhjhjg@jhhj.com')
        getIframeBody().find('#postal_code').type('12245')
      }) */
      
})