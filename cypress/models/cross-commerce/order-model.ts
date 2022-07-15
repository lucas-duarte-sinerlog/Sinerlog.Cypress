import { WebClientModelBase } from "../web-client-model-base";

export class Order extends WebClientModelBase {
    id: number;

    Build(response) {
        this.id = response.body
    }
}