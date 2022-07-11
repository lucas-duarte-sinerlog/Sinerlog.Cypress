export class CyRequest {

    jsonBody: any
    status: number

    BuildResponse(response){
        this.status = response.status
    }

    BuildFixture(fixture){
        this.jsonBody = fixture
    }

}