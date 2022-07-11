import { CyRequest } from "../../../../src/utils/CyRequest";
import { AccountApiKey } from "../Account/Enum/AccountApiKey.enum";
import { Logger } from "../../../../src/utils/Logger";
import { Order } from "./OrderModel";
export class OrderWebClient {
    static Cancel(request: CyRequest, order: Order) {
        return cy.request({
            method: 'PUT',
            url: `/Orders/${order.id}/cancel`,
            headers: { 'ApiKey': AccountApiKey.Sinerlog, },
            body: request.jsonBody
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            request.BuildResponse(response)
        });
    }
    static Add(request: CyRequest, order: Order) {
        return cy.request({
            method: 'POST',
            url: '/Orders',
            headers: { 'ApiKey': AccountApiKey.Sinerlog, },
            body: request.jsonBody
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            request.BuildResponse(response)
            order.Build(response)
        });
    }
}