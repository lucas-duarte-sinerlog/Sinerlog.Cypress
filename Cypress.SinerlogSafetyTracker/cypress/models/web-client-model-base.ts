export class WebClientModelBase {
    payload: any
    response: any
    status: number
    statusText: string

    BuildResponse(response){
        this.status = response.status
        this.response = response.body
    }

    BuildRequest(fixture){
        this.payload = fixture
    }
}