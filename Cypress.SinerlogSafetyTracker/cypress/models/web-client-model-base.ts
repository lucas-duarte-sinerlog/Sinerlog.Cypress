export class WebClientModelBase {
    id: number
    payload: any
    response: any
    status: number
    statusText: string

    BuildResponse(response){
        this.status = response.status
        this.response = response.body
    }

    BuildPayload(fixture){
        this.payload = fixture
    }
}