import StatusCode from "status-code-enum";

export class HttpAssertion {
    static CheckStatusCode(response: Cypress.Response<any>, statusCode: StatusCode) {
        expect(response.status, "**Status code**").to.be.eq(statusCode)

    } 
}