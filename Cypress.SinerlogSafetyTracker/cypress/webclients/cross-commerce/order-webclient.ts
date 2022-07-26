import { v4 as uuidv4 } from 'uuid';
import { Logger } from "../../../../src/utils/Logger";
import { ApiKey } from '../../enums/onboarding/account/apiKey';
import { Order } from "../../models/cross-commerce/order-model";

export class OrderWebClient {

    static Get(order: Order) {
        return cy.request({
            method: 'GET',
            url: `/Orders/${order.id}`,
            headers: { 'ApiKey': ApiKey.Sinerlog, }
        }).then(response => { Logger.LogResponseBody(response) }).then((response) => {
          order.BuildResponse(response)
          order.trackingCode = response.body.shippings[0].trackingCode
          order.logisticCode = response.body.shippings[0].logisticCode
        })
    }

    static Cancel(order: Order) {
        return cy.request({
            method: 'PUT',
            url: `/Orders/${order.id}/cancel`,
            headers: { 'ApiKey': ApiKey.Sinerlog, },
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            order.BuildResponse(response)
        });
    }

    static Add(order: Order) {
        order.payload.code = uuidv4()
        Logger.LogRequestBody(order.payload)
        return cy.request({
            method: 'POST',
            url: '/Orders',
            headers: { 'ApiKey': ApiKey.Sinerlog, },
            body: order.payload,
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            order.BuildResponse(response)
            order.Build(response)
        });
    }

}