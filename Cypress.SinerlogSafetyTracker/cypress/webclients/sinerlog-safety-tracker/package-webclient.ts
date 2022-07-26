import { Logger } from "../../utils/Logger"
import { TenantToken } from "../../e2e/tenant/TenantToken.enum"
import { v4 as uuidv4 } from 'uuid';
import { Package } from "../../models/sinerlog-safety-tracker/package-model";
import { BearerToken } from "../../enums/sinerlog-safety-tracker/bearerToken";
import { Order } from "../../models/cross-commerce/order-model";


export class PackageWebClient {
    static Add(sstPackage: Package) {
        sstPackage.payload.orderNumber = uuidv4()
        return cy.request({
            method: 'POST',
            url: `https://dev.easymundi.com/api/orders`,
            auth: {
                bearer: TenantToken.TesteHub
            },
            failOnStatusCode: false,
            body: sstPackage.payload
        }).then(response => {
            Logger.LogResponseBody(response)
            sstPackage.BuildResponse(response)
        })
    }

    static Get(order: Order) {

        cy.request({
            method: 'GET',
            url: `https://dev.easymundi.com/api/orders/${order.logisticCode}`,
            auth: {
                bearer: BearerToken.TesteHub
            },
            failOnStatusCode: false
        }).then(response => { Logger.LogResponseBody(response) }).then(response => {
        })

    }
}