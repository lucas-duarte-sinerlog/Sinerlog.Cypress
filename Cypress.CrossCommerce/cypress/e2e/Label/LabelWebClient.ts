import { CyRequest } from "../../../../src/utils/CyRequest";
import { Logger } from "../../../../src/utils/Logger";
import { AccountApiKey } from "../Account/Enum/AccountApiKey.enum";

export class LabelWebClient {
    static Add(request: CyRequest) {
        Logger.LogRequestBody(request)
        cy.request({
            method: 'POST',
            url: '/Shipping/label',
            headers: { 'ApiKey': AccountApiKey.Sinerlog, },
            body: request.jsonBody,
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            request.status = response.status
        });
    }
}