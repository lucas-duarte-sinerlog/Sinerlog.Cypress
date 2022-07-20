import { Logger } from "../../../../src/utils/Logger"
import { ApiKey } from "../../enums/onboarding/account/apiKey"
import { ShippingSeller } from "../../models/cross-commerce/shippingSeller-model"

export class ShippingSellerWebClient {

    static Get(shippingSeller: ShippingSeller) {
        return cy.request({
            method: 'GET',
            url: `/ShippingSeller/${shippingSeller.id}`,
            headers: { 'ApiKey': ApiKey.Sinerlog, }
        }).then(response => { Logger.LogResponseBody(response) }).then((response) => {
            shippingSeller.BuildResponse(response)
        })
    }

}