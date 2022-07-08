import { CyRequest } from "./CyRequest"

export class Logger {
    static LogResponseBody(response) {
        if (Cypress.env('debug'))
            cy.log(`**Response body:** ${JSON.stringify(response.body)}`)
    }
    static LogRequestBody(request: CyRequest) {
        if (Cypress.env('debug'))
            cy.log(`**Request body:** ${JSON.stringify(request.jsonBody)}`)
    }
}