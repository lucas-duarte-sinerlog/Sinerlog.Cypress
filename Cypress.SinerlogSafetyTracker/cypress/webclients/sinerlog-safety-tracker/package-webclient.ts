import { Logger } from "../../utils/Logger"
import { CyRequest } from "../../../../src/utils/CyRequest"
import { TenantToken } from "../../e2e/Tenant/TenantToken.enum"
import { v4 as uuidv4 } from 'uuid';
import { Package } from "../../models/sinerlog-safety-tracker/package-model";


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
}