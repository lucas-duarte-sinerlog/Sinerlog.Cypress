export class Logger {
    static LogResponseBody(response) {
        if (Cypress.env('debug'))
            cy.log(`**Response body:** ${JSON.stringify(response.body)}`)
    }
}