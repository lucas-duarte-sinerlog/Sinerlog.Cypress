import { Logger } from "../../../../src/utils/Logger"

export class AccountWebClient {

    static Get(id: number) {
        return cy.request({
            method: 'GET',
            url: `http://dev.doc.sinerlog.log.br/onboarding/api/Account/${id}`,
            failOnStatusCode: false
        }).then(response => {
        Logger.LogResponseBody(response)
        })
    }
}