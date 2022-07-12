import { CyRequest } from "../../../../src/utils/CyRequest";
import { v4 as uuidv4 } from 'uuid';
import { AccountApiKey } from "../Account/Enum/AccountApiKey.enum";
import { Logger } from "../../../../src/utils/Logger";
import { Order } from "./OrderModel";

export class OrderWebClient {

    static Get(order: Order){
        return cy.request({
            method: 'GET',
            url: `/Orders/${order.id}`,
            headers: { 'ApiKey': AccountApiKey.Sinerlog, }
        }).then(response => { Logger.LogResponseBody(response) })
    }

    static Cancel(request: CyRequest, order: Order) {
        return cy.request({
            method: 'PUT',
            url: `/Orders/${order.id}/cancel`,
            headers: { 'ApiKey': AccountApiKey.Sinerlog, },
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            request.BuildResponse(response)
        });
    }

    static Add(request: CyRequest, order: Order) {
        request.requestBody.code = uuidv4()
        return cy.request({
            method: 'POST',
            url: '/Orders',
            headers: { 'ApiKey': AccountApiKey.Sinerlog, },
            body: request.requestBody
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            request.BuildResponse(response)
            order.Build(response)
        });
    }

}