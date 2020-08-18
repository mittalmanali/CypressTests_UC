describe('Elements existence  at UC Main Page', () => {

    it('visit the url', () => {
        cy.visit('www1.uc.se')
    })

    it('check the header links, language bar & login button exist', () => {
        cy.get('.site-header__top').within(() => {
            cy.get('.site-header__switch-link--active').should('be.visible')
            cy.contains('Privatperson').should('exist')
            cy.contains('svenska').should('exist')
            cy.contains('English').should('exist')
            cy.get('.site-header__login').should('exist')
        })

    })

    it('check sub header elements existence', () => {
        cy.get('.site-header__sub').within(() => {
            cy.get('.site-header__logo').should('exist')
            cy.get('.site-header__main-menu-nav').should('exist')
            cy.get('li.products-services__order-online-item-container').should('exist')
            cy.get('a[href*="kunskap-inspiration"]').should('exist')
            cy.get('a[href*="blogg"]').should('exist')
            cy.get('a[href*="om-uc"]').should('exist')
            cy.get('a[href*="hjalp--kontakt"]').should('exist')
            cy.get('[data-id="search-layer"]').should('exist')
        })

    })

    it('check the rest of the blocks existence', () => {
        cy.get('div#main').should('exist')
        cy.get('div.site-footer').should('exist')
        cy.get('div.site-footer__notice').should('exist')
    })

    

})