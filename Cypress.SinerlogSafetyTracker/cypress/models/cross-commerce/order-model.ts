import { WebClientModelBase } from "../web-client-model-base";

export class Order extends WebClientModelBase {
    id: number;
    trackingCode: string;
    logisticCode: string

    Build(response) {
        this.id = response.body
    }
}