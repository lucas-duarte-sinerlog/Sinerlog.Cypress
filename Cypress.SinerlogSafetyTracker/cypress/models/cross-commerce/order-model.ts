import { WebClientModelBase } from "../web-client-model-base";

export class Order extends WebClientModelBase {
    id: number;
    trackingCode: string;
    logisticsCode: string

    Build(response) {
        this.id = response.body
    }
}