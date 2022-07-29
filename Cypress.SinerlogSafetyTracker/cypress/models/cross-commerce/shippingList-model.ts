import { WebClientModelBase } from "../web-client-model-base";

export class ShippingList extends WebClientModelBase {
    
    id: number
    term: string | number

    Build(response: Cypress.Response<any>) {
        this.id = response.body.id
        this.term = response.body.id
    }
    
}