import { WebClientModelBase } from "../web-client-model-base";

export class ShippingList extends WebClientModelBase {
    id: number
    Build(response: Cypress.Response<any>) {
        this.id = response.body.id
    }
    
}