export class CyRequest {

    requestBody: any
    status: number
    responseBody: any

    BuildResponse(response){
        this.status = response.status
        this.responseBody = response.body
    }

    BuildRequest(fixture){
        this.requestBody = fixture
    }

}