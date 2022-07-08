import { Logger } from "../../utils/Logger"
import { CypressRequest, Request } from "../../../../src/utils/Request"
import { TenantToken } from "../Tenant/TenantToken.enum"

export class PackageWebClient {

    static Add(request: CypressRequest) {
        return cy.request({
            method: 'POST',
            url: `https://dev.easymundi.com/api/orders`,
            auth: {
                bearer: TenantToken.TesteHub
            },
            failOnStatusCode: false,
            body: request.jsonBody
        }).then(response => {
            Logger.LogResponseBody(response)
            request.status = response.status
        })
    }
    
}