import { ShippingList } from "../../models/cross-commerce/shippingList-model";
import { v4 as uuidv4 } from 'uuid';
import { Logger } from "../../../../src/utils/Logger";
import { ApiKey } from "../../enums/onboarding/account/apiKey";
import { Label } from "../../models/cross-commerce/label-model";

export class ShippingListWebClient {
    

    static Add(shippingList: ShippingList) {
        shippingList.payload.code = uuidv4()
        Logger.LogRequestBody(shippingList.payload)
        return cy.request({
            method: 'POST',
            url: '/Shipping/ShippingList',
            headers: { 'ApiKey': ApiKey.Sinerlog, },
            body: shippingList.payload,
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            shippingList.BuildResponse(response)
            shippingList.Build(response)
        });
    }

    static Close(shippingList: ShippingList) {
        return cy.request({
            method: 'PUT',
            url: `/Shipping/ShippingList/${shippingList.id}/close`,
            headers: { 'ApiKey': ApiKey.Sinerlog, },
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
            shippingList.BuildResponse(response)
        });
    }
    
}