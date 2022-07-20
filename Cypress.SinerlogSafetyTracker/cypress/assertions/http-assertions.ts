import StatusCode from "status-code-enum";

export class HttpAsertion {
    static CheckStatusCode(response: Cypress.Response<any>, statusCode: StatusCode) {
        expect(response.status, "**Status code**").to.be.eq(StatusCode.SuccessOK)

    }
    
}