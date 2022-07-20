export class WebClientModelBase {
    id: number
    payload: any
    responsePayload: any
    status: number
    statusText: string
    response: Cypress.Response<any>

    BuildResponse(response: Cypress.Response<any>){
        this.status = response.status
        this.responsePayload = response.body
        this.response = response
    }

    BuildPayload(fixture){
        this.payload = fixture
    }
}